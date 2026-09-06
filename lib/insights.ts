import "server-only";
import { insightCategories, localizeInsight, seedInsights, type Insight, type InsightCategory, type LocalizedInsight } from "@/content/insights";
import type { Locale } from "@/lib/i18n";
import { supabaseReadOr } from "@/lib/supabase/server";

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
  const rows = await supabaseReadOr<InsightRow[] | null>(`insights?select=${insightSelect}&status=eq.published&order=published_at.desc`, null, { next: { revalidate: 60, tags: ["insights"] } });
  const insights = rows?.length ? rows.map(rowToInsight) : seedAdminInsights();
  return insights.map((item) => localizeInsight(item, locale));
}

export async function getInsightBySlug(locale: Locale, slug: string): Promise<LocalizedInsight | null> {
  const seed = seedInsights.find((insight) => insight.slug === slug);
  const rows = await supabaseReadOr<InsightRow[] | null>(`insights?select=${insightSelect}&slug=eq.${encodeURIComponent(slug)}&status=eq.published&limit=1`, null, { next: { revalidate: 60, tags: ["insights"] } });
  if (rows?.[0]) return localizeInsight(rowToInsight(rows[0]), locale);
  return seed ? localizeInsight(seed, locale) : null;
}

export async function getAllInsights(): Promise<InsightAdminRecord[]> {
  const rows = await supabaseReadOr<InsightRow[]>(`insights?select=${insightSelect}&order=published_at.desc`, [], { cache: "no-store" });
  return rows.length ? rows.map(rowToInsight) : seedAdminInsights();
}

export async function getInsightById(id: string): Promise<InsightAdminRecord | null> {
  const rows = await supabaseReadOr<InsightRow[]>(`insights?select=${insightSelect}&id=eq.${encodeURIComponent(id)}&limit=1`, [], { cache: "no-store" });
  if (!rows.length) return seedAdminInsights().find((item) => item.id === id) ?? null;
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
