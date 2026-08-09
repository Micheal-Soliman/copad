import { notFound } from "next/navigation";
import { PartnerWithUsPageContent } from "./_components/partner-with-us-page-content";
import { isLocale } from "@/lib/i18n";

export default async function PartnerWithUsPage({ params }: PageProps<"/[locale]/partner-with-us">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PartnerWithUsPageContent locale={locale} />;
}
