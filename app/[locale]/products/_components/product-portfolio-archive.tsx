"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ContentBlock } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { homeScrollSceneStyle, scrollSceneIndex, scrollSystem } from "@/lib/motion/scroll-system";

const portfolioImages = [
  "/images/products/Pharmaceutical Portfolio.png",
  "/images/products/Supplements, Vitamins, and Wellness.png",
  "/images/products/centravita.png",
  "/images/products/Pediatric and Family Health.png",
];

export function ProductPortfolioArchive({ locale, blocks }: { locale: Locale; blocks: ContentBlock[]; cta?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const reduceMotion = useReducedMotion();
  const lenis = useLenis();
  const isArabic = locale === "ar";
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const sceneProgress = useTransform(scrollYProgress, [0, scrollSystem.scene.completion], [0, 1]);
  const stagedProgress = useTransform(
    sceneProgress,
    [0, .2, .29, .43, .52, .66, .75, 1],
    [0, 0, 1, 1, 2, 2, 3, 3],
  );
  const trackX = useTransform(stagedProgress, value => -viewportWidth * value);
  const horizonX = useTransform(sceneProgress, [0, 1], ["0%", "-35%"]);
  useMotionValueEvent(stagedProgress, "change", v => setActive(Math.min(3, Math.max(0, Math.round(v)))));
  useEffect(() => {
    const update = () => setViewportWidth(document.documentElement.clientWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  function goTo(index:number) {
    const section=ref.current;
    if(!section)return;
    const stageStops=[0,.36,.59,.88];
    const progress=index < stageStops.length
      ? stageStops[index] * scrollSystem.scene.completion
      : scrollSceneIndex(index,blocks.length);
    const top=section.offsetTop+(section.offsetHeight-innerHeight)*progress;
    if(lenis)lenis.scrollTo(top,{duration:.92,easing:v=>v<.5?4*v*v*v:1-Math.pow(-2*v+2,3)/2});
    else scrollTo({top,behavior:"smooth"});
  }

  return <section id="portfolio" ref={ref} style={homeScrollSceneStyle(blocks.length)} className="relative h-[var(--scroll-scene-height)]">
    <div className="sticky top-0 h-[100svh] overflow-hidden bg-copad-sand">
      <header dir={isArabic?"rtl":"ltr"} className="absolute inset-x-0 top-0 z-40 mx-auto max-w-[1440px] px-4 pt-20 text-white sm:px-8 sm:pt-24 lg:px-12 lg:pt-24"><div className="flex items-end justify-between"><span className="text-[8px] font-black tracking-[.2em] text-copad-sky uppercase">{isArabic?"رحلة داخل المحفظة":"Journey through the portfolio"}</span><span dir="ltr" className="font-display text-4xl text-white">0{active+1}<small className="ms-1 font-sans text-xs opacity-40">/04</small></span></div><div className="mt-3 h-1 bg-white/14"><motion.span className="block h-full origin-left bg-copad-sky rtl:origin-right" style={{scaleX:sceneProgress}} /></div><nav className="mt-3 flex gap-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{blocks.map((b,i)=><button key={b.title} onClick={()=>goTo(i)} className={`min-w-max text-[8px] font-black tracking-[.08em] transition-colors duration-500 ${active===i?"text-white":"text-white/48"}`}><span className={`me-2 inline-block size-1.5 rounded-full ${active===i?"bg-copad-sky":"bg-white/25"}`} />{b.title}</button>)}</nav></header>

      <motion.div aria-hidden="true" className="absolute bottom-[8%] start-0 z-30 h-px w-[160%] bg-linear-to-r from-transparent via-copad-green/55 to-transparent" style={reduceMotion?undefined:{x:horizonX}} />
      <motion.div dir="ltr" className="absolute inset-y-0 left-0 flex w-[400%]" style={reduceMotion?{x:-viewportWidth*active}:{x:trackX}}>
        {blocks.map((block,index)=><PortfolioWorld key={block.title} locale={locale} block={block} index={index} />)}
      </motion.div>
    </div>
  </section>;
}

function PortfolioWorld({ locale, block, index }: { locale:Locale; block:ContentBlock; index:number }) {
  const isArabic=locale==="ar";
  return <article dir={isArabic?"rtl":"ltr"} className="relative h-full w-1/4 shrink-0 overflow-hidden bg-copad-deep text-white">
    <Image
      src={portfolioImages[index]}
      alt=""
      fill
      priority={index === 0}
      unoptimized
      sizes="100vw"
      className="object-cover object-[68%_center] sm:object-center"
    />
    <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-copad-deep/45 via-copad-deep/10 to-transparent rtl:bg-linear-to-l" />
    <div className="relative z-20 mx-auto grid h-full max-w-[1440px] content-end items-start gap-7 px-4 pt-44 pb-20 sm:px-8 lg:grid-cols-[.78fr_1.22fr] lg:content-center lg:gap-12 lg:px-12">
      <div className="relative max-w-[34rem]">
        <span className="text-[9px] font-black tracking-[.22em] text-copad-sky">SPECTRUM / 0{index+1}</span>
        <h2 className={`${isArabic?"font-sans font-black leading-[1.2] tracking-[-.02em]":"font-display leading-[1.12] tracking-[-.03em]"} mt-4 max-w-[15ch] text-pretty text-[clamp(2.35rem,4.2vw,4.7rem)]`}>{block.title}</h2>
      </div>
      <div className="max-w-[48rem] border-white/18 lg:border-s lg:ps-10 xl:ps-14">
        <p className="max-w-2xl text-[13px] leading-6 text-white/74 sm:text-sm sm:leading-7 lg:text-[15px] lg:leading-8">{block.body}</p>
        {block.items&&<div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">{block.items.map(item=><span key={item} className="flex gap-2 text-[9px] leading-4 font-bold text-white/70"><i className="mt-1.5 size-1 shrink-0 rounded-full bg-copad-sky" />{item}</span>)}</div>}
        {block.cta&&block.href&&<Link href={`/${locale}/${block.href}`} className="mt-5 inline-flex min-h-10 items-center rounded-full bg-white px-5 text-[10px] font-black text-copad-deep transition duration-300 hover:-translate-y-0.5 hover:bg-copad-sky">{block.cta}</Link>}
      </div>
    </div>
  </article>;
}
