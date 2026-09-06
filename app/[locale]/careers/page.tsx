import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { CareersPageContent } from "./_components/careers-page-content";
import { getCareerVacancies } from "@/lib/careers";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function CareersPage({ params }: PageProps<"/[locale]/careers">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const vacancies = await getCareerVacancies();
  return <CareersPageContent locale={locale} vacancies={vacancies} />;
}
