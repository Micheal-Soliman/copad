"use client";

import { ArrowRightIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getDictionary } from "@/content/dictionary";
import { insightCategories, type InsightCategory, type LocalizedInsight } from "@/content/insights";
import type { Locale } from "@/lib/i18n";

const ease = [0.22, 1, 0.36, 1] as const;

export function LatestInsights({ locale, insights }: { locale: Locale; insights: LocalizedInsight[] }) {
  const copy = getDictionary(locale).insightsCms;
  const reducedMotion = useReducedMotion();
  const [category, setCategory] = useState<InsightCategory | "all">("all");
  const visible = category === "all" ? insights : insights.filter((item) => item.category === category);
  const featured = visible[0];
  const rest = visible.slice(1);

  return <section id="latest" dir={locale === "ar" ? "rtl" : "ltr"} className="scroll-mt-20 bg-white px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
    <div className="mx-auto max-w-[1320px]">
      <header className="border-b border-copad-green/45 pb-5">
        <h2 className="font-display text-[clamp(2.7rem,4.4vw,5rem)] leading-[1.02] tracking-[-.045em] text-copad-deep">{copy.latestTitle}</h2>
        <span aria-hidden="true" className="mt-5 block h-0.5 w-10 bg-copad-red" />
        <div className="mt-7 flex gap-x-7 gap-y-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Filter active={category === "all"} onClick={() => setCategory("all")}>{copy.all}</Filter>
          {insightCategories.map((item) => <Filter key={item} active={category === item} onClick={() => setCategory(item)}>{copy.categories[item]}</Filter>)}
        </div>
      </header>

      {featured ? <motion.div key={category} initial={reducedMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .58, ease }} className={`mt-10 grid items-start gap-5 lg:gap-8 ${rest.length ? "lg:grid-cols-[1.08fr_.92fr]" : ""}`}>
        <InsightCard locale={locale} insight={featured} featured />
        {rest.length ? <div className="grid items-start gap-5 sm:grid-cols-2">{rest.map((item, index) => <motion.div className="self-start" key={item.id} initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: index * .06, ease }}><InsightCard locale={locale} insight={item} /></motion.div>)}</div> : null}
      </motion.div> : <p className="py-24 text-center text-sm text-copad-deep/48">—</p>}
    </div>
  </section>;
}

function Filter({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" onClick={onClick} className={`relative shrink-0 pb-2 text-sm font-bold transition-colors ${active ? "text-copad-deep" : "text-copad-deep/46 hover:text-copad-deep"}`}>{children}<span className={`absolute inset-x-0 -bottom-[1.35rem] h-0.5 bg-copad-green transition-transform ${active ? "scale-x-100" : "scale-x-0"}`} /></button>;
}

function InsightCard({ locale, insight, featured = false }: { locale: Locale; insight: LocalizedInsight; featured?: boolean }) {
  const copy = getDictionary(locale).insightsCms;
  return <article className={`group self-start overflow-hidden rounded-[1.5rem] border border-copad-deep/10 bg-white transition duration-500 hover:-translate-y-1 hover:border-copad-green/30 hover:shadow-[0_24px_70px_rgba(6,79,120,.09)] ${featured ? "lg:flex lg:flex-col" : ""}`}>
    <Link href={`/${locale}/insights/${insight.slug}`} className={`relative block overflow-hidden bg-copad-sand ${featured ? "aspect-[16/9] lg:aspect-[16/8.5]" : "aspect-[16/8]"}`}>
      <Image src={insight.coverImage} alt="" fill unoptimized={insight.coverImage.startsWith("data:")} sizes={featured ? "(max-width: 1024px) 100vw, 56vw" : "(max-width: 640px) 100vw, 28vw"} className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]" />
    </Link>
    <div className={featured ? "flex flex-1 flex-col p-6 sm:p-8" : "p-5 sm:p-6"}>
      <div className="flex items-center justify-between gap-4 text-[9px] font-black uppercase tracking-[.14em] text-copad-green"><span>{copy.categories[insight.category]}</span><time className="text-copad-deep/42">{formatDate(insight.publishedAt, locale)}</time></div>
      <span aria-hidden="true" className="mt-4 block h-0.5 w-7 bg-copad-red" />
      <h3 className={`mt-5 font-display leading-[1.08] tracking-[-.035em] text-copad-deep ${featured ? "text-[clamp(2rem,3.2vw,3.6rem)]" : "text-xl sm:text-2xl"}`}><Link href={`/${locale}/insights/${insight.slug}`}>{insight.title}</Link></h3>
      <p className={`mt-4 leading-7 text-copad-deep/58 ${featured ? "max-w-2xl text-sm sm:text-base" : "text-sm"}`}>{insight.excerpt}</p>
      <Link href={`/${locale}/insights/${insight.slug}`} className="mt-7 inline-flex items-center gap-3 text-sm font-black text-copad-green group-hover:text-copad-deep">{copy.read}<ArrowRightIcon className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" /></Link>
    </div>
  </article>;
}

function formatDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${value}T12:00:00Z`));
}
