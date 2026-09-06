import { HomeSectionNavigator } from "@/components/home/home-section-navigator";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { getUiCopy } from "@/content/ui";
import { ManufacturingHero } from "./manufacturing-hero";
import { ManufacturingProcess } from "./manufacturing-process";

export function ManufacturingQualityPageContent({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];
  const content = copy.sections["manufacturing-quality"];
  const ui = getUiCopy(locale).manufacturing;
  const navigation = [
    { id: "home", label: ui.facility },
    { id: "process", label: ui.system },
  ];

  return (
    <main className="min-h-screen overflow-x-clip bg-copad-white">
      <SiteHeader locale={locale} transparent />
      <ManufacturingHero locale={locale} content={content} />
      <ManufacturingProcess locale={locale} blocks={content.blocks} />
      <HomeSectionNavigator label={ui.navLabel} items={navigation} />
      <SiteFooter locale={locale} />
    </main>
  );
}
