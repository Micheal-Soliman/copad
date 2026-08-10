"use client";

import { motion, useReducedMotion } from "framer-motion";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import type { AboutStoryBlock } from "./about-types";

type DifferentiatorsSectionProps = {
  locale: Locale;
  content: AboutStoryBlock;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function DifferentiatorsSection({ locale, content }: DifferentiatorsSectionProps) {
  const reduceMotion = useReducedMotion();
  const isArabic = locale === "ar";
  const ui = siteCopy[locale].ui.about;

  return (
    <section className="overflow-hidden bg-copad-deep px-4 py-14 text-white sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div dir="ltr" className="mx-auto grid max-w-[1440px] items-center gap-10 sm:gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -36, scale: 0.985 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 0.85, ease }}
          whileTap={reduceMotion ? undefined : { scale: 0.99 }}
          className="relative min-h-[23rem] overflow-hidden rounded-[1.5rem] border border-white/12 bg-copad-deep/60 shadow-[0_22px_60px_rgba(0,0,0,.18)] sm:min-h-[34rem] sm:rounded-[2rem] sm:shadow-[0_26px_80px_rgba(0,0,0,.2)] lg:min-h-[41rem]"
        >
          <motion.div
            aria-hidden="true"
            initial={reduceMotion ? false : { scale: 1.06 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.15, ease }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/copad-divisions-atlas.png)", backgroundSize: "400% 100%", backgroundPosition: "0% center", backgroundRepeat: "no-repeat" }}
          />
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-copad-deep/88 via-copad-deep/18 to-transparent" />
          <div className="absolute right-5 bottom-5 left-5 border-t border-white/25 pt-4 sm:right-7 sm:bottom-7 sm:left-7 sm:pt-5 lg:right-9 lg:bottom-9 lg:left-9">
            <span className="text-[9px] font-black tracking-[0.18em] text-copad-green uppercase">{ui.distinctionImageEyebrow}</span>
            <p className="mt-2 max-w-md text-sm leading-7 font-bold text-white/82">{ui.distinctionImageBody}</p>
          </div>
        </motion.div>

        <motion.div
          dir={isArabic ? "rtl" : "ltr"}
          initial={reduceMotion ? false : { opacity: 0, x: isArabic ? -34 : 34 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, delay: 0.06, ease }}
        >
          <p className="text-[10px] font-black tracking-[0.22em] text-copad-green uppercase">{ui.distinctionEyebrow}</p>
          <h2 className="mt-4 max-w-2xl font-display text-[2.35rem] leading-[1] tracking-[-0.045em] sm:mt-5 sm:text-5xl lg:text-7xl">{content.title}</h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-white/68 sm:mt-8 sm:text-base sm:leading-8 lg:text-lg lg:leading-9">{content.body}</p>

          <div className="mt-7 border-t border-white/14 sm:mt-10">
            {ui.specialties.map((specialty, index) => (
              <motion.div
                key={specialty}
                initial={reduceMotion ? false : { opacity: 0, x: isArabic ? -18 : 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{ duration: 0.55, delay: 0.12 + index * 0.07, ease }}
                className="group grid grid-cols-[2.75rem_1fr] items-center border-b border-white/14 py-4 sm:grid-cols-[3.5rem_1fr] sm:py-5"
              >
                <span className="text-[9px] font-black tracking-[0.16em] text-copad-green">0{index + 1}</span>
                <div className="flex items-center justify-between gap-5">
                  <p className="text-sm font-bold text-white/76 transition-colors group-hover:text-white lg:text-base">{specialty}</p>
                  <span aria-hidden="true" className="h-px w-7 origin-end bg-copad-green transition-[width] duration-500 group-hover:w-16" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
