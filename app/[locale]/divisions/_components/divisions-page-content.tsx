import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { HomeSectionNavigator } from "@/components/home/home-section-navigator";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { DivisionsBookStory } from "./divisions-book-story";
import { DivisionsHero } from "./divisions-hero";

export function DivisionsPageContent({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];
  const content = copy.sections.divisions;
  const ui = copy.ui.divisions;

  return (
    <main className="min-h-screen overflow-x-clip bg-copad-white">
      <SiteHeader locale={locale} transparent />
      <DivisionsHero locale={locale} title={content.title} intro={content.intro} blocks={content.blocks} />
      <DivisionsBookStory locale={locale} divisions={content.blocks} />
      <HomeSectionNavigator label={ui.sectionNavigationLabel} items={ui.sectionNavigation} />
      <SiteFooter locale={locale} />
    </main>
  );
}
