"use client";

import { ArrowRightIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import type { Locale } from "@/lib/i18n";
import { FinalCtaLink } from "./final-cta-link";

export function FinalPageCta({
  id,
  locale,
  eyebrow,
  title,
  body,
  href,
  label,
  details,
  note,
}: {
  id: string;
  locale: Locale;
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  label: string;
  details?: string[];
  note?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isArabic = locale === "ar";
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 92%", "end end"] });
  const contentY = useTransform(scrollYProgress, [0, 0.45], [58, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const lineScale = useTransform(scrollYProgress, [0.05, 0.6], [0, 1]);
  const gatewayY = useTransform(scrollYProgress, [0.08, 0.6], [90, 0]);
  const gatewayRotate = useTransform(scrollYProgress, [0.08, 0.62], [isArabic ? -18 : 18, 0]);
  const gatewayScale = useTransform(scrollYProgress, [0.08, 0.62], [0.82, 1]);

  return (
    <section ref={sectionRef} id={id} dir={isArabic ? "rtl" : "ltr"} className="relative flex min-h-svh scroll-mt-20 items-center overflow-hidden border-t border-copad-green/25 bg-copad-deep px-4 py-20 text-white sm:px-8 lg:px-12 lg:pt-16 lg:pb-28">
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgba(16,159,131,.19),transparent_28%),linear-gradient(115deg,rgba(255,255,255,.025),transparent_45%)] rtl:bg-[radial-gradient(circle_at_22%_42%,rgba(16,159,131,.19),transparent_28%),linear-gradient(245deg,rgba(255,255,255,.025),transparent_45%)]" />
        <motion.div className="absolute -bottom-[18vw] -start-[8vw] size-[44vw] rounded-full border border-copad-green/12" style={reduceMotion ? undefined : { scale: gatewayScale }} />
        <p className="absolute -bottom-[.17em] end-[-.04em] font-display text-[22vw] leading-none tracking-[-.09em] text-white/[.024]">NEXT</p>
      </div>

      <div className="relative mx-auto w-full max-w-[1440px]">
        <div className="flex items-center justify-between gap-6 border-b border-white/12 pb-5">
          <p className="text-[9px] font-black tracking-[.23em] text-copad-green uppercase sm:text-[10px]">{eyebrow}</p>
          <p className="text-[8px] font-black tracking-[.24em] text-white/32 uppercase">COPAD / {isArabic ? "التالي" : "Next"}</p>
        </div>
        <motion.div aria-hidden="true" className="h-px origin-start bg-linear-to-r from-copad-green via-white/75 to-transparent rtl:origin-right" style={reduceMotion ? undefined : { scaleX: lineScale }} />

        <div className="grid gap-14 pt-12 lg:grid-cols-[1.2fr_.8fr] lg:items-center lg:gap-20 lg:pt-10">
          <motion.div style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}>
            <h2 className={`${isArabic ? "font-sans font-black leading-[1.03]" : "font-display leading-[.88]"} max-w-5xl text-[clamp(3.2rem,7.5vw,7.5rem)] tracking-[-.065em]`}>{title}</h2>
            <div className="mt-8 border-t border-white/12 pt-7">
              <p className="max-w-2xl text-sm leading-7 text-white/62 sm:text-base sm:leading-8">{body}</p>
              {details && details.length > 0 ? (
                <div className="mt-6 flex max-w-3xl flex-wrap gap-2">
                  {details.map((detail, index) => (
                    <motion.span key={detail} initial={reduceMotion ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.45, delay: index * 0.06 }} className="rounded-full border border-white/12 px-3.5 py-2 text-[9px] font-bold text-white/55">{detail}</motion.span>
                  ))}
                </div>
              ) : null}
              {note ? <p className="mt-5 border-s border-copad-green ps-4 text-[9px] leading-5 font-bold text-white/35">{note}</p> : null}
            </div>
            <FinalCtaLink href={href} className="mt-8 sm:mt-10">{label}</FinalCtaLink>
          </motion.div>

          <motion.div className="relative mx-auto h-[20rem] w-full max-w-[22rem] [perspective:1600px] sm:h-[23rem] lg:h-[23rem]" style={reduceMotion ? undefined : { y: gatewayY, rotateY: gatewayRotate, scale: gatewayScale, opacity: contentOpacity }}>
            <motion.div aria-hidden="true" className="absolute inset-8 translate-x-10 translate-y-8 rounded-[2rem] border border-copad-green/25 bg-copad-green/[.045] rtl:-translate-x-10" animate={reduceMotion ? undefined : { y: [0, -7, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
            <div aria-hidden="true" className="absolute inset-4 translate-x-5 translate-y-4 rounded-[2rem] border border-white/12 bg-white/[.025] rtl:-translate-x-5" />
            <Link href={href} aria-label={label} className="group/gateway absolute inset-0 isolate overflow-hidden rounded-[2rem] border border-white/15 bg-copad-green shadow-[0_45px_90px_rgba(0,24,21,.42)] outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-copad-deep">
              <div className="absolute inset-0 flex flex-col justify-between p-7 text-white">
                <div className="ms-auto flex w-[56%] items-center justify-between gap-3">
                  <span className="text-[8px] font-black tracking-[.25em] text-white/65 uppercase">{isArabic ? "ادخل الفصل التالي" : "Enter the next chapter"}</span>
                  <span className="flex size-11 items-center justify-center rounded-full border border-white/30 bg-white/10"><ArrowRightIcon weight="bold" className="size-4 transition-transform duration-500 group-hover/gateway:translate-x-1.5 rtl:rotate-180 rtl:group-hover/gateway:-translate-x-1.5" /></span>
                </div>
                <div className="ms-auto w-[56%]">
                  <span className="block h-px w-16 bg-white/70 transition-all duration-700 group-hover/gateway:w-32" />
                  <p className={`${isArabic ? "font-sans font-black leading-[1.08]" : "font-display leading-[.93]"} mt-6 text-[2rem] tracking-[-.055em]`}>{label}</p>
                  <p className="mt-5 text-[9px] font-black tracking-[.2em] text-white/60 uppercase">{isArabic ? "اضغط للاستكشاف" : "Click to explore"}</p>
                </div>
              </div>

              <div aria-hidden="true" className="absolute inset-0 origin-left bg-[#164b46] p-8 shadow-[20px_0_50px_rgba(0,20,18,.3)] transition-transform duration-1000 ease-[cubic-bezier(.22,1,.36,1)] [backface-visibility:hidden] [transform-style:preserve-3d] group-hover/gateway:[transform:perspective(1200px)_rotateY(-72deg)] group-focus-visible/gateway:[transform:perspective(1200px)_rotateY(-72deg)] rtl:origin-right rtl:group-hover/gateway:[transform:perspective(1200px)_rotateY(72deg)] rtl:group-focus-visible/gateway:[transform:perspective(1200px)_rotateY(72deg)]">
                <div className="flex h-full flex-col justify-between border border-white/10 p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-black tracking-[.25em] text-copad-green uppercase">{isArabic ? "الوجهة التالية" : "Next destination"}</span>
                    <span className="flex size-10 items-center justify-center rounded-full border border-copad-green/35 text-[9px] font-black text-copad-green">C</span>
                  </div>
                  <div>
                    <p className="font-display text-6xl leading-none tracking-[-.075em] text-white">COPAD</p>
                    <p className="mt-3 text-[9px] font-black tracking-[.22em] text-white/32 uppercase">Pharma Egypt</p>
                  </div>
                  <div className="flex items-center gap-3 border-t border-white/12 pt-5">
                    <span className="relative flex size-3 items-center justify-center"><span className="absolute size-3 animate-ping rounded-full bg-copad-green/55" /><span className="relative size-1.5 rounded-full bg-copad-green" /></span>
                    <span className="text-[8px] font-black tracking-[.18em] text-white/38 uppercase sm:hidden">{isArabic ? "اضغط للاستكشاف" : "Tap to explore"}</span>
                    <span className="hidden text-[8px] font-black tracking-[.18em] text-white/38 uppercase sm:inline">{isArabic ? "مرر لفتح البوابة" : "Hover to open"}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
