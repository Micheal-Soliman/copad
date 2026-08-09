import { CorporateSectionPage } from "@/components/pages/corporate-section-page";
import type { Locale } from "@/lib/i18n";

export function DivisionsPageContent({ locale }: { locale: Locale }) {
  return <CorporateSectionPage locale={locale} section="divisions" nextSection="therapeutic-areas" visual="/images/copad-campus-hero.png" layout="cards" />;
}
