"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useDesktopLayout } from "@/components/motion/use-desktop-layout";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { editorialScrollSceneStyle } from "@/lib/motion/scroll-system";

type AboutHeroProps = {
  locale: Locale;
  title: string;
  intro: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function AboutHero({ locale, title, intro }: AboutHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isDesktop = useDesktopLayout();
  const isArabic = locale === "ar";
  const ui = siteCopy[locale].ui.about;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3, restDelta: 0.0005 });
  const titleOpacity = useTransform(smoothProgress, [0, 0.13, 1], [0.42, 1, 1]);
  const titleY = useTransform(smoothProgress, [0, 0.16, 1], [12, 0, -8]);
  const introOpacity = useTransform(smoothProgress, [0.08, 0.25, 1], [0, 1, 1]);
  const introY = useTransform(smoothProgress, [0.08, 0.25, 1], [18, 0, 0]);
  const imageScale = useTransform(smoothProgress, [0, 0.55, 1], [1.045, 1, 1.015]);
  const captionOpacity = useTransform(smoothProgress, [0.18, 0.34, 1], [0, 1, 1]);
  const captionY = useTransform(smoothProgress, [0.18, 0.34, 1], [14, 0, 0]);
  const motionEnabled = isDesktop && !reduceMotion;

  return (
    <section ref={sectionRef} id="home" style={editorialScrollSceneStyle(2)} className="relative bg-copad-deep lg:h-[var(--scroll-scene-height)]">
    <div className="relative isolate min-h-[100svh] overflow-hidden bg-copad-deep px-4 pt-20 pb-8 text-white sm:px-8 sm:pt-28 sm:pb-10 lg:sticky lg:top-0 lg:h-screen lg:px-12 lg:pt-24 lg:pb-20">
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_18%,rgba(0,144,175,.16),transparent_28%),linear-gradient(125deg,#013d60_0%,#013d60_62%,#013d60_100%)]" />

      <div dir={isArabic ? "rtl" : "ltr"} className="mx-auto grid max-w-[1440px] items-stretch gap-7 sm:gap-10 lg:h-[calc(100svh-11rem)] lg:grid-cols-[.82fr_1.18fr] lg:gap-0">
        <div dir={isArabic ? "rtl" : "ltr"} className="relative z-10 flex flex-col justify-center py-4 sm:py-8 lg:py-6 lg:pe-10 xl:pe-14">
          <motion.div
            key={motionEnabled ? "desktop-title" : "mobile-title"}
            initial={motionEnabled || reduceMotion ? false : { opacity: 0, x: isArabic ? 34 : -34 }}
            animate={motionEnabled ? undefined : { opacity: 1, x: 0 }}
            style={motionEnabled ? { opacity: titleOpacity, y: titleY } : undefined}
            transition={{ duration: 0.78, ease }}
          >
            <h1
              className={`max-w-4xl text-white ${
                isArabic
                  ? "font-sans text-[clamp(3rem,11vw,5.4rem)] leading-[1.08] font-black tracking-[-0.035em]"
                  : "font-display text-[clamp(3rem,6vw,5.6rem)] leading-[1.02] font-bold tracking-[-0.04em]"
              }`}
            >
              {splitHeroTitle(title).map((line) => <span key={line} className="block whitespace-nowrap">{line}</span>)}
            </h1>
          </motion.div>

          <motion.div
            key={motionEnabled ? "desktop-intro" : "mobile-intro"}
            initial={motionEnabled || reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={motionEnabled ? undefined : { opacity: 1, y: 0 }}
            style={motionEnabled ? { opacity: introOpacity, y: introY } : undefined}
            transition={{ duration: 0.78, delay: 0.16, ease }}
            className="mt-5 max-w-xl border-t border-white/16 pt-4 sm:mt-7 sm:pt-5"
          >
            <p className={`text-sm text-white/68 sm:text-[15px] lg:text-base ${isArabic ? "leading-7 sm:leading-8 lg:leading-9" : "leading-6 sm:leading-7 lg:leading-8"}`}>{intro}</p>
          </motion.div>

          <motion.div
            initial={reduceMotion || motionEnabled ? false : { opacity: 0, y: 20 }}
            animate={motionEnabled ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.28, ease }}
            className="mt-5 grid max-w-xl grid-cols-2 gap-x-4 gap-y-4 border-t border-white/16 pt-4 sm:mt-7 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-5 sm:pt-5"
          >
            {ui.heroFacts.map((fact, index) => (
              <AboutHeroFact key={fact.label} index={index} progress={smoothProgress} active={motionEnabled} className={`${index === 1 ? "border-s border-white/12 ps-5" : ""} ${index === 2 ? "col-span-2 border-t border-white/12 pt-4 sm:col-span-1 sm:border-s sm:border-t-0 sm:ps-5 sm:pt-0" : ""}`}>
                <span className="block text-[8px] font-black tracking-[0.18em] text-copad-green uppercase">{fact.label}</span>
                <strong className={`mt-2 block font-normal text-white ${index === 0 ? "font-display text-3xl" : "text-xs leading-5"}`}>{fact.value}</strong>
              </AboutHeroFact>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease }}
          whileTap={reduceMotion ? undefined : { scale: 0.99 }}
          className="group relative min-h-[19rem] overflow-hidden rounded-[1.5rem] border border-white/12 bg-copad-deep shadow-[0_24px_70px_rgba(0,0,0,.28)] sm:min-h-[31rem] sm:rounded-[2rem] lg:h-[calc(100svh-11rem)] lg:min-h-0 lg:rounded-[2.5rem]"
        >
          <motion.div className="absolute inset-0" style={motionEnabled ? { scale: imageScale } : undefined}>
          <Image
            className="object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-[1.025]"
            src="/images/about/about-researcher.png"
            alt={ui.heroImageAlt}
            fill
            priority
            sizes="(max-width: 960px) 100vw, 60vw"
          />
          </motion.div>
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-copad-deep/72 via-transparent to-copad-deep/8" />
          <div aria-hidden="true" className={`absolute inset-y-0 start-0 w-1/3 from-copad-deep/45 to-transparent ${isArabic ? "bg-linear-to-l" : "bg-linear-to-r"}`} />

          <motion.div
            initial={motionEnabled || reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={motionEnabled ? undefined : { opacity: 1, y: 0 }}
            style={motionEnabled ? { opacity: captionOpacity, y: captionY } : undefined}
            transition={{ duration: 0.7, delay: 0.72, ease }}
            dir={isArabic ? "rtl" : "ltr"}
            className="absolute right-4 bottom-4 left-4 flex flex-col items-start gap-2 border-t border-white/30 pt-3 sm:right-6 sm:bottom-6 sm:left-6 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:pt-5 lg:right-8 lg:bottom-8 lg:left-8"
          >
            <p className="max-w-sm text-[11px] leading-5 font-bold text-white/76 sm:text-xs sm:leading-6">
              {ui.heroCaption}
            </p>
            <span className="shrink-0 text-[9px] font-black tracking-[0.2em] text-copad-green uppercase">{ui.heroSignature}</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
    </section>
  );
}

function AboutHeroFact({ index, progress, active, className, children }: { index: number; progress: MotionValue<number>; active: boolean; className: string; children: React.ReactNode }) {
  const start = 0.3 + index * 0.08;
  const opacity = useTransform(progress, [start, start + 0.12, 1], [0, 1, 1]);
  const y = useTransform(progress, [start, start + 0.12, 1], [18, 0, 0]);

  return <motion.div className={className} style={active ? { opacity, y } : undefined}>{children}</motion.div>;
}

function splitHeroTitle(title: string) {
  const words = title.trim().split(/\s+/);
  if (words.length <= 1) return [title];
  return [words[0]!, words.slice(1).join(" ")];
}
