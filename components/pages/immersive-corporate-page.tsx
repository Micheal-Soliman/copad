"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArticleIcon } from "@phosphor-icons/react/dist/csr/Article";
import { BroadcastIcon } from "@phosphor-icons/react/dist/csr/Broadcast";
import { HandshakeIcon } from "@phosphor-icons/react/dist/csr/Handshake";
import { UsersThreeIcon } from "@phosphor-icons/react/dist/csr/UsersThree";
import { ContactForm } from "@/components/forms/contact-form";
import { HomeSectionNavigator } from "@/components/home/home-section-navigator";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteCopy } from "@/content/site";
import type { ContentBlock, SectionSlug } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { scrollSceneIndex, scrollSceneStyle, scrollSystem } from "@/lib/motion/scroll-system";

type Experience = "insights" | "partnership" | "careers" | "contact";
type Props = { locale: Locale; section: SectionSlug; nextSection: SectionSlug; experience: Experience };
const ease = [0.22, 1, 0.36, 1] as const;

const localCopy = {
  en: {
    insights: { kicker: "Knowledge in motion", scene: "Knowledge Lens", chapter: "Editorial channel", next: "Continue the journey" },
    partnership: { kicker: "Build the connection", scene: "Partnership Bridge", chapter: "Partnership route", next: "Continue the journey" },
    careers: { kicker: "People power progress", scene: "Talent Network", chapter: "Career dimension", next: "Continue the journey" },
    contact: { kicker: "Route your inquiry", scene: "Signal Router", chapter: "Contact channel", next: "Continue the journey" },
  },
  ar: {
    insights: { kicker: "المعرفة في حركة", scene: "عدسة المعرفة", chapter: "مسار تحريري", next: "أكمل الرحلة" },
    partnership: { kicker: "ابنِ نقطة الاتصال", scene: "جسر الشراكة", chapter: "مسار شراكة", next: "أكمل الرحلة" },
    careers: { kicker: "الإنسان يصنع التقدم", scene: "شبكة المواهب", chapter: "مسار مهني", next: "أكمل الرحلة" },
    contact: { kicker: "وجّه استفسارك", scene: "موجّه الاتصال", chapter: "قناة تواصل", next: "أكمل الرحلة" },
  },
};

export function ImmersiveCorporatePage({ locale, section, nextSection, experience }: Props) {
  const copy = siteCopy[locale];
  const content = copy.sections[section];
  const labels = localCopy[locale][experience];
  const navigation = [
    { id: "home", label: labels.scene },
    { id: "chapters", label: locale === "ar" ? "المسارات" : "Channels" },
    { id: "next", label: copy.sections[nextSection].title },
  ];

  return <main className="min-h-screen overflow-x-clip bg-copad-white">
    <SiteHeader locale={locale} transparent />
    <ImmersiveHero locale={locale} experience={experience} title={content.title} intro={content.intro} kicker={labels.kicker} scene={labels.scene} />
    <ImmersiveChapters locale={locale} experience={experience} blocks={content.blocks} cta={content.cta} label={labels.chapter} />
    {experience === "contact" && <ContactDeck locale={locale} />}
    <NextChapter locale={locale} nextSection={nextSection} label={labels.next} />
    <HomeSectionNavigator label={`${content.title} sections`} items={navigation} />
    <SiteFooter locale={locale} />
  </main>;
}

