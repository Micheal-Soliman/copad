"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import type { AboutStoryBlock } from "./about-types";

type CorporateValuesSectionProps = {
  locale: Locale;
  content: AboutStoryBlock;
  cta: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function CorporateValuesSection({ locale, content, cta }: CorporateValuesSectionProps) {
  const reduceMotion = useReducedMotion();
  const isArabic = locale === "ar";
  const ui = siteCopy[locale].ui.about;

  return (
    <section className="overflow-hidden bg-copad-sand/45 px-3 py-12 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 34, scale: 0.99 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.16 }}
        transition={{ duration: 0.85, ease }}
        className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[1.75rem] bg-copad-deep text-white shadow-[0_24px_70px_rgba(15,61,57,.16)] sm:rounded-[2.5rem] sm:shadow-[0_30px_90px_rgba(15,61,57,.18)] lg:px-14 lg:py-16"
      >
        <div aria-hidden="true" className="absolute top-0 end-0 h-px w-2/5 bg-linear-to-l from-copad-green via-copad-green/45 to-transparent" />
        <div aria-hidden="true" className="absolute -top-40 -end-40 size-96 rounded-full border border-white/[.06]" />
        <div aria-hidden="true" className="absolute -top-24 -end-24 size-64 rounded-full border border-copad-green/10" />

        <div className="relative lg:hidden">
          <div className="px-6 pt-8 sm:px-9 sm:pt-10">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.65, ease }}
            >
              <p className="text-[9px] font-black tracking-[0.22em] text-copad-green uppercase">{ui.valuesEyebrow}</p>
              <h2 className="mt-4 max-w-[18rem] font-display text-[2.55rem] leading-[.96] tracking-[-0.05em] sm:max-w-xl sm:text-5xl">
                {content.title}
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/66 sm:max-w-2xl sm:text-base sm:leading-8">{content.body}</p>
            </motion.div>

            <div className="mt-7 border-y border-white/12 sm:mt-9">
              {ui.principles.map((principle, index) => (
                <motion.article
                  key={principle}
                  initial={reduceMotion ? false : { opacity: 0, x: isArabic ? 24 : -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.58, delay: index * 0.08, ease }}
                  className={`relative grid grid-cols-[2.5rem_1fr] items-center gap-3 py-5 sm:grid-cols-[3rem_1fr] sm:py-6 ${index > 0 ? "border-t border-white/12" : ""}`}
                >
                  <span className="flex size-8 items-center justify-center rounded-full border border-copad-green/45 text-[9px] font-black tracking-[0.12em] text-copad-green sm:size-9">
                    0{index + 1}
                  </span>
                  <h3 className="font-display text-[1.5rem] leading-[1.05] tracking-[-0.035em] text-white/92 sm:text-3xl">
                    {principle}
                  </h3>
                  <motion.span
                    aria-hidden="true"
                    className="absolute bottom-0 start-0 h-px bg-copad-green"
                    initial={reduceMotion ? false : { width: 0 }}
                    whileInView={{ width: `${(index + 1) * 18}%` }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{ duration: 0.7, delay: 0.12 + index * 0.08, ease }}
                  />
                </motion.article>
              ))}
            </div>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, delay: 0.08, ease }}
            className="mt-8 rounded-t-[2rem] bg-copad-white px-6 py-7 text-copad-deep sm:mt-10 sm:px-9 sm:py-9"
          >
            <div className="flex items-end justify-between gap-5 border-b border-copad-deep/10 pb-4">
              <p className="max-w-44 text-[9px] font-black tracking-[0.18em] text-copad-green uppercase">{ui.complianceEyebrow}</p>
              <span aria-hidden="true" className="font-display text-5xl leading-none text-copad-deep/[.07]">03</span>
            </div>
            <div className="divide-y divide-copad-deep/10">
              {ui.regulators.map((regulator, index) => (
                <motion.p
                  key={regulator}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ duration: 0.48, delay: index * 0.07, ease }}
                  className="py-3 text-xs leading-5 font-bold text-copad-deep/68"
                >
                  {regulator}
                </motion.p>
              ))}
            </div>

            <Link
              href={`/${locale}/manufacturing-quality`}
              className="group relative isolate mt-5 flex min-h-12 w-full items-center justify-center overflow-hidden rounded-full bg-copad-green px-6 py-4 text-xs font-black text-white shadow-[0_12px_28px_rgba(16,159,131,.2)] transition-transform duration-300 active:scale-[.98]"
            >
              <span aria-hidden="true" className="absolute inset-0 -z-10 origin-start scale-x-0 bg-copad-deep transition-transform duration-500 group-active:scale-x-100" />
              <span>{cta}</span>
            </Link>
          </motion.div>
        </div>

        <div className="relative hidden gap-10 sm:gap-14 lg:grid lg:grid-cols-[.88fr_1.12fr] lg:gap-20">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: isArabic ? 26 : -26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="lg:flex lg:flex-col lg:justify-between"
          >
            <div>
              <p className="text-[10px] font-black tracking-[0.22em] text-copad-green uppercase">{ui.valuesEyebrow}</p>
              <h2 className="mt-4 max-w-xl font-display text-[2.25rem] leading-[1] tracking-[-0.045em] sm:mt-5 sm:text-5xl lg:text-7xl">{content.title}</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/66 sm:mt-7 sm:text-base sm:leading-8 lg:text-lg lg:leading-9">{content.body}</p>
            </div>

            <Link href={`/${locale}/manufacturing-quality`} className="group relative isolate mt-8 inline-flex min-h-11 w-full min-w-60 items-center justify-center overflow-hidden rounded-full bg-copad-green px-7 py-4 text-xs font-black text-white transition duration-500 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(16,159,131,.28)] sm:mt-9 sm:w-fit">
              <span aria-hidden="true" className="absolute inset-0 -z-10 origin-start scale-x-0 bg-white transition-transform duration-500 group-hover:scale-x-100" />
              <span className="transition-colors duration-500 group-hover:text-copad-deep">{cta}</span>
            </Link>
          </motion.div>

          <div className="self-start">
            <div className="h-fit overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/[.035] backdrop-blur-sm">
              {ui.principles.map((principle, index) => (
                <motion.article
                  key={principle}
                  initial={reduceMotion ? false : { opacity: 0, x: isArabic ? -22 : 22 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.55 }}
                  transition={{ duration: 0.62, delay: 0.12 + index * 0.09, ease }}
                  whileTap={reduceMotion ? undefined : { x: isArabic ? -4 : 4 }}
                  className={`group relative grid min-h-20 grid-cols-[2.5rem_1fr] items-center gap-3 px-4 py-5 transition-colors duration-500 hover:bg-white/[.055] sm:min-h-32 sm:grid-cols-[5rem_1fr] sm:px-8 sm:py-7 ${index > 0 ? "border-t border-white/12" : ""}`}
                >
                  <span className="text-[10px] font-black tracking-[0.18em] text-copad-green">0{index + 1}</span>
                  <h3 className="font-display text-[1.35rem] leading-tight tracking-[-0.03em] text-white/88 transition-colors group-hover:text-white sm:text-3xl">{principle}</h3>
                  <span aria-hidden="true" className="absolute inset-y-0 start-0 w-0.5 origin-bottom scale-y-0 bg-copad-green transition-transform duration-500 group-hover:scale-y-100" />
                </motion.article>
              ))}
            </div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.62, delay: 0.2, ease }}
              className="mt-8 border-t border-white/12 pt-6"
            >
              <p className="text-[9px] font-black tracking-[0.18em] text-copad-green uppercase">{ui.complianceEyebrow}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {ui.regulators.map((regulator) => (
                  <span key={regulator} className="border-b border-white/16 pb-2 text-[11px] leading-5 font-bold text-white/58">{regulator}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
