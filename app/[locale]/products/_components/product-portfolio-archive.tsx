"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ContentBlock } from "@/content/types";
import type { Locale } from "@/lib/i18n";

const tones = ["bg-copad-sand text-copad-deep", "bg-copad-deep text-white", "bg-[#dcece8] text-copad-deep", "bg-copad-white text-copad-deep"];

export function ProductPortfolioArchive({ locale, blocks, cta }: { locale: Locale; blocks: ContentBlock[]; cta?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const reduceMotion = useReducedMotion();
  const lenis = useLenis();
  const isArabic = locale === "ar";
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const trackX = useTransform(scrollYProgress, [0, 1], [0, -viewportWidth * 3]);
  const horizonX = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  useMotionValueEvent(scrollYProgress, "change", v => setActive(Math.min(3, Math.max(0, Math.round(v*3)))));
  useEffect(() => {
    const update = () => setViewportWidth(document.documentElement.clientWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  function goTo(index:number) { const s=ref.current;if(!s)return;const top=s.offsetTop+(s.offsetHeight-innerHeight)*(index/3);if(lenis)lenis.scrollTo(top,{duration:.9,easing:v=>1-Math.pow(1-v,4)});else scrollTo({top,behavior:"smooth"}); }

  return <section id="portfolio" ref={ref} className="relative h-[430vh]">
    <div className="sticky top-0 h-[100svh] overflow-hidden bg-copad-sand">
      <header dir={isArabic?"rtl":"ltr"} className="absolute inset-x-0 top-0 z-40 mx-auto max-w-[1440px] px-4 pt-20 sm:px-8 sm:pt-24 lg:px-12 lg:pt-24"><div className="flex items-end justify-between"><span className="text-[8px] font-black tracking-[.2em] text-copad-green uppercase">{isArabic?"رحلة داخل المحفظة":"Journey through the portfolio"}</span><span dir="ltr" className="font-display text-4xl text-copad-deep">0{active+1}<small className="ms-1 font-sans text-xs opacity-30">/04</small></span></div><div className="mt-3 h-1 bg-copad-deep/8"><motion.span className="block h-full origin-left bg-copad-green rtl:origin-right" style={{scaleX:scrollYProgress}} /></div><nav className="mt-3 flex gap-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{blocks.map((b,i)=><button key={b.title} onClick={()=>goTo(i)} className={`min-w-max text-[8px] font-black tracking-[.08em] transition ${active===i?"text-copad-deep":"text-copad-deep/32"}`}><span className={`me-2 inline-block size-1.5 rounded-full ${active===i?"bg-copad-green":"bg-copad-deep/15"}`} />{b.title}</button>)}</nav></header>

      <motion.div aria-hidden="true" className="absolute bottom-[8%] start-0 z-30 h-px w-[160%] bg-linear-to-r from-transparent via-copad-green/55 to-transparent" style={reduceMotion?undefined:{x:horizonX}} />
      <motion.div dir="ltr" className="absolute inset-y-0 left-0 flex w-[400%]" style={reduceMotion?{x:-viewportWidth*active}:{x:trackX}}>
        {blocks.map((block,index)=><PortfolioWorld key={block.title} locale={locale} block={block} index={index} cta={cta} />)}
      </motion.div>
    </div>
  </section>;
}

function PortfolioWorld({ locale, block, index, cta }: { locale:Locale; block:ContentBlock; index:number; cta?:string }) {
  const isArabic=locale==="ar";
  return <article dir={isArabic?"rtl":"ltr"} className={`relative h-full w-1/4 shrink-0 overflow-hidden ${tones[index]}`}>
    <WorldObject index={index} />
    <div className="relative z-20 mx-auto grid h-full max-w-[1440px] items-end px-4 pt-40 pb-20 sm:px-8 sm:pt-44 lg:grid-cols-[.72fr_1.28fr] lg:items-center lg:px-12 lg:pt-36 lg:pb-14">
      <div className="relative"><span className="text-[9px] font-black tracking-[.22em] text-copad-green">SPECTRUM / 0{index+1}</span><h2 className={`${isArabic?"font-sans font-black":"font-display"} mt-5 max-w-4xl text-[clamp(2.8rem,11vw,7.6rem)] leading-[.84] tracking-[-.065em]`}>{block.title}</h2></div>
      <div className={`mt-8 max-w-3xl lg:mt-0 lg:ps-14 ${index===1?"border-white/14":"border-copad-deep/12"} lg:border-s`}><p className={`text-sm leading-7 sm:text-base sm:leading-8 ${index===1?"text-white/62":"text-copad-deep/65"}`}>{block.body}</p>{block.note&&<p className="mt-5 border-s-2 border-copad-green ps-4 text-xs leading-6 opacity-55">{block.note}</p>}{block.items&&<div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-2 sm:grid-cols-3">{block.items.slice(0,9).map(item=><span key={item} className="flex gap-2 text-[9px] leading-4 font-bold opacity-65"><i className="mt-1.5 size-1 shrink-0 rounded-full bg-copad-green" />{item}</span>)}</div>}{cta&&<Link href={`/${locale}/contact`} className={`mt-6 inline-flex min-h-11 items-center rounded-full px-5 text-[10px] font-black transition hover:-translate-y-0.5 ${index===1?"bg-copad-green text-white":"bg-copad-deep text-white hover:bg-copad-green"}`}>{cta}</Link>}</div>
    </div>
    <span aria-hidden="true" className={`absolute -end-8 bottom-[-12%] font-display text-[22rem] leading-none tracking-[-.1em] ${index===1?"text-white/[.025]":"text-copad-deep/[.03]"}`}>0{index+1}</span>
  </article>;
}

function WorldObject({index}:{index:number}) { if(index===0)return <div aria-hidden="true" className="absolute end-[6%] top-[20%] h-[46%] w-[26%] [perspective:1000px]"><div className="absolute inset-0 rotate-[-9deg] border border-copad-green/25 bg-white/25 shadow-[30px_35px_70px_rgba(15,61,57,.12)]" /><div className="absolute inset-[12%] rotate-[5deg] border border-copad-deep/10 bg-white/35" /><span className="absolute inset-x-[20%] top-1/2 h-px bg-copad-green" /></div>;
  if(index===1)return <div aria-hidden="true" className="absolute end-[8%] top-[20%] size-[23rem]"><span className="absolute inset-[8%] rounded-full border border-copad-green/30"/><span className="absolute inset-[28%] rounded-full border border-white/15"/><motion.span className="absolute start-[12%] top-[8%] size-16 rounded-full bg-copad-green/70 shadow-[0_20px_45px_rgba(0,0,0,.28)]" animate={{y:[0,28,0]}} transition={{duration:4,repeat:Infinity,ease:"easeInOut"}}/><motion.span className="absolute end-[8%] bottom-[18%] h-20 w-40 rounded-full border border-white/20 bg-white/8 backdrop-blur-md" animate={{rotate:[-12,8,-12]}} transition={{duration:5,repeat:Infinity,ease:"easeInOut"}}/></div>;
  if(index===2)return <div aria-hidden="true" className="absolute inset-y-[18%] end-[4%] w-[36%] overflow-hidden"><span className="absolute inset-y-0 start-[12%] w-[16%] bg-copad-green/20"/><span className="absolute inset-y-0 start-[34%] w-[16%] bg-white/55"/><span className="absolute inset-y-0 start-[56%] w-[16%] bg-copad-deep/12"/><span className="absolute inset-y-0 start-[78%] w-[16%] bg-copad-green/35"/></div>;
  return <div aria-hidden="true" className="absolute end-[5%] top-[18%] size-[25rem] rounded-full border border-copad-green/25"><span className="absolute inset-[16%] rounded-full border border-copad-deep/10"/><span className="absolute inset-[34%] rounded-full border border-copad-green/25"/><span className="absolute inset-[48%] rounded-full bg-copad-green shadow-[0_0_45px_rgba(16,159,131,.35)]"/></div>;
}
