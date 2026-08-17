"use client";

import { motion, type MotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import type { ContentBlock } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { scrollSceneStyle, scrollSystem } from "@/lib/motion/scroll-system";

const englishAreas = ["Manufacturing", "Quality Assurance", "Regulatory Affairs", "Commercial Operations", "Corporate Functions"];
const arabicAreas = ["التصنيع", "ضمان الجودة", "الشؤون التنظيمية", "العمليات التجارية", "الوظائف المؤسسية"];

export function TalentSpectrum({ locale, block }: { locale: Locale; block: ContentBlock }) {
  const ref = useRef<HTMLElement>(null); const reducedMotion = useReducedMotion(); const isArabic = locale === "ar"; const areas = isArabic ? arabicAreas : englishAreas;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 48, damping: 30, mass: .76 });
  const sceneProgress = useTransform(progress, [0, scrollSystem.scene.completion], [0, 1]);
  return <section ref={ref} id="teams" style={scrollSceneStyle(areas.length)} className="relative h-[var(--scroll-scene-height)] bg-copad-sand"><div className="sticky top-0 h-[100svh] overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_110%,rgba(0,144,175,.17),transparent_36%)]" />
    <div dir={isArabic ? "rtl" : "ltr"} className="relative mx-auto flex h-full max-w-[1440px] flex-col px-5 pb-20 pt-24 sm:px-8 lg:px-12 lg:pb-24 lg:pt-28">
      <header className="grid shrink-0 gap-5 border-b border-copad-deep/12 pb-5 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><div><p className="text-[8px] font-black uppercase tracking-[.23em] text-copad-green">{isArabic ? "مجالات العمل" : "Talent Spectrum"}</p><h2 className={`${isArabic ? "font-sans font-black" : "font-display"} mt-2 text-4xl tracking-[-.05em] text-copad-deep sm:text-6xl`}>{block.title}</h2></div><p className="max-w-3xl text-sm leading-7 text-copad-deep/62 sm:text-base sm:leading-8">{block.body}</p></header>
      <div className="mt-5 grid min-h-0 flex-1 grid-cols-5 gap-2 sm:gap-3">
        {areas.map((area, index) => <TalentLane key={area} area={area} index={index} progress={sceneProgress} reducedMotion={!!reducedMotion} />)}
      </div>
      <div className="mt-4 flex shrink-0 items-center justify-between text-[8px] font-black uppercase tracking-[.18em] text-copad-deep/38"><span>{isArabic ? "تخصصات متعددة" : "Multidisciplinary by design"}</span><span dir="ltr">01 — 05</span></div>
    </div>
  </div></section>;
}

function TalentLane({ area, index, progress, reducedMotion }: { area: string; index: number; progress: MotionValue<number>; reducedMotion: boolean }) {
  const center = index / 4; const start = Math.max(0, center - .18); const end = Math.min(1, center + .18);
  const scaleY = useTransform(progress, [start, center, end], [.32, 1, .42]);
  const opacity = useTransform(progress, [start, center, end], [.35, 1, .5]);
  const numberY = useTransform(progress, [start, center, end], [40, 0, -30]);
  return <motion.article style={reducedMotion ? undefined : { scaleY, opacity }} className="relative origin-bottom overflow-hidden rounded-[1.2rem] border border-copad-deep/10 bg-copad-white shadow-[0_22px_55px_rgba(1,61,96,.08)] sm:rounded-[1.7rem]">
    <div className="absolute inset-0 bg-linear-to-t from-copad-deep via-copad-deep/88 to-copad-green/75" />
    <motion.span style={reducedMotion ? undefined : { y: numberY }} className="absolute start-3 top-4 font-display text-5xl text-white/16 sm:start-5 sm:top-6 sm:text-8xl">0{index + 1}</motion.span>
    <div className="absolute inset-x-3 bottom-4 sm:inset-x-5 sm:bottom-6"><span className="mb-3 block h-px bg-white/24" /><h3 className="break-words text-[10px] leading-4 font-black text-white sm:text-sm sm:leading-5 lg:text-base">{area}</h3></div>
  </motion.article>;
}
