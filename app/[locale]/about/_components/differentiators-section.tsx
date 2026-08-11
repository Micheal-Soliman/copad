"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { ScrollAtmosphere } from "@/components/motion/scroll-atmosphere";
import { ScrollImageReveal } from "@/components/motion/scroll-image-reveal";
import { ScrollSceneItem } from "@/components/motion/scroll-scene-item";
import { useDesktopLayout } from "@/components/motion/use-desktop-layout";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import type { AboutStoryBlock } from "./about-types";

type DifferentiatorsSectionProps = {
  locale: Locale;
  content: AboutStoryBlock;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function DifferentiatorsSection({ locale, content }: DifferentiatorsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isDesktop = useDesktopLayout();
  const isArabic = locale === "ar";
  const ui = siteCopy[locale].ui.about;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  return (
    <section id="specialization" ref={sectionRef} className="relative scroll-mt-20 overflow-hidden bg-copad-deep px-4 py-14 text-white sm:px-8 sm:py-20 lg:h-[190vh] lg:px-12 lg:py-0">
      <ScrollAtmosphere progress={scrollYProgress} reverse chapter="04" />
      <div dir="ltr" className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-10 sm:gap-14 lg:sticky lg:top-0 lg:min-h-screen lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
        <ScrollSceneItem progress={scrollYProgress} active={isDesktop} side="left" role="media">
        <ScrollImageReveal
          direction="left"
          progress={isDesktop ? scrollYProgress : undefined}
          timeline={isDesktop}
          className="relative min-h-[23rem] overflow-hidden rounded-[1.5rem] border border-white/12 bg-copad-deep/60 shadow-[0_22px_60px_rgba(0,0,0,.18)] sm:min-h-[34rem] sm:rounded-[2rem] sm:shadow-[0_26px_80px_rgba(0,0,0,.2)] lg:min-h-[41rem]"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/copad-divisions-atlas.png)", backgroundSize: "400% 100%", backgroundPosition: "0% center", backgroundRepeat: "no-repeat" }}
          />
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-copad-deep/88 via-copad-deep/18 to-transparent" />
          <div className="absolute right-5 bottom-5 left-5 border-t border-white/25 pt-4 sm:right-7 sm:bottom-7 sm:left-7 sm:pt-5 lg:right-9 lg:bottom-9 lg:left-9">
            <span className="text-[9px] font-black tracking-[0.18em] text-copad-green uppercase">{ui.distinctionImageEyebrow}</span>
            <p className="mt-2 max-w-md text-sm leading-7 font-bold text-white/82">{ui.distinctionImageBody}</p>
          </div>
        </ScrollImageReveal>
        </ScrollSceneItem>

        <ScrollSceneItem
          progress={scrollYProgress}
          active={isDesktop}
          side="right"
          role="copy"
          dir={isArabic ? "rtl" : "ltr"}
        >
          <p className="text-[10px] font-black tracking-[0.22em] text-copad-green uppercase">{ui.distinctionEyebrow}</p>
          <h2 className="mt-4 max-w-2xl font-display text-[2.35rem] leading-[1] tracking-[-0.045em] sm:mt-5 sm:text-5xl lg:text-7xl">{content.title}</h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-white/68 sm:mt-8 sm:text-base sm:leading-8 lg:text-lg lg:leading-9">{content.body}</p>

          <div className="mt-7 border-t border-white/14 sm:mt-10">
            {ui.specialties.map((specialty, index) => (
              <AboutSpecialtyRow
                key={specialty}
                progress={scrollYProgress}
                active={isDesktop && !reduceMotion}
                index={index}
                direction={isArabic ? -1 : 1}
                className="group grid grid-cols-[2.75rem_1fr] items-center border-b border-white/14 py-4 sm:grid-cols-[3.5rem_1fr] sm:py-5"
              >
                <span className="text-[9px] font-black tracking-[0.16em] text-copad-green">0{index + 1}</span>
                <div className="flex items-center justify-between gap-5">
                  <p className="text-sm font-bold text-white/76 transition-colors group-hover:text-white lg:text-base">{specialty}</p>
                  <span aria-hidden="true" className="h-px w-7 origin-end bg-copad-green transition-[width] duration-500 group-hover:w-16" />
                </div>
              </AboutSpecialtyRow>
            ))}
          </div>
        </ScrollSceneItem>
      </div>
    </section>
  );
}

function AboutSpecialtyRow({ progress, active, index, direction, className, children }: { progress: MotionValue<number>; active: boolean; index: number; direction: number; className: string; children: React.ReactNode }) {
  const start = 0.24 + index * 0.09;
  const opacity = useTransform(progress, [start, start + 0.1, 1], [0, 1, 1]);
  const x = useTransform(progress, [start, start + 0.1, 1], [direction * 22, 0, 0]);
  const scanScale = useTransform(progress, [start + 0.04, start + 0.16, 1], [0, 1, 1]);

  return (
    <motion.div className={className} initial={active ? false : { opacity: 0, x: direction * 18 }} whileInView={active ? undefined : { opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.55 }} transition={{ duration: 0.55, delay: index * 0.07, ease }} style={active ? { opacity, x } : undefined}>
      {children}
      <motion.span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px origin-start bg-copad-green/70" style={active ? { scaleX: scanScale } : undefined} />
    </motion.div>
  );
}
