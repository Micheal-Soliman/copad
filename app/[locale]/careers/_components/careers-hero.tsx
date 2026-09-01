"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import type { Section } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { homeScrollSceneStyle } from "@/lib/motion/scroll-system";

export function CareersHero({ locale, content }: { locale: Locale; content: Section }) {
  const ref = useRef<HTMLElement>(null); const reducedMotion = useReducedMotion(); const isArabic = locale === "ar";
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 54, damping: 30, mass: .72 });
  const sceneProgress = useTransform(progress, [0, .76], [0, 1]);
  const imageScale = useTransform(sceneProgress, [0, 1], [1.12, 1]);
  const imageX = useTransform(sceneProgress, [0, 1], [isArabic ? -42 : 42, 0]);
  const titleY = useTransform(progress, [0, .65], [0, -28]);
  const reveal = useTransform(sceneProgress, [.08, .78], [0, 1]);

  return <section ref={ref} id="home" style={homeScrollSceneStyle(2)} className="relative h-[var(--scroll-scene-height)] bg-copad-deep text-white">
    <div className="sticky top-0 h-[100svh] overflow-hidden">
      <motion.div className="absolute inset-0" style={reducedMotion ? undefined : { scale: imageScale, x: imageX }}><Image src="/images/copad-careers-team.png" alt="A multidisciplinary COPAD team collaborating" fill priority className="object-cover" sizes="100vw" /></motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,61,96,.96)_0%,rgba(1,61,96,.78)_35%,rgba(1,61,96,.08)_76%)] rtl:bg-[linear-gradient(270deg,rgba(1,61,96,.96)_0%,rgba(1,61,96,.78)_35%,rgba(1,61,96,.08)_76%)]" />
      <div dir={isArabic ? "rtl" : "ltr"} className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-center px-5 pb-20 pt-28 sm:px-8 lg:px-12">
        <motion.div className="max-w-[49rem]" style={reducedMotion ? undefined : { y: titleY }}>
          <p className="text-[9px] font-black uppercase tracking-[.26em] text-copad-green">{isArabic ? "الموهبة تصنع التقدم" : "People power progress"}</p>
          <h1 className={`${isArabic ? "font-sans font-black" : "font-display"} mt-6 max-w-[12ch] text-[clamp(3.8rem,11vw,6.8rem)] leading-[.98] tracking-[-.055em]`}>{content.title}</h1>
          <p className="mt-8 max-w-2xl text-sm leading-7 text-white/72 sm:text-lg sm:leading-9">{content.intro}</p>
        </motion.div>
        <div className="absolute inset-x-5 bottom-8 sm:inset-x-8 lg:inset-x-12"><div className="mb-4 flex justify-between text-[8px] font-black uppercase tracking-[.2em] text-white/50"><span>{isArabic ? "علم · تشغيل · تجارة · مؤسسات" : "Science · Operations · Commercial · Corporate"}</span><span>{isArabic ? "مرّر لاكتشاف المسارات" : "Scroll to discover the paths"}</span></div><div className="h-[2px] bg-white/16"><motion.span className="block h-full origin-start bg-copad-green rtl:origin-right" style={{ scaleX: reveal }} /></div></div>
      </div>
    </div>
  </section>;
}
