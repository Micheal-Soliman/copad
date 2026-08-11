"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ScrollAtmosphere } from "@/components/motion/scroll-atmosphere";
import { ScrollImageReveal } from "@/components/motion/scroll-image-reveal";
import { ScrollSceneItem } from "@/components/motion/scroll-scene-item";
import { useDesktopLayout } from "@/components/motion/use-desktop-layout";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import type { AboutStoryBlock } from "./about-types";

type CorporateDirectionSectionProps = {
  locale: Locale;
  content: AboutStoryBlock;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function CorporateDirectionSection({ locale, content }: CorporateDirectionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isDesktop = useDesktopLayout();
  const isArabic = locale === "ar";
  const ui = siteCopy[locale].ui.about;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  return (
    <section id="direction" ref={sectionRef} className="relative scroll-mt-20 overflow-hidden border-b border-copad-deep/10 bg-copad-white px-4 pt-12 pb-14 sm:px-8 sm:pt-20 sm:pb-20 lg:h-[190vh] lg:px-12 lg:py-0">
      <ScrollAtmosphere progress={scrollYProgress} chapter="03" />
      <div dir="ltr" className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-10 sm:gap-14 lg:sticky lg:top-0 lg:min-h-screen lg:grid-cols-[.88fr_1.12fr] lg:gap-20">
        <ScrollSceneItem
          progress={scrollYProgress}
          active={isDesktop}
          side="left"
          role="copy"
          dir={isArabic ? "rtl" : "ltr"}
        >
          <p className="text-[10px] font-black tracking-[0.22em] text-copad-green uppercase">{ui.directionEyebrow}</p>
          <h2 className="mt-4 max-w-2xl font-display text-[2.35rem] leading-[1] tracking-[-0.045em] text-copad-deep sm:mt-5 sm:text-5xl lg:text-7xl">{content.title}</h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-copad-deep/68 sm:mt-8 sm:text-base sm:leading-8 lg:text-lg lg:leading-9">{content.body}</p>

          <div className="mt-7 border-t border-copad-deep/12 sm:mt-10">
            {ui.directionDrivers.map((item, index) => (
              <AboutProgressRow
                key={item}
                progress={scrollYProgress}
                active={isDesktop && !reduceMotion}
                index={index}
                direction={isArabic ? 1 : -1}
                className="grid grid-cols-[2.75rem_1fr] items-center border-b border-copad-deep/12 py-4 sm:grid-cols-[3.5rem_1fr] sm:py-5"
              >
                <span className="text-[9px] font-black tracking-[0.16em] text-copad-green">0{index + 1}</span>
                <p className="text-sm font-bold text-copad-deep/72">{item}</p>
              </AboutProgressRow>
            ))}
          </div>
        </ScrollSceneItem>

        <ScrollSceneItem progress={scrollYProgress} active={isDesktop} side="right" role="media">
        <ScrollImageReveal
          direction="right"
          progress={isDesktop ? scrollYProgress : undefined}
          timeline={isDesktop}
          className="group relative min-h-[23rem] overflow-hidden rounded-[1.5rem] bg-copad-deep shadow-[0_22px_60px_rgba(15,61,57,.13)] sm:min-h-[35rem] sm:rounded-[2rem] sm:shadow-[0_28px_80px_rgba(15,61,57,.14)] lg:min-h-[43rem]"
        >
          <Image className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.025]" src="/images/copad-cleanroom.png" alt={ui.directionImageAlt} fill sizes="(max-width: 1024px) 100vw, 56vw" />
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-copad-deep/72 via-transparent to-copad-deep/5" />
          <div dir={isArabic ? "rtl" : "ltr"} className="absolute right-4 bottom-4 left-4 rounded-[1.25rem] border border-white/18 bg-copad-deep/84 p-5 text-white backdrop-blur-md sm:right-6 sm:bottom-6 sm:left-6 sm:rounded-[1.4rem] sm:p-6 lg:right-8 lg:bottom-8 lg:left-auto lg:w-[22rem] lg:p-7">
            <span className="text-[9px] font-black tracking-[0.18em] text-copad-green uppercase">{ui.ambitionEyebrow}</span>
            <p className="mt-2 font-display text-4xl leading-none tracking-[-0.05em] sm:text-5xl">{ui.ambitionValue}</p>
            <p className="mt-3 text-xs leading-6 text-white/68">{ui.ambitionBody}</p>
          </div>
        </ScrollImageReveal>
        </ScrollSceneItem>
      </div>
    </section>
  );
}

function AboutProgressRow({ progress, active, index, direction, className, children }: { progress: MotionValue<number>; active: boolean; index: number; direction: number; className: string; children: React.ReactNode }) {
  const start = 0.24 + index * 0.09;
  const opacity = useTransform(progress, [start, start + 0.1, 1], [0, 1, 1]);
  const x = useTransform(progress, [start, start + 0.1, 1], [direction * 22, 0, 0]);

  return (
    <motion.div
      className={className}
      initial={active ? false : { opacity: 0, x: direction * 16 }}
      whileInView={active ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.55, delay: index * 0.07, ease }}
      style={active ? { opacity, x } : undefined}
    >
      {children}
    </motion.div>
  );
}
