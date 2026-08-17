"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { scrollSceneStyle } from "@/lib/motion/scroll-system";
import type { AboutStoryBlock } from "./about-types";

const positions = ["0%", "0%", "0%"];

export function DifferentiatorsSection({ locale, content }: { locale: Locale; content: AboutStoryBlock }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isArabic = locale === "ar";
  const ui = siteCopy[locale].ui.about;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  return (
    <section id="specialization" ref={sectionRef} style={scrollSceneStyle(3)} className="relative min-h-[72rem] scroll-mt-20 bg-copad-deep text-white lg:h-[var(--scroll-scene-height)] lg:min-h-0">
      <div className="relative flex min-h-[72rem] items-start overflow-hidden px-4 py-16 sm:px-8 sm:py-20 lg:sticky lg:top-0 lg:h-[100svh] lg:min-h-0 lg:items-center lg:px-12">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(0,144,175,.25),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,.06),transparent_30%)]" />
        <div dir={isArabic ? "rtl" : "ltr"} className="relative mx-auto grid w-full max-w-[1440px] items-center gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-[10px] font-black tracking-[.22em] text-copad-green uppercase">{ui.distinctionEyebrow}</p>
            <h2 className="mt-4 max-w-xl font-display text-[clamp(2.5rem,6vw,5.7rem)] leading-[.92] tracking-[-.055em]">{content.title}</h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">{content.body}</p>
          </div>

          <div className="relative h-[25rem] [perspective:1400px] sm:h-[34rem] lg:h-[38rem]">
            {ui.specialties.map((specialty, index) => (
              <DepthCard key={specialty} index={index} title={specialty} progress={scrollYProgress} reduceMotion={Boolean(reduceMotion)} position={positions[index]} />
            ))}
            <div aria-hidden="true" className="absolute inset-x-[12%] bottom-2 h-16 rounded-[50%] bg-black/45 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

function DepthCard({ index, title, progress, reduceMotion, position }: { index: number; title: string; progress: ReturnType<typeof useScroll>["scrollYProgress"]; reduceMotion: boolean; position: string }) {
  const start = .1 + index * .2;
  const y = useTransform(progress, [start, start + .2, 1], [150 + index * 30, index * 34, index * 34]);
  const rotateX = useTransform(progress, [start, start + .2, 1], [20, -4 + index * 2, -4 + index * 2]);
  const rotateZ = useTransform(progress, [start, start + .2, 1], [index % 2 ? 7 : -7, index % 2 ? 2.2 : -2.2, index % 2 ? 2.2 : -2.2]);
  const opacity = useTransform(progress, [start, start + .12, 1], [0, 1, 1]);
  return (
    <motion.article style={reduceMotion ? { top: `${index * 2.2}rem` } : { y, rotateX, rotateZ, opacity, z: index * 35 }} className="absolute inset-x-[4%] top-[8%] h-[72%] origin-bottom overflow-hidden rounded-[1.6rem] border border-white/18 bg-copad-deep shadow-[0_32px_80px_rgba(0,0,0,.35)] [transform-style:preserve-3d] sm:inset-x-[8%] sm:rounded-[2rem]">
      <div className="absolute inset-0 bg-[url('/images/copad-divisions-atlas.png')] bg-no-repeat" style={{ backgroundSize: "400% 100%", backgroundPosition: `${position} center` }} />
      <div className="absolute inset-0 bg-linear-to-t from-copad-deep via-copad-deep/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
        <div className="flex items-end justify-between gap-5 border-t border-white/25 pt-5">
          <div><p className="text-[9px] font-black tracking-[.18em] text-copad-green">0{index + 1}</p><h3 className="mt-2 font-display text-3xl leading-none sm:text-5xl">{title}</h3></div>
          <span className="size-3 rounded-full border border-copad-green bg-copad-green/30 shadow-[0_0_24px_rgba(0,144,175,.8)]" />
        </div>
      </div>
    </motion.article>
  );
}
