import { CorporateSectionPage } from "@/components/pages/corporate-section-page";
import type { Locale } from "@/lib/i18n";

export function ContactPageContent({ locale }: { locale: Locale }) {
  return <CorporateSectionPage locale={locale} section="contact" nextSection="about" visual="/images/copad-campus-hero.png" />;
}
