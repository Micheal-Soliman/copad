"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import { useRef, useState } from "react";
import { siteCopy } from "@/content/site";
import type { ContentBlock } from "@/content/types";
import type { Locale } from "@/lib/i18n";

type TherapyExpertiseMapProps = {
  locale: Locale;
  areas: ContentBlock[];
};

const ease = [0.22, 1, 0.36, 1] as const;

export function TherapyExpertiseMap({ locale, areas }: TherapyExpertiseMapProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const lenis = useLenis();
  const isArabic = locale === "ar";
  const ui = siteCopy[locale].ui.therapyAreas;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.36, restDelta: 0.0005 });
  const orbitRotate = useTransform(smoothProgress, [0, 1], isArabic ? [12, -150] : [-12, 150]);
  const ambientX = useTransform(smoothProgress, [0, 1], isArabic ? ["18%", "-22%"] : ["-22%", "18%"]);
  const activeProgress = (activeIndex + 1) / areas.length;

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(areas.length - 1, Math.max(0, Math.round(value * (areas.length - 1))));
    setActiveIndex((current) => current === next ? current : next);
  });

  function goToArea(index: number) {
    const section = sectionRef.current;
    if (!section) return;
    const travel = Math.max(0, section.offsetHeight - window.innerHeight);
    const target = section.offsetTop + travel * (index / Math.max(1, areas.length - 1));
    setActiveIndex(index);
    if (lenis) lenis.scrollTo(target, { duration: 0.82, easing: (value) => 1 - Math.pow(1 - value, 4) });
    else window.scrollTo({ top: target, behavior: "smooth" });
  }

  const active = areas[activeIndex]!;

  return (
    <section id="expertise" ref={sectionRef} className="relative h-[470vh] scroll-mt-20 bg-copad-sand lg:h-[500vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-copad-sand">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,159,131,.16),transparent_24%),radial-gradient(circle_at_82%_72%,rgba(15,61,57,.08),transparent_28%)]" />
        <motion.div aria-hidden="true" className="absolute top-[18%] -end-36 size-[28rem] rounded-full border border-copad-green/22 sm:size-[42rem] lg:-end-28 lg:size-[52rem]" style={reduceMotion ? undefined : { rotate: orbitRotate }}>
          <span className="absolute inset-[13%] rounded-full border border-copad-deep/10" />
          <span className="absolute inset-[29%] rounded-full border border-copad-green/15" />
          <span className="absolute start-1/2 top-[-5px] size-2.5 rounded-full bg-copad-green shadow-[0_0_22px_rgba(16,159,131,.65)]" />
        </motion.div>
        <motion.div aria-hidden="true" className="absolute inset-y-[16%] w-[42%] rounded-full bg-[radial-gradient(circle,rgba(16,159,131,.13),transparent_64%)] blur-3xl" style={reduceMotion ? undefined : { x: ambientX }} />

        <div dir={isArabic ? "rtl" : "ltr"} className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col px-4 pt-20 pb-5 sm:px-8 sm:pt-24 sm:pb-7 lg:px-12 lg:pt-24 lg:pb-8">
          <header className="shrink-0 border-b border-copad-deep/12 pb-4 sm:pb-5">
            <div className="flex items-end justify-between gap-5">
              <span className="text-[8px] font-black tracking-[0.18em] text-copad-deep/42 uppercase">{ui.progressLabel}</span>
              <div dir="ltr" className="flex items-baseline gap-1 font-display text-copad-deep">
                <span className="text-3xl leading-none sm:text-4xl">{String(activeIndex + 1).padStart(2, "0")}</span>
                <span className="text-sm text-copad-deep/30">/09</span>
              </div>
            </div>
            <div aria-hidden="true" className="mt-3 h-1 overflow-hidden rounded-full bg-copad-deep/8">
              <motion.span className="block h-full origin-left rounded-full bg-copad-green shadow-[0_0_15px_rgba(16,159,131,.55)] rtl:origin-right" animate={{ scaleX: activeProgress }} transition={{ duration: 0.65, ease }} />
            </div>
          </header>

          <div className="grid min-h-0 min-w-0 flex-1 items-center gap-5 py-5 sm:gap-8 sm:py-7 lg:grid-cols-[minmax(0,.7fr)_minmax(0,1.3fr)] lg:gap-16">
            <nav aria-label={ui.mapEyebrow} className="order-2 min-w-0 lg:order-1">
              <div className="relative flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] lg:grid lg:grid-cols-3 lg:gap-x-3 lg:gap-y-3 [&::-webkit-scrollbar]:hidden">
                {areas.map((area, index) => {
                  const selected = index === activeIndex;
                  const passed = index <= activeIndex;
                  return (
                    <button
                      key={area.title}
                      type="button"
                      onClick={() => goToArea(index)}
                      aria-current={selected ? "step" : undefined}
                      className={`group relative flex min-w-[4.25rem] flex-col items-start rounded-[1rem] border px-3 py-3 text-start transition duration-500 sm:min-w-[5rem] lg:min-w-0 lg:rounded-[1.2rem] lg:px-4 lg:py-4 ${selected ? "border-copad-green bg-copad-deep text-white shadow-[0_18px_40px_rgba(15,61,57,.16)]" : "border-copad-deep/10 bg-white/55 text-copad-deep hover:border-copad-green/45 hover:bg-white"}`}
                    >
                      <span className={`text-[8px] font-black tracking-[0.16em] ${selected ? "text-copad-green" : passed ? "text-copad-green" : "text-copad-deep/30"}`}>{String(index + 1).padStart(2, "0")}</span>
                      <span className="mt-2 hidden text-[10px] leading-4 font-bold lg:block">{area.title}</span>
                      <span aria-hidden="true" className={`absolute inset-x-3 bottom-1.5 h-px origin-start bg-copad-green transition-transform duration-500 rtl:origin-right ${selected ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                    </button>
                  );
                })}
              </div>
            </nav>

            <div className="order-1 min-h-0 min-w-0 lg:order-2 lg:h-[min(29rem,calc(100vh-15rem))]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.article
                  key={active.title}
                  initial={reduceMotion ? false : { opacity: 0, rotateY: (activeIndex % 2 === 0 ? 1 : -1) * (isArabic ? -20 : 20), x: (activeIndex % 2 === 0 ? 1 : -1) * (isArabic ? -24 : 24), scale: .96, filter: "blur(6px)" }}
                  animate={{ opacity: 1, rotateY: 0, x: 0, scale: 1, filter: "blur(0px)" }}
                  exit={reduceMotion ? undefined : { opacity: 0, rotateY: (activeIndex % 2 === 0 ? -1 : 1) * (isArabic ? -16 : 16), x: (activeIndex % 2 === 0 ? -1 : 1) * (isArabic ? -18 : 18), scale: .97, filter: "blur(4px)" }}
                  transition={{ duration: reduceMotion ? 0 : 0.52, ease }}
                  style={{ transformOrigin: isArabic ? "right center" : "left center", transformStyle: "preserve-3d" }}
                  className="relative overflow-hidden rounded-[1.65rem] border border-copad-deep/10 bg-copad-white/88 p-5 shadow-[0_24px_70px_rgba(15,61,57,.1)] backdrop-blur-md sm:rounded-[2rem] sm:p-8 lg:h-full lg:min-h-0 lg:p-10"
                >
                  <span aria-hidden="true" className="absolute -end-5 -top-12 font-display text-[10rem] leading-none tracking-[-0.08em] text-copad-deep/[.045] sm:text-[14rem] lg:text-[18rem]">{String(activeIndex + 1).padStart(2, "0")}</span>
                  <div className="relative z-10 flex h-full flex-col justify-center">
                    <div className="flex items-center gap-3">
                      <span className="size-2 rounded-full bg-copad-green shadow-[0_0_18px_rgba(16,159,131,.6)]" />
                      <p className="text-[8px] font-black tracking-[0.2em] text-copad-green uppercase sm:text-[9px]">{ui.areaLabel} · {String(activeIndex + 1).padStart(2, "0")}</p>
                    </div>
                    <h2 className={`mt-5 max-w-full text-balance break-words text-copad-deep ${isArabic ? "font-sans text-[clamp(1.75rem,7.4vw,3.8rem)] leading-[1.12] font-black tracking-[-0.035em] lg:text-[4.1rem]" : "font-display text-[clamp(2.2rem,9vw,4rem)] leading-[.98] tracking-[-0.05em] lg:text-[4.55rem]"}`}>{active.title}</h2>
                    <p className="mt-5 max-w-3xl text-xs leading-6 text-copad-deep/68 sm:mt-7 sm:text-sm sm:leading-7 lg:mt-6 lg:text-[.95rem] lg:leading-8">{active.body}</p>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
