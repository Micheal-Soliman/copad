"use client";

import { motion, useReducedMotion } from "framer-motion";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";

const ease = [0.22, 1, 0.36, 1] as const;

export function LeadershipSection({ locale }: { locale: Locale }) {
  const reduceMotion = useReducedMotion();
  const isArabic = locale === "ar";
  const ui = siteCopy[locale].ui.about;
  const [ceo, ...seniorLeaders] = ui.leaders;

  return (
    <section id="leadership" dir={isArabic ? "rtl" : "ltr"} className="relative scroll-mt-20 overflow-hidden bg-copad-sand/50 px-4 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,rgba(142,220,245,.24),transparent_28%),linear-gradient(180deg,rgba(255,255,255,.7),transparent_60%)] rtl:bg-[radial-gradient(circle_at_22%_16%,rgba(142,220,245,.24),transparent_28%),linear-gradient(180deg,rgba(255,255,255,.7),transparent_60%)]" />
      <div className="relative mx-auto max-w-[1440px]">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .7, ease }} className="grid gap-6 border-b border-copad-deep/12 pb-9 lg:grid-cols-[.9fr_1.1fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-[10px] font-black tracking-[.22em] text-copad-green uppercase">{ui.leadershipEyebrow}</p>
            <h2 className={`mt-5 max-w-[16ch] text-pretty font-display text-[clamp(2.6rem,4.8vw,5.2rem)] leading-[1.02] font-bold text-copad-deep ${isArabic ? "tracking-normal" : "tracking-[-.045em]"}`}>{ui.leadershipTitle}</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-copad-deep/62 sm:text-base sm:leading-8 lg:justify-self-end">{ui.leadershipBody}</p>
        </motion.div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.08fr_.92fr] lg:gap-6">
          {ceo && <LeaderCard leader={ceo} pending={ui.leadershipPending} featured index={0} reduceMotion={Boolean(reduceMotion)} />}
          <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
            {seniorLeaders.map((leader, index) => <LeaderCard key={`${leader.role}-${leader.scope}`} leader={leader} pending={ui.leadershipPending} index={index + 1} reduceMotion={Boolean(reduceMotion)} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function LeaderCard({ leader, pending, index, featured = false, reduceMotion }: { leader: { role: string; scope: string }; pending: string; index: number; featured?: boolean; reduceMotion: boolean }) {
  return (
    <motion.article initial={reduceMotion ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .22 }} transition={{ duration: .68, delay: index * .07, ease }} className={`group relative overflow-hidden rounded-[1.75rem] border border-copad-deep/10 bg-white shadow-[0_22px_55px_rgba(6,79,120,.08)] ${featured ? "min-h-[30rem] sm:min-h-[35rem]" : "min-h-44"}`}>
      <div className={`relative overflow-hidden bg-[linear-gradient(145deg,#eaf6fb_0%,#d7eef7_52%,#f8fcfe_100%)] ${featured ? "h-[21rem] sm:h-[25rem]" : "absolute inset-y-0 start-0 w-36 sm:relative sm:h-44 sm:w-full lg:absolute lg:h-auto lg:w-44"}`}>
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,.9),transparent_34%)]" />
        <div aria-hidden="true" className={`absolute start-1/2 top-[22%] -translate-x-1/2 rounded-full border border-copad-deep/8 bg-white/72 shadow-[0_12px_30px_rgba(6,79,120,.08)] ${featured ? "size-28 sm:size-32" : "size-14"}`} />
        <div aria-hidden="true" className={`absolute start-1/2 bottom-[-12%] -translate-x-1/2 rounded-t-full border border-copad-deep/8 bg-white/72 ${featured ? "h-52 w-64 sm:h-60 sm:w-72" : "h-24 w-28"}`} />
        <span className="absolute end-4 top-4 text-[9px] font-black tracking-[.18em] text-copad-green">0{index + 1}</span>
      </div>
      <div className={`${featured ? "p-6 sm:p-8" : "ms-36 flex min-h-44 flex-col justify-center p-5 sm:ms-0 lg:ms-44"}`}>
        <p className="text-[9px] font-black tracking-[.18em] text-copad-green uppercase">{leader.scope}</p>
        <h3 className={`${featured ? "mt-3 text-2xl sm:text-3xl" : "mt-2 text-lg sm:text-xl"} font-display leading-tight font-bold tracking-[-.025em] text-copad-deep`}>{leader.role}</h3>
        <p className="mt-3 text-[10px] leading-5 font-bold text-copad-deep/38">{pending}</p>
      </div>
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-copad-green transition-transform duration-700 group-hover:scale-x-100 rtl:origin-right" />
    </motion.article>
  );
}
