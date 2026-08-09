"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import type { AboutStoryBlock } from "./about-types";

type CorporateDirectionSectionProps = {
  locale: Locale;
  content: AboutStoryBlock;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function CorporateDirectionSection({ locale, content }: CorporateDirectionSectionProps) {
  const reduceMotion = useReducedMotion();
  const isArabic = locale === "ar";
  const ui = siteCopy[locale].ui.about;

  return (
    <section className="overflow-hidden border-b border-copad-deep/10 bg-copad-white px-4 py-14 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
      <div dir="ltr" className="mx-auto grid max-w-[1440px] items-center gap-10 sm:gap-14 lg:grid-cols-[.88fr_1.12fr] lg:gap-20">
        <motion.div
          dir={isArabic ? "rtl" : "ltr"}
          initial={reduceMotion ? false : { opacity: 0, x: isArabic ? 34 : -34 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease }}
        >
          <p className="text-[10px] font-black tracking-[0.22em] text-copad-green uppercase">{ui.directionEyebrow}</p>
          <h2 className="mt-4 max-w-2xl font-display text-[2.35rem] leading-[1] tracking-[-0.045em] text-copad-deep sm:mt-5 sm:text-5xl lg:text-7xl">{content.title}</h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-copad-deep/68 sm:mt-8 sm:text-base sm:leading-8 lg:text-lg lg:leading-9">{content.body}</p>

          <div className="mt-7 border-t border-copad-deep/12 sm:mt-10">
            {ui.directionDrivers.map((item, index) => (
              <motion.div
                key={item}
                initial={reduceMotion ? false : { opacity: 0, x: isArabic ? 16 : -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.55, delay: 0.08 + index * 0.07, ease }}
                className="grid grid-cols-[2.75rem_1fr] items-center border-b border-copad-deep/12 py-4 sm:grid-cols-[3.5rem_1fr] sm:py-5"
              >
                <span className="text-[9px] font-black tracking-[0.16em] text-copad-green">0{index + 1}</span>
                <p className="text-sm font-bold text-copad-deep/72">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 36, scale: 0.985 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 0.85, delay: 0.06, ease }}
          whileTap={reduceMotion ? undefined : { scale: 0.99 }}
          className="group relative min-h-[23rem] overflow-hidden rounded-[1.5rem] bg-copad-deep shadow-[0_22px_60px_rgba(15,61,57,.13)] sm:min-h-[35rem] sm:rounded-[2rem] sm:shadow-[0_28px_80px_rgba(15,61,57,.14)] lg:min-h-[43rem]"
        >
          <Image className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.025]" src="/images/copad-cleanroom.png" alt={ui.directionImageAlt} fill sizes="(max-width: 1024px) 100vw, 56vw" />
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-copad-deep/72 via-transparent to-copad-deep/5" />
          <div dir={isArabic ? "rtl" : "ltr"} className="absolute right-4 bottom-4 left-4 rounded-[1.25rem] border border-white/18 bg-copad-deep/84 p-5 text-white backdrop-blur-md sm:right-6 sm:bottom-6 sm:left-6 sm:rounded-[1.4rem] sm:p-6 lg:right-8 lg:bottom-8 lg:left-auto lg:w-[22rem] lg:p-7">
            <span className="text-[9px] font-black tracking-[0.18em] text-copad-green uppercase">{ui.ambitionEyebrow}</span>
            <p className="mt-2 font-display text-4xl leading-none tracking-[-0.05em] sm:text-5xl">{ui.ambitionValue}</p>
            <p className="mt-3 text-xs leading-6 text-white/68">{ui.ambitionBody}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
