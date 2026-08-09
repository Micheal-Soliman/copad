import { CorporateSectionPage } from "@/components/pages/corporate-section-page";
import type { Locale } from "@/lib/i18n";

export function InsightsPageContent({ locale }: { locale: Locale }) {
  return <CorporateSectionPage locale={locale} section="insights" nextSection="partner-with-us" visual="/images/copad-campus-hero.png" layout="cards" />;
}
