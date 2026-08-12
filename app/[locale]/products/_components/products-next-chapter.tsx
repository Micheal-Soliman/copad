"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";

export function ProductsNextChapter({ locale }: { locale: Locale }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isArabic = locale === "ar";
  const copy = siteCopy[locale];
  const next = copy.sections["manufacturing-quality"];
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 85%", "end end"] });
  const lineScale = useTransform(scrollYProgress, [0, .65], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, .52], [34, 0]);
  const opacity = useTransform(scrollYProgress, [0, .42], [0, 1]);
  return <section id="manufacturing-next" ref={sectionRef} className="relative overflow-hidden bg-copad-deep px-4 py-20 text-white sm:px-8 sm:py-28 lg:px-12 lg:py-36">
    <motion.span aria-hidden="true" className="absolute inset-y-0 w-[36vw] -skew-x-12 bg-linear-to-r from-transparent via-copad-green/12 to-transparent" animate={reduceMotion?undefined:{x:["-40vw","120vw"]}} transition={{duration:7,repeat:Infinity,repeatType:"mirror",ease:"easeInOut"}} />
    <div dir={isArabic?"rtl":"ltr"} className="relative mx-auto max-w-[1440px]"><motion.div className="h-px origin-start bg-linear-to-r from-copad-green via-copad-green/40 to-transparent" style={reduceMotion?undefined:{scaleX:lineScale}} /><div className="mt-10 grid gap-8 lg:grid-cols-[.45fr_1.55fr]"><p className="text-[9px] font-black tracking-[.2em] text-copad-green uppercase">{isArabic?"الفصل التالي":"Next chapter"}</p><motion.div style={reduceMotion?undefined:{y:titleY,opacity}}><h2 className={`${isArabic?"font-sans font-black":"font-display"} max-w-5xl text-[clamp(2.7rem,8vw,7rem)] leading-[.9] tracking-[-.06em]`}>{next.title}</h2><p className="mt-6 max-w-2xl text-sm leading-7 text-white/62 sm:text-base sm:leading-8">{isArabic?"تتحول المحفظة من الفكرة والتركيبة إلى إنتاج منضبط تدعمه الجودة والمواءمة التنظيمية.":"See how portfolio strategy becomes disciplined production through manufacturing capability, quality, and regulatory alignment."}</p><Link href={`/${locale}/manufacturing-quality`} className="mt-7 inline-flex min-h-12 items-center rounded-full bg-copad-green px-6 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-copad-deep">{next.title}</Link></motion.div></div></div>
  </section>;
}
