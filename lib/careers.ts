import "server-only";

import { careerVacancies, localizeVacancy, type CareerVacancy } from "@/content/careers";
import type { Locale } from "@/lib/i18n";
import { supabaseReadOr } from "@/lib/supabase/server";

export type CareerVacancyRow = {
  id: number;
  slug: string;
  status: "draft" | "published";
  title_en: string;
  title_ar: string;
  department_en: string;
  department_ar: string;
  location_en: string;
  location_ar: string;
  employment_type_en: string;
  employment_type_ar: string;
  summary_en: string;
  summary_ar: string;
  responsibilities_en: string[];
  responsibilities_ar: string[];
  requirements_en: string[];
  requirements_ar: string[];
  sort_order: number;
};

export function vacancyFromRow(row: CareerVacancyRow): CareerVacancy {
  return {
    id: row.slug,
    title: { en: row.title_en, ar: row.title_ar },
    department: { en: row.department_en, ar: row.department_ar },
    location: { en: row.location_en, ar: row.location_ar },
    employmentType: { en: row.employment_type_en, ar: row.employment_type_ar },
    summary: { en: row.summary_en, ar: row.summary_ar },
    responsibilities: { en: row.responsibilities_en, ar: row.responsibilities_ar },
    requirements: { en: row.requirements_en, ar: row.requirements_ar },
  };
}

export function careerToRow(vacancy: CareerVacancy, sortOrder: number): CareerVacancyRow {
  return {
    id: 0,
    slug: vacancy.id,
    status: "published",
    title_en: vacancy.title.en,
    title_ar: vacancy.title.ar,
    department_en: vacancy.department.en,
    department_ar: vacancy.department.ar,
    location_en: vacancy.location.en,
    location_ar: vacancy.location.ar,
    employment_type_en: vacancy.employmentType.en,
    employment_type_ar: vacancy.employmentType.ar,
    summary_en: vacancy.summary.en,
    summary_ar: vacancy.summary.ar,
    responsibilities_en: vacancy.responsibilities.en,
    responsibilities_ar: vacancy.responsibilities.ar,
    requirements_en: vacancy.requirements.en,
    requirements_ar: vacancy.requirements.ar,
    sort_order: sortOrder,
  };
}

export async function getCareerVacancies(options: { includeDrafts?: boolean } = {}) {
  const filter = options.includeDrafts ? "" : "&status=eq.published";
  const rows = await supabaseReadOr<CareerVacancyRow[]>(`career_vacancies?select=*&order=sort_order.asc,created_at.asc${filter}`, [], { cache: "no-store" });
  return rows.length ? rows.map(vacancyFromRow) : careerVacancies;
}

export async function getLocalizedCareerVacancy(locale: Locale, slug: string) {
  const vacancy = (await getCareerVacancies()).find((item) => item.id === slug);
  return vacancy ? localizeVacancy(vacancy, locale) : null;
}

export async function getCareerVacancyRows() {
  const rows = await supabaseReadOr<CareerVacancyRow[]>("career_vacancies?select=*&order=sort_order.asc,created_at.asc", [], { cache: "no-store" });
  return rows.length ? rows : careerVacancies.map(careerToRow);
}
