"use client";

import { FinalPageCta } from "@/components/ui/final-page-cta";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import type { AboutStoryBlock } from "./about-types";

export function CorporateValuesSection({
  locale,
  content,
  cta,
}: {
  locale: Locale;
  content: AboutStoryBlock;
  cta: string;
}) {
  const ui = siteCopy[locale].ui.about;

  return (
    <FinalPageCta
      id="values"
      locale={locale}
      eyebrow={ui.valuesEyebrow}
      title={content.title}
      body={content.body}
      details={ui.principles}
      note={ui.regulators.join(locale === "ar" ? " • " : " · ")}
      imageSrc="/images/about/about-microscope.png"
      imageAlt=""
      href={`/${locale}/manufacturing-quality`}
      label={cta}
    />
  );
}
