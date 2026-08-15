import { HomeSectionNavigator } from "@/components/home/home-section-navigator";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { CareersApplication } from "./careers-application";
import { CareersHero } from "./careers-hero";
import { TalentSpectrum } from "./talent-spectrum";

export function CareersPageContent({ locale }: { locale: Locale }) {
  const content = siteCopy[locale].sections.careers;
  const isArabic = locale === "ar";

  return <main className="min-h-screen overflow-x-clip bg-copad-white">
    <SiteHeader locale={locale} transparent />
    <CareersHero locale={locale} content={content} />
    <TalentSpectrum locale={locale} block={content.blocks[0]} />
    <CareersApplication locale={locale} block={content.blocks[1]} cta={content.cta} />
    <HomeSectionNavigator label={isArabic ? "أقسام صفحة الوظائف" : "Careers page sections"} items={[
      { id: "home", label: isArabic ? "الانضمام إلى كوباد" : "Join COPAD" },
      { id: "teams", label: isArabic ? "مجالات العمل" : "Career Areas" },
      { id: "apply", label: isArabic ? "التقديم" : "Apply" },
    ]} />
    <SiteFooter locale={locale} />
  </main>;
}
