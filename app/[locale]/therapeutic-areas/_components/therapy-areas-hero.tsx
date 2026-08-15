"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { useDesktopLayout } from "@/components/motion/use-desktop-layout";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { scrollSceneStyle } from "@/lib/motion/scroll-system";

type TherapyAreasHeroProps = { locale: Locale; title: string; intro: string; areas: string[] };
const ease = [0.22, 1, 0.36, 1] as const;

export function TherapyAreasHero({ locale, title, intro, areas }: TherapyAreasHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isDesktop = useDesktopLayout();
  const reduceMotion = useReducedMotion();
  const isArabic = locale === "ar";
  const ui = siteCopy[locale].ui.therapyAreas;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const scrollDriven = isDesktop && !reduceMotion;

  const folioRotateY = useTransform(scrollYProgress, [0, 0.4, 1], isArabic ? [-13, 0, 4] : [13, 0, -4]);
  const folioRotateX = useTransform(scrollYProgress, [0, 0.45, 1], [7, 0, -2]);
  const folioScale = useTransform(scrollYProgress, [0, 0.42, 1], [0.9, 1, 1.015]);
  const folioY = useTransform(scrollYProgress, [0, 0.48, 1], [42, 0, -12]);
  const photoClip = useTransform(scrollYProgress, [0.04, 0.38, 1], ["inset(0 48% 0 48% round 2rem)", "inset(0 0% 0 0% round 2rem)", "inset(0 0% 0 0% round 2rem)"]);
  const photoScale = useTransform(scrollYProgress, [0, 0.45, 1], [1.18, 1.03, 1]);
  const copyY = useTransform(scrollYProgress, [0, 0.52, 1], [18, 0, -18]);
  const ruleScale = useTransform(scrollYProgress, [0.08, 0.38], [0, 1]);

  return (
    <section id="home" ref={sectionRef} style={scrollSceneStyle(2)} className="relative bg-copad-deep lg:h-[var(--scroll-scene-height)]">
      <div className="relative isolate min-h-[100svh] overflow-hidden bg-copad-deep text-white lg:sticky lg:top-0 lg:h-screen">
        <div aria-hidden="true" className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_80%_26%,rgba(16,159,131,.2),transparent_30%),radial-gradient(circle_at_10%_90%,rgba(238,235,229,.07),transparent_28%),linear-gradient(132deg,#082f2c_0%,#0f3d39_56%,#092c29_100%)]" />
        <motion.div aria-hidden="true" className="absolute inset-y-0 -z-20 w-[36vw] bg-linear-to-r from-transparent via-copad-green/[.06] to-transparent blur-2xl" animate={reduceMotion ? undefined : { x: ["-45vw", "120vw"] }} transition={{ duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }} />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-20 h-1/2 bg-linear-to-t from-black/18 to-transparent" />

        <div dir={isArabic ? "rtl" : "ltr"} className="mx-auto grid min-h-[100svh] max-w-[1440px] items-center gap-9 px-4 pt-24 pb-8 sm:px-8 sm:pt-28 lg:h-screen lg:min-h-0 lg:grid-cols-[.82fr_1.18fr] lg:gap-12 lg:px-12 lg:pt-[5.75rem] lg:pb-4">
          <motion.div className="relative z-20" style={scrollDriven ? { y: copyY } : undefined}>
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .08, ease }} className="flex items-center gap-3">
              <span className="size-2 rounded-full bg-copad-green shadow-[0_0_18px_rgba(16,159,131,.8)]" />
              <p className="text-[9px] font-black tracking-[.22em] text-copad-green uppercase sm:text-[10px]">{ui.heroKicker}</p>
            </motion.div>

            <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 28, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1, delay: .18, ease }} className={`${isArabic ? "mt-5 max-w-3xl font-sans text-[clamp(3.4rem,14vw,5.6rem)] leading-[1.02] font-black tracking-[-.045em] lg:mt-4 lg:text-[clamp(4.5rem,6.5vw,6.8rem)]" : "mt-5 max-w-3xl font-display text-[clamp(4.4rem,17vw,6.8rem)] leading-[.8] tracking-[-.07em] lg:mt-4 lg:text-[clamp(5.3rem,6.7vw,7rem)]"}`}>
              {title}
            </motion.h1>

            <motion.div className="mt-7 h-px max-w-lg origin-start bg-linear-to-r from-copad-green via-copad-green/35 to-transparent lg:mt-5" style={scrollDriven ? { scaleX: ruleScale } : undefined} initial={scrollDriven || reduceMotion ? false : { scaleX: 0 }} animate={scrollDriven ? undefined : { scaleX: 1 }} transition={{ duration: .9, delay: .35, ease }} />

            <motion.p initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .36, ease }} className="mt-6 max-w-xl text-sm leading-7 text-white/68 sm:text-base sm:leading-8 lg:mt-5 lg:text-base lg:leading-8 xl:text-[1.05rem]">
              {intro}
            </motion.p>

            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, delay: .52, ease }} className="mt-5 flex items-end gap-4 border-t border-white/12 pt-4 sm:mt-8 sm:pt-5 lg:mt-5 lg:pt-4">
              <strong className="font-display text-6xl leading-none font-normal tracking-[-.06em] text-white sm:text-7xl lg:text-6xl">09</strong>
              <span className="max-w-36 pb-1 text-[9px] leading-4 font-black tracking-[.14em] text-copad-green uppercase">{ui.heroMetricLabel}</span>
            </motion.div>
          </motion.div>

          <div className="relative z-10 mx-auto h-[27rem] w-full max-w-[47rem] [perspective:1800px] sm:h-[38rem] lg:h-[min(38rem,calc(100vh-7.25rem))] lg:min-h-[31rem]">
            <span aria-hidden="true" className="absolute inset-x-[9%] top-[8%] bottom-[3%] translate-x-6 rounded-[2.2rem] border border-copad-green/20 bg-copad-green/[.045] shadow-[0_35px_100px_rgba(0,0,0,.22)] rtl:-translate-x-6" />
            <span aria-hidden="true" className="absolute inset-x-[5%] top-[4%] bottom-[7%] translate-x-3 rounded-[2.2rem] border border-white/10 bg-white/[.035] backdrop-blur-sm rtl:-translate-x-3" />

            <motion.article
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: .95, delay: .25, ease }}
              style={scrollDriven ? { rotateY: folioRotateY, rotateX: folioRotateX, scale: folioScale, y: folioY } : undefined}
              className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/18 bg-copad-white text-copad-deep shadow-[0_40px_110px_rgba(0,0,0,.34)] [transform-style:preserve-3d]"
            >
              <motion.div className="relative h-[41%] overflow-hidden bg-copad-deep sm:h-[46%]" style={scrollDriven ? { clipPath: photoClip } : undefined}>
                <motion.div aria-hidden="true" className="absolute inset-0 bg-[url('/images/copad-divisions-atlas.png')] bg-[length:auto_100%] bg-left bg-no-repeat" style={scrollDriven ? { scale: photoScale } : undefined} />
                <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,45,42,.72),rgba(7,45,42,.08)_58%,rgba(7,45,42,.2)),linear-gradient(0deg,rgba(7,45,42,.5),transparent_55%)]" />
                <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-7 sm:top-7">
                  <span className="rounded-full border border-white/24 bg-copad-deep/45 px-3 py-2 text-[8px] font-black tracking-[.2em] text-white/78 uppercase backdrop-blur-md">COPAD / Clinical portfolio</span>
                  <span className="font-display text-5xl leading-none text-white/90 sm:text-6xl">09</span>
                </div>
                <p className="absolute inset-x-6 bottom-5 max-w-sm text-xs leading-5 font-bold text-white/78 sm:inset-x-8 sm:bottom-7 sm:text-sm">{ui.heroMetricLabel}</p>
              </motion.div>

              <div className="relative h-[59%] bg-copad-white px-5 py-3 sm:h-[54%] sm:px-7 sm:py-6">
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-copad-green/55 to-transparent" />
                <div className="mb-2 flex items-center justify-between sm:mb-5">
                  <span className="text-[8px] font-black tracking-[.2em] text-copad-green uppercase">{isArabic ? "الفهرس الإكلينيكي" : "Clinical index"}</span>
                  <span className="text-[8px] font-bold tracking-[.14em] text-copad-deep/35 uppercase">01—09</span>
                </div>
                <ol className="grid grid-cols-2 gap-x-4 sm:grid-cols-3 sm:gap-x-6">
                  {areas.map((area, index) => <TherapyIndexItem key={area} area={area} index={index} progress={scrollYProgress} scrollDriven={scrollDriven} reduceMotion={Boolean(reduceMotion)} />)}
                </ol>
              </div>
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  );
}

