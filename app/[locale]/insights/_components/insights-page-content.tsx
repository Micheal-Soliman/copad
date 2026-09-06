import { HomeSectionNavigator } from "@/components/home/home-section-navigator";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getDictionary } from "@/content/dictionary";
import type { Locale } from "@/lib/i18n";
import { getPublishedInsights } from "@/lib/insights";
import { InsightsHero } from "./insights-hero";
import { InsightsChannels } from "./insights-channels";
import { LatestInsights } from "./latest-insights";

export async function InsightsPageContent({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale);
  const content = copy.sections.insights;
  const insights = await getPublishedInsights(locale);
  return <main className="min-h-screen overflow-x-clip bg-copad-white">
    <SiteHeader locale={locale} transparent />
    <InsightsHero locale={locale} content={content} />
    <InsightsChannels locale={locale} blocks={content.blocks} />
    <LatestInsights locale={locale} insights={insights} />
    <HomeSectionNavigator label={copy.insightsCms.navigationLabel} items={[
      { id: "home", label: copy.insightsCms.navigation.home },
      { id: "channels", label: copy.insightsCms.navigation.channels },
      { id: "latest", label: copy.insightsCms.navigation.latest },
    ]} />
    <SiteFooter locale={locale} />
  </main>;
}
