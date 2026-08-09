"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";

type PreviewCopy = { title: string; body: string };

type ClosingPreviewsProps = {
  locale: Locale;
  insights: PreviewCopy;
  partnership: PreviewCopy;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function ClosingPreviews({ locale, insights, partnership }: ClosingPreviewsProps) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const isArabic = locale === "ar";
  const ui = siteCopy[locale].ui.home;
  const cards = [
    {
      eyebrow: ui.insightsEyebrow,
      title: insights.title,
      body: insights.body,
      action: ui.insightsAction,
      href: "insights",
    },
    {
      eyebrow: ui.partnershipEyebrow,
      title: partnership.title,
      body: partnership.body,
      action: ui.partnershipAction,
      href: "partner-with-us",
    },
  ] as const;

  return (
    <section className="overflow-hidden bg-copad-sand/38 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 42, scale: 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease }}
        className="mx-auto flex max-w-[1440px] flex-col overflow-hidden rounded-[3rem] bg-copad-deep shadow-[0_34px_100px_rgba(15,61,57,.16)] lg:h-[34rem] lg:flex-row"
      >
        {cards.map((card, index) => {
          const isActive = active === index;
          const dark = index === 0;

          return (
            <motion.article
              key={card.href}
              animate={reduceMotion ? undefined : { flexGrow: isActive ? 1.2 : 0.8 }}
              transition={{ duration: 0.75, ease }}
              onMouseEnter={() => setActive(index)}
              onFocusCapture={() => setActive(index)}
              className={`group relative min-h-[29rem] basis-0 overflow-hidden p-8 sm:p-10 lg:min-h-0 lg:p-10 ${dark ? "bg-copad-deep text-white" : "bg-copad-white text-copad-deep"}`}
            >
              <motion.div
                aria-hidden="true"
                className={`absolute size-[32rem] rounded-full ${dark ? "-top-56 -right-36 border border-copad-green/22" : "-right-48 -bottom-64 bg-copad-sand"}`}
                animate={reduceMotion ? undefined : { scale: isActive ? 1.12 : 0.94, rotate: isActive ? 12 : 0 }}
                transition={{ duration: 1.1, ease }}
              />
              <motion.div
                aria-hidden="true"
                className={`absolute h-32 w-[130%] -rotate-6 ${dark ? "top-24 -left-20 bg-copad-green/6" : "top-16 -left-24 bg-copad-green/5"}`}
                animate={reduceMotion ? undefined : { x: isActive ? 34 : -20 }}
                transition={{ duration: 1, ease }}
              />

              <div dir={isArabic ? "rtl" : "ltr"} className="relative z-10 flex h-full flex-col">
                <div className="flex items-start justify-between gap-6">
                  <p className={`text-[10px] font-black tracking-[0.22em] uppercase ${dark ? "text-copad-green" : "text-copad-green"}`}>{card.eyebrow}</p>
                  <motion.span
                    aria-hidden="true"
                    className={`font-display text-6xl leading-none ${dark ? "text-white/8" : "text-copad-deep/7"}`}
                    animate={reduceMotion ? undefined : { y: isActive ? -8 : 0, opacity: isActive ? 1 : 0.65 }}
                    transition={{ duration: 0.6, ease }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </motion.span>
                </div>

                <div className="mt-auto pt-6">
                  <motion.span
                    aria-hidden="true"
                    className="block h-px bg-copad-green"
                    animate={reduceMotion ? undefined : { width: isActive ? 112 : 42 }}
                    transition={{ duration: 0.7, ease }}
                  />
                  <motion.h2
                    animate={reduceMotion ? undefined : { y: isActive ? -5 : 0 }}
                    transition={{ duration: 0.65, ease }}
                    className="mt-4 max-w-2xl font-display text-4xl leading-[1] tracking-[-0.04em] text-balance sm:text-5xl lg:text-[3rem]"
                  >
                    {card.title}
                  </motion.h2>
                  <p className={`mt-4 max-w-xl text-sm leading-7 ${dark ? "text-white/64" : "text-copad-deep/62"}`}>{card.body}</p>

                  <Link
                    href={`/${locale}/${card.href}`}
                    className={`group/button relative isolate mt-5 inline-flex min-w-44 items-center justify-center overflow-hidden rounded-full px-7 py-3.5 text-xs font-black shadow-[0_14px_32px_rgba(15,61,57,.16)] transition duration-500 hover:-translate-y-1 ${dark ? "bg-white text-copad-deep hover:text-white" : "bg-copad-deep text-white"}`}
                  >
                    <span aria-hidden="true" className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-copad-green transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/button:scale-y-100" />
                    <span>{card.action}</span>
                  </Link>
                </div>
              </div>

              <motion.span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 origin-left bg-copad-green rtl:origin-right"
                animate={reduceMotion ? undefined : { scaleX: isActive ? 1 : 0 }}
                transition={{ duration: 0.75, ease }}
              />
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
