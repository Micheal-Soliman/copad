import { HomeSectionNavigator } from "@/components/home/home-section-navigator";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getDictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import { CareersHero } from "./careers-hero";
import { TalentSpectrum } from "./talent-spectrum";
import type { CareerVacancy } from "@/content/careers";

export function CareersPageContent({ locale, vacancies }: { locale: Locale; vacancies: CareerVacancy[] }) {
  const dictionary = getDictionary(locale);
  const content = dictionary.sections.careers;
  const ui = dictionary.careersUi;

  return <main className="min-h-screen overflow-x-clip bg-copad-white">
    <SiteHeader locale={locale} transparent />
    <CareersHero locale={locale} content={content} />
    <TalentSpectrum locale={locale} block={content.blocks[1]} vacancies={vacancies} />
    <HomeSectionNavigator label={ui.navigationLabel} items={[
      { id: "home", label: ui.join },
      { id: "vacancies", label: ui.vacancies },
    ]} />
    <SiteFooter locale={locale} />
  </main>;
}
