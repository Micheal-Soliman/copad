import { HomeSectionNavigator } from "@/components/home/home-section-navigator";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { TherapyAreasHero } from "./therapy-areas-hero";
import { TherapyExpertiseMap } from "./therapy-expertise-map";
import { TherapyNextChapter } from "./therapy-next-chapter";

export function TherapeuticAreasPageContent({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];
  const content = copy.sections["therapeutic-areas"];
  const ui = copy.ui.therapyAreas;

  return (
    <main className="min-h-screen overflow-x-clip bg-copad-white">
      <SiteHeader locale={locale} transparent />
      <TherapyAreasHero locale={locale} title={content.title} intro={content.intro} areas={content.blocks.map((block) => block.title)} />
      <TherapyExpertiseMap locale={locale} areas={content.blocks} />
      <TherapyNextChapter locale={locale} />
      <HomeSectionNavigator label={ui.sectionNavigationLabel} items={ui.sectionNavigation} />
      <SiteFooter locale={locale} />
    </main>
  );
}
