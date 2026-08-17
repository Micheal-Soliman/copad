"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useDesktopLayout } from "@/components/motion/use-desktop-layout";
import type { Section } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { scrollSceneStyle } from "@/lib/motion/scroll-system";

const ease = [0.22, 1, 0.36, 1] as const;

export function ProductsHero({ locale, content }: { locale: Locale; content: Section }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isDesktop = useDesktopLayout();
  const reduceMotion = useReducedMotion();
  const isArabic = locale === "ar";
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const driven = isDesktop && !reduceMotion;
  const copyY = useTransform(scrollYProgress, [0, .55, 1], [22, 0, -20]);
  const coreRotate = useTransform(scrollYProgress, [0, 1], isArabic ? [-18, 26] : [18, -26]);
  const coreTilt = useTransform(scrollYProgress, [0, .5, 1], [12, 0, -7]);
  const coreScale = useTransform(scrollYProgress, [0, .45, 1], [.82, 1, 1.04]);

  return <section id="home" ref={sectionRef} style={scrollSceneStyle(2)} className="relative bg-copad-deep lg:h-[var(--scroll-scene-height)]">
    <div className="relative isolate min-h-[100svh] overflow-hidden bg-copad-deep text-white lg:sticky lg:top-0 lg:h-screen">
      <div aria-hidden="true" className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_76%_42%,rgba(0,144,175,.24),transparent_28%),radial-gradient(circle_at_10%_90%,rgba(238,235,229,.08),transparent_30%),linear-gradient(135deg,#072c2a,#013d60_55%,#072a27)]" />
      <motion.span aria-hidden="true" className="absolute inset-y-0 -z-20 w-[34vw] -skew-x-12 bg-linear-to-r from-transparent via-white/[.055] to-transparent blur-2xl" animate={reduceMotion ? undefined : { x: ["-40vw", "125vw"] }} transition={{ duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }} />

      <div dir={isArabic ? "rtl" : "ltr"} className="mx-auto grid min-h-[100svh] max-w-[1440px] items-center gap-8 px-4 pt-24 pb-8 sm:px-8 sm:pt-28 lg:h-screen lg:min-h-0 lg:grid-cols-[.8fr_1.2fr] lg:gap-12 lg:px-12 lg:pt-24 lg:pb-5">
        <motion.div className="relative z-20" style={driven ? { y: copyY } : undefined}>
          <motion.p initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .08, ease }} className="flex items-center gap-3 text-[9px] font-black tracking-[.22em] text-copad-green uppercase"><span className="size-2 rounded-full bg-copad-green shadow-[0_0_18px_rgba(0,144,175,.8)]" />{isArabic ? "طيف المنتجات / أربع فئات" : "Product spectrum / Four categories"}</motion.p>
          <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 28, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 1, delay: .18, ease }} className={`${isArabic ? "mt-5 font-sans text-[clamp(3.8rem,16vw,6rem)] leading-none font-black tracking-[-.055em] lg:text-[clamp(5.2rem,7.2vw,7.8rem)]" : "mt-5 font-display text-[clamp(5rem,19vw,7.2rem)] leading-[.76] tracking-[-.075em] lg:text-[clamp(6.8rem,9.5vw,9.8rem)]"}`}>{content.title}</motion.h1>
          <motion.p initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .36, ease }} className="mt-7 max-w-xl border-s-2 border-copad-green ps-5 text-sm leading-7 text-white/68 sm:text-base sm:leading-8 lg:text-[1.02rem]">{content.intro}</motion.p>
        </motion.div>

        <div className="relative mx-auto h-[28rem] w-full max-w-[48rem] [perspective:1800px] sm:h-[38rem] lg:h-[min(39rem,calc(100vh-7rem))] lg:min-h-[31rem]">
          <motion.div className="absolute inset-[6%] [transform-style:preserve-3d]" style={driven ? { rotateY: coreRotate, rotateX: coreTilt, scale: coreScale } : undefined} initial={!driven && !reduceMotion ? { opacity: 0, scale: .82, y: 30 } : false} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1, delay: .22, ease }}>
            <span aria-hidden="true" className="absolute inset-[8%] rounded-[50%] border border-white/10 [transform:rotateX(68deg)_translateZ(-30px)]" />
            <span aria-hidden="true" className="absolute inset-[16%] rounded-[50%] border border-copad-green/24 [transform:rotateX(68deg)_translateZ(20px)]" />
            <div className="absolute start-1/2 top-1/2 h-[82%] w-[38%] -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d] rtl:translate-x-1/2">
              {content.blocks.map((block, index) => <SpectrumBand key={block.title} title={block.title} index={index} progress={scrollYProgress} driven={driven} />)}
              <div className="absolute inset-x-[12%] top-[8%] bottom-[8%] rounded-full border border-white/20 bg-[linear-gradient(100deg,rgba(255,255,255,.18),rgba(0,144,175,.12)_38%,rgba(5,34,32,.84)_72%)] shadow-[0_38px_100px_rgba(0,0,0,.42),inset_-22px_-10px_38px_rgba(0,0,0,.25)] backdrop-blur-md [transform:translateZ(75px)]" />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-between py-[16%] text-center [transform:translateZ(105px)]"><span className="text-[8px] font-black tracking-[.25em] text-copad-green">COPAD / 04</span><strong className="font-display text-7xl leading-none font-normal tracking-[-.08em] sm:text-9xl">107</strong><span className="max-w-28 text-[8px] leading-4 font-black tracking-[.16em] text-white/52 uppercase">{isArabic ? "تركيبة عبر المحفظة" : "Formulations across the portfolio"}</span></div>
            </div>
            {content.blocks.map((block, index) => <motion.div key={block.title} className={`absolute ${index===0?"start-[2%] top-[16%]":index===1?"end-[1%] top-[29%]":index===2?"start-[1%] bottom-[28%]":"end-[3%] bottom-[14%]"} max-w-36`} initial={reduceMotion?false:{opacity:0,scale:.75}} animate={{opacity:1,scale:1}} transition={{duration:.6,delay:.55+index*.1,ease}}><span className="block text-[8px] font-black tracking-[.16em] text-copad-green">0{index+1}</span><span className="mt-1 block text-[9px] leading-4 font-bold text-white/62">{block.title}</span></motion.div>)}
          </motion.div>
        </div>
      </div>
    </div>
  </section>;
}

function SpectrumBand({ title, index, progress, driven }: { title: string; index: number; progress: ReturnType<typeof useScroll>["scrollYProgress"]; driven: boolean }) {
  const shift = useTransform(progress, [.1 + index*.05, .48 + index*.04, 1], [0, (index-1.5)*38, (index-1.5)*54]);
  const rotate = useTransform(progress, [0, 1], [(index-1.5)*2, (index-1.5)*8]);
  const colors = ["from-copad-green/70 to-copad-green/10", "from-white/36 to-white/6", "from-[#d8eae5]/35 to-transparent", "from-copad-sand/28 to-transparent"];
  return <motion.span title={title} aria-hidden="true" className={`absolute inset-x-[-18%] h-[21%] rounded-full border border-white/16 bg-linear-to-r ${colors[index]} shadow-[0_15px_35px_rgba(0,0,0,.2)] backdrop-blur-sm`} style={{ top: `${12+index*20}%`, ...(driven ? { x: shift, rotateZ: rotate, z: index*18 } : { z: index*18 }) }} />;
}
