import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { CareerVacancyPage } from "../_components/career-vacancy-page";
import { getCareerVacancy, isCareerVacancySlug, vacancySlugs } from "../career-vacancies";

export const dynamicParams = false;

export function generateStaticParams() {
  return vacancySlugs.map((vacancy) => ({ vacancy }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; vacancy: string }> }): Promise<Metadata> {
  const { locale, vacancy } = await params;
  if (!isLocale(locale) || !isCareerVacancySlug(vacancy)) return {};
  const data = getCareerVacancy(locale, vacancy);
  return { title: data?.title, description: data?.summary, robots: { index: false, follow: false } };
}

export default async function Page({ params }: { params: Promise<{ locale: string; vacancy: string }> }) {
  const { locale, vacancy } = await params;
  if (!isLocale(locale) || !isCareerVacancySlug(vacancy)) notFound();
  const data = getCareerVacancy(locale, vacancy);
  if (!data) notFound();
  return <CareerVacancyPage locale={locale} vacancy={data} />;
}
