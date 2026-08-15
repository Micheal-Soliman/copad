"use client";

import { FinalPageCta } from "@/components/ui/final-page-cta";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";

export function DivisionsNextChapter({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];
  const ui = copy.ui.divisions;

  return (
    <FinalPageCta
      id="therapy-next"
      locale={locale}
      eyebrow={ui.nextEyebrow}
      title={copy.sections["therapeutic-areas"].title}
      body={ui.nextBody}
      href={`/${locale}/therapeutic-areas`}
      label={copy.utility.allAreas}
    />
  );
}
