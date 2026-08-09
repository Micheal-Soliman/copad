"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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

const sequence: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0,
      staggerChildren: 0.05,
    },
  },
};

const line: Variants = {
  hidden: (side: number) => ({ opacity: 0.48, x: side * 30 }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.58, ease },
  },
};

const actions: Variants = {
  hidden: { opacity: 0.55, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease },
  },
};

export function HomeHero(props: HomeHeroProps) {
  const reduceMotion = useReducedMotion();
  const direction = props.locale === "ar" ? -1 : 1;
  const ui = siteCopy[props.locale].ui.home;

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-copad-deep px-4 pt-24 pb-14 text-center text-white sm:px-8 sm:pb-10 lg:px-12">
      <Image
        className="object-cover opacity-90 saturate-[.72] contrast-[1.04]"
        src="/images/copad-campus-hero.png"
        alt={ui.heroImageAlt}
        fill
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-copad-deep/58 mix-blend-multiply" />
      <div className="absolute inset-0 bg-copad-green/16 mix-blend-color" />
      <div className="absolute inset-0 bg-linear-to-b from-copad-deep/18 via-copad-deep/28 to-copad-deep/76" />

      <motion.div
        className="relative mx-auto flex w-full max-w-5xl flex-col items-center"
        variants={sequence}
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
      >
        <motion.p variants={line} custom={-1 * direction} className="will-change-transform text-[10px] font-black tracking-[0.24em] text-copad-green uppercase">
          {props.eyebrow}
        </motion.p>
        <motion.h1 variants={line} custom={1 * direction} className="mt-4 will-change-transform font-display text-[3.15rem] leading-[.94] tracking-[-0.055em] text-balance sm:text-7xl lg:text-[6.75rem]">
          {props.title}
        </motion.h1>
        <motion.p variants={line} custom={-1 * direction} className="mt-5 max-w-4xl will-change-transform text-lg leading-snug font-bold text-balance text-white/95 drop-shadow-[0_2px_12px_rgba(15,61,57,.38)] sm:text-2xl lg:text-3xl">
          {props.subheadline}
        </motion.p>
        <motion.p variants={line} custom={1 * direction} className="mt-4 max-w-4xl will-change-transform text-sm leading-7 text-pretty text-white/78 drop-shadow-[0_2px_10px_rgba(15,61,57,.38)] lg:text-base lg:leading-8">
          {props.body}
        </motion.p>

        <motion.div variants={actions} className="mt-7 flex w-full max-w-md flex-col items-center justify-center gap-3 will-change-transform sm:w-auto sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-4">
          <Link className="group relative isolate w-full min-w-44 overflow-hidden rounded-full bg-white px-7 py-3.5 text-xs font-black text-copad-deep shadow-[0_15px_35px_rgba(0,0,0,.16)] transition duration-500 hover:-translate-y-1 hover:text-white sm:w-auto" href={`/${props.locale}/about`}>
            <span className="absolute inset-0 -z-10 translate-y-full rounded-full bg-copad-green transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0" />
            <span className="relative">{props.primaryCta}</span>
          </Link>
          <Link className="group relative isolate w-full min-w-44 overflow-hidden rounded-full border border-white/50 px-7 py-3.5 text-xs font-black text-white backdrop-blur-sm transition duration-500 hover:-translate-y-1 hover:border-copad-green sm:w-auto" href={`/${props.locale}/therapeutic-areas`}>
            <span className="absolute inset-y-0 start-0 -z-10 w-0 bg-white/12 transition-all duration-500 group-hover:w-full" />
            <span className="absolute inset-x-7 bottom-2 h-px origin-center scale-x-0 bg-copad-green transition-transform duration-500 group-hover:scale-x-100" />
            <span className="relative">{props.secondaryCta}</span>
          </Link>
        </motion.div>
      </motion.div>

      <span aria-hidden="true" className="absolute bottom-5 start-1/2 hidden h-10 w-px -translate-x-1/2 overflow-hidden bg-white/24 sm:block">
        <motion.span className="absolute inset-x-0 top-0 h-1/2 bg-copad-green" animate={reduceMotion ? undefined : { y: ["-100%", "200%"] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
      </span>
    </section>
  );
}
