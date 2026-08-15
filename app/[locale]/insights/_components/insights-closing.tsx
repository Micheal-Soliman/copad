"use client";

import { FinalPageCta } from "@/components/ui/final-page-cta";
import type { Locale } from "@/lib/i18n";

export function InsightsClosing({ locale }: { locale: Locale }) {
  const isArabic = locale === "ar";

  return (
    <FinalPageCta
      id="responsibility"
      locale={locale}
      eyebrow={isArabic ? "مبدأ النشر" : "Publishing principle"}
      title={isArabic
        ? "المعلومة للتوعية، وليست بديلًا عن المختص"
        : "Information to inform — never to replace professional care"}
      body={isArabic
        ? "تقدّم كوباد محتواها الصحي في إطار تعليمي مسؤول، مع الفصل الواضح بين التوعية العامة والمعلومات الطبية المتخصصة والتواصل الترويجي."
        : "COPAD presents healthcare content within a responsible educational framework, clearly separating public awareness, professional medical information, and promotional communication."}
      href={`/${locale}/contact`}
      label={isArabic ? "تواصل مع المعلومات الطبية" : "Contact Medical Information"}
    />
  );
}
