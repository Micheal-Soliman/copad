"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useLenis } from "lenis/react";
import { useRef, useState } from "react";
import type { ContentBlock } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { homeScrollSceneStyle, scrollSceneCenter, scrollSystem } from "@/lib/motion/scroll-system";

const ease = [0.22, 1, 0.36, 1] as const;

export function ManufacturingProcess({ locale, blocks }: { locale: Locale; blocks: ContentBlock[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion();
  const lenis = useLenis();
  const isArabic = locale === "ar";
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const sceneProgress = useTransform(scrollYProgress, [0, scrollSystem.scene.completion], [0, 1]);
  const smooth = useSpring(sceneProgress, { stiffness: 74, damping: 34, mass: .5 });

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

  return (
    <section ref={sectionRef} id="process" style={homeScrollSceneStyle(blocks.length)} className="relative h-[var(--scroll-scene-height)] scroll-mt-20 bg-copad-sand">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-copad-sand">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(0,144,175,.14),transparent_24%),radial-gradient(circle_at_88%_82%,rgba(1,61,96,.08),transparent_27%)]" />
        <div aria-hidden="true" className="absolute inset-x-0 top-[58%] h-px bg-linear-to-r from-transparent via-copad-green/22 to-transparent" />

        <div dir={isArabic ? "rtl" : "ltr"} className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col px-4 pt-[5rem] pb-[4.25rem] sm:px-8 lg:px-12 lg:pt-[5.5rem] lg:pb-[4.5rem]">
          <div className="grid min-h-0 flex-1 items-center gap-5 lg:grid-cols-[.72fr_1.28fr] lg:gap-10">
            <ManufacturingFlowConsole
              blocks={blocks}
              activeIndex={activeIndex}
              progress={smooth}
              isArabic={isArabic}
              reduceMotion={Boolean(reduceMotion)}
              onSelect={goTo}
            />

            <motion.article className="relative z-10 max-h-[57svh] min-h-[21rem] overflow-hidden rounded-[1.7rem] border border-copad-deep/10 bg-copad-white/96 p-5 shadow-[0_28px_68px_rgba(1,61,96,.14)] backdrop-blur-md sm:min-h-[23rem] sm:p-6 lg:max-h-[58svh] lg:min-h-0 lg:p-7">
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={{
                    enter: (travel: number) => ({ opacity: 0, x: travel * (isArabic ? -12 : 12), y: 14, scale: .995 }),
                    center: { opacity: 1, x: 0, y: 0, scale: 1 },
                    exit: (travel: number) => ({ opacity: 0, x: travel * (isArabic ? 8 : -8), y: -7, scale: .997 }),
                  }}
                  initial={reduceMotion ? false : "enter"}
                  animate="center"
                  exit={reduceMotion ? undefined : "exit"}
                  transition={{ duration: .5, ease }}
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
                    <span className="text-[8px] font-black tracking-[.2em] text-copad-green uppercase">{isArabic ? "مرحلة تشغيل" : "Operating stage"} · 0{activeIndex + 1}</span>
                    <h3
                      className={`${isArabic ? "max-w-[22ch] font-sans font-black leading-[1.12]" : "max-w-[25ch] font-display leading-[1.04]"} mt-2.5 text-balance tracking-[-.035em] text-copad-deep [hyphens:none] [overflow-wrap:normal] [word-break:normal]`}
                      style={{ fontSize: "clamp(2.15rem, 3.8vw, 3.3rem)" }}
                    >
                      {active.title}
                    </h3>
                    <p className="mt-3 max-w-3xl text-[13px] leading-[1.55rem] text-copad-deep/66 sm:text-sm sm:leading-6">{active.body}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  );
}

function ManufacturingFlowConsole({
  blocks,
  activeIndex,
  progress,
  isArabic,
  reduceMotion,
  onSelect,
}: {
  blocks: ContentBlock[];
  activeIndex: number;
  progress: MotionValue<number>;
  isArabic: boolean;
  reduceMotion: boolean;
  onSelect: (index: number) => void;
}) {
  const lineScale = useTransform(progress, [0, 1], [0, 1]);
  const carrierTop = useTransform(progress, [0, 1], ["0%", "calc(100% - 11px)"]);
  const panelRotate = useTransform(progress, [0, 1], isArabic ? [1.25, -1.25] : [-1.25, 1.25]);

  return (
    <div className="relative mx-auto hidden h-[25rem] w-full max-w-[24rem] [perspective:1400px] lg:block">
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-[2rem] border border-copad-deep/12 bg-copad-deep shadow-[0_32px_75px_rgba(1,61,96,.2)] [transform-style:preserve-3d]"
        style={reduceMotion ? undefined : { rotateY: panelRotate }}
      >
        <div aria-hidden="true" className="absolute inset-0 bg-[url('/images/copad-cleanroom.png')] bg-cover bg-center opacity-[.13] mix-blend-luminosity" />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(145deg,rgba(1,61,96,.72),rgba(1,61,96,.96)),radial-gradient(circle_at_90%_12%,rgba(0,144,175,.35),transparent_30%)]" />

        <div className="relative z-10 flex h-full flex-col p-5 xl:p-6">
          <header className="border-b border-white/14 pb-4">
            <strong className="block text-xs font-bold text-white/82">{isArabic ? "مسار التشغيل" : "Manufacturing flow"}</strong>
          </header>

          <div className="relative mt-4 flex flex-1 flex-col justify-center gap-3 ps-9">
            <div aria-hidden="true" className="absolute inset-y-6 start-3 w-px bg-white/16">
              <motion.span className="block h-full origin-top bg-copad-green shadow-[0_0_12px_rgba(0,144,175,.65)]" style={reduceMotion ? { scaleY: 1 } : { scaleY: lineScale }} />
              {!reduceMotion && <motion.span className="absolute -start-[5px] size-[11px] rounded-full border-2 border-copad-deep bg-copad-green shadow-[0_0_18px_rgba(0,144,175,.9)]" style={{ top: carrierTop }} />}
            </div>

            {blocks.map((block, index) => {
              const active = index === activeIndex;
              const complete = index < activeIndex;
              return (
                <button
                  key={block.title}
                  type="button"
                  onClick={() => onSelect(index)}
                  aria-current={active ? "step" : undefined}
                  className={`group relative min-h-[4.6rem] overflow-hidden rounded-[1.15rem] border px-4 py-3 text-start transition-[background-color,border-color,transform,box-shadow] duration-500 ${active ? "scale-[1.01] border-copad-green/55 bg-white text-copad-deep shadow-[0_16px_34px_rgba(0,0,0,.2)]" : "border-white/12 bg-white/[.055] text-white hover:border-white/28 hover:bg-white/[.09]"}`}
                >
                  <span className={`block text-[7px] font-black tracking-[.2em] uppercase ${active ? "text-copad-green" : complete ? "text-copad-sky" : "text-white/38"}`}>{isArabic ? "محطة" : "Station"} · 0{index + 1}</span>
                  <strong className={`mt-1.5 block text-[11px] leading-4 font-bold xl:text-xs ${active ? "text-copad-deep" : "text-white/76"}`}>{block.title}</strong>
                  <span aria-hidden="true" className={`absolute inset-y-0 start-0 w-1 origin-bottom bg-copad-green transition-transform duration-500 ${active ? "scale-y-100" : "scale-y-0"}`} />
                </button>
              );
            })}
          </div>

          <footer className="border-t border-white/14 pt-4 text-[7px] font-black tracking-[.17em] text-white/42 uppercase">
            <span>{isArabic ? "تدفق منضبط" : "Controlled flow"}</span>
          </footer>
        </div>
      </motion.div>
    </div>
  );
}
