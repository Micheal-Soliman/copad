import { CorporateSectionPage } from "@/components/pages/corporate-section-page";
import type { Locale } from "@/lib/i18n";

export function PartnerWithUsPageContent({ locale }: { locale: Locale }) {
  return <CorporateSectionPage locale={locale} section="partner-with-us" nextSection="careers" visual="/images/copad-campus-hero.png" layout="cards" />;
}
