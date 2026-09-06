import "server-only";

type SupabaseOptions = RequestInit & { prefer?: string; next?: { revalidate?: number; tags?: string[] } };

function config() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? { url: url.replace(/\/$/, ""), key } : null;
}

export function isSupabaseConfigured() {
  return Boolean(config());
}

export async function supabaseRequest<T>(path: string, options: SupabaseOptions = {}): Promise<T> {
  const settings = config();
  if (!settings) throw new Error("Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");

  const { prefer, headers, ...init } = options;
  const response = await fetch(`${settings.url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: settings.key,
      authorization: `Bearer ${settings.key}`,
      "content-type": "application/json",
      ...(prefer ? { prefer } : {}),
      ...headers,
    },
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Supabase request failed (${response.status}): ${details}`);
  }

  if (response.status === 204) return undefined as T;
  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

/**
 * Read CMS data without making the public site depend on database readiness.
 * This keeps preview and deployments available while migrations are pending.
 * Mutations intentionally keep using `supabaseRequest` so write failures remain visible.
 */
export async function supabaseReadOr<T>(path: string, fallback: T, options: SupabaseOptions = {}): Promise<T> {
  if (!isSupabaseConfigured()) return fallback;
  try {
    return await supabaseRequest<T>(path, options);
  } catch {
    return fallback;
  }
}
