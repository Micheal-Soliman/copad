import { CorporateSectionPage } from "@/components/pages/corporate-section-page";
import type { Locale } from "@/lib/i18n";

export function CareersPageContent({ locale }: { locale: Locale }) {
  return <CorporateSectionPage locale={locale} section="careers" nextSection="contact" visual="/images/copad-campus-hero.png" layout="cards" />;
}
