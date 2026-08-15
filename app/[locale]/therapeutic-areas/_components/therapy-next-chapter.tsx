"use client";

import { FinalPageCta } from "@/components/ui/final-page-cta";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";

export function TherapyNextChapter({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];
  const ui = copy.ui.therapyAreas;

  return (
    <FinalPageCta
      id="products-next"
      locale={locale}
      eyebrow={ui.nextEyebrow}
      title={copy.sections.products.title}
      body={ui.nextBody}
      href={`/${locale}/products`}
      label={copy.nav.products}
    />
  );
}
