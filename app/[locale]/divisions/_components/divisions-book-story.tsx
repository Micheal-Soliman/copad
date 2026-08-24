"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { siteCopy } from "@/content/site";
import type { ContentBlock } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { homeScrollSceneStyle, scrollSceneIndex, scrollSystem } from "@/lib/motion/scroll-system";

type DivisionsBookStoryProps = {
  locale: Locale;
  divisions: ContentBlock[];
};

const imagePositions = ["0%", "33.333%", "66.666%", "100%"];
const ease = [0.22, 1, 0.36, 1] as const;
const fadeEase = [0.4, 0, 0.2, 1] as const;

export function DivisionsBookStory({ locale, divisions }: DivisionsBookStoryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const previousIndex = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion();
  const lenis = useLenis();
  const isArabic = locale === "ar";
  const ui = siteCopy[locale].ui.divisions;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const sceneProgress = useTransform(scrollYProgress, [0, scrollSystem.scene.completion], [0, 1]);
  const smoothProgress = useSpring(sceneProgress, { stiffness: 78, damping: 29, mass: 0.46, restDelta: 0.0005 });
  const backgroundX = useTransform(smoothProgress, [0, 1], isArabic ? ["18%", "-18%"] : ["-18%", "18%"]);
  const ringRotate = useTransform(smoothProgress, [0, 1], isArabic ? [20, -80] : [-20, 80]);
  const chapterProgress = (activeIndex + 1) / divisions.length;

  useMotionValueEvent(smoothProgress, "change", (value) => {
    const next = Math.min(divisions.length - 1, Math.max(0, Math.round(value * (divisions.length - 1))));
    if (next === previousIndex.current) return;
    setDirection(next > previousIndex.current ? 1 : -1);
    previousIndex.current = next;
    setActiveIndex(next);
  });

  function goToDivision(index: number) {
    const section = sectionRef.current;
    if (!section) return;
    const travel = Math.max(0, section.offsetHeight - window.innerHeight);
    const target = section.offsetTop + travel * scrollSceneIndex(index, divisions.length);
    if (lenis) lenis.scrollTo(target, { duration: scrollSystem.scene.navigationDuration, easing: (value) => 1 - Math.pow(1 - value, 4) });
    else window.scrollTo({ top: target, behavior: "smooth" });
  }

  return (
    <section id="division-story" ref={sectionRef} style={homeScrollSceneStyle(divisions.length)} className="relative h-[var(--scroll-scene-height)] scroll-mt-20 bg-copad-sand">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-copad-sand">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_12%_16%,rgba(0,144,175,.16),transparent_25%),radial-gradient(circle_at_86%_82%,rgba(1,61,96,.08),transparent_27%)]" />
        <motion.div aria-hidden="true" className="absolute top-[10%] -end-48 size-[34rem] rounded-full border border-copad-green/20 sm:size-[50rem]" style={reduceMotion ? undefined : { rotate: ringRotate }}>
          <span className="absolute inset-16 rounded-full border border-copad-deep/10" />
          <span className="absolute start-1/2 top-[-5px] size-2.5 rounded-full bg-copad-green shadow-[0_0_22px_rgba(0,144,175,.65)]" />
        </motion.div>
        <motion.div aria-hidden="true" className="absolute inset-y-[18%] w-[42%] rounded-full bg-[radial-gradient(circle,rgba(0,144,175,.14),transparent_65%)] blur-3xl" style={reduceMotion ? undefined : { x: backgroundX }} />

        <div dir={isArabic ? "rtl" : "ltr"} className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col px-4 pt-19 pb-20 sm:px-8 sm:pt-22 sm:pb-18 lg:px-12 lg:pt-20 lg:pb-18">
          <nav aria-label={ui.bookInstruction} className="shrink-0 pb-2 sm:pb-3">
            <div className="grid grid-cols-4 gap-1.5 rounded-[1.35rem] border border-copad-deep/10 bg-white/65 p-1.5 shadow-[0_10px_30px_rgba(1,61,96,.06)] backdrop-blur-md sm:gap-2 sm:rounded-full sm:p-2">
              {divisions.map((division, index) => {
                const selected = index === activeIndex;
                return (
                  <button
                    key={division.title}
                    type="button"
                    onClick={() => goToDivision(index)}
                    aria-current={selected ? "step" : undefined}
                    className={`group relative flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-xl border px-2 py-2 text-[9px] leading-tight font-black transition-[color,background-color,border-color,transform] duration-500 sm:rounded-full sm:px-3 sm:text-[10px] lg:px-4 lg:text-[11px] ${selected ? "border-copad-deep bg-copad-deep text-white shadow-[0_8px_20px_rgba(1,61,96,.16)]" : "border-transparent bg-transparent text-copad-deep/72 hover:-translate-y-0.5 hover:border-copad-sky/65 hover:bg-copad-ice/70 hover:text-copad-deep"}`}
                  >
                    <span className={`text-[7px] tracking-[0.12em] transition-colors sm:text-[8px] ${selected ? "text-copad-sky" : "text-copad-green"}`}>0{index + 1}</span>
                    <span className="hidden text-center sm:block">{division.title}</span>
                    <span aria-hidden="true" className={`absolute inset-x-0 bottom-0 h-0.5 origin-start bg-copad-green transition-transform duration-500 rtl:origin-right ${selected ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                  </button>
                );
              })}
            </div>
            <div aria-hidden="true" className="mt-2 h-1 overflow-hidden rounded-full bg-copad-deep/8">
              <motion.span className="block h-full origin-left rounded-full bg-copad-green shadow-[0_0_15px_rgba(0,144,175,.55)] rtl:origin-right" animate={{ scaleX: chapterProgress }} transition={{ duration: 0.65, ease }} />
            </div>
          </nav>

          <article className="relative mt-2 grid min-h-0 flex-1 overflow-hidden rounded-[1.65rem] border border-copad-deep/10 bg-copad-white shadow-[0_22px_64px_rgba(1,61,96,.12)] sm:mt-3 sm:rounded-[2rem] lg:grid-cols-[.92fr_1.08fr] lg:rounded-[2.4rem]">
            <div className="relative min-h-[11rem] overflow-hidden bg-copad-deep sm:min-h-[15rem] lg:min-h-0">
              <AnimatePresence initial={false} custom={direction} mode="sync">
                <motion.div
                  key={`image-${activeIndex}`}
                  custom={direction}
                  initial={reduceMotion ? false : {
                    opacity: 0,
                    clipPath: direction > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
                    scale: 1.025,
                  }}
                  animate={{ opacity: 1, clipPath: "inset(0 0 0 0)", scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 1.012 }}
                  transition={{ duration: reduceMotion ? 0 : 0.82, ease }}
                  className="absolute inset-0 transform-gpu bg-[url('/images/copad-divisions-atlas.png')] bg-no-repeat will-change-[clip-path,transform,opacity]"
                  style={{ backgroundSize: "400% auto", backgroundPosition: `${imagePositions[activeIndex]} center` }}
                />
              </AnimatePresence>
              <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-copad-deep/76 via-copad-deep/5 to-transparent" />
              <span aria-hidden="true" className="absolute -end-4 -bottom-10 font-display text-[9rem] leading-none tracking-[-0.08em] text-white/[.08] sm:text-[12rem] lg:text-[17rem]">{String(activeIndex + 1).padStart(2, "0")}</span>
              <p className="absolute right-4 bottom-4 left-4 border-t border-white/28 pt-3 text-[9px] font-bold text-white/74 sm:right-6 sm:bottom-6 sm:left-6 sm:text-xs">{ui.imageAlts[activeIndex]}</p>
            </div>

            <div className="relative min-h-[21rem] overflow-hidden sm:min-h-[24rem] lg:min-h-0">
              {divisions.map((division, index) => {
                const selected = index === activeIndex;
                const restingOffset = (index < activeIndex ? -6 : 6) * (isArabic ? -1 : 1);

                return (
                  <motion.div
                    key={division.title}
                    aria-hidden={!selected}
                    initial={false}
                    animate={{ opacity: selected ? 1 : 0, x: selected ? 0 : restingOffset }}
                    transition={{
                      opacity: {
                        duration: reduceMotion ? 0 : selected ? 0.78 : 0.38,
                        delay: reduceMotion || !selected ? 0 : 0.06,
                        ease: fadeEase,
                      },
                      x: { duration: reduceMotion ? 0 : 0.68, ease },
                    }}
                    style={{ backfaceVisibility: "hidden" }}
                    className={`absolute inset-0 flex transform-gpu flex-col justify-center px-5 py-5 will-change-[transform,opacity] sm:px-8 sm:py-6 lg:px-10 lg:py-6 ${selected ? "z-10" : "pointer-events-none z-0"}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="size-1.5 rounded-full bg-copad-green" />
                      <p className="text-[8px] font-black tracking-[0.2em] text-copad-green uppercase sm:text-[9px]">{ui.chapterLabel} · {String(index + 1).padStart(2, "0")}</p>
                    </div>
                    <h2 className={`mt-3 max-w-[22ch] text-pretty text-copad-deep [overflow-wrap:normal] [word-break:normal] [hyphens:none] sm:mt-5 ${isArabic ? "font-sans text-[clamp(1.9rem,5vw,3.4rem)] leading-[1.1] font-black tracking-[-0.03em]" : "font-display text-[clamp(2.1rem,3.6vw,3.5rem)] leading-[1.06] font-bold tracking-[-0.035em]"}`}>{division.title}</h2>
                    <p className="mt-3 max-w-2xl text-[11px] leading-[1.7] text-copad-deep/68 sm:mt-4 sm:text-sm sm:leading-7 lg:leading-[1.7rem]">{division.body}</p>
                    {division.cta && division.href && (
                      <Link
                        href={`/${locale}/${division.href}`}
                        tabIndex={selected ? 0 : -1}
                        className="group mt-4 inline-flex min-h-10 w-fit shrink-0 items-center gap-3 overflow-hidden rounded-full border border-copad-deep/16 bg-copad-white px-5 text-[10px] font-black text-copad-deep shadow-[0_8px_24px_rgba(1,61,96,.06)] transition-[color,background-color,border-color,transform,box-shadow] duration-500 hover:-translate-y-0.5 hover:border-copad-deep hover:bg-copad-deep hover:text-white hover:shadow-[0_12px_30px_rgba(1,61,96,.14)] sm:min-h-11 sm:px-6 sm:text-xs"
                      >
                        <span>{division.cta}</span>
                        <span aria-hidden="true" className="size-1.5 rounded-full bg-copad-green transition-transform duration-500 group-hover:scale-[1.8]" />
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <span aria-hidden="true" className="pointer-events-none absolute inset-y-[8%] start-[51%] hidden w-px bg-copad-deep/10 lg:block" />
          </article>

        </div>
      </div>
    </section>
  );
}
