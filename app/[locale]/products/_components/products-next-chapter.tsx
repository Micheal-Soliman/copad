"use client";

import { FinalPageCta } from "@/components/ui/final-page-cta";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";

export function ProductsNextChapter({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];
  const next = copy.sections["manufacturing-quality"];
  const isArabic = locale === "ar";

  return (
    <FinalPageCta
      id="manufacturing-next"
      locale={locale}
      eyebrow={isArabic ? "الفصل التالي" : "Next chapter"}
      title={next.title}
      body={isArabic
        ? "تتحول المحفظة من الفكرة والتركيبة إلى إنتاج منضبط تدعمه الجودة والمواءمة التنظيمية."
        : "See how portfolio strategy becomes disciplined production through manufacturing capability, quality, and regulatory alignment."}
      href={`/${locale}/manufacturing-quality`}
      label={next.title}
    />
  );
}
