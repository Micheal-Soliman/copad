import { notFound } from "next/navigation";
import { CareersPageContent } from "./_components/careers-page-content";
import { isLocale } from "@/lib/i18n";

export default async function CareersPage({ params }: PageProps<"/[locale]/careers">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <CareersPageContent locale={locale} />;
}
