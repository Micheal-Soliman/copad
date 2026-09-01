import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { PartnershipCategoryPage } from "../_components/partnership-category-page";
import { getPartnershipData, isPartnershipSlug, partnershipSlugs } from "../partnership-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return partnershipSlugs.map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; category: string }> }): Promise<Metadata> {
  const { locale, category } = await params;
  if (!isLocale(locale) || !isPartnershipSlug(category)) return {};
  const data = getPartnershipData(locale, category);
  return { title: data.title, description: data.intro, robots: { index: false, follow: false } };
}

export default async function Page({ params }: { params: Promise<{ locale: string; category: string }> }) {
  const { locale, category } = await params;
  if (!isLocale(locale) || !isPartnershipSlug(category)) notFound();
  return <PartnershipCategoryPage locale={locale} slug={category} />;
}
