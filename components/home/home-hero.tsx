"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { useDesktopLayout } from "@/components/motion/use-desktop-layout";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";

type HomeHeroProps = {
  locale: Locale;
  eyebrow: string;
  title: string;
  subheadline: string;
  body: string;
  primaryCta: string;
  secondaryCta: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

const mobileSequence: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.065 } },
};

const mobileLine: Variants = {
  hidden: (side: number) => ({ opacity: 0.45, x: side * 28 }),
  visible: { opacity: 1, x: 0, transition: { duration: 0.62, ease } },
};

const mobileActions: Variants = {
  hidden: { opacity: 0.45, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease } },
};

export function HomeHero(props: HomeHeroProps) {
  const reduceMotion = useReducedMotion();
  const isDesktop = useDesktopLayout();
  const sectionRef = useRef<HTMLElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const timelineProgress = useMotionValue(0);
  const glowX = useSpring(pointerX, { stiffness: 85, damping: 22, mass: 0.55 });
  const glowY = useSpring(pointerY, { stiffness: 85, damping: 22, mass: 0.55 });
  const mediaY = useTransform(timelineProgress, [0, 0.34, 1], [0, -12, 72]);
  const mediaScale = useTransform(timelineProgress, [0, 0.34, 1], [1, 1.08, 1.13]);
  const mediaCurtainY = useTransform(timelineProgress, [0.06, 0.3], ["0%", "-104%"]);
  const mediaLight = useTransform(timelineProgress, [0, 0.22, 0.42], [0.15, 0.55, 0]);
  const titleOpacity = useTransform(timelineProgress, [0, 0.1, 0.25], [1, 1, 0]);
  const titleClip = useTransform(timelineProgress, [0.08, 0.18], ["inset(0% 0% 0% 0%)", "inset(100% 0% 0% 0%)"]);
  const titleY = useTransform(timelineProgress, [0, 0.25], [0, -105]);
  const titleRotateX = useTransform(timelineProgress, [0.08, 0.25], [0, -72]);
  const secondOpacity = useTransform(timelineProgress, [0.2, 0.31, 0.46, 0.5], [0, 1, 1, 0]);
  const secondClip = useTransform(timelineProgress, [0.2, 0.31, 0.46, 0.5], ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(100% 0% 0% 0%)"]);
  const secondY = useTransform(timelineProgress, [0.2, 0.31, 0.5], [90, 0, -65]);
  const secondRotateX = useTransform(timelineProgress, [0.2, 0.31, 0.5], [68, 0, -38]);
  const thirdOpacity = useTransform(timelineProgress, [0.51, 0.62], [0, 1]);
  const thirdY = useTransform(timelineProgress, [0.51, 0.64, 1], [76, 0, -12]);
  const thirdRotateX = useTransform(timelineProgress, [0.51, 0.64], [58, 0]);
  const buttonOpacity = useTransform(timelineProgress, [0.68, 0.8], [0, 1]);
  const buttonY = useTransform(timelineProgress, [0.68, 0.82], [28, 0]);
  const sweepX = useTransform(timelineProgress, [0, 1], ["-38%", "78%"]);
  const handoffScale = useTransform(timelineProgress, [0.78, 1], [0, 1]);
  const handoffOpacity = useTransform(timelineProgress, [0.74, 1], [0, 1]);
  const direction = props.locale === "ar" ? -1 : 1;
  const ui = siteCopy[props.locale].ui.home;
  const motionEnabled = isDesktop && !reduceMotion;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      timelineProgress.set(Math.min(1, Math.max(0, (window.scrollY - sectionTop) / travel)));
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(scheduleUpdate);

    update();
    frame = window.requestAnimationFrame(() => {
      frame = window.requestAnimationFrame(update);
    });
    observer.observe(section);
    window.addEventListener("pageshow", scheduleUpdate);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pageshow", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [timelineProgress]);

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (!motionEnabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - (rect.left + rect.width / 2)) * 0.34);
    pointerY.set((event.clientY - (rect.top + rect.height / 2)) * 0.28);
  }

  function resetPointerLight() {
    pointerX.set(0);
    pointerY.set(0);
  }

  const primaryHref = `/${props.locale}/about`;
  const secondaryHref = `/${props.locale}/therapeutic-areas`;

  return (
    <section ref={sectionRef} onPointerMove={handlePointerMove} onPointerLeave={resetPointerLight} id="home" className="relative min-h-svh scroll-mt-20 bg-copad-deep text-white lg:h-[260vh]">
      <div className="relative flex min-h-svh items-center overflow-hidden px-4 pt-24 pb-14 text-center sm:px-8 sm:pb-10 lg:sticky lg:top-0 lg:h-screen lg:px-12">
        <motion.div className="absolute inset-0 transform-gpu will-change-transform" style={motionEnabled ? { y: mediaY, scale: mediaScale } : undefined}>
          <Image className="object-cover opacity-90 saturate-[.72] contrast-[1.04]" src="/images/copad-campus-hero.png" alt={ui.heroImageAlt} fill priority sizes="100vw" />
        </motion.div>
        <div className="absolute inset-0 bg-copad-deep/58 mix-blend-multiply" />
        <div className="absolute inset-0 bg-copad-green/16 mix-blend-color" />
        <div className="absolute inset-0 bg-linear-to-b from-copad-deep/18 via-copad-deep/28 to-copad-deep/76" />

        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden origin-bottom bg-[linear-gradient(180deg,rgba(15,61,57,.2),rgba(8,39,36,.94))] lg:block" style={motionEnabled ? { y: mediaCurtainY } : { y: "-104%" }} />
        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(circle_at_50%_46%,rgba(255,255,255,.22),transparent_48%)] mix-blend-screen lg:block" style={motionEnabled ? { opacity: mediaLight } : { opacity: 0 }} />
        <motion.div aria-hidden="true" className="pointer-events-none absolute start-1/2 top-[46%] size-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,.14),rgba(16,159,131,.08)_34%,transparent_68%)] mix-blend-screen blur-2xl" style={motionEnabled ? { x: glowX, y: glowY } : undefined} />
        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-y-0 hidden w-[28%] -skew-x-12 bg-linear-to-r from-transparent via-white/[.055] to-transparent lg:block" style={motionEnabled ? { x: sweepX } : undefined} />

        <motion.div className="relative mx-auto flex w-full max-w-5xl flex-col items-center lg:hidden" variants={mobileSequence} initial={reduceMotion ? false : "hidden"} animate="visible">
          <motion.p variants={mobileLine} custom={-1 * direction} className="text-[10px] font-black tracking-[0.24em] text-copad-green uppercase">{props.eyebrow}</motion.p>
          <motion.h1 variants={mobileLine} custom={1 * direction} className="mt-4 font-display text-[3.15rem] leading-[.94] tracking-[-0.055em] text-balance sm:text-7xl">{props.title}</motion.h1>
          <motion.p variants={mobileLine} custom={-1 * direction} className="mt-5 max-w-4xl text-lg leading-snug font-bold text-balance text-white/95 drop-shadow-[0_2px_12px_rgba(15,61,57,.38)] sm:text-2xl">{props.subheadline}</motion.p>
          <motion.p variants={mobileLine} custom={1 * direction} className="mt-4 max-w-4xl text-sm leading-7 text-pretty text-white/78 drop-shadow-[0_2px_10px_rgba(15,61,57,.38)]">{props.body}</motion.p>
          <motion.div variants={mobileActions} className="mt-7 flex w-full max-w-md flex-col items-center justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-4">
            <HeroButtons primaryHref={primaryHref} secondaryHref={secondaryHref} primary={props.primaryCta} secondary={props.secondaryCta} cursorLabel={ui.interactionLabels.go} />
          </motion.div>
        </motion.div>

        <div className="relative z-10 mx-auto hidden h-[34rem] w-full max-w-6xl [perspective:1400px] lg:block">
          <motion.p className="absolute inset-x-0 top-2 text-[10px] font-black tracking-[0.24em] text-copad-green uppercase" style={{ clipPath: titleClip, opacity: titleOpacity }}>{props.eyebrow}</motion.p>

          <motion.div initial={reduceMotion ? false : { opacity: 0.45 }} animate={{ opacity: 1 }} transition={{ duration: 0.72, ease }} className="absolute inset-0 flex items-center justify-center">
            <motion.h1 className="max-w-6xl origin-top font-display text-[clamp(5rem,7.6vw,7.4rem)] leading-[.88] tracking-[-0.06em] text-balance [backface-visibility:hidden]" style={{ clipPath: titleClip, opacity: titleOpacity, y: titleY, rotateX: titleRotateX }}>{props.title}</motion.h1>
          </motion.div>

          <motion.div className="absolute inset-0 flex items-center justify-center" style={{ clipPath: secondClip, opacity: secondOpacity, y: secondY, rotateX: secondRotateX }}>
            <h2 className="max-w-5xl text-5xl leading-[1.02] font-bold text-balance text-white drop-shadow-[0_4px_22px_rgba(15,61,57,.45)] xl:text-6xl">{props.subheadline}</h2>
          </motion.div>

          <motion.div className="absolute inset-x-0 top-[28%] flex flex-col items-center" style={{ opacity: thirdOpacity, y: thirdY, rotateX: thirdRotateX }}>
            <p className="max-w-4xl text-xl leading-9 text-pretty text-white/88 drop-shadow-[0_3px_18px_rgba(15,61,57,.45)]">{props.body}</p>
          </motion.div>

          <motion.div className="absolute inset-x-0 bottom-20 flex items-center justify-center gap-4" style={{ opacity: buttonOpacity, y: buttonY }}>
            <HeroButtons primaryHref={primaryHref} secondaryHref={secondaryHref} primary={props.primaryCta} secondary={props.secondaryCta} cursorLabel={ui.interactionLabels.go} />
          </motion.div>
        </div>

        <span aria-hidden="true" className="absolute bottom-5 start-1/2 h-10 w-px -translate-x-1/2 overflow-hidden bg-white/24">
          <motion.span className="absolute inset-x-0 top-0 h-1/2 bg-copad-green" animate={reduceMotion ? undefined : { y: ["-100%", "200%"] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
        </span>
        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-copad-white/20 to-transparent" style={motionEnabled ? { opacity: handoffOpacity } : undefined} />
        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-x-[6%] bottom-0 h-[3px] origin-left bg-linear-to-r from-transparent via-copad-green to-transparent shadow-[0_0_24px_rgba(16,159,131,.65)] rtl:origin-right" style={motionEnabled ? { scaleX: handoffScale } : undefined} />
      </div>
    </section>
  );
}

