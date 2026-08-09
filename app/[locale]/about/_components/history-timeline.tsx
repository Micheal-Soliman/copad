"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";

type HistoryTimelineProps = {
  locale: Locale;
  title: string;
  body: string;
  items: string[];
};

const ease = [0.22, 1, 0.36, 1] as const;

function splitTimelineItem(item: string) {
  const [label, ...description] = item.split(/\s+(?:—|–)\s+/);
  return { label, description: description.join(" — ") };
}

export function HistoryTimeline({ locale, title, body, items }: HistoryTimelineProps) {
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
    <section ref={sectionRef} className="relative bg-copad-sand/45 lg:h-[280vh]">
      <div className="px-5 py-24 sm:px-8 lg:sticky lg:top-0 lg:flex lg:min-h-screen lg:items-center lg:px-12 lg:py-16">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-24">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: isArabic ? 24 : -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.72, ease }}
            >
              <p className="text-[10px] font-black tracking-[0.22em] text-copad-green uppercase">{ui.historyEyebrow}</p>
              <h2 className="mt-5 max-w-3xl font-display text-5xl leading-[1] tracking-[-0.045em] text-copad-deep lg:text-6xl xl:text-7xl">{title}</h2>
            </motion.div>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, x: isArabic ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.72, delay: 0.06, ease }}
              className="max-w-3xl text-base leading-8 text-copad-deep/66 lg:self-end lg:text-base lg:leading-8 xl:text-lg xl:leading-9"
            >
              {body}
            </motion.p>
          </div>

          <div dir={isArabic ? "rtl" : "ltr"} className="relative mt-14 hidden lg:grid lg:grid-cols-5">
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

          <div className="relative mt-14 ps-9 lg:hidden">
            {items.map((item, index) => {
              const { label, description } = splitTimelineItem(item);
              return (
                <motion.article
                  key={item}
                  initial={reduceMotion ? false : { opacity: 0, x: isArabic ? -18 : 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.55 }}
                  transition={{ duration: 0.55, ease }}
                  className="relative border-b border-copad-deep/10 py-6 first:pt-0 last:border-b-0 last:pb-0"
                >
                  {index < items.length - 1 && (
                    <motion.span
                      aria-hidden="true"
                      initial={reduceMotion ? false : { scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, amount: 0.55 }}
                      transition={{ duration: 0.55, delay: 0.18, ease }}
                      className={`absolute -start-[1.95rem] w-px origin-top bg-copad-green ${index === 0 ? "top-2 -bottom-7" : "top-8 -bottom-7"}`}
                    />
                  )}
                  <span className={`absolute -start-[2.42rem] flex size-4 items-center justify-center rounded-full border border-copad-green bg-copad-sand ${index === 0 ? "top-1" : "top-7"}`}>
                    <span className="size-1.5 rounded-full bg-copad-green" />
                  </span>
                  <span className="text-[9px] font-black tracking-[0.16em] text-copad-green">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 font-display text-3xl tracking-[-0.03em] text-copad-deep">{label}</h3>
                  {description && <p className="mt-2 max-w-xl text-sm leading-7 text-copad-deep/58">{description}</p>}
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
