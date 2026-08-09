import { notFound } from "next/navigation";
import { ManufacturingQualityPageContent } from "./_components/manufacturing-quality-page-content";
import { isLocale } from "@/lib/i18n";

export default async function ManufacturingQualityPage({ params }: PageProps<"/[locale]/manufacturing-quality">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ManufacturingQualityPageContent locale={locale} />;
}
