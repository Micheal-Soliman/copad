"use client";

import { FactoryIcon } from "@phosphor-icons/react/dist/csr/Factory";
import { GearSixIcon } from "@phosphor-icons/react/dist/csr/GearSix";
import { ShieldCheckIcon } from "@phosphor-icons/react/dist/csr/ShieldCheck";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useDesktopLayout } from "@/components/motion/use-desktop-layout";
import type { Section } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { scrollSceneStyle } from "@/lib/motion/scroll-system";

const ease = [0.22, 1, 0.36, 1] as const;

export function ManufacturingHero({ locale, content }: { locale: Locale; content: Section }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isDesktop = useDesktopLayout();
  const isArabic = locale === "ar";
  const driven = isDesktop && !reduceMotion;
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const titleOpacity = useTransform(scrollYProgress, [.015, .08, .3, .36, 1], [.16, 1, 1, 0, 0]);
  const titleY = useTransform(scrollYProgress, [.015, .13, .36, 1], [52, 0, -44, -44]);
  const copyOpacity = useTransform(scrollYProgress, [.06, .15, .31, .38, 1], [0, 1, 1, 0, 0]);
  const copyY = useTransform(scrollYProgress, [.06, .18, .38, 1], [36, 0, -32, -32]);
  const sideImageOpacity = useTransform(scrollYProgress, [.12, .23, .33, .4, 1], [0, 1, 1, 0, 0]);
  const sideImageX = useTransform(scrollYProgress, [.12, .28, .4, 1], [isArabic ? -130 : 130, 0, isArabic ? 80 : -80, isArabic ? 80 : -80]);
  const sideImageClip = useTransform(scrollYProgress, [.12, .3, 1], ["inset(0% 100% 0% 0% round 2.2rem)", "inset(0% 0% 0% 0% round 2.2rem)", "inset(0% 0% 0% 0% round 2.2rem)"]);
  const statusOpacity = useTransform(scrollYProgress, [.82, .88, 1], [0, 1, 1]);
  const statusY = useTransform(scrollYProgress, [.82, .88, 1], [24, 0, 0]);

  return (
    <section ref={sectionRef} id="home" style={scrollSceneStyle(7)} className="relative min-h-svh bg-copad-deep text-white lg:h-[var(--scroll-scene-height)]">
      <div className="relative isolate min-h-[100svh] overflow-hidden lg:sticky lg:top-0 lg:h-screen">
        <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_70%_42%,rgba(0,144,175,.34),transparent_34%),radial-gradient(circle_at_16%_88%,rgba(232,245,253,.09),transparent_26%),linear-gradient(135deg,#013d60,#013d60_55%,#013d60)]" />

        <div dir={isArabic ? "rtl" : "ltr"} className="relative z-20 mx-auto grid min-h-[100svh] max-w-[1440px] items-center gap-10 px-4 pt-24 pb-12 sm:px-8 lg:grid-cols-[.88fr_1.12fr] lg:px-12">
          <div className="relative z-10 max-w-3xl">
            <motion.p initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease }} className="text-[9px] font-black tracking-[.24em] text-copad-green uppercase">{content.eyebrow}</motion.p>
            <motion.h1 className={`${isArabic ? "font-sans font-black leading-[1.03]" : "font-display leading-[.86]"} mt-5 text-[clamp(3.7rem,14vw,6rem)] tracking-[-.06em] sm:text-7xl lg:text-[clamp(4.7rem,6.7vw,7rem)]`} style={driven ? { opacity: titleOpacity, y: titleY } : undefined}>{content.title}</motion.h1>
            <motion.div className="mt-7 max-w-2xl border-s-2 border-copad-green ps-5 text-sm leading-7 text-white/74 sm:text-base sm:leading-8" style={driven ? { opacity: copyOpacity, y: copyY } : undefined}>
              {splitIntro(content.intro).map((line, index) => <ScrollCopyLine key={line} index={index} progress={scrollYProgress} driven={driven}>{line}</ScrollCopyLine>)}
            </motion.div>
          </div>

          <motion.div className="relative hidden aspect-[1.16] overflow-hidden rounded-[2.2rem] border border-white/18 bg-copad-deep/50 shadow-[0_38px_95px_rgba(0,0,0,.34)] lg:block" style={driven ? { opacity: sideImageOpacity, x: sideImageX, clipPath: sideImageClip } : undefined}>
            <Image src="/images/copad-cleanroom.png" alt="" fill sizes="52vw" loading="eager" className="object-cover saturate-[.82] contrast-[1.08]" />
            <div className="absolute inset-0 bg-linear-to-t from-copad-deep/72 via-transparent to-copad-deep/14" />
            <div className="absolute inset-x-6 bottom-6 flex items-center justify-between border-t border-white/28 pt-4"><span className="text-[9px] font-black tracking-[.2em] text-white uppercase">{isArabic ? "قاعدة التصنيع" : "Manufacturing base"}</span><FactoryIcon size={29} weight="duotone" className="text-copad-green" /></div>
          </motion.div>
        </div>

        {driven && <FactoryBuildSequence locale={locale} progress={scrollYProgress} />}

        <motion.div dir={isArabic ? "rtl" : "ltr"} className="absolute inset-x-4 bottom-7 z-30 mx-auto flex max-w-[1344px] items-end justify-between gap-6 border-t border-white/28 pt-4 sm:inset-x-8 lg:inset-x-12 lg:bottom-9" style={driven ? { opacity: statusOpacity, y: statusY } : undefined}>
          <div><span className="block text-[8px] font-black tracking-[.2em] text-copad-green uppercase">{isArabic ? "حالة المنشأة" : "Facility status"}</span><strong className="mt-1 block text-sm text-white sm:text-base">{isArabic ? "منظومة التصنيع مكتملة" : "Manufacturing system assembled"}</strong></div>
          <div dir="ltr" className="flex items-center gap-3"><span className="relative size-2 rounded-full bg-copad-green shadow-[0_0_16px_rgba(0,144,175,.8)]"><span className="absolute -inset-2 animate-ping rounded-full border border-copad-green/40" /></span><span className="text-[9px] font-black tracking-[.18em] text-white/60">04 / 04</span></div>
        </motion.div>
      </div>
    </section>
  );
}

