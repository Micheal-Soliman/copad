"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";

type AboutHeroProps = {
  locale: Locale;
  title: string;
  intro: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function AboutHero({ locale, title, intro }: AboutHeroProps) {
  const reduceMotion = useReducedMotion();
  const isArabic = locale === "ar";
  const ui = siteCopy[locale].ui.about;

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-copad-deep px-4 pt-20 pb-5 text-white sm:px-8 sm:pt-28 sm:pb-8 lg:h-[100svh] lg:px-12 lg:pt-24 lg:pb-6">
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_18%,rgba(16,159,131,.16),transparent_28%),linear-gradient(125deg,#0f3d39_0%,#0a302d_62%,#082724_100%)]" />

      <div dir="ltr" className="mx-auto grid max-w-[1440px] items-stretch gap-7 sm:gap-10 lg:h-full lg:grid-cols-[.82fr_1.18fr] lg:gap-0">
        <div dir={isArabic ? "rtl" : "ltr"} className="relative z-10 flex flex-col justify-center py-4 sm:py-8 lg:py-6 lg:pe-0">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: isArabic ? 34 : -34 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.78, ease }}
          >
            <h1 className="max-w-4xl font-display text-[clamp(3rem,13vw,4.5rem)] leading-[.88] tracking-[-0.055em] text-white sm:text-[clamp(3.75rem,6.5vw,7.25rem)] sm:leading-[.84] lg:-me-20">
              {title}
            </h1>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.78, delay: 0.16, ease }}
            className="mt-5 max-w-xl border-t border-white/16 pt-4 sm:mt-7 sm:pt-5"
          >
            <p className="text-sm leading-6 text-white/68 sm:text-[15px] sm:leading-7 lg:text-base lg:leading-8">{intro}</p>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.28, ease }}
            className="mt-5 grid max-w-xl grid-cols-2 gap-x-4 gap-y-4 border-t border-white/16 pt-4 sm:mt-7 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-5 sm:pt-5"
          >
            {ui.heroFacts.map((fact, index) => (
              <div key={fact.label} className={`${index === 1 ? "border-s border-white/12 ps-5" : ""} ${index === 2 ? "col-span-2 border-t border-white/12 pt-4 sm:col-span-1 sm:border-s sm:border-t-0 sm:ps-5 sm:pt-0" : ""}`}>
                <span className="block text-[8px] font-black tracking-[0.18em] text-copad-green uppercase">{fact.label}</span>
                <strong className={`mt-2 block font-normal text-white ${index === 0 ? "font-display text-3xl" : "text-xs leading-5"}`}>{fact.value}</strong>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { clipPath: isArabic ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)", opacity: 0.5 }}
          animate={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
          transition={{ duration: 1.05, delay: 0.08, ease }}
          whileTap={reduceMotion ? undefined : { scale: 0.99 }}
          className="group relative min-h-[19rem] overflow-hidden rounded-[1.5rem] border border-white/12 bg-copad-deep shadow-[0_24px_70px_rgba(0,0,0,.28)] sm:min-h-[31rem] sm:rounded-[2rem] lg:h-full lg:min-h-0 lg:rounded-[2.5rem]"
        >
          <Image
            className="object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-[1.025]"
            src="/images/copad-campus-hero.png"
            alt={ui.heroImageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-copad-deep/72 via-transparent to-copad-deep/8" />
          <div aria-hidden="true" className={`absolute inset-y-0 start-0 w-1/3 from-copad-deep/45 to-transparent ${isArabic ? "bg-linear-to-l" : "bg-linear-to-r"}`} />

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
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
    </section>
  );
}
