"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useDesktopLayout } from "@/components/motion/use-desktop-layout";
import type { ContentBlock } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { homeScrollSceneStyle } from "@/lib/motion/scroll-system";

type DivisionsHeroProps = {
  locale: Locale;
  title: string;
  intro: string;
  blocks: ContentBlock[];
};

const ease = [0.22, 1, 0.36, 1] as const;

export function DivisionsHero({ locale, title, intro, blocks }: DivisionsHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isDesktop = useDesktopLayout();
  const reduceMotion = useReducedMotion();
  const isArabic = locale === "ar";
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3, restDelta: 0.0005 });
  const imageScale = useTransform(smoothProgress, [0, 0.4, 1], [1.035, 1, 1.02]);
  const motionEnabled = isDesktop && !reduceMotion;
  const introLines = splitIntro(intro);

  return (
    <section ref={sectionRef} id="home" style={homeScrollSceneStyle(3)} className="relative bg-copad-deep lg:h-[var(--scroll-scene-height)]">
      <div className="relative isolate min-h-[100svh] overflow-hidden bg-copad-deep text-white lg:sticky lg:top-0 lg:h-screen">
        <motion.div aria-hidden="true" className="absolute inset-0 -z-20" style={motionEnabled ? { scale: imageScale } : undefined}>
          <Image
            src="/images/copad-divisions-atlas.png"
            alt=""
            fill
            preload
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(1,61,96,.55),rgba(1,61,96,.84)),linear-gradient(90deg,rgba(1,61,96,.92),transparent_50%,rgba(1,61,96,.5))]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_42%,rgba(123,205,237,.08)_0%,rgba(1,61,96,.2)_46%,rgba(1,61,96,.68)_100%)]" />

        <div dir={isArabic ? "rtl" : "ltr"} className="mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-center px-4 pt-24 pb-8 sm:px-8 sm:pt-28 lg:px-12 lg:pt-24">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.82, delay: 0.1, ease }}
            className="relative z-10"
          >
            <h1 className={`max-w-5xl text-pretty text-white ${isArabic ? "font-sans text-[clamp(3.5rem,12vw,7rem)] leading-[1.08] font-black tracking-[-0.04em]" : "font-display text-[clamp(4.25rem,10vw,8.5rem)] leading-[1.02] font-bold tracking-[-0.05em]"}`}>
              {title}
            </h1>
          </motion.div>

          <div
            aria-label={intro}
            className="relative z-10 mt-7 max-w-2xl border-s-2 border-copad-green ps-5 text-sm leading-7 text-white/72 sm:mt-9 sm:text-base sm:leading-8 lg:text-lg lg:leading-9"
          >
            {introLines.map((line, index) => (
              <HeroIntroLine key={`${line}-${index}`} index={index} reduceMotion={Boolean(reduceMotion)}>
                <ProtectedIntroText text={line} />
              </HeroIntroLine>
            ))}
          </div>

          <div className="relative z-10 mt-9 grid border-y border-white/18 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
            {blocks.map((block, index) => (
              <HeroDivision key={block.title} index={index} progress={smoothProgress} active={motionEnabled}>
                <span className="text-[8px] font-black tracking-[0.2em] text-copad-green">0{index + 1}</span>
                <span className="mt-2 block text-sm font-bold text-white/78 sm:text-base">{block.title}</span>
              </HeroDivision>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroIntroLine({ index, reduceMotion, children }: { index: number; reduceMotion: boolean; children: React.ReactNode }) {
  return (
    <motion.span
      aria-hidden="true"
      className="block"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.09, ease }}
    >
      {children}
    </motion.span>
  );
}

function HeroDivision({ index, progress, active, children }: { index: number; progress: MotionValue<number>; active: boolean; children: React.ReactNode }) {
  const start = 0.46 + index * 0.075;
  const opacity = useTransform(progress, [start, start + 0.11, 1], [0, 1, 1]);
  const y = useTransform(progress, [start, start + 0.11, 1], [24, 0, 0]);

  return (
    <motion.div
      className="border-white/14 px-3 py-4 sm:px-5 sm:py-5 lg:border-s lg:first:border-s-0"
      initial={active ? false : { opacity: 0, y: 18 }}
      whileInView={active ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.07, ease }}
      style={active ? { opacity, y } : undefined}
    >
      {children}
    </motion.div>
  );
}

function splitIntro(text: string) {
  return text.trim().split(/(?<=[.!?؟])\s+/).filter(Boolean);
}

function ProtectedIntroText({ text }: { text: string }) {
  const protectedPhrases = [
    "Manufacturing & Partnerships",
    "while operating under a single corporate identity",
  ];
  const expression = new RegExp(`(${protectedPhrases.map(escapeRegExp).join("|")})`, "g");

  return text.split(expression).map((part, index) =>
    protectedPhrases.includes(part) ? (
      <span key={`${part}-${index}`} className="sm:whitespace-nowrap">{part}</span>
    ) : (
      part
    ),
  );
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