function FactoryBuildSequence({ locale, progress }: { locale: Locale; progress: MotionValue<number> }) {
  const isArabic = locale === "ar";
  // Explicit hold points keep the assembled facility visible through the
  // fullscreen chapter and make reverse scrolling perfectly deterministic.
  const opacity = useTransform(progress, [.4, .42, .47, 1], [0, 0, 1, 1]);
  const scale = useTransform(progress, [.42, .76, 1], [.92, 1, 1]);
  const rotateY = useTransform(progress, [.42, .76, 1], [isArabic ? -7 : 7, 0, 0]);
  const frameClip = useTransform(progress, [.42, .76, .88, 1], ["inset(17% 7% 11% 7% round 2.6rem)", "inset(17% 7% 11% 7% round 2.6rem)", "inset(0% 0% 0% 0% round 0rem)", "inset(0% 0% 0% 0% round 0rem)"]);
  const completion = useTransform(progress, [.44, .77, 1], [0, 1, 1]);
  const scanX = useTransform(progress, [.45, .78, 1], ["-24%", "112%", "112%"]);
  const shadeOpacity = useTransform(progress, [.5, .9, 1], [.48, .28, .28]);
  const chromeOpacity = useTransform(progress, [.76, .88, 1], [1, 0, 0]);
  const panelGridOpacity = useTransform(progress, [.76, .86, 1], [1, 0, 0]);
  const finalImageOpacity = useTransform(progress, [.76, .86, 1], [0, 1, 1]);

  return (
    <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 z-25 hidden overflow-hidden lg:block" style={{ opacity, clipPath: frameClip }}>
      <div className="absolute inset-0 [perspective:1600px]">
        <motion.div className="absolute inset-0 overflow-hidden border border-copad-green/65 bg-[#013d60] shadow-[0_45px_110px_rgba(0,0,0,.44),0_0_75px_rgba(0,144,175,.18)] [transform-style:preserve-3d]" style={{ scale, rotateY }}>
          <motion.div className="absolute inset-0" style={{ opacity: finalImageOpacity }}>
            <Image src="/images/copad-cleanroom.png" alt="" fill sizes="100vw" loading="eager" className="object-cover object-center saturate-[.84] contrast-[1.1]" />
          </motion.div>
          <motion.div className="absolute inset-0 flex gap-[3px] bg-copad-green/35 p-[3px]" style={{ opacity: panelGridOpacity }}>
            {[0, 1, 2, 3, 4].map(index => <FactoryPanel key={index} index={index} progress={progress} />)}
          </motion.div>
          <motion.div className="absolute inset-0 bg-copad-deep mix-blend-multiply" style={{ opacity: shadeOpacity }} />
          <div className="absolute inset-0 bg-linear-to-t from-copad-deep/64 via-transparent to-copad-deep/16" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/12" />
          <motion.span className="absolute inset-y-0 w-[16%] -skew-x-12 bg-linear-to-r from-transparent via-white/28 to-transparent blur-md" style={{ x: scanX }} />

          <motion.div className="absolute inset-x-7 top-7 flex items-center justify-between" style={{ opacity: chromeOpacity }}>
            <div className="flex items-center gap-3"><span className="relative size-3 rounded-full bg-copad-green shadow-[0_0_20px_rgba(0,144,175,.95)]"><span className="absolute -inset-2 rounded-full border border-copad-green/45" /></span><span className="text-[9px] font-black tracking-[.22em] text-white uppercase">{isArabic ? "تجميع منشأة كوباد" : "COPAD facility assembly"}</span></div>
            <div className="flex gap-2"><SystemBadge Icon={FactoryIcon} /><SystemBadge Icon={GearSixIcon} /><SystemBadge Icon={ShieldCheckIcon} /></div>
          </motion.div>

          <motion.div className="absolute inset-x-7 bottom-7" style={{ opacity: chromeOpacity }}>
            <div className="mb-3 flex items-center justify-between text-[9px] font-black tracking-[.18em] text-white uppercase"><span>{isArabic ? "من المخطط إلى التشغيل" : "Blueprint to operation"}</span><span className="text-copad-green">04 / 04</span></div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/17"><motion.span className="block h-full origin-left rounded-full bg-copad-green shadow-[0_0_18px_rgba(0,144,175,.85)] rtl:origin-right" style={{ scaleX: completion }} /></div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function FactoryPanel({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const start = .44 + index * .052;
  const y = useTransform(progress, [start, start + .12, 1], [index % 2 ? 115 : -115, 0, 0]);
  const opacity = useTransform(progress, [start, start + .06, 1], [0, 1, 1]);
  const rotateX = useTransform(progress, [start, start + .12, 1], [index % 2 ? -16 : 16, 0, 0]);
  return (
    <motion.span className="relative h-full flex-1 overflow-hidden bg-copad-deep [transform-style:preserve-3d]" style={{ y, opacity, rotateX }}>
      <span className="absolute inset-0 scale-[1.02] bg-[url('/images/copad-cleanroom.png')] bg-no-repeat saturate-[.84] contrast-[1.1]" style={{ backgroundSize: "500% auto", backgroundPosition: `${index * 25}% center` }} />
      <span className="absolute inset-0 bg-copad-deep/16 mix-blend-multiply" />
    </motion.span>
  );
}

function SystemBadge({ Icon }: { Icon: typeof FactoryIcon }) {
  return <span className="grid size-10 place-items-center rounded-xl border border-white/18 bg-copad-deep/68 text-copad-green shadow-[0_14px_32px_rgba(0,0,0,.3)] backdrop-blur-md"><Icon size={21} weight="duotone" /></span>;
}

function splitIntro(intro: string) {
  const parts = intro.match(/[^.!?؟]+[.!?؟]?/g)?.map(part => part.trim()).filter(Boolean);
  return parts && parts.length > 1 ? parts : [intro];
}

function ScrollCopyLine({ children, index, progress, driven }: { children: string; index: number; progress: MotionValue<number>; driven: boolean }) {
  const start = .07 + index * .045;
  const opacity = useTransform(progress, [start, start + .055, 1], [0, 1, 1]);
  const x = useTransform(progress, [start, start + .07, 1], [index % 2 ? 34 : -34, 0, 0]);
  return <motion.span className="block" style={driven ? { opacity, x } : undefined}>{children}</motion.span>;
}
