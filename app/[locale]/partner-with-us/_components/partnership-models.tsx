"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { ContentBlock } from "@/content/types";
import type { Locale } from "@/lib/i18n";

const ease = [0.22, 1, 0.36, 1] as const;
const images = [
  "/images/partnerships/distribution-partnerships.png",
  "/images/partnerships/export-collaboration.png",
  "/images/partnerships/contract-manufacturing.png",
];
const slugs = ["distribution-partnerships", "export-collaboration", "contract-toll-manufacturing"] as const;

function PartnershipModelRow({ block, index, locale, ar }: { block: ContentBlock; index: number; locale: Locale; ar: boolean }) {
  const rowRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ["start 94%", "end 18%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 78, damping: 27, mass: .44 });
  const imageScale = useTransform(progress, [0, .48, 1], [1.045, 1.015, 1]);
  const imageY = useTransform(progress, [0, 1], [-24, 24]);
  const imageClip = useTransform(progress, [0, .42, 1], ["inset(9% 7% 9% 7% round 2rem)", "inset(0% 0% 0% 0% round 0rem)", "inset(0% 0% 0% 0% round 0rem)"]);
  const copyY = useTransform(progress, [0, .42, 1], [44, 0, -10]);
  const copyOpacity = useTransform(progress, [0, .24, 1], [.68, 1, 1]);
  const lineScale = useTransform(progress, [0, .65], [0, 1]);
  const dark = index !== 1;

  return <motion.article id={`partnership-${index + 1}`} ref={rowRef} className={`relative grid min-h-[42rem] scroll-mt-40 overflow-hidden rounded-[2.25rem] border lg:min-h-[35rem] lg:grid-cols-12 ${dark ? "border-white/10 bg-copad-deep text-white" : "border-copad-deep/10 bg-white text-copad-deep"}`}>
    <div className={`relative min-h-[19rem] overflow-hidden lg:col-span-7 lg:min-h-full ${index % 2 ? "lg:order-2" : ""}`}>
      <motion.div className="absolute -inset-y-8 inset-x-0" style={reduceMotion ? undefined : { scale: imageScale, y: imageY, clipPath: imageClip }}>
        <Image src={images[index]} alt="" fill priority={index === 0} quality={100} className="object-cover" sizes="(min-width:1024px) 58vw, 100vw" />
      </motion.div>
      <div className={`absolute inset-0 ${dark ? "bg-linear-to-t from-copad-deep/78 via-transparent to-transparent" : "bg-linear-to-t from-white/28 via-transparent to-transparent"}`} />
      <div className="absolute start-6 top-6 rounded-full border border-white/30 bg-copad-deep/35 px-4 py-2 text-[8px] font-black uppercase tracking-[.2em] text-white backdrop-blur-md">COPAD / 0{index + 1}</div>
    </div>

    <motion.div style={reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }} className={`relative flex flex-col justify-between p-7 sm:p-10 lg:col-span-5 lg:p-12 ${index % 2 ? "lg:order-1" : ""}`}>
      <span aria-hidden="true" className={`absolute end-7 top-3 font-display text-[7rem] leading-none tracking-[-.08em] sm:text-[9rem] ${dark ? "text-white/[.035]" : "text-copad-deep/[.035]"}`}>0{index + 1}</span>
      <div className="relative">
        <p className="text-[8px] font-black uppercase tracking-[.22em] text-copad-green">{ar ? "نموذج شراكة" : "Partnership model"} · 0{index + 1}</p>
        <h3 className="mt-6 max-w-[16ch] font-display text-[clamp(2.65rem,3.8vw,4.35rem)] leading-[1.02] tracking-[-.045em]">{block.title}</h3>
        <p className={`mt-7 max-w-xl text-sm leading-7 sm:text-base sm:leading-8 ${dark ? "text-white/68" : "text-copad-deep/62"}`}>{block.body}</p>
      </div>
      <div className="relative mt-10">
        <div className={`mb-6 h-px ${dark ? "bg-white/14" : "bg-copad-deep/12"}`}><motion.div style={reduceMotion ? { scaleX: 1 } : { scaleX: lineScale }} className="h-full origin-start bg-copad-green rtl:origin-end" /></div>
        <Link href={`/${locale}/partner-with-us/${slugs[index]}`} className={`group/link inline-flex min-h-12 items-center gap-4 rounded-full border px-6 text-[9px] font-black uppercase tracking-[.14em] transition duration-300 ${dark ? "border-white/22 bg-white/7 hover:border-copad-green hover:bg-copad-green" : "border-copad-deep/14 bg-copad-sand hover:border-copad-green hover:bg-copad-green hover:text-white"}`}>{ar ? "استكشف المسار" : "Explore this route"}<span aria-hidden="true" className="transition-transform group-hover/link:translate-x-1 rtl:rotate-180 rtl:group-hover/link:-translate-x-1">→</span></Link>
      </div>
    </motion.div>
  </motion.article>;
}

