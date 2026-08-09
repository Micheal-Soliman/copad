import { notFound } from "next/navigation";
import { DivisionsPageContent } from "./_components/divisions-page-content";
import { isLocale } from "@/lib/i18n";

export default async function DivisionsPage({ params }: PageProps<"/[locale]/divisions">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <DivisionsPageContent locale={locale} />;
}
