"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { editorialScrollSceneStyle, scrollSystem } from "@/lib/motion/scroll-system";
import type { AboutStoryBlock } from "./about-types";

const visualItems = [
  "/images/about/about-microscope.png",
  "/images/about/ChatGPT Image Aug 25, 2026, 01_20_26 PM.png",
  "/images/about/about-laboratory.png",
] as const;

export function DifferentiatorsSection({ locale, content }: { locale: Locale; content: AboutStoryBlock }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isArabic = locale === "ar";
  const ui = siteCopy[locale].ui.about;
  const [activeStage, setActiveStage] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 115, damping: 29, mass: 0.3, restDelta: 0.0005 });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const normalized = Math.min(1, latest / scrollSystem.scene.completion);
    const nextStage = Math.min(visualItems.length - 1, Math.floor(normalized * visualItems.length));
    setActiveStage((current) => current === nextStage ? current : nextStage);
  });

  return (
    <section ref={sectionRef} id="specialization" dir={isArabic ? "rtl" : "ltr"} style={editorialScrollSceneStyle(visualItems.length)} className="relative scroll-mt-20 bg-copad-deep text-white lg:h-[var(--scroll-scene-height)]">
      <div className="relative overflow-hidden px-4 py-16 sm:px-8 sm:py-20 lg:sticky lg:top-0 lg:flex lg:min-h-screen lg:items-center lg:px-12 lg:py-20">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(0,163,196,.15),transparent_28%)] rtl:bg-[radial-gradient(circle_at_18%_18%,rgba(0,163,196,.15),transparent_28%)]" />
        <div className="relative mx-auto grid w-full max-w-[1440px] items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}>
            <p className="text-[10px] font-black tracking-[.22em] text-copad-green uppercase">{ui.distinctionEyebrow}</p>
            <h2 className={`mt-5 max-w-4xl text-pretty font-display text-[clamp(2.35rem,4vw,4.5rem)] leading-[1.08] font-bold ${isArabic ? "tracking-normal" : "tracking-[-.035em]"}`}>{content.title}</h2>
            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/66 sm:text-base sm:leading-8">{content.body}</p>
          </motion.div>

          <div className="grid gap-4 lg:hidden">
            {visualItems.map((src, index) => <VisualCard key={src} src={src} title={ui.specialties[index]!} index={index} className="relative h-64" />)}
          </div>

          <div className="relative hidden h-[29rem] w-full max-w-[35rem] justify-self-end [perspective:1400px] lg:block">
            {visualItems.map((src, index) => {
              const visible = Boolean(reduceMotion) || index <= activeStage;
              const depth = Math.max(0, activeStage - index);
              return (
                <motion.div
                  key={src}
                  initial={false}
                  animate={{ opacity: visible ? 1 : 0, x: visible ? (isArabic ? depth * 10 : -depth * 10) : (isArabic ? -24 : 24), y: visible ? depth * 8 : 20, scale: 1 - depth * 0.022, rotateZ: visible ? (isArabic ? depth * 0.35 : -depth * 0.35) : 0 }}
                  transition={{ duration: 0.74, ease: [0.22, 1, 0.36, 1] }}
                  style={{ zIndex: index }}
                  className="absolute inset-0 origin-bottom"
                >
                  <VisualCard src={src} title={ui.specialties[index]!} index={index} className="relative h-full" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function VisualCard({ src, title, index, className }: { src: string; title: string; index: number; className: string }) {
  return (
    <article className={`${className} group overflow-hidden rounded-[1.6rem] border border-white/16 bg-copad-deep shadow-[0_28px_70px_rgba(0,0,0,.28)]`}>
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 42vw"
        className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-copad-deep/88 via-transparent to-copad-deep/5" />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <span className="text-[8px] font-black tracking-[.18em] text-copad-green">0{index + 1}</span>
        <h3 className="mt-2 text-sm leading-5 font-bold text-white/92 sm:text-base">{title}</h3>
      </div>
    </article>
  );
}
