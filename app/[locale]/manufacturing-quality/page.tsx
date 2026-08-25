import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { ManufacturingQualityPageContent } from "./_components/manufacturing-quality-page-content";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function ManufacturingQualityPage({ params }: PageProps<"/[locale]/manufacturing-quality">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ManufacturingQualityPageContent locale={locale} />;
}
