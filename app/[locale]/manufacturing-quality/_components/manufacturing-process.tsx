"use client";

import { FactoryIcon } from "@phosphor-icons/react/dist/csr/Factory";
import { GearSixIcon } from "@phosphor-icons/react/dist/csr/GearSix";
import { ShieldCheckIcon } from "@phosphor-icons/react/dist/csr/ShieldCheck";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { useRef, useState } from "react";
import type { ContentBlock } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { scrollSceneCenter, scrollSceneStyle, scrollSystem } from "@/lib/motion/scroll-system";

const ease = [0.22, 1, 0.36, 1] as const;

export function ManufacturingProcess({ locale, blocks, cta }: { locale: Locale; blocks: ContentBlock[]; cta?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion();
  const lenis = useLenis();
  const isArabic = locale === "ar";
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const sceneProgress = useTransform(scrollYProgress, [0, scrollSystem.scene.completion], [0, 1]);
  const smooth = useSpring(sceneProgress, { stiffness: 62, damping: 32, mass: .58 });
  const beltX = useTransform(smooth, [0, 1], isArabic ? ["12%", "-12%"] : ["-12%", "12%"]);
  const wheelRotate = useTransform(smooth, [0, 1], isArabic ? [0, -720] : [0, 720]);
  const rollerRotate = useTransform(smooth, [0, 1], isArabic ? [0, -1440] : [0, 1440]);
  const progress = (activeIndex + 1) / blocks.length;

  useMotionValueEvent(sceneProgress, "change", value => {
    const next = Math.min(blocks.length - 1, Math.max(0, Math.floor(value * blocks.length)));
    if (activeIndexRef.current === next) return;
    setDirection(next > activeIndexRef.current ? 1 : -1);
    activeIndexRef.current = next;
    setActiveIndex(next);
  });

  function goTo(index: number) {
    const section = sectionRef.current;
    if (!section) return;
    const chapterProgress = scrollSceneCenter(index, blocks.length);
    const target = section.offsetTop + (section.offsetHeight - innerHeight) * chapterProgress;
    if (lenis) lenis.scrollTo(target, { duration: scrollSystem.scene.navigationDuration, easing: value => 1 - Math.pow(1 - value, 4) });
    else window.scrollTo({ top: target, behavior: "smooth" });
  }

  const active = blocks[activeIndex]!;
  const StageIcon = activeIndex === 0 ? FactoryIcon : activeIndex === 1 ? ShieldCheckIcon : GearSixIcon;

  return (
    <section ref={sectionRef} id="process" style={scrollSceneStyle(blocks.length)} className="relative h-[var(--scroll-scene-height)] scroll-mt-20 bg-copad-sand">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-copad-sand">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(16,159,131,.14),transparent_24%),radial-gradient(circle_at_88%_82%,rgba(15,61,57,.08),transparent_27%)]" />
        <motion.div aria-hidden="true" className="absolute inset-x-[-16%] top-[64%] h-28 opacity-80" style={reduceMotion ? undefined : { x: beltX }}>
          <span className="absolute inset-x-0 top-0 h-3 rounded-full border border-copad-deep/14 bg-copad-deep/8 shadow-[0_18px_35px_rgba(15,61,57,.1)]" />
          <div className="absolute inset-x-0 top-4 flex justify-around">{Array.from({ length: 18 }, (_, index) => <motion.span key={index} className="relative size-11 rounded-full border-2 border-copad-deep/16 bg-copad-white shadow-[inset_0_0_0_7px_rgba(15,61,57,.035)]" style={reduceMotion ? undefined : { rotate: rollerRotate }}><span className="absolute start-1/2 top-1/2 h-px w-[70%] -translate-x-1/2 -translate-y-1/2 bg-copad-green/45" /></motion.span>)}</div>
          <span className="absolute inset-x-0 top-[3.9rem] h-3 rounded-full border border-copad-deep/14 bg-copad-deep/8" />
        </motion.div>

        <div dir={isArabic ? "rtl" : "ltr"} className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col px-4 pt-[5rem] pb-[4.75rem] sm:px-8 lg:px-12 lg:pt-[5.5rem] lg:pb-[5rem]">
          <div className="grid min-h-0 flex-1 items-center gap-5 lg:grid-cols-[.62fr_1.38fr] lg:gap-11">
            <div className="relative mx-auto hidden aspect-square w-full max-w-[21rem] [perspective:1100px] lg:block xl:max-w-[23rem]">
              <motion.div className="absolute inset-[10%] rounded-full border border-copad-green/30" style={reduceMotion ? undefined : { rotate: wheelRotate }}>
                <span className="absolute inset-[16%] rounded-full border border-copad-deep/12" />
                <span className="absolute inset-[35%] rounded-full bg-copad-deep shadow-[0_25px_60px_rgba(15,61,57,.2)]" />
                {[0, 120, 240].map((rotation, index) => <button key={rotation} onClick={() => goTo(index)} aria-label={blocks[index]?.title} className="absolute start-1/2 top-1/2 size-13 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white bg-copad-white shadow-[0_12px_30px_rgba(15,61,57,.13)]" style={{ transform: `translate(-50%,-50%) rotate(${rotation}deg) translateY(-8.2rem) rotate(${-rotation}deg)` }}><span className={`mx-auto block size-2 rounded-full ${index === activeIndex ? "bg-copad-green shadow-[0_0_14px_rgba(16,159,131,.8)]" : "bg-copad-deep/18"}`} /></button>)}
              </motion.div>
            </div>

            <motion.article className="relative z-10 max-h-[57svh] min-h-[21rem] overflow-hidden rounded-[1.7rem] border border-copad-deep/10 bg-copad-white/96 p-5 shadow-[0_28px_68px_rgba(15,61,57,.14)] backdrop-blur-md sm:min-h-[23rem] sm:p-6 lg:max-h-[58svh] lg:min-h-0 lg:p-7">
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={{
                    enter: (travel: number) => ({ opacity: 0, x: travel * (isArabic ? -38 : 38), y: 18, scale: .985, filter: "blur(6px)" }),
                    center: { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" },
                    exit: (travel: number) => ({ opacity: 0, x: travel * (isArabic ? 24 : -24), y: -10, scale: .988, filter: "blur(5px)" }),
                  }}
                  initial={reduceMotion ? false : "enter"}
                  animate="center"
                  exit={reduceMotion ? undefined : "exit"}
                  transition={{ duration: .68, ease }}
                  className="relative"
                >
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-8 z-20 bg-linear-to-r from-transparent via-copad-green/10 to-transparent"
                    initial={reduceMotion ? false : { x: direction > 0 ? "110%" : "-110%" }}
                    animate={{ x: direction > 0 ? "-110%" : "110%" }}
                    transition={{ duration: .9, ease }}
                  />
                  <span aria-hidden="true" className="absolute -end-4 -top-10 font-display text-[10rem] leading-none text-copad-deep/[.035] lg:text-[14rem]">0{activeIndex + 1}</span>
                  <div className="relative z-10">
                    <motion.span key={`stage-icon-${activeIndex}`} initial={reduceMotion ? false : { opacity: 0, scale: .65, rotateY: 35 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ duration: .78, ease }} className="mb-2 grid size-11 place-items-center rounded-xl border border-copad-green/25 bg-copad-green/8 text-copad-green shadow-[0_12px_30px_rgba(16,159,131,.12)]"><StageIcon size={25} weight="duotone" /></motion.span>
                    <span className="text-[8px] font-black tracking-[.2em] text-copad-green uppercase">{isArabic ? "مرحلة تشغيل" : "Operating stage"} · 0{activeIndex + 1}</span>
                    <h3 className={`${isArabic ? "font-sans font-black leading-[1.08]" : "font-display leading-[.96]"} mt-2.5 max-w-3xl text-[clamp(1.9rem,4.2vw,3.35rem)] tracking-[-.05em] text-copad-deep`}>{active.title}</h3>
                    <p className="mt-3 max-w-3xl text-[13px] leading-[1.55rem] text-copad-deep/66 sm:text-sm sm:leading-6">{active.body}</p>
                    {activeIndex === blocks.length - 1 && cta && <Link href={`/${locale}/contact`} className="group relative mt-3.5 inline-flex min-h-9 items-center overflow-hidden rounded-full bg-copad-deep px-5 text-[11px] font-black text-white transition hover:-translate-y-1"><span className="absolute inset-0 translate-y-full bg-copad-green transition-transform duration-500 group-hover:translate-y-0" /><span className="relative">{cta}</span></Link>}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.article>
          </div>

          <nav aria-label={isArabic ? "مراحل التشغيل" : "Operating stages"} className="relative z-20 shrink-0">
            <div className="grid grid-cols-3 gap-2">{blocks.map((block, index) => <button key={block.title} onClick={() => goTo(index)} className={`relative overflow-hidden rounded-full border px-3 py-2 text-[8px] font-black transition duration-500 sm:text-[9px] ${index === activeIndex ? "border-copad-deep bg-copad-deep text-white" : "border-copad-deep/10 bg-white/55 text-copad-deep/48 hover:text-copad-deep"}`}><span className="sm:hidden">0{index + 1}</span><span className="hidden truncate sm:block">{block.title}</span></button>)}</div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-copad-deep/8"><motion.span className="block h-full origin-left rounded-full bg-copad-green rtl:origin-right" animate={{ scaleX: progress }} transition={{ duration: .52, ease }} /></div>
          </nav>
        </div>
      </div>
    </section>
  );
}
