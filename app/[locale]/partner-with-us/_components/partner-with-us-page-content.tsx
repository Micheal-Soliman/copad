import { HomeSectionNavigator } from "@/components/home/home-section-navigator";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { PartnershipClosing } from "./partnership-closing";
import { PartnershipHero } from "./partnership-hero";
import { PartnershipModels } from "./partnership-models";

export function PartnerWithUsPageContent({ locale }: { locale: Locale }) {
  const content = siteCopy[locale].sections["partner-with-us"];
  const isArabic = locale === "ar";

  return <main className="min-h-screen overflow-x-clip bg-copad-white">
    <SiteHeader locale={locale} transparent />
    <PartnershipHero locale={locale} content={content} />
    <PartnershipModels locale={locale} blocks={content.blocks} />
    <PartnershipClosing locale={locale} cta={content.cta} />
    <HomeSectionNavigator
      label={isArabic ? "أقسام صفحة الشراكات" : "Partnership page sections"}
      items={[
        { id: "home", label: isArabic ? "نظرة عامة" : "Overview" },
        { id: "models", label: isArabic ? "مجالات الشراكة" : "Partnership Areas" },
        { id: "inquiry", label: isArabic ? "ابدأ الحوار" : "Start a Conversation" },
      ]}
    />
    <SiteFooter locale={locale} />
  </main>;
}
