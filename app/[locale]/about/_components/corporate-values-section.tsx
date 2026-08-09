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
    <section className="overflow-hidden bg-copad-sand/45 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 34, scale: 0.99 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.16 }}
        transition={{ duration: 0.85, ease }}
        className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[2.5rem] bg-copad-deep px-6 py-10 text-white shadow-[0_30px_90px_rgba(15,61,57,.18)] sm:px-10 lg:px-14 lg:py-16"
      >
        <div aria-hidden="true" className="absolute top-0 end-0 h-px w-2/5 bg-linear-to-l from-copad-green via-copad-green/45 to-transparent" />
        <div aria-hidden="true" className="absolute -top-40 -end-40 size-96 rounded-full border border-white/[.06]" />
        <div aria-hidden="true" className="absolute -top-24 -end-24 size-64 rounded-full border border-copad-green/10" />

        <div className="relative grid gap-14 lg:grid-cols-[.88fr_1.12fr] lg:gap-20">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: isArabic ? 26 : -26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="lg:flex lg:flex-col lg:justify-between"
          >
            <div>
              <p className="text-[10px] font-black tracking-[0.22em] text-copad-green uppercase">{ui.valuesEyebrow}</p>
              <h2 className="mt-5 max-w-xl font-display text-5xl leading-[1] tracking-[-0.045em] lg:text-7xl">{content.title}</h2>
              <p className="mt-7 max-w-xl text-base leading-8 text-white/64 lg:text-lg lg:leading-9">{content.body}</p>
            </div>

            <Link href={`/${locale}/manufacturing-quality`} className="group relative isolate mt-9 inline-flex w-fit min-w-60 items-center justify-center overflow-hidden rounded-full bg-copad-green px-7 py-4 text-xs font-black text-white transition duration-500 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(16,159,131,.28)]">
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
                  className={`group relative grid min-h-32 grid-cols-[3.5rem_1fr] items-center gap-3 px-6 py-7 transition-colors duration-500 hover:bg-white/[.055] sm:grid-cols-[5rem_1fr] sm:px-8 ${index > 0 ? "border-t border-white/12" : ""}`}
                >
                  <span className="text-[10px] font-black tracking-[0.18em] text-copad-green">0{index + 1}</span>
                  <h3 className="font-display text-2xl leading-tight tracking-[-0.03em] text-white/88 transition-colors group-hover:text-white sm:text-3xl">{principle}</h3>
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
