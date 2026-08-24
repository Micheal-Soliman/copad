"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { editorialScrollSceneStyle, scrollSystem } from "@/lib/motion/scroll-system";
import type { AboutStoryBlock } from "./about-types";

export function CorporateValuesSection({ locale, content }: { locale: Locale; content: AboutStoryBlock }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isArabic = locale === "ar";
  const ui = siteCopy[locale].ui.about;
  const [activeStage, setActiveStage] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 115, damping: 29, mass: 0.3, restDelta: 0.0005 });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const normalized = Math.min(1, latest / scrollSystem.scene.completion);
    const nextStage = Math.min(ui.principles.length - 1, Math.floor(normalized * ui.principles.length));
    setActiveStage((current) => current === nextStage ? current : nextStage);
  });

  return (
    <section ref={sectionRef} id="values" dir={isArabic ? "rtl" : "ltr"} style={editorialScrollSceneStyle(2)} className="relative scroll-mt-20 bg-copad-white lg:h-[var(--scroll-scene-height)]">
      <div className="relative overflow-hidden px-4 py-16 sm:px-8 sm:py-20 lg:sticky lg:top-0 lg:flex lg:min-h-screen lg:items-center lg:px-12 lg:py-20">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_82%_24%,rgba(123,205,237,.2),transparent_28%),linear-gradient(180deg,rgba(232,245,253,.48),transparent_55%)] rtl:bg-[radial-gradient(circle_at_18%_24%,rgba(123,205,237,.2),transparent_28%),linear-gradient(180deg,rgba(232,245,253,.48),transparent_55%)]" />
        <div className="relative mx-auto grid w-full max-w-[1440px] items-center gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-20">
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
            <p className="text-[10px] font-black tracking-[.22em] text-copad-green uppercase">{ui.valuesEyebrow}</p>
            <h2 className={`mt-5 max-w-4xl text-pretty font-display text-[clamp(2.35rem,4vw,4.5rem)] leading-[1.08] font-bold text-copad-deep ${isArabic ? "tracking-normal" : "tracking-[-.035em]"}`}>{content.title}</h2>
            <p className="mt-7 max-w-2xl text-sm leading-7 text-copad-deep/64 sm:text-base sm:leading-8">{content.body}</p>
            <p className="mt-6 max-w-xl border-s border-copad-green/45 ps-4 text-[9px] leading-5 font-bold text-copad-deep/38">{ui.regulators.join(isArabic ? " • " : " · ")}</p>
          </motion.div>

          <ol className="relative overflow-hidden rounded-[1.8rem] border border-copad-deep/10 bg-copad-sand/48 shadow-[0_22px_55px_rgba(1,61,96,.07)]">
            {ui.principles.map((principle, index) => {
              const active = reduceMotion || index <= activeStage;
              const current = index === activeStage;
              return (
                <motion.li key={principle} initial={false} animate={{ opacity: active ? 1 : 0.28 }} transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }} className={`relative flex min-h-32 items-center gap-6 border-b border-copad-deep/9 px-6 py-7 transition-colors duration-700 last:border-0 sm:min-h-36 sm:px-9 ${current ? "bg-copad-deep text-white" : "text-copad-deep"}`}>
                  <motion.span animate={{ scale: current ? 1 : 0.9 }} transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }} className={`grid size-10 shrink-0 place-items-center rounded-full border text-[9px] font-black ${current ? "border-copad-green bg-copad-green text-white" : "border-copad-green/28 text-copad-green"}`}>0{index + 1}</motion.span>
                  <span className={`font-display text-xl font-bold sm:text-2xl ${isArabic ? "leading-[1.35]" : "leading-tight"}`}>{principle}</span>
                  <span aria-hidden="true" className={`absolute inset-y-0 start-0 w-1 bg-copad-green transition-transform duration-500 ${current ? "scale-y-100" : "scale-y-0"}`} />
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
