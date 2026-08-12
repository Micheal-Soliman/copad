"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { siteCopy } from "@/content/site";
import type { ContentBlock } from "@/content/types";
import type { Locale } from "@/lib/i18n";

type DivisionsBookStoryProps = {
  locale: Locale;
  divisions: ContentBlock[];
};

const imagePositions = ["0%", "33.333%", "66.666%", "100%"];
const ease = [0.22, 1, 0.36, 1] as const;

export function DivisionsBookStory({ locale, divisions }: DivisionsBookStoryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const previousIndex = useRef(0);
  const previousProgress = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [scrollDirection, setScrollDirection] = useState<1 | -1>(1);
  const reduceMotion = useReducedMotion();
  const lenis = useLenis();
  const isArabic = locale === "ar";
  const ui = siteCopy[locale].ui.divisions;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.36, restDelta: 0.0005 });
  const backgroundX = useTransform(smoothProgress, [0, 1], isArabic ? ["18%", "-18%"] : ["-18%", "18%"]);
  const ringRotate = useTransform(smoothProgress, [0, 1], isArabic ? [20, -80] : [-20, 80]);
  const active = divisions[activeIndex]!;
  const chapterProgress = (activeIndex + 1) / divisions.length;
  const finalIndex = divisions.length - 1;
  const cueDirection: 1 | -1 = activeIndex === 0 ? 1 : activeIndex === finalIndex ? -1 : scrollDirection;
  const cueRemaining = cueDirection > 0 ? finalIndex - activeIndex : activeIndex;

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const movement = value - previousProgress.current;
    if (Math.abs(movement) > 0.001) {
      setScrollDirection(movement > 0 ? 1 : -1);
      previousProgress.current = value;
    }

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
    const target = section.offsetTop + travel * (index / Math.max(1, divisions.length - 1));
    setDirection(index >= activeIndex ? 1 : -1);
    previousIndex.current = index;
    setActiveIndex(index);
    if (lenis) lenis.scrollTo(target, { duration: 0.82, easing: (value) => 1 - Math.pow(1 - value, 4) });
    else window.scrollTo({ top: target, behavior: "smooth" });
  }

  return (
    <section id="division-story" ref={sectionRef} className="relative h-[300vh] scroll-mt-20 bg-copad-sand lg:h-[320vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-copad-sand">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_12%_16%,rgba(16,159,131,.16),transparent_25%),radial-gradient(circle_at_86%_82%,rgba(15,61,57,.08),transparent_27%)]" />
        <motion.div aria-hidden="true" className="absolute top-[10%] -end-48 size-[34rem] rounded-full border border-copad-green/20 sm:size-[50rem]" style={reduceMotion ? undefined : { rotate: ringRotate }}>
          <span className="absolute inset-16 rounded-full border border-copad-deep/10" />
          <span className="absolute start-1/2 top-[-5px] size-2.5 rounded-full bg-copad-green shadow-[0_0_22px_rgba(16,159,131,.65)]" />
        </motion.div>
        <motion.div aria-hidden="true" className="absolute inset-y-[18%] w-[42%] rounded-full bg-[radial-gradient(circle,rgba(16,159,131,.14),transparent_65%)] blur-3xl" style={reduceMotion ? undefined : { x: backgroundX }} />

        <BookScrollCue
          direction={cueDirection}
          remaining={cueRemaining}
          label={ui.bookInstruction}
          reduceMotion={Boolean(reduceMotion)}
        />

        <div dir={isArabic ? "rtl" : "ltr"} className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col px-4 pt-19 pb-24 sm:px-8 sm:pt-24 sm:pb-20 lg:px-12 lg:pt-24 lg:pb-20">
          <nav aria-label={ui.bookInstruction} className="shrink-0 pb-4 sm:pb-5">
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              {divisions.map((division, index) => {
                const selected = index === activeIndex;
                return (
                  <button
                    key={division.title}
                    type="button"
                    onClick={() => goToDivision(index)}
                    aria-current={selected ? "step" : undefined}
                    className={`group relative overflow-hidden rounded-full border px-2 py-2 text-[8px] font-black transition duration-500 sm:px-4 sm:text-[9px] ${selected ? "border-copad-deep bg-copad-deep text-white" : "border-copad-deep/12 bg-white/55 text-copad-deep/50 hover:border-copad-green hover:text-copad-deep"}`}
                  >
                    <span className="sm:hidden">0{index + 1}</span>
                    <span className="hidden truncate sm:block">{division.title}</span>
                    <span aria-hidden="true" className={`absolute inset-x-0 bottom-0 h-0.5 origin-start bg-copad-green transition-transform duration-500 rtl:origin-right ${selected ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                  </button>
                );
              })}
            </div>
            <div aria-hidden="true" className="mt-2 h-1 overflow-hidden rounded-full bg-copad-deep/8">
              <motion.span className="block h-full origin-left rounded-full bg-copad-green shadow-[0_0_15px_rgba(16,159,131,.55)] rtl:origin-right" animate={{ scaleX: chapterProgress }} transition={{ duration: 0.65, ease }} />
            </div>
          </nav>

          <div className="relative mt-3 flex min-h-0 flex-1 items-center justify-center [perspective:1800px] sm:mt-4">
            <AnimatePresence initial={false} custom={direction} mode="sync">
              <motion.article
                key={active.title}
                custom={direction}
                initial={reduceMotion ? false : { opacity: 0.35, rotateY: direction > 0 ? -82 : 82, x: direction * 44, scale: 0.985 }}
                animate={{ opacity: 1, rotateY: 0, x: 0, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, rotateY: direction > 0 ? 82 : -82, x: direction * -38, scale: 0.985 }}
                transition={{ duration: reduceMotion ? 0 : 0.62, ease }}
                style={{ transformOrigin: direction > 0 ? (isArabic ? "right center" : "left center") : (isArabic ? "left center" : "right center"), transformStyle: "preserve-3d" }}
                className="absolute inset-0 grid min-h-0 overflow-hidden rounded-[1.65rem] border border-copad-deep/12 bg-copad-white shadow-[0_24px_70px_rgba(15,61,57,.14)] sm:rounded-[2rem] lg:grid-cols-2 lg:rounded-[2.4rem]"
              >
                <div className="group relative min-h-[11rem] overflow-hidden bg-copad-deep sm:min-h-[15rem] lg:min-h-0">
                  <motion.div
                    initial={reduceMotion ? false : { scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.15, ease }}
                    className="absolute inset-0 bg-[url('/images/copad-divisions-atlas.png')] bg-no-repeat"
                    style={{ backgroundSize: "400% auto", backgroundPosition: `${imagePositions[activeIndex]} center` }}
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-copad-deep/78 via-copad-deep/5 to-transparent" />
                  <span aria-hidden="true" className="absolute -end-4 -bottom-10 font-display text-[9rem] leading-none tracking-[-0.08em] text-white/[.09] sm:text-[12rem] lg:text-[17rem]">{String(activeIndex + 1).padStart(2, "0")}</span>
                  <p className="absolute right-4 bottom-4 left-4 border-t border-white/30 pt-3 text-[9px] font-bold text-white/74 sm:right-6 sm:bottom-6 sm:left-6 sm:text-xs">{ui.imageAlts[activeIndex]}</p>
                </div>

                <div className="relative flex min-h-0 flex-col justify-center overflow-hidden px-5 py-5 sm:px-8 sm:py-7 lg:px-12 lg:py-10">
                  <span aria-hidden="true" className="absolute inset-y-0 start-0 hidden w-8 bg-[linear-gradient(90deg,rgba(15,61,57,.13),transparent)] lg:block" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3">
                      <span className="size-2 rounded-full bg-copad-green shadow-[0_0_18px_rgba(16,159,131,.65)]" />
                      <p className="text-[8px] font-black tracking-[0.2em] text-copad-green uppercase sm:text-[9px]">{ui.chapterLabel} · {String(activeIndex + 1).padStart(2, "0")}</p>
                    </div>
                    <h2 className={`mt-3 max-w-full text-balance break-words text-copad-deep sm:mt-5 ${isArabic ? "font-sans text-[clamp(1.8rem,7.5vw,3rem)] leading-[1.08] font-black tracking-[-0.035em] lg:text-[4.4rem]" : "font-display text-[clamp(2.2rem,9vw,3.6rem)] leading-[.95] tracking-[-0.05em] lg:text-[4.8rem]"}`}>{active.title}</h2>
                    <p className="mt-3 max-w-2xl text-[11px] leading-[1.7] text-copad-deep/68 sm:mt-5 sm:text-sm sm:leading-7 lg:text-[15px] lg:leading-8">{active.body}</p>
                    {active.cta && active.href && (
                      <Link
                        href={`/${locale}/${active.href}`}
                        className="group relative mt-5 inline-flex min-h-10 items-center justify-center overflow-hidden rounded-full bg-copad-deep px-5 text-[10px] font-black text-white shadow-[0_12px_28px_rgba(15,61,57,.16)] transition duration-500 hover:-translate-y-1 sm:mt-6 sm:min-h-11 sm:px-6 sm:text-xs"
                      >
                        <span className="absolute inset-0 translate-y-full bg-copad-green transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0" />
                        <span className="relative">{active.cta}</span>
                      </Link>
                    )}
                  </div>
                </div>

                {!reduceMotion && (
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 z-30 w-1/3 bg-linear-to-r from-transparent via-white/50 to-transparent blur-md"
                    initial={{ x: direction > 0 ? "-140%" : "340%" }}
                    animate={{ x: direction > 0 ? "440%" : "-240%" }}
                    transition={{ duration: 0.9, ease }}
                  />
                )}
                <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 start-1/2 hidden w-px bg-linear-to-b from-transparent via-copad-deep/18 to-transparent shadow-[0_0_18px_rgba(15,61,57,.12)] lg:block" />
              </motion.article>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

function BookScrollCue({
  direction,
  remaining,
  label,
  reduceMotion,
}: {
  direction: 1 | -1;
  remaining: number;
  label: string;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label={`${label} — ${String(remaining).padStart(2, "0")}`}
      className="pointer-events-none absolute top-[8.9rem] right-3 z-30 flex size-13 items-center justify-center rounded-full sm:top-[9.5rem] sm:right-5 sm:size-14 lg:top-[10rem] lg:right-8"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.72, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.55, ease }}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0_38%,rgba(16,159,131,.9)_50%,transparent_62%_100%)] p-px"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
      >
        <span className="block size-full rounded-full bg-copad-sand/94 backdrop-blur-md" />
      </motion.span>

      {!reduceMotion && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-1 rounded-full border border-copad-green/35"
          animate={{ scale: [0.9, 1.15], opacity: [0.75, 0] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: "easeOut" }}
        />
      )}

      <span className="relative flex flex-col items-center gap-0.5 text-copad-deep">
        <motion.span
          aria-hidden="true"
          className="relative block h-4 w-3"
          animate={reduceMotion ? { rotate: direction > 0 ? 0 : 180 } : { rotate: direction > 0 ? 0 : 180, y: direction > 0 ? [-1, 2, -1] : [1, -2, 1] }}
          transition={reduceMotion ? { duration: 0.25 } : { rotate: { duration: 0.35, ease }, y: { duration: 1.25, repeat: Infinity, ease: "easeInOut" } }}
        >
          <span className="absolute top-0 left-1/2 h-3 w-px -translate-x-1/2 bg-copad-deep" />
          <span className="absolute bottom-0 left-1/2 size-2 -translate-x-1/2 rotate-45 border-r border-b border-copad-deep" />
        </motion.span>
        <span dir="ltr" className="text-[8px] leading-none font-black tracking-[0.14em] text-copad-green sm:text-[9px]">
          {String(remaining).padStart(2, "0")}
        </span>
      </span>
    </motion.div>
  );
}
