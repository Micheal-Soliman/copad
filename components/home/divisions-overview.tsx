"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { RevealHeading } from "@/components/motion/reveal-heading";
import { useDesktopLayout } from "@/components/motion/use-desktop-layout";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";

type Division = {
  title: string;
  description: string;
};

type DivisionsOverviewProps = {
  locale: Locale;
  eyebrow: string;
  title: string;
  body: string;
  items: Division[];
  action: string;
};

const positions = ["0%", "33.333%", "66.666%", "100%"];

export function DivisionsOverview({ locale, eyebrow, title, body, items, action }: DivisionsOverviewProps) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const isDesktop = useDesktopLayout();
  const ui = siteCopy[locale].ui.home;
  return (
    <section id="divisions" className="relative scroll-mt-20 overflow-hidden bg-copad-white px-4 pt-10 pb-16 sm:px-8 sm:pb-20 lg:px-12 lg:pt-12 lg:pb-24">
      <div className="relative z-10 mx-auto max-w-[1440px]">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.4 }} transition={{ duration: 0.7 }} className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-[10px] font-black tracking-[0.22em] text-copad-green uppercase">{eyebrow}</p>
            <RevealHeading text={title} className="mt-5 max-w-3xl font-display text-4xl leading-[1] tracking-[-0.045em] text-copad-deep sm:text-5xl lg:text-7xl" />
          </div>
          <p className="max-w-2xl text-base leading-8 text-copad-deep/62 lg:justify-self-end">{body}</p>
        </motion.div>

        <div className="mt-10 grid gap-3 sm:mt-14 lg:flex lg:h-[34rem]">
          {items.map((division, index) => {
            const isActive = active === index;
            const longestWord = division.title.split(/\s+/).reduce((length, word) => Math.max(length, word.length), 0);
            const closedWeight = Math.min(1.7, Math.max(1, longestWord / 9));
            const closedTitleSize = longestWord >= 16 ? "text-[1.35rem] xl:text-[1.55rem]" : longestWord >= 13 ? "text-[1.5rem] xl:text-[1.7rem]" : "text-[1.75rem] xl:text-3xl";
            return (
              <motion.div
                key={division.title}
                style={reduceMotion ? { flexGrow: isActive ? 2.5 : closedWeight } : undefined}
                animate={reduceMotion ? undefined : { flexGrow: isActive ? 2.5 : closedWeight }}
                transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 72, damping: 20, mass: 0.85 }}
                className="lg:h-auto lg:min-w-0 lg:basis-0 lg:will-change-[flex-grow]"
              >
                <motion.div
                  key={isDesktop ? "desktop-entrance" : "mobile-entrance"}
                  initial={reduceMotion ? false : isDesktop ? index === 0 ? { opacity: 0, x: 180 } : index === 1 ? { opacity: 0, y: -120 } : index === 2 ? { opacity: 0, y: 120 } : { opacity: 0, x: -180 } : { opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: false, amount: isDesktop ? 0.4 : 0.55, margin: isDesktop ? "0px 0px -12% 0px" : "0px" }}
                  transition={{ duration: isDesktop ? 0.95 : 0.65, delay: isDesktop ? index * 0.13 : index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full w-full"
                >
                  <motion.article
                    animate={reduceMotion ? undefined : { y: isActive ? -6 : 0 }}
                    transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 92, damping: 22, mass: 0.7 }}
                    onMouseEnter={() => setActive(index)}
                    onFocusCapture={() => setActive(index)}
                    onTap={() => setActive(index)}
                    data-cursor="interactive"
                    data-cursor-label={ui.interactionLabels.open}
                    tabIndex={0}
                    className={`group relative w-full overflow-hidden rounded-[1.5rem] bg-copad-deep shadow-[0_18px_50px_rgba(1,61,96,.08)] transition-[height,box-shadow] duration-1000 ease-[cubic-bezier(.22,1,.36,1)] hover:shadow-[0_32px_80px_rgba(1,61,96,.2)] sm:rounded-[1.75rem] lg:h-full ${isActive ? "h-[22rem]" : "h-36"}`}
                  >
                <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-copad-deep">
                  <motion.div
                    className="absolute inset-0 bg-no-repeat will-change-transform"
                    animate={{ opacity: isActive ? 0 : 1, scale: isActive ? 1 : 1.08, filter: isActive ? "brightness(1) saturate(1)" : "brightness(.72) saturate(.72)" }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    style={{ backgroundImage: "url('/images/copad-divisions-atlas.png')", backgroundSize: "auto 100%", backgroundPosition: `${positions[index]} center` }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-no-repeat will-change-transform"
                    animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1.015 : 1.08, filter: isActive ? "saturate(1.08)" : "saturate(1)" }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                    style={{ backgroundImage: "url('/images/copad-divisions-atlas.png')", backgroundSize: "400% auto", backgroundPosition: `${positions[index]} center` }}
                  />
                </div>
                <div aria-hidden="true" className={`absolute inset-0 bg-linear-to-t from-copad-deep via-copad-deep/35 to-transparent transition-opacity duration-500 ${isActive ? "opacity-88" : "opacity-95"}`} />
                <div className="absolute inset-0 z-10 flex h-full flex-col justify-end p-5 sm:p-6 lg:p-8">
                  <div className="flex items-center">
                    <span className={`rounded-full border px-3 py-1.5 text-[9px] font-black tracking-[0.16em] uppercase transition-all duration-500 ${isActive ? "border-copad-green bg-copad-green text-white" : "border-white/18 bg-white/8 text-white/64"}`}>
                      {ui.divisionLabel} {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className={`mt-3 ms-2 flex max-w-full items-start text-wrap font-display leading-[1.08] tracking-[-0.035em] text-white transition-[transform,font-size] duration-500 sm:mt-4 sm:ms-3 lg:min-h-32 ${isActive ? "-translate-y-1 text-[2rem] sm:text-3xl xl:text-4xl" : `translate-y-0 ${closedTitleSize}`}`}>{division.title}</h3>
                  <div className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="ms-2 overflow-hidden sm:ms-3">
                      <p className="max-w-xl pt-3 text-sm leading-6 text-white/66 sm:pt-4 sm:leading-7">{division.description}</p>
                    </div>
                  </div>
                </div>
                <span aria-hidden="true" className={`absolute inset-3 rounded-[1.25rem] border transition-all duration-500 ${isActive ? "scale-100 border-white/30" : "scale-[.985] border-white/0"}`} />
                <span aria-hidden="true" className={`absolute inset-x-0 bottom-0 h-1 bg-copad-green transition-transform duration-700 ${isActive ? "scale-x-100" : "scale-x-0"}`} />
                  </motion.article>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link data-magnetic data-cursor-label={ui.interactionLabels.go} href={`/${locale}/divisions`} className="group relative isolate inline-flex min-h-11 w-full min-w-56 items-center justify-center overflow-hidden rounded-full bg-copad-deep px-8 py-4 text-xs font-black text-white shadow-[0_16px_36px_rgba(1,61,96,.16)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_46px_rgba(0,144,175,.24)] sm:w-auto">
            <span aria-hidden="true" className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-copad-green transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" />
            <span aria-hidden="true" className="absolute top-0 -start-16 h-full w-12 skew-x-[-18deg] bg-white/25 blur-sm transition-transform duration-700 group-hover:translate-x-[19rem] rtl:group-hover:-translate-x-[19rem]" />
            <span className="relative text-center">{action}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
