import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { InsightsPageContent } from "./_components/insights-page-content";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function InsightsPage({ params }: PageProps<"/[locale]/insights">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <InsightsPageContent locale={locale} />;
}
