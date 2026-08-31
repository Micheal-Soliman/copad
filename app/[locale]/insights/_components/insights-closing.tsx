"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Locale } from "@/lib/i18n";

const ease = [0.22, 1, 0.36, 1] as const;

export function InsightsClosing({ locale }: { locale: Locale }) {
  const isArabic = locale === "ar";

  const reduceMotion = useReducedMotion();
  const principles = isArabic
    ? ["محتوى تعليمي واضح", "معلومة في سياقها الصحيح", "فصل واضح عن الترويج"]
    : ["Clear educational content", "Information in context", "Distinct from promotion"];
  const titleLines = isArabic
    ? ["المعلومة للتوعية،", "وليست بديلًا", "عن المختص"]
    : ["Information to inform —", "never to replace", "professional care"];

  return <section id="responsibility" dir={isArabic ? "rtl" : "ltr"} className="relative overflow-hidden bg-copad-deep px-4 py-24 text-white sm:px-8 sm:py-32 lg:px-12 lg:py-36">
    <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(0,144,175,.18),transparent_30%),linear-gradient(115deg,transparent_0_58%,rgba(255,255,255,.035)_58%_58.1%,transparent_58.1%)]" />
    <motion.div initial={reduceMotion ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .85, ease }} className="relative mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
      <div>
        <p className="text-[9px] font-black tracking-[.22em] text-copad-green uppercase">{isArabic ? "مبدأ النشر" : "Publishing principle"}</p>
        <h2 className="mt-5 max-w-[20ch] font-display text-[clamp(2.4rem,4.1vw,4.15rem)] leading-[1.06] tracking-[-.04em]">{titleLines.map((line) => <span key={line} className="block sm:whitespace-nowrap">{line}</span>)}</h2>
      </div>
      <div className="lg:pb-2">
        <p className="max-w-2xl text-sm leading-7 text-white/66 sm:text-base sm:leading-8">{isArabic ? "تقدّم كوباد محتواها الصحي في إطار تعليمي مسؤول، مع الفصل الواضح بين التوعية العامة والمعلومات الطبية المتخصصة والتواصل الترويجي." : "COPAD presents healthcare content within a responsible educational framework, clearly separating public awareness, professional medical information, and promotional communication."}</p>
        <div className="mt-9 grid gap-3 sm:grid-cols-3">{principles.map((principle, index) => <motion.div key={principle} initial={reduceMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .6 }} transition={{ duration: .65, delay: index * .08, ease }} className="border-t border-white/16 pt-4 text-xs font-bold text-white/72"><span className="me-3 font-display text-copad-green">0{index + 1}</span>{principle}</motion.div>)}</div>
      </div>
    </motion.div>
  </section>;
}
