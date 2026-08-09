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
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-copad-deep px-5 pt-28 pb-8 text-white sm:px-8 lg:h-[100svh] lg:px-12 lg:pt-24 lg:pb-6">
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_18%,rgba(16,159,131,.16),transparent_28%),linear-gradient(125deg,#0f3d39_0%,#0a302d_62%,#082724_100%)]" />

      <div dir="ltr" className="mx-auto grid max-w-[1440px] items-stretch gap-10 lg:h-full lg:grid-cols-[.82fr_1.18fr] lg:gap-0">
        <div dir={isArabic ? "rtl" : "ltr"} className="relative z-10 flex flex-col justify-center py-8 lg:py-6 lg:pe-0">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: isArabic ? 34 : -34 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.78, ease }}
          >
            <h1 className="max-w-4xl font-display text-[clamp(3.75rem,6.5vw,7.25rem)] leading-[.84] tracking-[-0.06em] text-white lg:-me-20">
              {title}
            </h1>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.78, delay: 0.16, ease }}
            className="mt-7 max-w-xl border-t border-white/16 pt-5"
          >
            <p className="text-[15px] leading-7 text-white/66 lg:text-base lg:leading-8">{intro}</p>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.28, ease }}
            className="mt-7 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 border-t border-white/16 pt-5 sm:grid-cols-3"
          >
            {ui.heroFacts.map((fact, index) => (
              <div key={fact.label} className={index > 0 ? "border-s border-white/12 ps-5" : ""}>
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
          className="group relative min-h-[31rem] overflow-hidden rounded-[2rem] border border-white/12 bg-copad-deep shadow-[0_30px_90px_rgba(0,0,0,.3)] lg:h-full lg:min-h-0 lg:rounded-[2.5rem]"
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
            className="absolute right-6 bottom-6 left-6 flex items-end justify-between gap-6 border-t border-white/30 pt-5 lg:right-8 lg:bottom-8 lg:left-8"
          >
            <p className="max-w-sm text-xs leading-6 font-bold text-white/74">
              {ui.heroCaption}
            </p>
            <span className="shrink-0 text-[9px] font-black tracking-[0.2em] text-copad-green uppercase">{ui.heroSignature}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
