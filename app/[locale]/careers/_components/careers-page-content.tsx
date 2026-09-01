import { HomeSectionNavigator } from "@/components/home/home-section-navigator";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { CareersHero } from "./careers-hero";
import { TalentSpectrum } from "./talent-spectrum";
import { careerVacancies } from "../career-vacancies";

export function CareersPageContent({ locale }: { locale: Locale }) {
  const content = siteCopy[locale].sections.careers;
  const isArabic = locale === "ar";

  return <main className="min-h-screen overflow-x-clip bg-copad-white">
    <SiteHeader locale={locale} transparent />
    <CareersHero locale={locale} content={content} />
    <TalentSpectrum locale={locale} block={content.blocks[1]} vacancies={careerVacancies} />
    <HomeSectionNavigator label={isArabic ? "أقسام صفحة الوظائف" : "Careers page sections"} items={[
      { id: "home", label: isArabic ? "الانضمام إلى كوباد" : "Join COPAD" },
      { id: "vacancies", label: isArabic ? "الفرص المتاحة" : "Vacancies" },
    ]} />
    <SiteFooter locale={locale} />
  </main>;
}
