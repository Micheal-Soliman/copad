"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ScrollAtmosphere } from "@/components/motion/scroll-atmosphere";
import { ScrollImageReveal } from "@/components/motion/scroll-image-reveal";
import { ScrollSceneItem } from "@/components/motion/scroll-scene-item";
import { RevealHeading } from "@/components/motion/reveal-heading";
import { useDesktopLayout } from "@/components/motion/use-desktop-layout";
import { siteCopy } from "@/content/site";
import { homeScrollSceneStyle } from "@/lib/motion/scroll-system";
import type { Locale } from "@/lib/i18n";

type ManufacturingPreviewProps = {
  locale: Locale;
  eyebrow: string;
  title: string;
  body: string;
  action: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function ManufacturingPreview({ locale, eyebrow, title, body, action }: ManufacturingPreviewProps) {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isDesktop = useDesktopLayout();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const imageAccentWidth = useTransform(scrollYProgress, [0.54, 0.72], [0, 96]);
  const ui = siteCopy[locale].ui.home;

  return (
    <section id="manufacturing" ref={sectionRef} style={homeScrollSceneStyle(2)} className="relative scroll-mt-20 bg-copad-white px-4 py-16 sm:px-8 sm:py-24 lg:h-[var(--scroll-scene-height)] lg:px-12 lg:py-0">
      <ScrollAtmosphere progress={scrollYProgress} chapter="04" />
      <div dir="ltr" className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-10 sm:gap-14 lg:sticky lg:top-0 lg:min-h-screen lg:grid-cols-[.98fr_1.02fr] lg:gap-20">
        <ScrollSceneItem
          progress={scrollYProgress}
          active={isDesktop}
          side="left"
          role="media"
          className="relative mx-auto w-full max-w-2xl lg:col-start-1 lg:row-start-1"
        >
          <ScrollImageReveal
            className="relative aspect-[5/4] overflow-hidden rounded-[2rem] rounded-bl-[4rem] border border-copad-deep/10 bg-copad-deep shadow-[0_22px_60px_rgba(1,61,96,.13)] sm:rounded-[2.5rem] sm:rounded-bl-[6rem] sm:shadow-[0_30px_80px_rgba(1,61,96,.14)]"
            direction="left"
            progress={isDesktop ? scrollYProgress : undefined}
            timeline={isDesktop}
            cursorLabel={ui.interactionLabels.view}
          >
            <Image
              className="object-cover transition-transform duration-[1400ms] hover:scale-[1.035]"
              src="/images/copad-cleanroom.png"
              alt={ui.manufacturingImageAlt}
              fill
              sizes="(max-width: 960px) 100vw, 48vw"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-copad-deep/72 via-copad-deep/5 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 rounded-[1.25rem] border border-white/15 bg-copad-deep/62 p-4 text-white backdrop-blur-md sm:inset-x-6 sm:bottom-6 sm:rounded-[1.5rem] sm:p-5 lg:inset-x-8 lg:bottom-8 lg:p-6">
              <span className="text-[9px] font-black tracking-[0.2em] text-copad-green uppercase">{ui.manufacturingImageEyebrow}</span>
              <p className="mt-2 max-w-sm text-xs leading-6 font-bold text-white/82">{ui.manufacturingImageCaption}</p>
            </div>
            <motion.span
              aria-hidden="true"
              className="absolute top-7 right-7 h-px bg-copad-green"
              initial={reduceMotion || isDesktop ? false : { width: 0 }}
              whileInView={isDesktop ? undefined : { width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.35, ease }}
              style={isDesktop && !reduceMotion ? { width: imageAccentWidth } : undefined}
            />
          </ScrollImageReveal>
        </ScrollSceneItem>

        <ScrollSceneItem
          progress={scrollYProgress}
          active={isDesktop}
          side="right"
          role="copy"
          dir={locale === "ar" ? "rtl" : "ltr"}
          className="lg:col-start-2 lg:row-start-1"
        >
          <p className="border-s-2 border-copad-green ps-4 text-[10px] font-black tracking-[0.22em] text-copad-green uppercase">{eyebrow}</p>
          <RevealHeading text={title} timeline={isDesktop} className="mt-5 max-w-3xl font-display text-4xl leading-[1.02] tracking-[-0.045em] text-copad-deep sm:text-5xl lg:text-7xl" />
          <p className="mt-6 max-w-2xl text-base leading-8 text-copad-deep/66 sm:mt-8 lg:text-lg lg:leading-9">{body}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3" aria-label={ui.manufacturingPrinciplesLabel}>
            {ui.manufacturingPrinciples.map((principle, index) => (
              <motion.div
                key={principle}
                initial={reduceMotion || isDesktop ? false : { opacity: 0, y: 18, scale: 0.96 }}
                whileInView={isDesktop ? undefined : { opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.6, delay: 0.16 + index * 0.1, ease }}
                whileHover={reduceMotion ? undefined : { y: -5 }}
                whileTap={reduceMotion ? undefined : { y: -4, scale: 0.985 }}
              className="group/principle relative isolate min-h-20 overflow-hidden rounded-2xl border border-copad-deep/10 bg-copad-sand/45 px-4 py-4 shadow-[0_10px_30px_rgba(1,61,96,.04)]"
              >
                <span aria-hidden="true" className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-copad-deep transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/principle:scale-y-100" />
                <span className="text-[9px] font-black tracking-[0.18em] text-copad-green">{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-2 text-[10px] leading-5 font-black tracking-[0.1em] text-copad-deep/62 uppercase transition-colors duration-500 group-hover/principle:text-white">{principle}</p>
                <span aria-hidden="true" className="absolute inset-x-4 bottom-0 h-px origin-left scale-x-0 bg-copad-green transition-transform duration-500 group-hover/principle:scale-x-100 rtl:origin-right" />
              </motion.div>
            ))}
          </div>

          <Link data-magnetic data-cursor-label={ui.interactionLabels.go} href={`/${locale}/manufacturing-quality`} className="group relative isolate mt-8 inline-flex min-h-11 w-full min-w-60 items-center justify-center overflow-hidden rounded-full bg-copad-deep px-8 py-4 text-xs font-black text-white shadow-[0_15px_34px_rgba(1,61,96,.17)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_22px_44px_rgba(0,144,175,.22)] sm:mt-9 sm:w-auto">
            <span aria-hidden="true" className="absolute inset-0 -z-10 origin-right scale-x-0 bg-copad-green transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100 rtl:origin-left" />
            <span>{action}</span>
          </Link>
        </ScrollSceneItem>
      </div>
    </section>
  );
}
