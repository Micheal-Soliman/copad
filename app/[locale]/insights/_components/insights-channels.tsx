"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import { useRef, useState } from "react";
import type { ContentBlock } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { homeScrollSceneStyle, scrollSceneCenter, scrollSystem } from "@/lib/motion/scroll-system";

const ease = [.22, 1, .36, 1] as const;
export function InsightsChannels({ locale, blocks }: { locale: Locale; blocks: ContentBlock[] }) {
  const ref = useRef<HTMLElement>(null); const [active,setActive]=useState(0); const reduce=useReducedMotion(); const lenis=useLenis(); const ar=locale==="ar";
  const {scrollYProgress}=useScroll({target:ref,offset:["start start","end end"]});
  const smoothedProgress=useSpring(scrollYProgress,{stiffness:92,damping:34,mass:.42});
  const sceneProgress=useTransform(smoothedProgress,[0,scrollSystem.scene.completion],[0,1]);
  useMotionValueEvent(sceneProgress,"change",v=>setActive(Math.min(blocks.length-1,Math.floor(v*blocks.length))));
  const go=(i:number)=>{const s=ref.current;if(!s)return;const y=s.offsetTop+(s.offsetHeight-innerHeight)*scrollSceneCenter(i,blocks.length);if(lenis)lenis.scrollTo(y,{duration:scrollSystem.scene.navigationDuration,easing:v=>1-Math.pow(1-v,4)});else scrollTo({top:y,behavior:"smooth"});};
  return <section ref={ref} id="channels" style={homeScrollSceneStyle(blocks.length)} className="relative h-[var(--scroll-scene-height)] bg-copad-sand"><div className="sticky top-0 h-[100svh] overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,61,96,.025)_1px,transparent_1px)] bg-[size:24vw_100%]" />
    <div dir={ar?"rtl":"ltr"} className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col px-4 pt-20 pb-20 sm:px-8 lg:px-12 lg:pt-24">
      <header className="flex shrink-0 items-end justify-between gap-4 border-b border-copad-deep/12 pb-4"><div><p className="text-[8px] font-black tracking-[.2em] text-copad-green uppercase">{ar?"فهرس العدد":"Issue index"}</p><h2 className="mt-2 max-w-[18ch] font-display text-3xl leading-[1.04] tracking-[-.035em] sm:text-5xl">{ar?"اختر مسار القراءة":"Choose your reading stream"}</h2></div><span dir="ltr" className="font-display text-4xl">0{active+1}<small className="text-sm text-copad-deep/25"> / 0{blocks.length}</small></span></header>

      <div className="relative min-h-0 flex-1 [perspective:1800px]">
        {blocks.map((block,index)=><JournalSheet key={block.title} block={block} index={index} active={active} ar={ar} reduce={!!reduce}/>) }
      </div>

      <nav className="relative z-30 grid shrink-0 grid-cols-3 gap-2">{blocks.map((b,i)=><button key={b.title} onClick={()=>go(i)} className={`rounded-full border px-3 py-2 text-[8px] font-black transition duration-500 sm:text-[9px] ${i===active?"border-copad-deep bg-copad-deep text-white":"border-copad-deep/12 bg-copad-white/70 text-copad-deep/45 hover:border-copad-green hover:text-copad-deep"}`}><span className="sm:hidden">0{i+1}</span><span className="hidden truncate sm:block">{b.title}</span></button>)}</nav>
    </div>
  </div></section>;
}

function JournalSheet({block,index,active,ar,reduce}:{block:ContentBlock;index:number;active:number;ar:boolean;reduce:boolean}) {
  const distance=index-active; const current=distance===0; const passed=distance<0;
  return <motion.article initial={false} animate={reduce?undefined:{y:passed?-120:distance*16,scale:current?1:Math.max(.94,1-Math.abs(distance)*.025),rotateX:current?0:distance>0?-1.25:2,rotateZ:current?0:(ar?-1:1)*distance*.25,opacity:passed?0:1,zIndex:20-distance}} transition={{duration:.76,ease}} className={`absolute inset-x-0 top-1/2 mx-auto grid h-[min(65svh,34rem)] max-w-6xl -translate-y-1/2 overflow-hidden rounded-[.45rem_2rem_2rem_.45rem] border bg-copad-white text-copad-deep shadow-[0_35px_95px_rgba(1,61,96,.16)] [transform-style:preserve-3d] sm:h-[min(60svh,32rem)] lg:h-[min(55svh,31rem)] rtl:rounded-[2rem_.45rem_.45rem_2rem] ${current?"border-copad-green/35":"border-copad-deep/10"}`} style={{zIndex:20-distance}}>
    <div className="grid h-full lg:grid-cols-[.82fr_1.18fr]">
      <div className="relative overflow-hidden border-e border-copad-deep/10 p-5 sm:p-7 lg:p-9"><div className="flex justify-between border-b border-copad-deep/12 pb-2 text-[7px] font-black tracking-[.18em] text-copad-green uppercase"><span>COPAD MEDICAL JOURNAL</span><span>0{index+1}</span></div><p className="mt-4 text-[8px] font-black tracking-[.18em] text-copad-green uppercase sm:mt-5">{ar?"القسم التحريري":"Editorial section"}</p><h3 className="mt-3 max-w-[13ch] font-display text-[clamp(1.8rem,5vw,4rem)] leading-[1.02] tracking-[-.045em]">{block.title}</h3><p className="mt-4 max-w-xl text-[11px] leading-5 text-copad-deep/62 sm:text-sm sm:leading-6">{block.body}</p><span className="absolute -end-7 -bottom-16 font-display text-[15rem] leading-none text-copad-deep/[.035]">0{index+1}</span></div>
      <div className="flex flex-col justify-center p-5 sm:p-7 lg:p-9"><p className="mb-1 text-[8px] font-black tracking-[.18em] text-copad-green uppercase sm:mb-2">{ar?"موضوعات مقترحة":"Featured reading"}</p>{block.items?.map((item,i)=><motion.div key={item} animate={current?{opacity:1,x:0}:{opacity:.28,x:ar?-10:10}} transition={{duration:.7,delay:current?.12+i*.07:0,ease}} className="group flex items-baseline gap-4 border-b border-copad-deep/10 py-2.5 last:border-0 sm:py-3"><span className="font-display text-lg text-copad-green">{String(i+1).padStart(2,"0")}</span><span className="text-xs font-bold leading-5 text-copad-deep/68 transition group-hover:text-copad-deep sm:text-sm">{item}</span></motion.div>)}</div>
    </div>
    <span className="absolute end-0 top-0 size-16 bg-[linear-gradient(225deg,#e8f5fd_0_49%,rgba(1,61,96,.12)_50%,transparent_52%)] shadow-[-8px_8px_18px_rgba(1,61,96,.08)]" />
  </motion.article>;
}
