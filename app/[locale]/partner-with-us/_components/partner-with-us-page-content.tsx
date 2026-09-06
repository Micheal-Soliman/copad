import { HomeSectionNavigator } from "@/components/home/home-section-navigator";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteCopy } from "@/content/site";
import { getUiCopy } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { PartnershipHero } from "./partnership-hero";
import { PartnershipModels } from "./partnership-models";

export function PartnerWithUsPageContent({ locale }: { locale: Locale }) {
  const content = siteCopy[locale].sections["partner-with-us"];
  const ui = getUiCopy(locale).partners;

  return <main className="min-h-screen overflow-x-clip bg-copad-white">
    <SiteHeader locale={locale} transparent />
    <PartnershipHero locale={locale} content={content} />
    <PartnershipModels locale={locale} blocks={content.blocks} />
    <HomeSectionNavigator
      label={ui.navLabel}
      items={[
        { id: "home", label: ui.overview },
        { id: "models", label: ui.areas },
      ]}
    />
    <SiteFooter locale={locale} />
  </main>;
}
