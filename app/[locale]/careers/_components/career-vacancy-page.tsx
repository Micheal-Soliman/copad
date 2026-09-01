"use client";

import { BriefcaseIcon, MapPinIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import type { Locale } from "@/lib/i18n";
import type { LocalizedCareerVacancy } from "../career-vacancies";
import { VacancyApplicationForm } from "./vacancy-application-form";

const ease = [0.22, 1, 0.36, 1] as const;

export function CareerVacancyPage({ locale, vacancy }: { locale: Locale; vacancy: LocalizedCareerVacancy }) {
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const ar = locale === "ar";
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 88, damping: 30, mass: .45 });
  const titleY = useTransform(progress, [0, 1], [0, -34]);
  const titleOpacity = useTransform(progress, [0, .85], [1, .35]);

  return <main className="min-h-screen overflow-x-clip bg-copad-sand">
    <SiteHeader locale={locale} transparent />
    <section ref={heroRef} dir={ar ? "rtl" : "ltr"} className="relative overflow-hidden bg-copad-deep px-5 pb-16 pt-32 text-white sm:px-8 sm:pb-20 sm:pt-36 lg:px-12 lg:pb-24 lg:pt-40">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(0,144,175,.2),transparent_35%)] rtl:bg-[radial-gradient(circle_at_22%_20%,rgba(0,144,175,.2),transparent_35%)]" />
      <motion.div style={reducedMotion ? undefined : { y: titleY, opacity: titleOpacity }} className="relative mx-auto max-w-[1320px]">
        <Link href={`/${locale}/careers#vacancies`} className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[.18em] text-white/52 transition hover:text-white"><span aria-hidden="true" className="rtl:rotate-180">←</span>{ar ? "العودة إلى الوظائف" : "Back to positions"}</Link>
        <div className="mt-16 grid min-w-0 gap-10 lg:grid-cols-[1fr_.72fr] lg:items-end">
          <div className="min-w-0"><p className="text-[9px] font-black uppercase tracking-[.23em] text-copad-green">{vacancy.department}</p><h1 className={`${ar ? "font-sans font-black" : "font-display"} mt-5 max-w-[18ch] text-[clamp(2.8rem,5vw,5.2rem)] leading-[1.02] tracking-[-.045em]`}>{vacancy.title}</h1></div>
          <div className="min-w-0 w-full"><p className="w-full max-w-full [overflow-wrap:anywhere] border-s-2 border-copad-green ps-5 pe-1 text-sm leading-7 text-white/70 sm:max-w-xl sm:text-base sm:leading-8">{vacancy.summary}</p><div className="mt-7 flex flex-wrap gap-3"><span className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/6 px-4 py-2 text-[10px] font-black"><MapPinIcon size={14} className="text-copad-green" />{vacancy.location}</span><span className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/6 px-4 py-2 text-[10px] font-black"><BriefcaseIcon size={14} className="text-copad-green" />{vacancy.employmentType}</span></div></div>
        </div>
      </motion.div>
    </section>

    <section dir={ar ? "rtl" : "ltr"} className="relative px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
        <motion.div initial={reducedMotion ? false : { y: 28, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: .18 }} transition={{ duration: .72, ease }} className="space-y-14">
          <DetailList title={ar ? "المسؤوليات الرئيسية" : "Key responsibilities"} items={vacancy.responsibilities} ar={ar} />
          <DetailList title={ar ? "المؤهلات المطلوبة" : "What we're looking for"} items={vacancy.requirements} ar={ar} />
        </motion.div>
        <motion.div initial={reducedMotion ? false : { y: 32, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .74, delay: .08, ease }} className="self-start lg:sticky lg:top-24"><VacancyApplicationForm locale={locale} vacancy={vacancy} /></motion.div>
      </div>
    </section>
    <SiteFooter locale={locale} />
  </main>;
}

function DetailList({ title, items, ar }: { title: string; items: string[]; ar: boolean }) {
  return <div className="min-w-0"><p className="text-[9px] font-black uppercase tracking-[.22em] text-copad-green">COPAD / POSITION</p><h2 className={`${ar ? "font-sans font-black" : "font-display"} mt-4 max-w-[18ch] text-[clamp(2.25rem,3.2vw,3.65rem)] leading-[1.06] tracking-[-.04em] text-copad-deep`}>{title}</h2><ul className="mt-8 min-w-0 divide-y divide-copad-deep/10 border-y border-copad-deep/10">{items.map((item, index) => <li key={item} className="grid min-w-0 grid-cols-[2.5rem_minmax(0,1fr)] gap-3 py-5 text-sm leading-7 text-copad-deep/65 [overflow-wrap:anywhere] sm:text-base"><span className="font-display text-xl text-copad-green/60">{String(index + 1).padStart(2, "0")}</span><span className="min-w-0">{item}</span></li>)}</ul></div>;
}