function TherapyIndexItem({ area, index, progress, scrollDriven, reduceMotion }: { area: string; index: number; progress: MotionValue<number>; scrollDriven: boolean; reduceMotion: boolean }) {
  const start = .24 + index * .047;
  const opacity = useTransform(progress, [start, start + .1, 1], [.08, 1, 1]);
  const x = useTransform(progress, [start, start + .1, 1], [index % 2 === 0 ? -14 : 14, 0, 0]);
  const lineScale = useTransform(progress, [start, start + .11], [0, 1]);

  return (
    <motion.li
      initial={!scrollDriven && !reduceMotion ? { opacity: 0, y: 10 } : false}
      animate={!scrollDriven ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: .52, delay: .5 + index * .045, ease }}
      style={scrollDriven ? { opacity, x } : undefined}
      className="relative min-h-14 border-t border-copad-deep/10 py-2.5 sm:min-h-16 sm:py-3"
    >
      <motion.span aria-hidden="true" className="absolute inset-x-0 top-0 h-px origin-start bg-copad-green" style={scrollDriven ? { scaleX: lineScale } : undefined} />
      <span className="block text-[7px] font-black tracking-[.16em] text-copad-green">{String(index + 1).padStart(2, "0")}</span>
      <span className="mt-1 block text-[9px] leading-4 font-bold text-copad-deep/72 sm:text-[10px]">{area}</span>
    </motion.li>
  );
}
