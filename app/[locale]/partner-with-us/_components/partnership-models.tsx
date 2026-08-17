"use client";

import { motion, type MotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import type { ContentBlock } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { scrollSceneStyle, scrollSystem } from "@/lib/motion/scroll-system";

const images = [
  "/images/copad-partnership-executive.png",
  "/images/copad-campus-hero.png",
  "/images/copad-cleanroom.png",
];

export function PartnershipModels({ locale, blocks }: { locale: Locale; blocks: ContentBlock[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [counter, setCounter] = useState(0);
  const reducedMotion = useReducedMotion();
  const isArabic = locale === "ar";
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 62, damping: 32, mass: 0.68 });
  const sceneProgress = useTransform(progress, [0, scrollSystem.scene.completion], [0, 1]);
  const focusX = useTransform(sceneProgress, [0, .5, 1], isArabic ? ["83.33%", "50%", "16.66%"] : ["16.66%", "50%", "83.33%"]);
  const overallLine = useTransform(sceneProgress, [0, 1], [0, 1]);

  useMotionValueEvent(sceneProgress, "change", value => {
    const next = value < 1 / 3 ? 0 : value < 2 / 3 ? 1 : 2;
    setCounter(current => current === next ? current : next);
  });

  return <section ref={sectionRef} id="models" style={scrollSceneStyle(blocks.length)} className="relative h-[var(--scroll-scene-height)] bg-copad-sand">
    <div className="sticky top-0 h-[100svh] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_105%,rgba(0,144,175,.15),transparent_34%)]" />
      <div dir={isArabic ? "rtl" : "ltr"} className="relative mx-auto flex h-full max-w-[1440px] flex-col px-4 pb-20 pt-24 sm:px-8 lg:px-12 lg:pb-24 lg:pt-28">
        <header className="flex shrink-0 items-end justify-between border-b border-copad-deep/12 pb-4">
          <div>
            <p className="text-[8px] font-black uppercase tracking-[.22em] text-copad-green">{isArabic ? "مصفوفة الشراكة" : "Partnership Matrix"}</p>
            <h2 className={`${isArabic ? "font-sans font-black" : "font-display"} mt-2 text-3xl tracking-[-.045em] text-copad-deep sm:text-5xl`}>
              {isArabic ? "ثلاث قدرات تعمل ضمن منظومة واحدة" : "Three capabilities in one operating structure"}
            </h2>
          </div>
          <span dir="ltr" className="font-display text-4xl text-copad-deep">0{counter + 1}<small className="text-sm text-copad-deep/25"> / 03</small></span>
        </header>

        <div className="relative mt-5 grid min-h-0 flex-1 grid-rows-3 gap-3 lg:grid-cols-3 lg:grid-rows-1">
          {!reducedMotion && <motion.div aria-hidden="true" className="pointer-events-none absolute -top-3 bottom-0 z-20 hidden w-px bg-copad-green/70 shadow-[0_0_28px_8px_rgba(0,144,175,.18)] lg:block" style={{ left: focusX }} />}
          {blocks.map((block, index) => <MatrixCard key={block.title} block={block} index={index} progress={sceneProgress} image={images[index]} isArabic={isArabic} reducedMotion={!!reducedMotion} />)}
        </div>

        <div className="mt-4 h-[3px] shrink-0 overflow-hidden rounded-full bg-copad-deep/10">
          <motion.span className="block h-full origin-start bg-copad-green shadow-[0_0_15px_rgba(0,144,175,.5)] rtl:origin-right" style={{ scaleX: overallLine }} />
        </div>
      </div>
    </div>
  </section>;
}

function MatrixCard({ block, index, progress, image, isArabic, reducedMotion }: { block: ContentBlock; index: number; progress: MotionValue<number>; image: string; isArabic: boolean; reducedMotion: boolean }) {
  const ranges = index === 0 ? [0, .26, .5] : index === 1 ? [0, .22, .5, .78, 1] : [.5, .74, 1];
  const opacityValues = index === 0 ? [1, 1, .48] : index === 1 ? [.48, .48, 1, .48, .48] : [.48, 1, 1];
  const scaleValues = index === 0 ? [1, 1, .975] : index === 1 ? [.975, .975, 1, .975, .975] : [.975, 1, 1];
  const contentValues = index === 0 ? [1, 1, 0] : index === 1 ? [0, 0, 1, 0, 0] : [0, 1, 1];
  const cardOpacity = useTransform(progress, ranges, opacityValues);
  const cardScale = useTransform(progress, ranges, scaleValues);
  const contentOpacity = useTransform(progress, ranges, contentValues);
  const contentY = useTransform(contentOpacity, [0, 1], [10, 0]);
  const imageScale = useTransform(contentOpacity, [0, 1], [1.07, 1]);

  return <motion.article style={reducedMotion ? undefined : { opacity: cardOpacity, scale: cardScale }} className="group relative min-h-0 overflow-hidden rounded-[1.7rem] border border-copad-green/35 bg-copad-deep shadow-[0_28px_70px_rgba(1,61,96,.14)]">
    <motion.div className="absolute inset-0" style={reducedMotion ? undefined : { scale: imageScale }}>
      <Image src={image} alt="" fill className="object-cover opacity-65" sizes="(min-width:1024px) 33vw, 100vw" />
    </motion.div>
    <div className="absolute inset-0 bg-linear-to-t from-copad-deep via-copad-deep/55 to-transparent" />
    <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-7 lg:p-8">
      <div className="flex items-center justify-between"><span className="text-[8px] font-black uppercase tracking-[.2em] text-copad-green">{isArabic ? "مجال" : "Area"} · 0{index + 1}</span><span className="size-2 rounded-full bg-copad-green shadow-[0_0_16px_rgba(0,144,175,.8)]" /></div>
      <div className="relative">
        <h3 className={`${isArabic ? "font-sans font-black leading-[1.08]" : "font-display leading-[.94]"} max-w-full text-[clamp(1.65rem,2.65vw,3rem)] tracking-[-.05em] text-white`}>{block.title}</h3>
        <motion.div style={reducedMotion ? undefined : { opacity: contentOpacity, y: contentY }} className="mt-5 overflow-hidden">
          <p className="max-w-3xl text-sm leading-6 text-white/74 sm:text-base sm:leading-7">{block.body}</p>
          <div className="mt-5 flex items-center gap-4 text-[8px] font-black uppercase tracking-[.18em] text-white/42"><span className="h-px w-16 bg-white/25" />COPAD / {String(index + 1).padStart(2, "0")}</div>
        </motion.div>
      </div>
    </div>
  </motion.article>;
}
