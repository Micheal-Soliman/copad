"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { homeScrollSceneStyle, scrollSceneStyle, scrollSystem } from "@/lib/motion/scroll-system";

export function SnapshotBar({ locale, intro, sectionId = "snapshot", homepage = true }: { locale: Locale; intro: string; sectionId?: string; homepage?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const data = siteCopy[locale].home.snapshot;
  const pulseLeft = locale === "ar" ? ["90%", "70%", "50%", "30%", "10%"] : ["10%", "30%", "50%", "70%", "90%"];
  const pulseStart = locale === "ar" ? "90%" : "10%";
  const { scrollYProgress: pinnedScrollProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const revealProgress = useTransform(pinnedScrollProgress, [0, scrollSystem.scene.completion], [0, 1]);
  const [activeStage, setActiveStage] = useState(1);
  const desktopPulseLeft = useTransform(revealProgress, [0, 0.25, 0.5, 0.75, 1], pulseLeft);
  const desktopPulseY = useTransform(revealProgress, [0, 0.25, 0.5, 0.75, 1], [-24, 24, -24, 24, -24]);
  const pulseOpacity = useTransform(revealProgress, [0, 0.025], [0, 1]);

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
    <section id={sectionId} ref={sectionRef} style={homepage ? homeScrollSceneStyle(data.length) : scrollSceneStyle(data.length)} className="relative z-10 scroll-mt-20 px-4 py-10 sm:px-8 sm:py-12 lg:h-[var(--scroll-scene-height)] lg:px-12 lg:py-0">
      <div className="relative mx-auto w-full max-w-[1440px] lg:sticky lg:top-0 lg:flex lg:min-h-screen lg:flex-col lg:justify-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto mb-9 max-w-5xl text-center sm:mb-12 lg:mb-16"
        >
          <p className="text-base leading-8 text-pretty text-copad-deep/68 sm:text-lg sm:leading-9 lg:text-xl lg:leading-10">{intro}</p>
        </motion.div>

        <div className="relative z-10 hidden h-64 w-full lg:block">
          <motion.div aria-hidden="true" className="absolute inset-0" initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.45 }}>
            {[0, 1, 2, 3].map((segment) => {
              const geometry = `absolute h-px w-[20.3%] origin-left ${segment % 2 === 0 ? "top-[calc(50%_-_1.5rem)] rotate-[9.5deg]" : "top-[calc(50%_+_1.5rem)] -rotate-[9.5deg]"}`;
              const style = { left: `${10 + segment * 20}%` };

              return (
                <Fragment key={segment}>
                  <span aria-hidden="true" className={`${geometry} bg-copad-deep/7`} style={style} />
                  <motion.span
                    aria-hidden="true"
                    className={`${geometry} bg-linear-to-r from-copad-deep/10 via-copad-green/42 to-copad-deep/10`}
                    style={style}
                    initial={false}
                    animate={{ scaleX: reduceMotion || activeStage > segment + 1 ? 1 : 0 }}
                    transition={{ duration: scrollSystem.scene.transitionDuration, ease: [0.22, 1, 0.36, 1] }}
                  />
                </Fragment>
              );
            })}
            <motion.span
              className="absolute top-1/2 z-20 size-0"
              style={reduceMotion ? { left: pulseStart, y: -24 } : { left: desktopPulseLeft, y: desktopPulseY, opacity: pulseOpacity }}
            >
              <span className="absolute -top-1.5 -left-1.5 size-3 rounded-full bg-copad-green shadow-[0_0_18px_5px_rgba(0,144,175,.45)]">
                {!reduceMotion && <span className="absolute inset-0 animate-ping rounded-full bg-copad-green/75" />}
              </span>
            </motion.span>
          </motion.div>

          <ol className="grid h-full grid-cols-5">
            {data.map((entry, index) => {
              const above = index % 2 === 0;
              return (
                <motion.li
                  key={entry}
                  className="group relative text-center"
                  initial={false}
                  animate={{ opacity: reduceMotion || index < activeStage ? 1 : 0, y: reduceMotion || index < activeStage ? 0 : 20 }}
                  transition={{ duration: scrollSystem.scene.transitionDuration, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className={`absolute inset-x-3 transition-transform duration-300 group-hover:-translate-y-1 ${above ? "bottom-[calc(50%_+_3rem)]" : "top-[calc(50%_+_3rem)] group-hover:translate-y-1"}`}>
                    <span className="text-[9px] font-black tracking-[0.2em] text-copad-green">{String(index + 1).padStart(2, "0")}</span>
                    <p className="mx-auto mt-3 max-w-52 text-sm leading-6 font-bold text-copad-deep/68 transition-colors duration-300 group-hover:text-copad-deep xl:text-base">{entry}</p>
                  </div>

                  <span aria-hidden="true" className={`absolute left-1/2 grid size-5 -translate-x-1/2 place-items-center rounded-full border-[1.5px] border-copad-green/65 bg-copad-white shadow-[0_0_0_4px_rgba(249,249,249,.95)] ${above ? "top-[calc(50%_-_34px)]" : "top-[calc(50%_+_14px)]"}`}>
                    <span className="size-2 rounded-full bg-copad-green shadow-[0_0_8px_rgba(0,144,175,.32)]" />
                  </span>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <div className="relative z-10 lg:hidden">
          <motion.div aria-hidden="true" className="absolute top-[.875rem] bottom-[5.125rem] start-[9px] w-px origin-top bg-copad-deep/18" initial={reduceMotion ? false : { scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <motion.span className="absolute start-1/2 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-copad-white bg-copad-green shadow-[0_0_18px_6px_rgba(0,144,175,.52)]">
              {!reduceMotion && <span className="absolute -inset-2 animate-ping rounded-full border border-copad-green/35" />}
            </motion.span>
          </motion.div>
          <ol className="grid auto-rows-[6rem]">
            {data.map((entry, index) => (
              <SnapshotMobilePoint key={entry} index={index} reduceMotion={Boolean(reduceMotion)} className="grid grid-cols-[1.25rem_1fr] gap-5">
                <span className="relative mt-1 grid size-5 place-items-center rounded-full border-[1.5px] border-copad-green/65 bg-copad-white shadow-[0_0_0_4px_rgba(249,249,249,.95)]"><span className="size-2 rounded-full bg-copad-green shadow-[0_0_8px_rgba(0,144,175,.32)]" /></span>
                <div>
                  <span className="text-[9px] font-black tracking-[0.18em] text-copad-green">{String(index + 1).padStart(2, "0")}</span>
                  <p className="mt-2 text-sm leading-6 font-bold text-copad-deep/68">{entry}</p>
                </div>
              </SnapshotMobilePoint>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function SnapshotMobilePoint({ index, reduceMotion, className, children }: { index: number; reduceMotion: boolean; className: string; children: ReactNode }) {
  return <motion.li className={className} initial={reduceMotion ? false : { opacity: 0, x: index % 2 === 0 ? 22 : -22, y: 8 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, amount: 0.55 }} transition={{ duration: 0.58, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.li>;
}