function HeroButtons({ primaryHref, secondaryHref, primary, secondary, cursorLabel }: { primaryHref: string; secondaryHref: string; primary: string; secondary: string; cursorLabel: string }) {
  return (
    <>
      <Link data-magnetic data-cursor-label={cursorLabel} className="group relative isolate w-full min-w-44 overflow-hidden rounded-full bg-white px-7 py-3.5 text-xs font-black text-copad-deep shadow-[0_15px_35px_rgba(0,0,0,.16)] transition duration-500 hover:-translate-y-1 hover:text-white sm:w-auto" href={primaryHref}>
        <span className="absolute inset-0 -z-10 translate-y-full rounded-full bg-copad-green transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0" />
        <span className="relative">{primary}</span>
      </Link>
      <Link data-magnetic data-cursor-label={cursorLabel} className="group relative isolate w-full min-w-44 overflow-hidden rounded-full border border-white/50 px-7 py-3.5 text-xs font-black text-white backdrop-blur-sm transition duration-500 hover:-translate-y-1 hover:border-copad-green sm:w-auto" href={secondaryHref}>
        <span className="absolute inset-y-0 start-0 -z-10 w-0 bg-white/12 transition-all duration-500 group-hover:w-full" />
        <span className="absolute inset-x-7 bottom-2 h-px origin-center scale-x-0 bg-copad-green transition-transform duration-500 group-hover:scale-x-100" />
        <span className="relative">{secondary}</span>
      </Link>
    </>
  );
}