export function PartnershipModels({ locale, blocks }: { locale: Locale; blocks: ContentBlock[] }) {
  const reduceMotion = useReducedMotion();
  const ar = locale === "ar";

  return <section id="models" dir={ar ? "rtl" : "ltr"} className="relative overflow-clip bg-copad-sand px-4 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
    <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(123,205,237,.2),transparent_32%)]" />
    <div className="relative mx-auto max-w-[1440px]">
      <motion.header whileInView={reduceMotion ? undefined : { y: [14, 0] }} viewport={{ once: true, amount: .35 }} transition={{ duration: .65, ease }} className="grid gap-7 border-b border-copad-deep/12 pb-9 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
        <div><p className="text-[9px] font-black uppercase tracking-[.22em] text-copad-green">{ar ? "مجالات الشراكة" : "Partnership areas"}</p><h2 className="mt-4 max-w-[19ch] font-display text-[2.4rem] leading-[1.05] tracking-[-.04em] text-copad-deep sm:text-[clamp(3rem,4.5vw,4.8rem)]">{ar ? <><span className="block">ثلاثة نماذج للشراكة</span><span className="block">ومسار واضح لكل منها</span></> : <><span className="block">Three partnership models.</span><span className="block">One clear route.</span></>}</h2></div>
        <p className="max-w-2xl text-sm leading-7 text-copad-deep/60 sm:text-base sm:leading-8 lg:justify-self-end">{ar ? "اختر نموذج التعاون الأقرب لاحتياجك، ثم شارك فريقنا بالتفاصيل المطلوبة من خلال نموذج مخصص." : "Choose the collaboration model that fits your opportunity, then share the right details through its dedicated inquiry form."}</p>
      </motion.header>

      <nav aria-label={ar ? "انتقل إلى نموذج الشراكة" : "Jump to a partnership model"} className="sticky top-20 z-30 -mx-1 mt-5 flex gap-2 overflow-x-auto rounded-full border border-copad-deep/10 bg-white/78 p-1.5 shadow-[0_14px_35px_rgba(1,61,96,.08)] [scrollbar-width:none] backdrop-blur-xl [&::-webkit-scrollbar]:hidden">
        {blocks.map((block, index) => <a key={block.title} href={`#partnership-${index + 1}`} className="flex min-h-10 shrink-0 items-center gap-3 rounded-full px-4 text-[9px] font-black uppercase tracking-[.1em] text-copad-deep/58 transition hover:bg-copad-deep hover:text-white"><span className="text-copad-green">0{index + 1}</span>{block.title}</a>)}
      </nav>

      <div className="mt-8 space-y-6 lg:mt-10 lg:space-y-8">
        {blocks.map((block, index) => <PartnershipModelRow key={block.title} block={block} index={index} locale={locale} ar={ar} />)}
      </div>
    </div>
  </section>;
}
