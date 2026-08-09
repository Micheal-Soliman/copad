import { notFound } from "next/navigation";
import { TherapeuticAreasPageContent } from "./_components/therapeutic-areas-page-content";
import { isLocale } from "@/lib/i18n";

export default async function TherapeuticAreasPage({ params }: PageProps<"/[locale]/therapeutic-areas">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <TherapeuticAreasPageContent locale={locale} />;
}
