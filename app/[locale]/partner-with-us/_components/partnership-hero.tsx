"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import type { Section } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { homeScrollSceneStyle } from "@/lib/motion/scroll-system";

export function PartnershipHero({ locale, content }: { locale: Locale; content: Section }) {
  const sectionRef = useRef<HTMLElement>(null); const reducedMotion = useReducedMotion(); const isArabic = locale === "ar";
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 48, damping: 28, mass: .8 });
  const sceneProgress = useTransform(progress, [0, .76], [0, 1]);
  const imageScale = useTransform(sceneProgress, [0, .9], [1.1, 1]);
  const imageX = useTransform(sceneProgress, [0, .82], [isArabic ? -36 : 36, 0]);
  const shade = useTransform(sceneProgress, [0, .55, 1], [.75, .58, .52]);
  const introY = useTransform(sceneProgress, [0, .55], [42, 0]);
  const rule = useTransform(sceneProgress, [.12, .8], [0, 1]);

  return <section ref={sectionRef} id="home" style={homeScrollSceneStyle(2)} className="relative min-h-svh bg-copad-deep text-white lg:h-[var(--scroll-scene-height)]">
    <div className="relative min-h-[100svh] overflow-hidden lg:sticky lg:top-0 lg:h-[100svh]">
      <motion.div className="absolute inset-0" style={reducedMotion ? undefined : { scale: imageScale, x: imageX }}>
        <Image src="/images/copad-partnership-executive.png" alt="COPAD partnership strategy meeting in Cairo" fill priority className="object-cover" sizes="100vw" />
      </motion.div>
      <motion.div className="absolute inset-0 bg-copad-deep" style={{ opacity: shade }} />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,79,120,.96)_0%,rgba(6,79,120,.72)_38%,rgba(6,79,120,.04)_76%)] rtl:bg-[linear-gradient(270deg,rgba(6,79,120,.96)_0%,rgba(6,79,120,.72)_38%,rgba(6,79,120,.04)_76%)]" />

      <div dir={isArabic ? "rtl" : "ltr"} className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-center px-5 pb-16 pt-28 sm:px-8 lg:px-12">
        <div className="max-w-[47rem]">
          <p className="text-[9px] font-black uppercase tracking-[.26em] text-copad-green">{isArabic ? "نمو يبدأ من التوافق" : "Growth starts with alignment"}</p>
          <h1 className="mt-6 max-w-[12ch] font-display text-[clamp(4rem,13vw,6.4rem)] leading-[.99] tracking-[-.05em] lg:text-[clamp(5.6rem,6.8vw,7.2rem)]">
            {isArabic ? <><span className="block">شراكة</span><span className="block">مع كوباد</span></> : <><span className="block">Partner</span><span className="block">With Us</span></>}
          </h1>
          <motion.p className="mt-8 max-w-2xl text-sm leading-7 text-white/76 sm:text-lg sm:leading-9" style={reducedMotion ? undefined : { y: introY }}>{content.intro}</motion.p>
        </div>
        <div className="absolute inset-x-5 bottom-8 sm:inset-x-8 lg:inset-x-12">
          <div className="mb-4 flex items-end justify-between gap-6 text-[8px] font-black uppercase tracking-[.2em] text-white/55">
            <span>{isArabic ? "توزيع · تصدير · تصنيع" : "Distribution · Export · Manufacturing"}</span>
            <span className="shrink-0">{isArabic ? "كوباد / شراكات" : "COPAD / PARTNERSHIPS"}</span>
          </div>
          <div className="h-[2px] bg-white/20"><motion.span className="block h-full origin-start bg-copad-green rtl:origin-right" style={{ scaleX: rule }} /></div>
        </div>
      </div>
    </div>
  </section>;
}
