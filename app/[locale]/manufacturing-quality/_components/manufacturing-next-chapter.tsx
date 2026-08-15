"use client";

import { FinalPageCta } from "@/components/ui/final-page-cta";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";

export function ManufacturingNextChapter({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];
  const isArabic = locale === "ar";

  return (
    <FinalPageCta
      id="insights-next"
      locale={locale}
      eyebrow={isArabic ? "المعرفة التالية" : "Next: knowledge"}
      title={copy.sections.insights.title}
      body={copy.sections.insights.intro}
      href={`/${locale}/insights`}
      label={copy.sections.insights.cta ?? copy.nav.insights}
    />
  );
}