function ImmersiveHero({ locale, experience, title, intro, kicker, scene }: { locale: Locale; experience: Experience; title: string; intro: string; kicker: string; scene: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isArabic = locale === "ar";
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const copyOpacity = useTransform(scrollYProgress, [0, .18, .56, .68], [1, 1, 1, 0]);
  const copyY = useTransform(scrollYProgress, [0, .62], [0, -85]);
  const sceneScale = useTransform(scrollYProgress, [0, .46, 1], [.72, 1, 1.05]);
  const sceneRotate = useTransform(scrollYProgress, [0, 1], experience === "partnership" ? [-9, 7] : [-14, 22]);
  const sceneOpacity = useTransform(scrollYProgress, [.08, .3, .82, 1], [0, 1, 1, .2]);
  const sweep = useTransform(scrollYProgress, [0, 1], ["-40%", "115%"]);

  return <section ref={ref} id="home" style={scrollSceneStyle(2)} className="relative bg-copad-deep text-white lg:h-[var(--scroll-scene-height)]"><div className="relative isolate min-h-[100svh] overflow-hidden lg:sticky lg:top-0 lg:h-screen">
    <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_75%_38%,rgba(0,163,196,.23),transparent_27%),radial-gradient(circle_at_12%_88%,rgba(232,245,253,.08),transparent_30%),linear-gradient(135deg,#064f78,#064f78_56%,#064f78)]" />
    <motion.span aria-hidden="true" className="absolute inset-y-0 z-10 w-[26%] -skew-x-12 bg-linear-to-r from-transparent via-white/[.07] to-transparent blur-xl" style={{ x: sweep }} />
    <div dir={isArabic ? "rtl" : "ltr"} className="mx-auto grid min-h-[100svh] max-w-[1440px] items-center gap-8 px-4 pt-24 pb-10 sm:px-8 lg:grid-cols-[.78fr_1.22fr] lg:px-12">
      <motion.div className="relative z-20" style={reduceMotion ? undefined : { opacity: copyOpacity, y: copyY }}><p className="text-[9px] font-black tracking-[.24em] text-copad-green uppercase">{kicker}</p><h1 className={`${isArabic ? "font-sans font-black leading-[1.02]" : "font-display leading-[.82]"} mt-5 max-w-4xl text-[clamp(3.8rem,15vw,6.5rem)] tracking-[-.065em] lg:text-[clamp(6rem,8.4vw,8.8rem)]`}>{title}</h1><p className="mt-7 max-w-2xl border-s-2 border-copad-green ps-5 text-sm leading-7 text-white/68 sm:text-base sm:leading-8 lg:text-lg lg:leading-9">{intro}</p></motion.div>
      <motion.div className="relative mx-auto aspect-square w-full max-w-[42rem] [perspective:1400px]" style={reduceMotion ? undefined : { opacity: sceneOpacity, scale: sceneScale, rotateY: sceneRotate }}><ExperienceObject experience={experience} scene={scene} progress={scrollYProgress} /></motion.div>
    </div>
  </div></section>;
}

function ExperienceObject({ experience, scene, progress }: { experience: Experience; scene: string; progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const orbit = useTransform(progress, [0, 1], [0, 300]);
  const spread = useTransform(progress, [.15, .62], [0, 1]);
  const bridgeLeft = useTransform(spread, [0, 1], [110, 0]);
  const bridgeRight = useTransform(spread, [0, 1], [-110, 0]);
  const contactRotate = useTransform(orbit, [0, 300], [-6, 5]);
  if (experience === "partnership") return <div className="absolute inset-[9%] [transform-style:preserve-3d]"><motion.div className="absolute inset-y-[16%] start-0 w-[44%] rounded-[2rem] border border-white/16 bg-white/[.08] shadow-[0_35px_80px_rgba(0,0,0,.3)] backdrop-blur-md" style={{ x: bridgeLeft, rotateY: -12 }} /><motion.div className="absolute inset-y-[16%] end-0 w-[44%] rounded-[2rem] border border-copad-green/35 bg-copad-green/12 shadow-[0_35px_80px_rgba(0,0,0,.3)] backdrop-blur-md" style={{ x: bridgeRight, rotateY: 12 }} /><motion.span className="absolute start-[42%] end-[42%] top-1/2 h-2 -translate-y-1/2 rounded-full bg-copad-green shadow-[0_0_34px_rgba(0,163,196,.8)]" style={{ scaleX: spread }} /><SvgCore Icon={HandshakeIcon} spread={spread} /><SceneLabel scene={scene} /></div>;
  if (experience === "careers") return <div className="absolute inset-[8%]"><motion.div className="absolute inset-[10%] rounded-full border border-white/16" style={{ rotate: orbit }}><span className="absolute inset-[20%] rounded-full border border-copad-green/25" />{Array.from({ length: 8 }, (_, index) => <motion.span key={index} className="absolute size-5 rounded-full border border-white/40 bg-copad-deep shadow-[0_0_20px_rgba(0,163,196,.45)]" style={{ left: `${50 + Math.cos(index / 8 * Math.PI * 2) * 45}%`, top: `${50 + Math.sin(index / 8 * Math.PI * 2) * 45}%`, scale: spread }} />)}</motion.div><SvgCore Icon={UsersThreeIcon} spread={spread} /><SceneLabel scene={scene} /></div>;
  if (experience === "contact") return <div className="absolute inset-[8%]"><motion.div className="absolute inset-[12%] rounded-[2.5rem] border border-white/18 bg-white/[.06] shadow-[0_35px_90px_rgba(0,0,0,.32)] backdrop-blur-xl" style={{ rotate: contactRotate }}>{Array.from({ length: 5 }, (_, index) => <motion.span key={index} className="absolute start-[12%] h-px bg-linear-to-r from-copad-green via-white/50 to-transparent" style={{ top: `${18 + index * 16}%`, width: `${35 + index * 9}%`, scaleX: spread, transformOrigin: "left" }} />)}<span className="absolute end-[12%] top-1/2 size-20 -translate-y-1/2 rounded-full border border-copad-green/50 bg-copad-deep shadow-[0_0_45px_rgba(0,163,196,.38)]" /></motion.div><SvgCore Icon={BroadcastIcon} spread={spread} /><SceneLabel scene={scene} /></div>;
  return <div className="absolute inset-[8%]"><motion.div className="absolute inset-[13%] rounded-full border border-white/18" style={{ rotate: orbit }}><span className="absolute inset-[18%] rounded-full border border-copad-green/24" /><span className="absolute inset-[36%] rounded-full border border-white/15 bg-copad-green/12 backdrop-blur-md" />{Array.from({ length: 6 }, (_, index) => <span key={index} className="absolute start-1/2 top-1/2 h-px w-[46%] origin-left bg-linear-to-r from-copad-green/65 to-transparent" style={{ rotate: `${index * 60}deg` }} />)}</motion.div><SvgCore Icon={ArticleIcon} spread={spread} /><SceneLabel scene={scene} /></div>;
}

function SvgCore({ Icon, spread }: { Icon: typeof ArticleIcon; spread: MotionValue<number> }) {
  return (
    <motion.span
      className="absolute start-1/2 top-1/2 z-20 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[2rem] border border-white/22 bg-copad-deep/72 text-copad-green shadow-[0_28px_75px_rgba(0,0,0,.36),0_0_55px_rgba(0,163,196,.24),inset_0_1px_0_rgba(255,255,255,.14)] backdrop-blur-xl [transform-style:preserve-3d] rtl:translate-x-1/2"
      style={{ scale: spread, rotateX: -8, rotateY: 12, z: 60 }}
    >
      <span className="absolute inset-[14%] rounded-[1.45rem] border border-white/10 bg-linear-to-br from-white/12 via-transparent to-copad-green/10 [transform:translateZ(18px)]" />
      <Icon className="relative [filter:drop-shadow(0_16px_20px_rgba(0,0,0,.34))] [transform:translateZ(38px)]" size={64} weight="duotone" />
    </motion.span>
  );
}

function SceneLabel({ scene }: { scene: string }) { return <span className="absolute inset-x-0 bottom-[6%] text-center text-[9px] font-black tracking-[.24em] text-white/55 uppercase">{scene}</span>; }

function ImmersiveChapters({ locale, experience, blocks, cta, label }: { locale: Locale; experience: Experience; blocks: ContentBlock[]; cta?: string; label: string }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const lenis = useLenis();
  const isArabic = locale === "ar";
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const sceneProgress = useTransform(scrollYProgress, [0, scrollSystem.scene.completion], [0, 1]);
  const smooth = useSpring(sceneProgress, { stiffness: 78, damping: 29, mass: .46 });
  const rail = useTransform(smooth, [0, 1], isArabic ? ["20%", "-20%"] : ["-20%", "20%"]);
  useMotionValueEvent(sceneProgress, "change", value => setActive(Math.min(blocks.length - 1, Math.max(0, Math.round(value * (blocks.length - 1))))));
  function goTo(index: number) { const s = ref.current; if (!s) return; const top = s.offsetTop + (s.offsetHeight - innerHeight) * scrollSceneIndex(index, blocks.length); if (lenis) lenis.scrollTo(top, { duration: scrollSystem.scene.navigationDuration, easing: v => 1 - Math.pow(1-v,4) }); else scrollTo({ top, behavior: "smooth" }); }
  const block = blocks[active]!;
  return <section id="chapters" ref={ref} style={scrollSceneStyle(blocks.length)} className="relative h-[var(--scroll-scene-height)] bg-copad-sand"><div className="sticky top-0 h-[100svh] overflow-hidden"><div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(0,163,196,.15),transparent_25%),radial-gradient(circle_at_86%_80%,rgba(6,79,120,.08),transparent_28%)]" /><motion.div aria-hidden="true" className="absolute top-1/2 start-[-20%] h-px w-[140%] bg-linear-to-r from-transparent via-copad-green/45 to-transparent" style={{ x: rail }} />
    <div dir={isArabic ? "rtl" : "ltr"} className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col px-4 pt-20 pb-20 sm:px-8 sm:pt-24 lg:px-12"><header className="flex shrink-0 items-end justify-between gap-5 border-b border-copad-deep/12 pb-4"><div><span className="text-[8px] font-black tracking-[.2em] text-copad-green uppercase">{label}</span><h2 className={`${isArabic ? "font-sans font-black" : "font-display"} mt-2 text-3xl tracking-[-.04em] text-copad-deep sm:text-5xl`}>{experience === "contact" ? (isArabic ? "وجّه رسالتك" : "Route your message") : (isArabic ? "اكتشف المسارات" : "Explore the channels")}</h2></div><div dir="ltr" className="font-display text-4xl text-copad-deep">0{active+1}<span className="ms-1 text-sm text-copad-deep/28">/0{blocks.length}</span></div></header>
      <div className="flex min-h-0 flex-1 items-center py-7"><AnimatePresence mode="wait" initial={false}><motion.article key={block.title} initial={reduceMotion ? false : { opacity: 0, x: isArabic ? -60 : 60, rotateY: isArabic ? 14 : -14, filter: "blur(8px)" }} animate={{ opacity: 1, x: 0, rotateY: 0, filter: "blur(0px)" }} exit={reduceMotion ? undefined : { opacity: 0, x: isArabic ? 40 : -40, rotateY: isArabic ? -10 : 10, filter: "blur(5px)" }} transition={{ duration: .58, ease }} className={`relative mx-auto w-full max-w-6xl overflow-hidden rounded-[1.8rem] border p-6 shadow-[0_30px_80px_rgba(6,79,120,.12)] sm:p-10 lg:p-14 ${active % 2 ? "border-white/12 bg-copad-deep text-white" : "border-copad-deep/10 bg-copad-white text-copad-deep"}`}><span className={`absolute -end-5 -top-14 font-display text-[13rem] leading-none ${active % 2 ? "text-white/[.035]" : "text-copad-deep/[.035]"}`}>0{active+1}</span><div className="relative"><span className="text-[8px] font-black tracking-[.2em] text-copad-green uppercase">{label} · 0{active+1}</span><h3 className={`${isArabic ? "font-sans font-black leading-[1.1]" : "font-display leading-[.94]"} mt-5 max-w-4xl text-[clamp(2.4rem,8vw,5.4rem)] tracking-[-.055em]`}>{block.title}</h3><p className={`mt-6 max-w-3xl text-sm leading-7 sm:text-base sm:leading-8 ${active % 2 ? "text-white/64" : "text-copad-deep/65"}`}>{block.body}</p>{block.items && <div className="mt-7 grid gap-2 sm:grid-cols-2">{block.items.map(item => <span key={item} className="flex gap-3 text-xs leading-6 opacity-65"><i className="mt-2.5 size-1.5 shrink-0 rounded-full bg-copad-green" />{item}</span>)}</div>}{cta && active === blocks.length - 1 && <Link href={`/${locale}/contact`} className="mt-7 inline-flex min-h-11 items-center rounded-full bg-copad-green px-6 text-xs font-black text-white transition hover:-translate-y-1">{cta}</Link>}</div></motion.article></AnimatePresence></div>
      <nav className="shrink-0"><div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${blocks.length}, minmax(0,1fr))` }}>{blocks.map((item,index)=><button key={item.title} onClick={()=>goTo(index)} className={`overflow-hidden rounded-full border px-3 py-2 text-[8px] font-black transition sm:text-[9px] ${active===index?"border-copad-deep bg-copad-deep text-white":"border-copad-deep/10 bg-white/55 text-copad-deep/45"}`}><span className="sm:hidden">0{index+1}</span><span className="hidden truncate sm:block">{item.title}</span></button>)}</div></nav>
    </div>
  </div></section>;
}

function ContactDeck({ locale }: { locale: Locale }) { const isArabic = locale === "ar"; return <section className="relative bg-copad-white px-4 py-20 sm:px-8 lg:px-12 lg:py-32"><div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><span className="text-[9px] font-black tracking-[.2em] text-copad-green uppercase">{isArabic ? "مركز الرسائل" : "Message center"}</span><h2 className={`${isArabic ? "font-sans font-black" : "font-display"} mt-5 text-5xl leading-[.95] tracking-[-.05em] text-copad-deep lg:text-7xl`}>{siteCopy[locale].utility.formTitle}</h2><p className="mt-6 text-sm leading-7 text-copad-deep/62 sm:text-base sm:leading-8">{siteCopy[locale].utility.formBody}</p></div><div className="rounded-[2rem] border border-copad-deep/10 bg-copad-sand/45 p-5 shadow-[0_25px_70px_rgba(6,79,120,.08)] sm:p-8"><ContactForm locale={locale} /></div></div></section>; }

function NextChapter({ locale, nextSection, label }: { locale: Locale; nextSection: SectionSlug; label: string }) { const copy=siteCopy[locale]; return <section id="next" className="bg-copad-green px-4 py-16 text-white sm:px-8 lg:px-12 lg:py-24"><div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-7 md:flex-row md:items-end"><p className="text-[9px] font-black tracking-[.2em] text-white/60 uppercase">{label}</p><Link href={`/${locale}/${nextSection}`} className="max-w-5xl font-display text-4xl leading-[.95] tracking-[-.045em] transition hover:text-copad-deep sm:text-6xl lg:text-8xl">{copy.sections[nextSection].title}</Link></div></section>; }
