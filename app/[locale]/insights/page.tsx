import { notFound } from "next/navigation";
import { InsightsPageContent } from "./_components/insights-page-content";
import { isLocale } from "@/lib/i18n";

export default async function InsightsPage({ params }: PageProps<"/[locale]/insights">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <InsightsPageContent locale={locale} />;
}
