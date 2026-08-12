"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";

type HistoryTimelineProps = {
  locale: Locale;
  title: string;
  intro: string;
  items: string[];
};

const ease = [0.22, 1, 0.36, 1] as const;

function splitTimelineItem(item: string) {
  const [label, ...description] = item.split(/\s+(?:—|–)\s+/);
  return { label, description: description.join(" — ") };
}

export function HistoryTimeline({ locale, title, intro, items }: HistoryTimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isArabic = locale === "ar";
  const ui = siteCopy[locale].ui.about;
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (reduceMotion || items.length === 0) return;
    const nextIndex = Math.min(items.length - 1, Math.floor(value * items.length + 0.06));
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  return (
    <section id="history" ref={sectionRef} className="relative scroll-mt-20 bg-copad-sand/45 lg:h-[280vh]">
      <div className="px-4 pt-10 pb-2 sm:px-8 sm:pt-16 sm:pb-4 lg:hidden">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0.2, x: isArabic ? 24 : -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="text-[10px] font-black tracking-[0.22em] text-copad-green uppercase">{ui.historyEyebrow}</p>
          <h2 className="mt-4 max-w-3xl font-display text-[2.35rem] leading-[1] tracking-[-0.045em] text-copad-deep sm:text-5xl">{title}</h2>
        </motion.div>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0.2, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, delay: 0.04, ease }}
          className="mt-5 max-w-3xl text-sm leading-7 text-copad-deep/66 sm:mt-6 sm:text-base sm:leading-8"
        >
          {intro}
        </motion.p>
      </div>

      <MobileTimelineStack items={items} isArabic={isArabic} />

      <div className="hidden lg:sticky lg:top-20 lg:flex lg:min-h-[calc(100vh-5rem)] lg:items-center lg:px-12 lg:py-12">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="grid gap-6 sm:gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-24">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0.2, x: isArabic ? 24 : -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, ease }}
            >
              <p className="text-[10px] font-black tracking-[0.22em] text-copad-green uppercase">{ui.historyEyebrow}</p>
              <h2 className="mt-4 max-w-3xl font-display text-[2.35rem] leading-[1] tracking-[-0.045em] text-copad-deep sm:mt-5 sm:text-5xl lg:text-6xl xl:text-7xl">{title}</h2>
            </motion.div>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0.2, x: isArabic ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: 0.04, ease }}
              className="max-w-3xl text-sm leading-7 text-copad-deep/66 sm:text-base sm:leading-8 lg:self-end xl:text-lg xl:leading-9"
            >
              {intro}
            </motion.p>
          </div>

          <div dir={isArabic ? "rtl" : "ltr"} className="relative mt-14 hidden lg:grid lg:grid-cols-5">
            <span aria-hidden="true" className="absolute top-[9px] right-[10%] left-[10%] h-px bg-copad-deep/10" />
            {items.map((item, index) => {
              const { label, description } = splitTimelineItem(item);
              const isVisible = reduceMotion || index <= activeIndex;
              const isConnected = reduceMotion || index < activeIndex;

              return (
                <motion.article
                  key={item}
                  dir={isArabic ? "rtl" : "ltr"}
                  initial={false}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 18 }}
                  transition={{ duration: 0.55, ease }}
                  className="relative px-3 pt-11 text-center"
                >
                  {index < items.length - 1 && (
                    <motion.span
                      aria-hidden="true"
                      initial={false}
                      animate={{ scaleX: isConnected ? 1 : 0 }}
                      transition={{ duration: 0.55, ease }}
                      className={`absolute top-[9px] h-px w-full bg-copad-green ${isArabic ? "right-1/2 origin-right" : "left-1/2 origin-left"}`}
                    />
                  )}

                  <motion.span
                    aria-hidden="true"
                    initial={false}
                    animate={{ scale: isVisible ? 1 : 0.45, opacity: isVisible ? 1 : 0 }}
                    transition={{ duration: 0.42, ease }}
                    className="absolute top-0 left-1/2 z-10 flex size-[18px] -translate-x-1/2 items-center justify-center rounded-full border border-copad-green bg-copad-sand shadow-[0_0_0_7px_rgba(238,235,229,.94)]"
                  >
                    <span className="size-1.5 rounded-full bg-copad-green" />
                  </motion.span>

                  <span className="text-[9px] font-black tracking-[0.16em] text-copad-green">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-display text-2xl leading-tight tracking-[-0.03em] text-copad-deep xl:text-3xl">{label}</h3>
                  {description && <p className="mx-auto mt-3 max-w-56 text-xs leading-6 text-copad-deep/58">{description}</p>}
                </motion.article>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

function MobileTimelineStack({ items, isArabic }: { items: string[]; isArabic: boolean }) {
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end 80%"] });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 115,
    damping: 28,
    mass: 0.28,
    restDelta: 0.0005,
  });
  const screens = Math.max(items.length, 1);

  return (
    <div ref={stackRef} className="relative lg:hidden" style={{ height: `${screens * 100}svh` }}>
      <div className="sticky top-0 z-10 h-[64svh] overflow-visible px-4 sm:px-8">
        <div dir={isArabic ? "rtl" : "ltr"} className="relative mx-auto h-full max-w-2xl">
          {items.map((item, index) => {
            const { label, description } = splitTimelineItem(item);
            return (
              <MobileTimelineCard
                key={item}
                index={index}
                total={items.length}
                progress={smoothProgress}
                label={label}
                description={description}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MobileTimelineCard({
  index,
  total,
  progress,
  label,
  description,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  label: string;
  description: string;
}) {
  const segments = Math.max(total - 1, 1);
  const enterStart = index === 0 ? 0 : (index - 1) / segments;
  const enterEnd = index === 0 ? 1 : index / segments;
  const nextStart = index / segments;
  const nextEnd = Math.min((index + 1) / segments, 1);
  const previewStart = Math.max(0, (index - 2) / segments);
  const yInput = index === 0 ? [0, 1] : index === 1 ? [0, enterEnd] : index === 2 ? [0, enterStart, enterEnd] : [0, previewStart, enterStart, enterEnd];
  const yOutput = index === 0 ? ["0%", "0%"] : index === 1 ? ["112%", "0%"] : index === 2 ? ["205%", "112%", "0%"] : ["205%", "205%", "112%", "0%"];
  const y = useTransform(progress, yInput, yOutput);
  const scale = useTransform(progress, index === total - 1 ? [0, 1] : [nextStart, nextEnd], index === total - 1 ? [1, 1] : [1, 0.955]);
  const tone = index % 3;
  const light = tone === 2;

  return (
    <motion.article
      style={{ y, scale, zIndex: index + 1 }}
      className={`absolute inset-x-0 top-[10svh] flex h-[48svh] min-h-[17rem] max-h-[24rem] transform-gpu flex-col overflow-hidden rounded-[1.75rem] border p-5 shadow-[0_24px_62px_rgba(15,61,57,.18)] will-change-transform [backface-visibility:hidden] sm:rounded-[2rem] sm:p-7 ${
        tone === 0
          ? "border-white/12 bg-copad-deep text-white"
          : tone === 1
            ? "border-copad-green bg-copad-green text-white"
            : "border-copad-deep/10 bg-copad-white text-copad-deep"
      }`}
    >
      <div aria-hidden="true" className={`absolute -end-20 -top-24 size-64 rounded-full border ${light ? "border-copad-deep/8" : "border-white/10"}`} />
      <span aria-hidden="true" className={`absolute -end-6 top-16 font-display text-[8rem] leading-none tracking-[-0.08em] ${light ? "text-copad-deep/[.035]" : "text-white/[.045]"}`}>
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative flex items-center gap-4">
        <span className={`rounded-full border px-3 py-1.5 text-[9px] font-black tracking-[0.18em] ${light ? "border-copad-green/30 text-copad-green" : "border-white/22 text-white/76"}`}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className={`h-px flex-1 ${light ? "bg-copad-green/30" : "bg-white/22"}`} />
        <div className="flex gap-1.5" aria-hidden="true">
          {Array.from({ length: total }, (_, dotIndex) => (
            <span key={dotIndex} className={`size-1.5 rounded-full ${dotIndex === index ? (light ? "bg-copad-green" : "bg-white") : light ? "bg-copad-deep/14" : "bg-white/22"}`} />
          ))}
        </div>
      </div>

      <div className="relative mt-auto pb-1 sm:pb-4">
        <span aria-hidden="true" className={`mb-4 block h-px w-12 sm:w-16 ${light ? "bg-copad-green" : "bg-white/65"}`} />
        <h3 className="max-w-[17rem] font-display text-[2rem] leading-[.96] tracking-[-0.045em] sm:max-w-md sm:text-4xl">{label}</h3>
        {description && <p className={`mt-3 max-w-md text-[13px] leading-6 sm:mt-4 sm:text-sm sm:leading-7 ${light ? "text-copad-deep/64" : "text-white/70"}`}>{description}</p>}
      </div>
    </motion.article>
  );
}
