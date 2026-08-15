import { HomeSectionNavigator } from "@/components/home/home-section-navigator";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { ManufacturingHero } from "./manufacturing-hero";
import { ManufacturingProcess } from "./manufacturing-process";
import { ManufacturingNextChapter } from "./manufacturing-next-chapter";

export function ManufacturingQualityPageContent({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];
  const content = copy.sections["manufacturing-quality"];
  const isArabic = locale === "ar";
  const navigation = [
    { id: "home", label: isArabic ? "المصنع" : "The Facility" },
    { id: "process", label: isArabic ? "منظومة التشغيل" : "Operating System" },
    { id: "insights-next", label: isArabic ? "المعرفة" : "Insights" },
  ];

  return (
    <main className="min-h-screen overflow-x-clip bg-copad-white">
      <SiteHeader locale={locale} transparent />
      <ManufacturingHero locale={locale} content={content} />
      <ManufacturingProcess locale={locale} blocks={content.blocks} cta={content.cta} />
      <ManufacturingNextChapter locale={locale} />
      <HomeSectionNavigator label={isArabic ? "أقسام صفحة التصنيع والجودة" : "Manufacturing and quality page sections"} items={navigation} />
      <SiteFooter locale={locale} />
    </main>
  );
}
