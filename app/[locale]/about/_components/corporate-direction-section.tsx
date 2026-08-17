"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import type { AboutStoryBlock } from "./about-types";

const ease = [0.22, 1, 0.36, 1] as const;

export function CorporateDirectionSection({ locale, content }: { locale: Locale; content: AboutStoryBlock }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isArabic = locale === "ar";
  const ui = siteCopy[locale].ui.about;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imageX = useTransform(scrollYProgress, [0, 1], isArabic ? ["5%", "-5%"] : ["-5%", "5%"]);
  const lineScale = useTransform(scrollYProgress, [0.18, 0.72], [0, 1]);

  return (
    <section id="direction" ref={sectionRef} className="relative scroll-mt-20 overflow-hidden bg-copad-white px-4 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_86%_15%,rgba(0,144,175,.12),transparent_27%),linear-gradient(180deg,transparent,rgba(238,235,229,.5))]" />
      <div dir={isArabic ? "rtl" : "ltr"} className="relative mx-auto max-w-[1440px]">
        <div className="grid items-end gap-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .8, ease }}>
            <p className="text-[10px] font-black tracking-[.22em] text-copad-green uppercase">{ui.directionEyebrow}</p>
            <h2 className="mt-5 max-w-4xl font-display text-[clamp(2.7rem,7vw,6.5rem)] leading-[.9] tracking-[-.055em] text-copad-deep">{content.title}</h2>
          </motion.div>
          <motion.p initial={reduceMotion ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .4 }} transition={{ duration: .75, delay: .12, ease }} className="text-sm leading-7 text-copad-deep/66 sm:text-base sm:leading-8 lg:text-lg lg:leading-9">{content.body}</motion.p>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-[1.8rem] bg-copad-deep sm:mt-16 sm:rounded-[2.5rem] lg:min-h-[34rem]">
          <motion.div className="absolute -inset-x-[8%] inset-y-0" style={reduceMotion ? undefined : { x: imageX }}>
            <Image src="/images/copad-cleanroom.png" alt={ui.directionImageAlt} fill className="object-cover" sizes="100vw" />
          </motion.div>
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-copad-deep/92 via-copad-deep/52 to-copad-deep/20 rtl:bg-linear-to-l" />
          <div className="relative flex min-h-[29rem] flex-col justify-between p-6 text-white sm:p-10 lg:min-h-[34rem] lg:p-14">
            <div className="flex items-start justify-between gap-6">
              <p className="max-w-44 text-[9px] font-black tracking-[.2em] text-copad-green uppercase">{ui.ambitionEyebrow}</p>
              <span className="font-display text-7xl leading-none text-white/10 sm:text-9xl">20</span>
            </div>
            <div>
              <p className="max-w-3xl font-display text-[clamp(3rem,8vw,7.5rem)] leading-[.82] tracking-[-.06em]">{ui.ambitionValue}</p>
              <p className="mt-5 max-w-lg text-sm leading-7 text-white/70 sm:text-base">{ui.ambitionBody}</p>
              <div className="relative mt-10 grid gap-3 border-t border-white/25 pt-5 sm:grid-cols-3 sm:gap-0">
                <motion.span aria-hidden="true" className="absolute top-[-1px] start-0 h-px w-full origin-start bg-copad-green rtl:origin-right" style={reduceMotion ? undefined : { scaleX: lineScale }} />
                {ui.directionDrivers.map((item, index) => (
                  <motion.div key={item} initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .6 }} transition={{ duration: .55, delay: index * .1, ease }} className="flex items-center gap-3 sm:border-e sm:border-white/18 sm:px-5 first:ps-0 last:border-0">
                    <span className="text-[9px] font-black text-copad-green">0{index + 1}</span>
                    <span className="text-xs font-bold text-white/82 sm:text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
