import "server-only";
import { insightCategories, localizeInsight, seedInsights, type Insight, type InsightCategory, type LocalizedInsight } from "@/content/insights";
import type { Locale } from "@/lib/i18n";
import { isSupabaseConfigured, supabaseRequest } from "@/lib/supabase/server";

export type InsightAdminRecord = Insight & { status: "draft" | "published"; createdAt?: string };

type InsightRow = {
  id: number;
  slug: string;
  category: InsightCategory;
  status: "draft" | "published";
  published_at: string;
  reading_minutes: number;
  cover_image_base64: string | null;
  title_en: string;
  title_ar: string;
  excerpt_en: string;
  excerpt_ar: string;
  body_en: string;
  body_ar: string;
  created_at?: string;
};

function rowToInsight(row: InsightRow): InsightAdminRecord {
  return {
    id: String(row.id),
    slug: row.slug,
    category: row.category,
    status: row.status,
    publishedAt: row.published_at,
    readingMinutes: row.reading_minutes,
    coverImage: row.cover_image_base64 || "/images/copad-cleanroom.png",
    title: { en: row.title_en, ar: row.title_ar },
    excerpt: { en: row.excerpt_en, ar: row.excerpt_ar },
    body: { en: row.body_en, ar: row.body_ar },
    createdAt: row.created_at,
  };
}

function seedAdminInsights(): InsightAdminRecord[] {
  return seedInsights.map((item) => ({ ...item, status: "published" as const }));
}

const insightSelect = "id,slug,category,status,published_at,reading_minutes,cover_image_base64,title_en,title_ar,excerpt_en,excerpt_ar,body_en,body_ar,created_at";

export async function getPublishedInsights(locale: Locale): Promise<LocalizedInsight[]> {
  if (!isSupabaseConfigured()) return seedInsights.map((item) => localizeInsight(item, locale));
  const rows = await supabaseRequest<InsightRow[]>(`insights?select=${insightSelect}&status=eq.published&order=published_at.desc`, { next: { revalidate: 60, tags: ["insights"] } });
  return rows.map(rowToInsight).map((item) => localizeInsight(item, locale));
}

export async function getInsightBySlug(locale: Locale, slug: string): Promise<LocalizedInsight | null> {
  if (!isSupabaseConfigured()) {
    const item = seedInsights.find((insight) => insight.slug === slug);
    return item ? localizeInsight(item, locale) : null;
  }
  const rows = await supabaseRequest<InsightRow[]>(`insights?select=${insightSelect}&slug=eq.${encodeURIComponent(slug)}&status=eq.published&limit=1`, { next: { revalidate: 60, tags: ["insights"] } });
  return rows[0] ? localizeInsight(rowToInsight(rows[0]), locale) : null;
}

export async function getAllInsights(): Promise<InsightAdminRecord[]> {
  if (!isSupabaseConfigured()) return seedAdminInsights();
  const rows = await supabaseRequest<InsightRow[]>(`insights?select=${insightSelect}&order=published_at.desc`, { cache: "no-store" });
  return rows.map(rowToInsight);
}

export async function getInsightById(id: string): Promise<InsightAdminRecord | null> {
  if (!isSupabaseConfigured()) return seedAdminInsights().find((item) => item.id === id) ?? null;
  const rows = await supabaseRequest<InsightRow[]>(`insights?select=${insightSelect}&id=eq.${encodeURIComponent(id)}&limit=1`, { cache: "no-store" });
  return rows[0] ? rowToInsight(rows[0]) : null;
}

export function isInsightCategory(value: string): value is InsightCategory {
  return insightCategories.includes(value as InsightCategory);
}

export function insightToRow(insight: Omit<InsightAdminRecord, "id">) {
  return {
    slug: insight.slug,
    category: insight.category,
    status: insight.status,
    published_at: insight.publishedAt,
    reading_minutes: insight.readingMinutes,
    cover_image_base64: insight.coverImage.startsWith("data:") ? insight.coverImage : null,
    title_en: insight.title.en,
    title_ar: insight.title.ar,
    excerpt_en: insight.excerpt.en,
    excerpt_ar: insight.excerpt.ar,
    body_en: insight.body.en,
    body_ar: insight.body.ar,
    updated_at: new Date().toISOString(),
  };
}

