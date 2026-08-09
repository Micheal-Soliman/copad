import { CorporateSectionPage } from "@/components/pages/corporate-section-page";
import type { Locale } from "@/lib/i18n";

export function TherapeuticAreasPageContent({ locale }: { locale: Locale }) {
  return <CorporateSectionPage locale={locale} section="therapeutic-areas" nextSection="products" visual="/images/copad-cleanroom.png" layout="list" />;
}
