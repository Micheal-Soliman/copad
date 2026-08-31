import { HomeSectionNavigator } from "@/components/home/home-section-navigator";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { InsightsHero } from "./insights-hero";
import { InsightsChannels } from "./insights-channels";

export function InsightsPageContent({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];
  const content = copy.sections.insights;
  const ar = locale === "ar";
  return <main className="min-h-screen overflow-x-clip bg-copad-white">
    <SiteHeader locale={locale} transparent />
    <InsightsHero locale={locale} content={content} />
    <InsightsChannels locale={locale} blocks={content.blocks} />
    <HomeSectionNavigator label={ar ? "أقسام صفحة المعرفة والأخبار" : "Insights page sections"} items={[
      { id: "home", label: ar ? "منظور المعرفة" : "Knowledge Lens" },
      { id: "channels", label: ar ? "المسارات" : "Editorial Streams" },
    ]} />
    <SiteFooter locale={locale} />
  </main>;
}
