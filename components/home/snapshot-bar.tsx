"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { editorialScrollSceneStyle, homeScrollSceneStyle, scrollSystem } from "@/lib/motion/scroll-system";

export function SnapshotBar({ locale, intro, sectionId = "snapshot", homepage = true }: { locale: Locale; intro: string; sectionId?: string; homepage?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const data = siteCopy[locale].home.snapshot;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smoothScrollProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3, restDelta: 0.0005 });
  const revealProgress = useTransform(smoothScrollProgress, [0, scrollSystem.scene.completion], [0, 1]);
  const trackScale = useTransform(revealProgress, [0, 1], [0, 1]);
  const [activeStage, setActiveStage] = useState(1);

  useMotionValueEvent(revealProgress, "change", (latest) => {
    const nextStage = Math.min(data.length, Math.max(1, Math.floor(latest * data.length) + 1));
    setActiveStage((current) => current === nextStage ? current : nextStage);
  });

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const latest = revealProgress.get();
      setActiveStage(Math.min(data.length, Math.max(1, Math.floor(latest * data.length) + 1)));
    });
    return () => window.cancelAnimationFrame(frame);
  }, [data.length, revealProgress]);

  return (
    <section id={sectionId} ref={sectionRef} style={homepage ? homeScrollSceneStyle(data.length) : editorialScrollSceneStyle(data.length)} className="relative z-10 scroll-mt-20 bg-copad-white px-4 py-10 sm:px-8 sm:py-12 lg:h-[var(--scroll-scene-height)] lg:px-12 lg:py-0">
      <div className="relative mx-auto w-full max-w-[1440px] lg:sticky lg:top-0 lg:flex lg:min-h-screen lg:flex-col lg:justify-center">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }} className="mx-auto mb-8 max-w-4xl text-center sm:mb-10 lg:mb-12">
          <p className="text-sm leading-7 text-pretty text-copad-deep/64 sm:text-base sm:leading-8 lg:text-lg lg:leading-9">{intro}</p>
        </motion.div>

        <div className="relative hidden overflow-hidden rounded-[2rem] border border-copad-deep/10 bg-white/88 px-8 py-10 shadow-[0_24px_70px_rgba(1,61,96,.08)] backdrop-blur-sm lg:block">
          <div aria-hidden="true" className="absolute inset-x-8 top-10 h-px bg-copad-deep/10"><motion.span className="block h-full origin-left bg-copad-green shadow-[0_0_14px_rgba(0,144,175,.28)] rtl:origin-right" style={reduceMotion ? { scaleX: 1 } : { scaleX: trackScale }} /></div>
          <ol className="grid grid-cols-5">
            {data.map((entry, index) => {
              const active = Boolean(reduceMotion) || index < activeStage;
              return (
                <motion.li key={entry} initial={false} animate={{ opacity: active ? 1 : 0.2, y: active ? 0 : 8 }} transition={{ duration: 0.66, ease: [0.22, 1, 0.36, 1] }} className="group relative min-h-48 border-s border-copad-deep/8 px-6 pt-9 first:border-s-0">
                  <span aria-hidden="true" className={`absolute top-[1px] start-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-copad-white transition-all duration-500 rtl:translate-x-1/2 ${active ? "bg-copad-green shadow-[0_0_0_5px_rgba(0,144,175,.12)]" : "bg-copad-deep/18"}`} />
                  <span className="text-[9px] font-black tracking-[0.2em] text-copad-green">{String(index + 1).padStart(2, "0")}</span>
                  <p className="mt-5 max-w-52 text-sm leading-6 font-bold text-copad-deep/72 transition-colors duration-300 group-hover:text-copad-deep xl:text-[15px] xl:leading-7">{entry}</p>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <div className="relative lg:hidden">
          <motion.div aria-hidden="true" className="absolute top-[.875rem] bottom-[5.125rem] start-[9px] w-px origin-top bg-copad-deep/15" initial={reduceMotion ? false : { scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} />
          <ol className="grid auto-rows-[6rem]">
            {data.map((entry, index) => (
              <SnapshotMobilePoint key={entry} index={index} reduceMotion={Boolean(reduceMotion)} className="grid grid-cols-[1.25rem_1fr] gap-5">
                <span className="relative mt-1 grid size-5 place-items-center rounded-full border-[1.5px] border-copad-green/55 bg-copad-white shadow-[0_0_0_4px_rgba(249,252,255,.95)]"><span className="size-2 rounded-full bg-copad-green" /></span>
                <div><span className="text-[9px] font-black tracking-[0.18em] text-copad-green">{String(index + 1).padStart(2, "0")}</span><p className="mt-2 text-sm leading-6 font-bold text-copad-deep/68">{entry}</p></div>
              </SnapshotMobilePoint>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function SnapshotMobilePoint({ index, reduceMotion, className, children }: { index: number; reduceMotion: boolean; className: string; children: ReactNode }) {
  return <motion.li className={className} initial={reduceMotion ? false : { opacity: 0, x: index % 2 === 0 ? 18 : -18, y: 6 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, amount: 0.55 }} transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.li>;
}
