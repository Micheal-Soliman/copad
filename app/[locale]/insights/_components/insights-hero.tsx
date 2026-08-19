"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Section } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { scrollSceneStyle } from "@/lib/motion/scroll-system";

export function InsightsHero({ locale, content }: { locale: Locale; content: Section }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const ar = locale === "ar";
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 68, damping: 30, mass: .48 });
  const introOpacity = useTransform(p, [0, .25, .43, 1], [1, 1, 0, 0]);
  const introX = useTransform(p, [0, .43, 1], [0, ar ? 70 : -70, ar ? 70 : -70]);
  const journalX = useTransform(p, [0, .46, .78, 1], [ar ? -30 : 30, 0, ar ? 22 : -22, ar ? 22 : -22]);
  const journalScale = useTransform(p, [0, .5, .78, 1], [.78, .9, 1, 1]);
  const journalRotate = useTransform(p, [0, .35, .72, 1], [ar ? -8 : 8, 0, 0, 0]);
  const coverRotate = useTransform(p, [.12, .58, .82, 1], [0, ar ? 164 : -164, ar ? 178 : -178, ar ? 178 : -178]);
  const coverShadow = useTransform(p, [.12, .65, 1], [1, .4, .15]);
  const spreadOpacity = useTransform(p, [.18, .36, 1], [0, 1, 1]);
  const progress = useTransform(p, [.08, .82, 1], [0, 1, 1]);

  return <section ref={ref} id="home" style={scrollSceneStyle(5)} className="relative min-h-svh bg-copad-deep text-white lg:h-[var(--scroll-scene-height)]">
    <div className="relative isolate min-h-[100svh] overflow-hidden lg:sticky lg:top-0 lg:h-screen">
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(115deg,#013d60,#013d60_55%,#013d60)]" />
      <div className="absolute inset-y-0 start-[48%] w-px bg-white/[.06]" />
      <div dir={ar ? "rtl" : "ltr"} className="mx-auto grid min-h-[100svh] max-w-[1440px] items-center gap-10 px-4 pt-24 pb-12 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:px-12">
        <motion.div className="relative z-20 max-w-xl" style={reduce ? undefined : { opacity: introOpacity, x: introX }}>
          <p className="text-[9px] font-black tracking-[.24em] text-copad-green uppercase">{ar ? "مجلة كوباد الطبية" : "The COPAD Medical Journal"}</p>
          <h1 className={`${ar ? "font-sans font-black leading-[1.02]" : "font-display leading-[.82]"} mt-5 text-[clamp(4rem,16vw,6.8rem)] tracking-[-.065em] lg:text-[clamp(6rem,8vw,8.4rem)]`}>{content.title}</h1>
          <p className="mt-7 border-s-2 border-copad-green ps-5 text-sm leading-7 text-white/68 sm:text-base sm:leading-8">{content.intro}</p>
          <p className="mt-8 text-[8px] font-black tracking-[.2em] text-white/35 uppercase">{ar ? "مرّر لفتح العدد" : "Scroll to open the issue"}</p>
        </motion.div>

        <motion.div className="relative mx-auto aspect-[1.42] w-full max-w-[52rem] [perspective:1900px]" style={reduce ? undefined : { x: journalX, scale: journalScale, rotateZ: journalRotate }}>
          <motion.div className="absolute inset-0 grid grid-cols-2 overflow-hidden rounded-[.35rem_1.6rem_1.6rem_.35rem] bg-copad-white text-copad-deep shadow-[0_45px_120px_rgba(0,0,0,.42)] rtl:rounded-[1.6rem_.35rem_.35rem_1.6rem]" style={{ opacity: spreadOpacity }}>
            <JournalPage ar={ar} side="first" />
            <JournalPage ar={ar} side="second" />
            <span className="absolute inset-y-0 start-1/2 z-10 w-px bg-copad-deep/10 shadow-[0_0_18px_rgba(1,61,96,.22)]" />
          </motion.div>

          <motion.div className="absolute inset-y-0 end-0 z-20 w-1/2 origin-left rounded-e-[1.6rem] border border-white/12 bg-copad-green text-white shadow-[0_35px_95px_rgba(0,0,0,.48)] [backface-visibility:hidden] [transform-style:preserve-3d] rtl:origin-right rtl:rounded-e-none rtl:rounded-s-[1.6rem]" style={reduce ? undefined : { rotateY: coverRotate, opacity: coverShadow }}>
            <div className="absolute inset-0 overflow-hidden rounded-[inherit] bg-[linear-gradient(145deg,#0090af,#013d60_72%)] p-6 sm:p-9">
              <span className="text-[8px] font-black tracking-[.22em] text-white/65 uppercase">COPAD / 01</span>
              <span className={`${ar ? "font-sans font-black" : "font-display"} mt-16 block text-[clamp(2.7rem,6vw,5rem)] leading-[.86] tracking-[-.055em]`}>{ar ? "المعرفة الصحية" : "Healthcare Insights"}</span>
              <span className="absolute inset-x-6 bottom-8 border-t border-white/24 pt-4 text-[8px] font-black tracking-[.16em] text-white/55 uppercase sm:inset-x-9">{ar ? "وعي • تغذية • قطاع" : "Awareness · Nutrition · Industry"}</span>
              <span className="absolute -end-16 -top-12 font-display text-[18rem] leading-none text-white/[.045]">01</span>
            </div>
          </motion.div>

          <div className="absolute inset-x-[7%] -bottom-9"><div className="mb-2 flex justify-between text-[8px] font-black tracking-[.18em] text-white/40 uppercase"><span>{ar ? "فتح العدد" : "Opening the issue"}</span><span>01 / 01</span></div><div className="h-1 overflow-hidden rounded-full bg-white/12"><motion.span className="block h-full origin-left bg-copad-green rtl:origin-right" style={{ scaleX: progress }} /></div></div>
        </motion.div>
      </div>
    </div>
  </section>;
}

