"use client";

import { ArrowRightIcon, BriefcaseIcon, MapPinIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { ContentBlock } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { localizeVacancy, type CareerVacancy } from "../career-vacancies";

const ease = [0.22, 1, 0.36, 1] as const;

export function TalentSpectrum({ locale, block, vacancies }: { locale: Locale; block: ContentBlock; vacancies: CareerVacancy[] }) {
  const reducedMotion = useReducedMotion();
  const isArabic = locale === "ar";
  const localizedVacancies = vacancies.map((vacancy) => localizeVacancy(vacancy, locale));

  return <section id="vacancies" dir={isArabic ? "rtl" : "ltr"} className="relative scroll-mt-20 overflow-hidden bg-copad-sand px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
    <div aria-hidden="true" className="absolute -end-36 top-24 size-[34rem] rounded-full border border-copad-green/10" />
    <div className="relative mx-auto max-w-[1320px]">
      <header className="grid gap-7 border-b border-copad-deep/12 pb-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end lg:gap-20 lg:pb-14">
        <motion.div initial={reducedMotion ? false : { y: 24, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .72, ease }}>
          <p className="text-[9px] font-black uppercase tracking-[.23em] text-copad-green">{isArabic ? "الفرص الحالية" : "Current opportunities"}</p>
          <h2 className={`${isArabic ? "font-sans font-black" : "font-display"} mt-5 max-w-[16ch] text-[clamp(2.6rem,4.2vw,4.6rem)] leading-[1.04] tracking-[-.045em] text-copad-deep`}>{block.title}</h2>
        </motion.div>
        <motion.p initial={reducedMotion ? false : { y: 24, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .72, delay: .08, ease }} className="max-w-3xl text-sm leading-7 text-copad-deep/62 sm:text-base sm:leading-8 lg:justify-self-end">{block.body}</motion.p>
      </header>

      <div className="mt-8 divide-y divide-copad-deep/10 border-y border-copad-deep/10">
        {localizedVacancies.map((vacancy, index) => <motion.div key={vacancy.id} initial={reducedMotion ? false : { y: 28, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: .28 }} transition={{ duration: .66, delay: Math.min(index * .06, .2), ease }}>
          <Link href={`/${locale}/careers/${vacancy.id}`} className="group grid gap-5 py-7 transition-colors hover:bg-white/55 sm:grid-cols-[4rem_1fr] sm:px-4 sm:py-8 lg:grid-cols-[5rem_1.05fr_.95fr_auto] lg:items-center lg:gap-8 lg:px-6">
            <span aria-hidden="true" className="font-display text-4xl tracking-[-.05em] text-copad-green/42">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[.18em] text-copad-green">{vacancy.department}</p>
              <h3 className={`${isArabic ? "font-sans font-black" : "font-display"} mt-2 max-w-[22ch] text-[clamp(1.65rem,2.4vw,2.55rem)] leading-[1.08] tracking-[-.035em] text-copad-deep`}>{vacancy.title}</h3>
            </div>
            <p className="max-w-xl text-sm leading-7 text-copad-deep/58 sm:col-start-2 lg:col-start-auto">{vacancy.summary}</p>
            <div className="flex flex-wrap items-center gap-3 sm:col-start-2 lg:col-start-auto lg:flex-col lg:items-end">
              <span className="inline-flex items-center gap-2 rounded-full border border-copad-deep/10 bg-white px-4 py-2 text-[10px] font-black text-copad-deep/68"><MapPinIcon size={14} className="text-copad-green" />{vacancy.location}</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-copad-green/18 bg-copad-green/7 px-4 py-2 text-[10px] font-black text-copad-deep"><BriefcaseIcon size={14} className="text-copad-green" />{vacancy.employmentType}</span>
              <span className="inline-flex items-center gap-2 text-[10px] font-black text-copad-deep transition-colors group-hover:text-copad-green">{isArabic ? "عرض الوظيفة" : "View position"}<ArrowRightIcon className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" /></span>
            </div>
          </Link>
        </motion.div>)}
      </div>
    </div>
  </section>;
}
