import { CorporateSectionPage } from "@/components/pages/corporate-section-page";
import type { Locale } from "@/lib/i18n";

export function ManufacturingQualityPageContent({ locale }: { locale: Locale }) {
  return <CorporateSectionPage locale={locale} section="manufacturing-quality" nextSection="insights" visual="/images/copad-cleanroom.png" mediaKind="video" />;
}
