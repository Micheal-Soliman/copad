"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import type { Locale } from "@/lib/i18n";
import { PartnershipInquiryForm } from "./partnership-inquiry-form";
import { getPartnershipData, partnershipSlugs, type PartnershipSlug } from "../partnership-data";

const ease = [0.22, 1, 0.36, 1] as const;

function RouteStep({ number, label, text, ar }: { number: string; label: string; text: string; ar: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "end 35%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 92, damping: 29, mass: .42 });
  const y = useTransform(progress, [0, .65, 1], [38, 0, -6]);
  const scale = useTransform(progress, [0, .65, 1], [.965, 1, 1]);
  const lineScale = useTransform(progress, [0, .72], [0, 1]);

  return <motion.div ref={ref} style={reduceMotion ? undefined : { y, scale }} className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[.055] p-7 backdrop-blur-sm sm:p-9">
    <span aria-hidden="true" className="absolute end-5 top-1 font-display text-[7rem] leading-none text-white/[.035]">{number}</span>
    <div className="relative flex items-center gap-4"><span className="font-display text-2xl text-copad-green">{number}</span><span className="text-[8px] font-black uppercase tracking-[.22em] text-white/42">{label}</span></div>
    <p className="relative mt-8 max-w-xl font-display text-[clamp(1.8rem,3vw,3rem)] leading-[1.05] tracking-[-.035em] text-white">{text}</p>
    <div className="mt-9 h-px bg-white/10"><motion.div style={reduceMotion ? { scaleX: 1 } : { scaleX: lineScale }} className="h-full origin-start bg-copad-green rtl:origin-end" /></div>
    <p className="mt-4 text-[9px] font-black uppercase tracking-[.16em] text-white/38">{ar ? "من التوافق إلى التنفيذ" : "From alignment to execution"}</p>
  </motion.div>;
}

export function PartnershipCategoryPage({ locale, slug }: { locale: Locale; slug: PartnershipSlug }) {
  const data = getPartnershipData(locale, slug);
  const ar = locale === "ar";
  const heroRef = useRef<HTMLElement>(null);
  const pathwayRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const routeNumber = String(partnershipSlugs.indexOf(slug) + 1).padStart(2, "0");
  const stepLabels = ar ? ["تحديد المسار", "مراجعة الجاهزية", "بدء التنفيذ"] : ["Define", "Validate", "Activate"];

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroProgress = useSpring(scrollYProgress, { stiffness: 88, damping: 31, mass: .44 });
  const imageY = useTransform(heroProgress, [0, 1], [0, 62]);
  const imageScale = useTransform(heroProgress, [0, 1], [1.025, 1.055]);
  const copyY = useTransform(heroProgress, [0, 1], [0, -30]);
  const copyOpacity = useTransform(heroProgress, [0, .88], [1, .42]);
  const { scrollYProgress: pathwayScroll } = useScroll({ target: pathwayRef, offset: ["start 78%", "end 72%"] });
  const pathwayProgress = useSpring(pathwayScroll, { stiffness: 78, damping: 29, mass: .44 });
  const pathwayLine = useTransform(pathwayProgress, [0, 1], [0, 1]);

  return <main className="min-h-screen overflow-x-clip bg-copad-white">
    <SiteHeader locale={locale} transparent />

    <section ref={heroRef} className="relative overflow-hidden bg-copad-deep px-4 pb-5 pt-24 text-white sm:px-8 lg:px-12 lg:pb-8">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(0,163,196,.18),transparent_34%)] rtl:bg-[radial-gradient(circle_at_85%_10%,rgba(0,163,196,.18),transparent_34%)]" />
      <div dir={ar ? "rtl" : "ltr"} className="relative mx-auto grid min-h-[calc(100svh-7rem)] max-w-[1440px] overflow-hidden rounded-[2.25rem] border border-white/12 lg:grid-cols-2">
        <motion.div style={reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }} className="relative order-2 flex flex-col justify-end p-7 sm:p-10 lg:order-1 lg:p-14">
          <span aria-hidden="true" className="absolute end-7 top-5 font-display text-[8rem] leading-none text-white/[.035] sm:text-[11rem]">{routeNumber}</span>
          <Link href={`/${locale}/partner-with-us#models`} className="mb-auto inline-flex w-fit items-center gap-2 pt-2 text-[8px] font-black uppercase tracking-[.18em] text-white/52 transition hover:text-white"><span aria-hidden="true" className="rtl:rotate-180">←</span>{ar ? "العودة إلى مجالات الشراكة" : "Back to partnership areas"}</Link>
          <div className="relative mt-14 min-w-0 lg:mt-20">
            <p className="text-[9px] font-black uppercase tracking-[.24em] text-copad-green">{data.eyebrow}</p>
            <h1 className="mt-5 max-w-[20ch] text-balance font-display text-[clamp(3.15rem,5vw,5.35rem)] leading-[1.01] tracking-[-.045em]">{data.title}</h1>
            <p className="mt-7 w-full max-w-full [overflow-wrap:anywhere] border-s-2 border-copad-green ps-5 pe-1 text-sm leading-7 text-white/72 sm:max-w-xl sm:text-base sm:leading-8">{data.intro}</p>
          </div>
        </motion.div>

        <div className="relative order-1 min-h-[40svh] overflow-hidden lg:order-2 lg:min-h-full">
          <motion.div className="absolute -inset-y-10 inset-x-0" style={reduceMotion ? undefined : { y: imageY, scale: imageScale }}><Image src={data.image} alt="" fill priority quality={100} className="object-cover" sizes="(min-width:1024px) 58vw, 100vw" /></motion.div>
          <div className="absolute inset-0 bg-linear-to-t from-copad-deep/48 via-transparent to-copad-deep/8 lg:bg-linear-to-r lg:from-copad-deep/38 lg:via-transparent lg:to-transparent rtl:lg:bg-linear-to-l" />
          <div className="absolute bottom-5 end-5 max-w-[calc(100%_-_2.5rem)] rounded-full border border-white/24 bg-copad-deep/28 px-4 py-2 text-[8px] font-black uppercase tracking-[.16em] backdrop-blur-xl sm:bottom-6 sm:end-6 sm:px-5 sm:tracking-[.2em]"><span className="sm:hidden">COPAD</span><span className="hidden sm:inline">COPAD / PARTNERSHIPS</span></div>
        </div>
      </div>
    </section>

    <section id="pathway" ref={pathwayRef} dir={ar ? "rtl" : "ltr"} className="relative bg-copad-deep px-4 py-20 text-white sm:px-8 sm:py-28 lg:px-12 lg:py-32">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(0,163,196,.14),transparent_34%)]" />
      <div aria-hidden="true" className="absolute inset-y-0 end-5 hidden w-px bg-white/10 lg:block"><motion.div style={reduceMotion ? { scaleY: 1 } : { scaleY: pathwayLine }} className="h-full origin-top bg-copad-green" /></div>
      <div className="relative mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
        <div className="self-start lg:sticky lg:top-28">
          <p className="text-[9px] font-black uppercase tracking-[.23em] text-copad-green">{ar ? "مسار العمل" : "The partnership pathway"}</p>
          <h2 className="mt-5 max-w-[17ch] font-display text-[clamp(2.8rem,4vw,4.6rem)] leading-[1.02] tracking-[-.045em]">{ar ? "مسار واضح من التوافق إلى التنفيذ" : "A clear route from alignment to execution"}</h2>
          <p className="mt-7 max-w-md text-sm leading-7 text-white/58 sm:text-base sm:leading-8">{ar ? "كل شراكة تبدأ بفهم الاحتياج، ثم مراجعة الجاهزية، ثم وضع خطوات تنفيذ عملية وواضحة." : "Every collaboration starts with a shared understanding, moves through readiness, and ends with a practical execution plan."}</p>
        </div>
        <div className="space-y-5">{data.highlights.map((item, index) => <RouteStep key={item} number={`0${index + 1}`} label={stepLabels[index]} text={item} ar={ar} />)}</div>
      </div>
    </section>

    <section id="inquiry" dir={ar ? "rtl" : "ltr"} className="relative scroll-mt-20 overflow-hidden bg-copad-sand px-4 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
      <div aria-hidden="true" className="absolute -end-24 top-16 size-[34rem] rounded-full border border-copad-green/10" />
      <div className="relative mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
        <motion.aside initial={reduceMotion ? false : { y: 28 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .68, ease }} className="self-start lg:sticky lg:top-28">
          <h2 className="max-w-[18ch] font-display text-[clamp(2.75rem,3.5vw,4.15rem)] leading-[1.03] tracking-[-.04em] text-copad-deep">{ar ? "لنبدأ بمعلومات واضحة عن الفرصة" : "Start with a clear brief of the opportunity"}</h2>
          <p className="mt-6 max-w-md border-s-2 border-copad-green ps-5 text-sm leading-7 text-copad-deep/58 sm:text-base sm:leading-8">{ar ? "هذا النموذج مصمم لهذا النوع من الشراكات حتى تصل التفاصيل الصحيحة مباشرة إلى الفريق المختص." : "This form is tailored to this partnership route, so the right details reach the right team from the start."}</p>
        </motion.aside>
        <motion.div initial={reduceMotion ? false : { y: 34, scale: .985 }} whileInView={{ y: 0, scale: 1 }} viewport={{ once: true, amount: .1 }} transition={{ duration: .72, ease }}><PartnershipInquiryForm locale={locale} slug={slug} /></motion.div>
      </div>
    </section>

    <SiteFooter locale={locale} />
  </main>;
}
