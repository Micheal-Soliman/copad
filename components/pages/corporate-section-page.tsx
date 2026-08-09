import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MediaFrame } from "@/components/media/media-frame";
import { Reveal } from "@/components/motion/reveal";
import { siteCopy } from "@/content/site";
import type { SectionSlug } from "@/content/types";
import type { Locale } from "@/lib/i18n";

type CorporateSectionPageProps = {
  locale: Locale;
  section: SectionSlug;
  nextSection: SectionSlug;
  visual?: string;
  mediaKind?: "image" | "video";
  layout?: "editorial" | "cards" | "list";
};

export function CorporateSectionPage({
  locale,
  section,
  nextSection,
  visual,
  mediaKind = "image",
  layout = "editorial",
}: CorporateSectionPageProps) {
  const copy = siteCopy[locale];
  const content = copy.sections[section];

  return (
    <main className="min-h-screen overflow-hidden bg-copad-white">
      <SiteHeader locale={locale} />

      <section className="relative overflow-hidden bg-copad-sand px-5 pt-36 pb-20 sm:px-8 lg:px-12 lg:pt-44 lg:pb-28">
        <div className="pointer-events-none absolute -top-32 -end-32 size-[34rem] rounded-full bg-copad-green/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-[1440px] items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
          <Reveal>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[.98] tracking-[-0.04em] text-copad-deep sm:text-6xl lg:text-8xl">
              {content.title}
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-copad-deep/68 lg:text-lg">{content.intro}</p>
            {content.cta && (
              <Link href={`/${locale}/contact`} className="mt-8 inline-flex rounded-full bg-copad-deep px-6 py-3 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-copad-green">
                {content.cta} <span className="ms-2" aria-hidden="true">↗</span>
              </Link>
            )}
          </Reveal>
          <Reveal delay={120}>
            <MediaFrame label={content.title} src={visual} kind={mediaKind} placeholderLabel={copy.ui.accessibility.mediaPlaceholder} />
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
        <div className={`mx-auto max-w-[1440px] ${layout === "cards" ? "grid gap-5 md:grid-cols-2 xl:grid-cols-3" : "grid gap-0"}`}>
          {content.blocks.map((block, index) => (
            <Reveal key={block.title} delay={Math.min(index * 60, 240)}>
              <article
                className={
                  layout === "cards"
                    ? "h-full rounded-[1.75rem] border border-copad-deep/10 bg-white p-7 shadow-[0_16px_45px_rgba(15,61,57,.06)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(15,61,57,.11)] lg:p-9"
                    : "grid gap-5 border-t border-copad-deep/12 py-10 md:grid-cols-[7rem_1fr] lg:py-14"
                }
              >
                <span className="text-xs font-black tracking-[0.18em] text-copad-green">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="font-display text-3xl leading-tight tracking-[-0.025em] text-copad-deep lg:text-4xl">{block.title}</h2>
                  <p className="mt-5 max-w-3xl text-sm leading-7 text-copad-deep/65 lg:text-base lg:leading-8">{block.body}</p>
                  {block.note && <p className="mt-5 border-s-2 border-copad-green ps-4 text-sm leading-7 text-copad-deep/55">{block.note}</p>}
                  {block.items && (
                    <ul className="mt-6 grid gap-3 text-sm leading-7 text-copad-deep/70 sm:grid-cols-2">
                      {block.items.map((item) => <li className="flex gap-3 before:mt-2.5 before:size-1.5 before:shrink-0 before:rounded-full before:bg-copad-green" key={item}>{item}</li>)}
                    </ul>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {section === "contact" && (
        <section className="bg-copad-sand px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <Reveal>
              <Eyebrow>{content.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-display text-4xl tracking-[-0.03em] lg:text-6xl">{copy.utility.formTitle}</h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-copad-deep/65">{copy.utility.formBody}</p>
            </Reveal>
            <Reveal delay={120}><ContactForm locale={locale} /></Reveal>
          </div>
        </section>
      )}

      <section className="bg-copad-green px-5 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <p className="text-xs font-black tracking-[0.18em] text-white/60 uppercase">{copy.utility.next}</p>
          <Link className="font-display text-4xl tracking-[-0.03em] transition hover:text-copad-deep lg:text-6xl" href={`/${locale}/${nextSection}`}>
            {copy.sections[nextSection].title} <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <SiteFooter locale={locale} />
    </main>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-black tracking-[0.2em] text-copad-green uppercase">{children}</p>;
}
