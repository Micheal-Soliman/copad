"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";

export function TherapyNextChapter({ locale }: { locale: Locale }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const copy = siteCopy[locale];
  const ui = copy.ui.therapyAreas;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 85%", "end end"] });
  const lineScale = useTransform(scrollYProgress, [0, 0.65], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0, 0.48], [36, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.42], [0, 1]);

  return (
    <section id="products-next" ref={sectionRef} className="relative overflow-hidden bg-copad-deep px-4 py-20 text-white sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_12%_24%,rgba(16,159,131,.22),transparent_30%)]" />
      <div className="relative mx-auto max-w-[1440px]">
        <motion.div className="mb-10 h-px origin-left bg-linear-to-r from-copad-green via-copad-green/55 to-transparent rtl:origin-right" style={reduceMotion ? undefined : { scaleX: lineScale }} />
        <motion.div style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }} className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="text-[9px] font-black tracking-[0.2em] text-copad-green uppercase">{ui.nextEyebrow}</p>
            <h2 className="mt-4 max-w-4xl font-display text-[3rem] leading-[.92] tracking-[-0.05em] sm:text-6xl lg:text-8xl">{copy.sections.products.title}</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/62 sm:text-base sm:leading-8">{ui.nextBody}</p>
          </div>
          <Link href={`/${locale}/products`} className="group relative isolate flex min-h-12 min-w-52 items-center justify-center overflow-hidden rounded-full bg-copad-green px-7 text-xs font-black text-white shadow-[0_16px_38px_rgba(16,159,131,.25)] transition duration-500 hover:-translate-y-1">
            <span className="absolute inset-0 -z-10 translate-y-full bg-white transition-transform duration-500 group-hover:translate-y-0" />
            <span className="transition-colors duration-500 group-hover:text-copad-deep">{copy.nav.products}</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
