import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { PartnerWithUsPageContent } from "./_components/partner-with-us-page-content";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function PartnerWithUsPage({ params }: PageProps<"/[locale]/partner-with-us">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PartnerWithUsPageContent locale={locale} />;
}
