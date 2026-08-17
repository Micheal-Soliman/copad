"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ScrollAtmosphere } from "@/components/motion/scroll-atmosphere";
import { ScrollImageReveal } from "@/components/motion/scroll-image-reveal";
import { ScrollSceneItem } from "@/components/motion/scroll-scene-item";
import { RevealHeading } from "@/components/motion/reveal-heading";
import { siteCopy } from "@/content/site";
import { useDesktopLayout } from "@/components/motion/use-desktop-layout";
import { homeScrollSceneStyle } from "@/lib/motion/scroll-system";
import type { Locale } from "@/lib/i18n";

type IntroductionSectionProps = {
  locale: Locale;
  eyebrow: string;
  title: string;
  body: string;
  note?: string;
  action: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function IntroductionSection({
  locale,
  eyebrow,
  title,
  body,
  note,
  action,
}: IntroductionSectionProps) {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isDesktop = useDesktopLayout();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const ui = siteCopy[locale].ui.home;

  return (
    <section id="introduction" ref={sectionRef} style={homeScrollSceneStyle(2)} className="relative scroll-mt-20 px-4 py-14 sm:px-8 sm:pt-16 sm:pb-10 lg:h-[var(--scroll-scene-height)] lg:px-12 lg:py-0">
      <ScrollAtmosphere progress={scrollYProgress} chapter="01" />
      <div dir="ltr" className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-10 sm:gap-16 lg:sticky lg:top-0 lg:min-h-screen lg:grid-cols-[1.08fr_.92fr] lg:gap-24">
        <ScrollSceneItem
          progress={scrollYProgress}
          active={isDesktop}
          side={locale === "ar" ? "left" : "right"}
          role="media"
          className="relative mx-auto w-full max-w-xl pt-6 pr-6 sm:pt-9 sm:pr-9 lg:col-start-2 lg:row-start-1"
        >
          <motion.div
            className="absolute top-0 right-0 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] rounded-[1.5rem] border-2 border-copad-green bg-copad-green/[0.035] shadow-[10px_-10px_0_rgba(0,144,175,.06),0_20px_50px_rgba(1,61,96,.12)] sm:h-[calc(100%-2.25rem)] sm:w-[calc(100%-2.25rem)] sm:rounded-[2rem] sm:shadow-[14px_-14px_0_rgba(0,144,175,.06),0_28px_65px_rgba(1,61,96,.12)]"
            initial={reduceMotion || isDesktop ? false : { opacity: 0, x: locale === "ar" ? -12 : 12, y: 12, scale: 0.97 }}
            whileInView={isDesktop ? undefined : { opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.05, ease }}
            aria-hidden="true"
          >
            <span className="absolute inset-2 rounded-[1.1rem] border border-copad-deep/8 sm:inset-3 sm:rounded-[1.45rem]" />
          </motion.div>
          <ScrollImageReveal
            className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-copad-deep shadow-[0_22px_60px_rgba(1,61,96,.18)] sm:aspect-[4/5] sm:rounded-[2rem] sm:shadow-[0_30px_80px_rgba(1,61,96,.2)]"
            direction="right"
            progress={isDesktop ? scrollYProgress : undefined}
            timeline={isDesktop}
            cursorLabel={ui.interactionLabels.view}
          >
            <Image
              className="object-cover transition-transform duration-1000 hover:scale-[1.035]"
              src="/images/copad-campus-hero.png"
              alt={title}
              fill
              sizes="(max-width: 1024px) 100vw, 44vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-copad-deep/30 via-transparent to-transparent" aria-hidden="true" />
          </ScrollImageReveal>
        </ScrollSceneItem>

        <ScrollSceneItem
          progress={scrollYProgress}
          active={isDesktop}
          side={locale === "ar" ? "right" : "left"}
          role="copy"
          dir={locale === "ar" ? "rtl" : "ltr"}
          className="lg:col-start-1 lg:row-start-1"
        >
          <p className="text-[11px] font-black tracking-[0.2em] text-copad-green uppercase">{eyebrow}</p>
          <RevealHeading text={title} timeline={isDesktop} className="mt-5 max-w-3xl font-display text-4xl leading-[1.02] tracking-[-0.04em] text-copad-deep sm:text-5xl lg:text-7xl" />
          <p className="mt-6 max-w-2xl text-base leading-8 text-copad-deep/72 sm:mt-8 sm:text-lg sm:leading-9">{body}</p>
          {note && <p className="mt-5 max-w-2xl border-s-2 border-copad-green ps-5 text-sm leading-7 text-copad-deep/52">{note}</p>}

          <Link
            data-magnetic
            data-cursor-label={ui.interactionLabels.go}
            href={`/${locale}/about`}
            className="group relative isolate mt-8 inline-flex min-h-11 w-full min-w-48 items-center justify-center overflow-hidden rounded-full bg-copad-deep px-7 py-3.5 text-xs font-black text-white shadow-[0_14px_32px_rgba(1,61,96,.18)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(0,144,175,.24)] sm:mt-9 sm:w-auto"
          >
            <span className="absolute inset-0 -z-10 -translate-x-full bg-copad-green transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0 rtl:translate-x-full rtl:group-hover:translate-x-0" />
            <span className="relative">{action}</span>
          </Link>
        </ScrollSceneItem>
      </div>
    </section>
  );
}
