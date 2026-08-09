import { CorporateSectionPage } from "@/components/pages/corporate-section-page";
import type { Locale } from "@/lib/i18n";

export function ProductsPageContent({ locale }: { locale: Locale }) {
  return <CorporateSectionPage locale={locale} section="products" nextSection="manufacturing-quality" visual="/images/copad-cleanroom.png" layout="cards" />;
}
