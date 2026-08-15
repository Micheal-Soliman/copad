"use client";

import { FinalPageCta } from "@/components/ui/final-page-cta";
import type { Locale } from "@/lib/i18n";

export function PartnershipClosing({ locale, cta }: { locale: Locale; cta?: string }) {
  const isArabic = locale === "ar";

  return (
    <FinalPageCta
      id="inquiry"
      locale={locale}
      eyebrow={isArabic ? "ابدأ محادثة" : "Start a conversation"}
      title={isArabic
        ? "لنبدأ من القدرة التي يمكننا بناؤها معًا."
        : "Start with the capability we can build together."}
      body={isArabic
        ? "شاركنا السوق المستهدف أو نموذج التعاون أو احتياجك التصنيعي، وسنوجّه الطلب إلى فريق تطوير الأعمال المختص."
        : "Share the target market, collaboration model, or manufacturing need with us, and the inquiry will be routed to the appropriate business-development team."}
      href={`/${locale}/contact`}
      label={cta ?? (isArabic ? "تواصل معنا" : "Contact us")}
    />
  );
}
