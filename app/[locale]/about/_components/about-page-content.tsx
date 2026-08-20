import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { HomeSectionNavigator } from "@/components/home/home-section-navigator";
import { SnapshotBar } from "@/components/home/snapshot-bar";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { AboutHero } from "./about-hero";
import { AboutJourneyLine } from "./about-journey-line";
import { CorporateValuesSection } from "./corporate-values-section";
import { DifferentiatorsSection } from "./differentiators-section";

export function AboutPageContent({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];
  const content = copy.sections.about;
  const distinction = content.blocks[2]!;
  const values = content.blocks[3]!;

  return (
    <main className="min-h-screen overflow-x-clip bg-copad-white">
      <SiteHeader locale={locale} transparent />
      <AboutHero locale={locale} title={content.title} intro={content.intro} />
      <SnapshotBar locale={locale} intro={copy.home.body} sectionId="history" homepage={false} />
      <DifferentiatorsSection locale={locale} content={distinction} />
      <CorporateValuesSection locale={locale} content={values} />
      <AboutJourneyLine />
      <HomeSectionNavigator label={copy.ui.about.sectionNavigationLabel} items={copy.ui.about.sectionNavigation.filter((item) => item.id !== "direction")} />
      <SiteFooter locale={locale} />
    </main>
  );
}
