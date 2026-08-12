"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import type { AboutStoryBlock } from "./about-types";

const ease = [0.22, 1, 0.36, 1] as const;

export function CorporateValuesSection({ locale, content, cta }: { locale: Locale; content: AboutStoryBlock; cta: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isArabic = locale === "ar";
  const ui = siteCopy[locale].ui.about;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const wordX = useTransform(scrollYProgress, [0, 1], isArabic ? ["10%", "-10%"] : ["-10%", "10%"]);

  return (
    <section id="values" ref={sectionRef} className="relative scroll-mt-20 overflow-hidden bg-copad-sand px-4 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <motion.p aria-hidden="true" className="pointer-events-none absolute top-6 whitespace-nowrap font-display text-[18vw] leading-none tracking-[-.08em] text-copad-deep/[.035]" style={reduceMotion ? undefined : { x: wordX }}>COPAD · 1989 · COPAD</motion.p>
      <div dir={isArabic ? "rtl" : "ltr"} className="relative mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .75, ease }}>
            <p className="text-[10px] font-black tracking-[.22em] text-copad-green uppercase">{ui.valuesEyebrow}</p>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(2.7rem,6.2vw,6rem)] leading-[.92] tracking-[-.055em] text-copad-deep">{content.title}</h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-copad-deep/68 sm:text-base sm:leading-8">{content.body}</p>
            <Link href={`/${locale}/manufacturing-quality`} className="group relative mt-8 inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full bg-copad-deep px-7 text-xs font-black text-white transition duration-500 hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(15,61,57,.2)]">
              <span aria-hidden="true" className="absolute inset-0 origin-start scale-x-0 bg-copad-green transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right" />
              <span className="relative">{cta}</span>
            </Link>
          </motion.div>

          <div className="border-t border-copad-deep/15">
            {ui.principles.map((principle, index) => (
              <motion.article key={principle} initial={reduceMotion ? false : { opacity: 0, x: isArabic ? -45 : 45 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .6 }} transition={{ duration: .65, delay: index * .08, ease }} className="group relative grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-copad-deep/15 py-6 sm:grid-cols-[4rem_1fr_auto] sm:py-8">
                <span className="text-[9px] font-black tracking-[.18em] text-copad-green">0{index + 1}</span>
                <h3 className="font-display text-2xl leading-tight tracking-[-.035em] text-copad-deep sm:text-4xl">{principle}</h3>
                <span aria-hidden="true" className="relative size-10 rounded-full border border-copad-deep/15 transition duration-500 group-hover:border-copad-green group-hover:bg-copad-green/8">
                  <span className="absolute top-1/2 left-1/2 h-px w-3 -translate-1/2 bg-copad-green" />
                  <span className="absolute top-1/2 left-1/2 h-3 w-px -translate-1/2 bg-copad-green transition-transform duration-500 group-hover:rotate-90" />
                </span>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-copad-deep/15 pt-6 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[9px] font-black tracking-[.2em] text-copad-green uppercase">{ui.complianceEyebrow}</p>
          <div className="flex flex-wrap gap-x-7 gap-y-3">
            {ui.regulators.map((regulator) => <span key={regulator} className="text-[11px] font-bold text-copad-deep/55">{regulator}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