function JournalPage({ ar, side }: { ar: boolean; side: "first" | "second" }) {
  const first = side === "first";
  return <div className="relative overflow-hidden p-5 sm:p-8">
    <div className="flex justify-between border-b border-copad-deep/12 pb-3 text-[7px] font-black tracking-[.18em] text-copad-green uppercase"><span>COPAD</span><span>0{first ? 1 : 2}</span></div>
    <p className="mt-7 text-[8px] font-black tracking-[.18em] text-copad-green uppercase">{first ? (ar ? "هدفنا" : "Our purpose") : (ar ? "داخل العدد" : "Inside this issue")}</p>
    <h2 className={`${ar ? "font-sans font-black leading-[1.08]" : "font-display leading-[.92]"} mt-4 text-[clamp(1.6rem,3.3vw,3.2rem)] tracking-[-.05em]`}>{first ? (ar ? "معلومة واضحة. تواصل مسؤول." : "Clear knowledge. Responsible communication.") : (ar ? "ثلاثة مسارات للقراءة" : "Three editorial streams")}</h2>
    {first ? <p className="mt-5 max-w-sm text-xs leading-6 text-copad-deep/58 sm:text-sm sm:leading-7">{ar ? "محتوى يشرح أساسيات الصحة والتغذية وتطورات القطاع بعيدًا عن الترويج للمنتجات." : "Content that explains health, nutrition, and industry developments without product promotion."}</p> : <div className="mt-6 space-y-3">{[ar ? "الوعي بالأمراض" : "Disease Awareness", ar ? "التغذية والعافية" : "Nutrition & Wellness", ar ? "الشركة والقطاع" : "Corporate & Industry"].map((x,i)=><div key={x} className="flex items-center gap-4 border-b border-copad-deep/10 pb-3"><span className="text-[8px] font-black text-copad-green">0{i+1}</span><span className="text-xs font-bold sm:text-sm">{x}</span></div>)}</div>}
    <span className="absolute inset-x-5 bottom-5 text-[7px] font-black tracking-[.16em] text-copad-deep/25 uppercase sm:inset-x-8">COPAD Pharma Egypt · 1989—2026</span>
  </div>;
}
