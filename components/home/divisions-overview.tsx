"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
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
  const ui = siteCopy[locale].ui.home;

  return (
    <section className="overflow-hidden bg-copad-white px-5 pt-10 pb-24 sm:px-8 lg:px-12 lg:pt-12 lg:pb-36">
      <div className="mx-auto max-w-[1440px]">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7 }} className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-[10px] font-black tracking-[0.22em] text-copad-green uppercase">{eyebrow}</p>
            <h2 className="mt-5 max-w-3xl font-display text-5xl leading-[1] tracking-[-0.045em] text-copad-deep lg:text-7xl">{title}</h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-copad-deep/62 lg:justify-self-end">{body}</p>
        </motion.div>

        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.8, delay: 0.08 }} className="mt-14 grid gap-3 lg:flex lg:h-[34rem]">
          {items.map((division, index) => {
            const isActive = active === index;
            const longestWord = division.title.split(/\s+/).reduce((length, word) => Math.max(length, word.length), 0);
            const closedWeight = Math.min(1.7, Math.max(1, longestWord / 9));
            return (
              <motion.article
                key={division.title}
                style={reduceMotion ? { flexGrow: isActive ? 2.5 : closedWeight } : undefined}
                animate={reduceMotion ? undefined : { flexGrow: isActive ? 2.5 : closedWeight, y: isActive ? -6 : 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setActive(index)}
                onFocusCapture={() => setActive(index)}
                tabIndex={0}
                className="group relative min-h-96 overflow-hidden rounded-[1.75rem] bg-copad-deep shadow-[0_18px_50px_rgba(15,61,57,.08)] transition-shadow duration-700 hover:shadow-[0_32px_80px_rgba(15,61,57,.2)] lg:min-w-0 lg:basis-0"
              >
                <div aria-hidden="true" className="absolute inset-0 bg-cover bg-no-repeat transition-[transform,filter] duration-1000 ease-out group-hover:scale-[1.08] group-hover:saturate-[1.08]" style={{ backgroundImage: "url('/images/copad-divisions-atlas.png')", backgroundSize: "400% 100%", backgroundPosition: `${positions[index]} center` }} />
                <div aria-hidden="true" className={`absolute inset-0 bg-linear-to-t from-copad-deep via-copad-deep/35 to-transparent transition-opacity duration-500 ${isActive ? "opacity-88" : "opacity-95"}`} />
                <div className="absolute inset-x-0 bottom-0 z-10 flex min-h-64 flex-col justify-end p-6 lg:p-8">
                  <div className="flex items-center">
                    <span className={`rounded-full border px-3 py-1.5 text-[9px] font-black tracking-[0.16em] uppercase transition-all duration-500 ${isActive ? "border-copad-green bg-copad-green text-white" : "border-white/18 bg-white/8 text-white/64"}`}>
                      {ui.divisionLabel} {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className={`mt-4 ms-3 flex min-h-32 max-w-md items-start font-display text-3xl leading-tight tracking-[-0.03em] text-white transition-transform duration-500 lg:text-4xl ${isActive ? "-translate-y-1" : "translate-y-0"}`}>{division.title}</h3>
                  <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[1fr] opacity-100 lg:grid-rows-[0fr] lg:opacity-0"}`}>
                    <div className="ms-3 overflow-hidden">
                      <p className="max-w-xl pt-4 text-sm leading-7 text-white/66">{division.description}</p>
                    </div>
                  </div>
                </div>
                <span aria-hidden="true" className={`absolute inset-3 rounded-[1.25rem] border transition-all duration-500 ${isActive ? "scale-100 border-white/30" : "scale-[.985] border-white/0"}`} />
                <span aria-hidden="true" className={`absolute inset-x-0 bottom-0 h-1 bg-copad-green transition-transform duration-700 ${isActive ? "scale-x-100" : "scale-x-0"}`} />
              </motion.article>
            );
          })}
        </motion.div>

        <div className="mt-10 flex justify-center">
          <Link href={`/${locale}/divisions`} className="group relative isolate inline-flex min-w-56 items-center justify-center overflow-hidden rounded-full bg-copad-deep px-8 py-4 text-xs font-black text-white shadow-[0_16px_36px_rgba(15,61,57,.16)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_46px_rgba(16,159,131,.24)]">
            <span aria-hidden="true" className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-copad-green transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" />
            <span aria-hidden="true" className="absolute top-0 -start-16 h-full w-12 skew-x-[-18deg] bg-white/25 blur-sm transition-transform duration-700 group-hover:translate-x-[19rem] rtl:group-hover:-translate-x-[19rem]" />
            <span className="relative text-center">{action}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
