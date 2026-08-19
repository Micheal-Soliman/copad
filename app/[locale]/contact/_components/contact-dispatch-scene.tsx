"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ContactForm } from "@/components/forms/contact-form";
import type { Section } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { scrollSceneStyle, scrollSystem } from "@/lib/motion/scroll-system";

type Props = {
  locale: Locale;
  content: Section;
  channels: string[];
  routingBody: string;
  officeTitle: string;
  officeBody: string;
};

export function ContactDispatchScene({ locale, content, channels, routingBody, officeTitle, officeBody }: Props) {
  const sceneRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const isArabic = locale === "ar";
  const contactPoints = isArabic ? [
    { label: "المكتب الرئيسي", address: "قطعة 4، مربع 1169، شيراتون هليوبوليس، القاهرة", phone: "+2 02 2268 9212–17" },
    { label: "فرع وسط البلد", address: "11 شارع عماد الدين، القاهرة", phone: "+2 02 2589 2030" },
    { label: "المصنع", address: "مدينة العبور، المنطقة الصناعية، بلوك 12011", phone: "+2 02 4489 1447–1448" },
  ] : [
    { label: "Head Office", address: "Lot 4, Square 1169, Sheraton Heliopolis, Cairo", phone: "+2 02 2268 9212–17" },
    { label: "Downtown Branch", address: "11 Emad El Din St., Cairo", phone: "+2 02 2589 2030" },
    { label: "Manufacturing Facility", address: "El Obour City, Industrial Zone, Block 12011", phone: "+2 02 4489 1447–1448" },
  ];
  const [formReady, setFormReady] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(channels[0] ?? "");
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 42, damping: 28, mass: 0.82 });

  const introOpacity = useTransform(progress, [0, 0.2, 0.46], [1, 1, 0]);
  const introX = useTransform(progress, [0, 0.46], [0, isArabic ? 90 : -90]);
  const envelopeX = useTransform(progress, [0, 0.18, 0.5, 0.69], isArabic ? ["-22vw", "-17vw", "-17vw", "0vw"] : ["22vw", "17vw", "17vw", "0vw"]);
  const envelopeY = useTransform(progress, [0, 0.18, 0.5, 0.69], [45, 0, 0, 470]);
  const envelopeScale = useTransform(progress, [0, 0.18, 0.5, 0.69], [0.56, 0.72, 0.72, 1]);
  const envelopeRotateX = useTransform(progress, [0, 0.18], [-9, 0]);
  const envelopeRotateY = useTransform(progress, [0, 0.18], isArabic ? [-18, 0] : [18, 0]);
  const envelopeOpacity = useTransform(progress, [0.72, 0.79], [1, 0]);
  const flapRotate = useTransform(progress, [0.3, 0.35, 0.42, 0.54], [0, -5, -30, -172]);
  const flapZ = useTransform(progress, [0.3, 0.4, 0.54], [0, 16, 0]);
  const flapShadow = useTransform(progress, [0.32, 0.43, 0.55], [0, 0.55, 0]);
  const sealOpacity = useTransform(progress, [0.22, 0.3, 0.35], [1, 0.94, 0]);
  const sealScale = useTransform(progress, [0.22, 0.3, 0.35], [1, 1.08, 0.84]);
  const sealY = useTransform(progress, [0.22, 0.35], [0, -12]);
  const letterY = useTransform(progress, [0.54, 0.72], ["0%", "-108%"]);
  const letterScale = useTransform(progress, [0.54, 0.72], [0.96, 1]);
  const finalOpacity = useTransform(progress, [0.74, 0.82], [0, 1]);
  const finalY = useTransform(progress, [0.73, 0.84], [170, 0]);
  const finalScale = useTransform(progress, [0.73, 0.84], [0.74, 1]);
  const finalRotateX = useTransform(progress, [0.73, 0.84], [16, 0]);
  const backgroundWordX = useTransform(progress, [0, 1], isArabic ? [120, -70] : [-120, 70]);
  const sceneLine = useTransform(progress, [0, scrollSystem.scene.completion], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (value) => setFormReady(value > 0.74));

  return (
    <section ref={sceneRef} id="home" style={scrollSceneStyle(9)} className="relative bg-copad-deep text-white lg:h-[var(--scroll-scene-height)]">
      <div className="relative min-h-svh overflow-hidden lg:sticky lg:top-0 lg:h-screen">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(0,144,175,.2),transparent_30%),linear-gradient(145deg,#013d60_0%,#013d60_54%,#013d60_100%)]" />
        <motion.div aria-hidden="true" style={reducedMotion ? undefined : { x: backgroundWordX }} className="pointer-events-none absolute inset-x-[-8%] top-1/2 hidden -translate-y-1/2 whitespace-nowrap font-display text-[20vw] leading-none tracking-[-.08em] text-white/[.025] lg:block">
          {isArabic ? "تواصل" : "CONTACT"}
        </motion.div>

        <div dir={isArabic ? "rtl" : "ltr"} className="relative mx-auto min-h-svh max-w-[1500px] px-5 pt-28 pb-16 sm:px-8 lg:h-screen lg:px-12 lg:pt-24">
          <motion.div style={reducedMotion ? undefined : { opacity: introOpacity, x: introX }} className="relative z-20 flex min-h-[48svh] max-w-2xl flex-col justify-center lg:absolute lg:inset-y-0 lg:start-12 lg:w-[42%]">
            <span className="text-[9px] font-black tracking-[.28em] text-copad-green uppercase">COPAD / {content.eyebrow}</span>
            <h1 className={`${isArabic ? "font-sans font-black leading-[.98]" : "font-display leading-[.8]"} mt-6 text-[clamp(4rem,15vw,7rem)] tracking-[-.065em] lg:text-[clamp(6rem,8.4vw,9rem)]`}>{content.title}</h1>
            <p className="mt-8 max-w-xl text-sm leading-7 text-white/68 sm:text-lg sm:leading-9">{content.intro}</p>
            <div className="mt-10 flex items-center gap-4 text-[9px] font-black tracking-[.2em] text-white/42 uppercase"><span className="h-px w-14 bg-copad-green" />{isArabic ? "مرّر لفتح الرسالة" : "Scroll to open the message"}</div>
          </motion.div>

          <div className="relative z-10 mt-8 flex min-h-[28rem] items-center justify-center [perspective:1800px] lg:absolute lg:inset-0 lg:mt-0">
            <motion.div style={reducedMotion ? undefined : { x: envelopeX, y: envelopeY, scale: envelopeScale, rotateX: envelopeRotateX, rotateY: envelopeRotateY, opacity: envelopeOpacity }} className="relative h-[19rem] w-full max-w-[35rem] [transform-style:preserve-3d] sm:h-[22rem] lg:h-[32rem] lg:max-w-[72rem]">
              <div aria-hidden="true" className="absolute -inset-x-3 top-4 -bottom-3 rounded-[1.7rem] bg-black/35 shadow-[0_60px_120px_rgba(0,0,0,.46)] [transform:translateZ(-10px)]" />
              <div className="absolute inset-0 rounded-[1.4rem] border border-white/12 bg-[#013d60] shadow-[inset_0_1px_0_rgba(255,255,255,.12),0_30px_80px_rgba(0,0,0,.28)] [transform:translateZ(-2px)]" />
              <motion.div style={{ y: reducedMotion ? "-108%" : letterY, scale: reducedMotion ? 1 : letterScale }} className="absolute inset-x-[4%] top-[4%] z-10 h-[92%] overflow-hidden bg-[#f9fcff] p-6 text-copad-deep shadow-[0_38px_100px_rgba(0,0,0,.28)] sm:p-8 lg:p-10">
                <div className="flex items-start justify-between border-b border-copad-deep/12 pb-4"><strong className="text-xl font-black tracking-[-.04em] lg:text-2xl">COPAD</strong><span className="text-[8px] font-black tracking-[.2em] text-copad-green lg:text-[9px]">CONTACT / EGYPT</span></div>
                <div className="mt-5 flex items-end justify-between gap-5">
                  <div><p className="text-[8px] font-black tracking-[.2em] text-copad-green uppercase lg:text-[9px]">{content.blocks[0]?.title}</p><h2 className={`${isArabic ? "font-sans font-black" : "font-display"} mt-2 text-2xl leading-none tracking-[-.04em] sm:text-4xl lg:text-5xl`}>{isArabic ? "تواصل مباشرة مع كوباد" : "Reach COPAD directly"}</h2></div>
                  <div className="hidden text-end sm:block"><a href="mailto:Info@copadpharma.com" className="block text-xs font-black text-copad-deep hover:text-copad-green lg:text-sm">Info@copadpharma.com</a><span className="mt-1 block text-[8px] text-copad-deep/45 lg:text-[9px]">SUN–THU · 09:00–17:00</span></div>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-4 border-y border-copad-deep/10 py-5 lg:mt-7 lg:gap-6 lg:py-6">
                  {contactPoints.map((point, index) => <div key={point.label} className={index ? "border-s border-copad-deep/10 ps-4 lg:ps-6" : ""}><span className="text-[7px] font-black tracking-[.13em] text-copad-green uppercase lg:text-[9px]">0{index + 1} · {point.label}</span><p className="mt-2 text-[8px] leading-4 text-copad-deep/55 sm:text-[9px] lg:mt-3 lg:text-[11px] lg:leading-5">{point.address}</p><a dir="ltr" href={`tel:${point.phone.replace(/[^+\d]/g, "")}`} className="mt-2 block text-[8px] font-black text-copad-deep transition hover:text-copad-green sm:text-[9px] lg:mt-3 lg:text-[11px]">{point.phone}</a></div>)}
                </div>
                <div className="mt-4 grid grid-cols-[1fr_auto] items-center gap-4 lg:mt-6">
                  <div><span className="text-[7px] font-black tracking-[.13em] text-copad-green uppercase lg:text-[9px]">{isArabic ? "السلامة الدوائية" : "Pharmacovigilance"}</span><div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[8px] font-bold text-copad-deep/60 sm:text-[9px] lg:mt-2 lg:text-[11px]"><a href="mailto:pharmacovigilance@copadpharma.com" className="transition hover:text-copad-green">pharmacovigilance@copadpharma.com</a><a dir="ltr" href="tel:+201206807080" className="transition hover:text-copad-green">+2 01206807080</a></div></div>
                  <span className="grid size-10 place-items-center rounded-full border border-copad-green/35 text-xs font-black text-copad-green lg:size-12">C</span>
                </div>
              </motion.div>
              <div className="absolute inset-0 z-20 overflow-hidden rounded-[1.4rem] border border-white/8 bg-[linear-gradient(145deg,#013d60,#013d60)] [clip-path:polygon(0_0,50%_45%,100%_0,100%_100%,0_100%)] shadow-[inset_0_-30px_80px_rgba(0,0,0,.12)]">
                <span aria-hidden="true" className="absolute start-[-7%] top-[19%] h-px w-[64%] origin-start rotate-[24deg] bg-white/10" />
                <span aria-hidden="true" className="absolute end-[-7%] top-[19%] h-px w-[64%] origin-end -rotate-[24deg] bg-white/10" />
                <div className="absolute inset-x-8 bottom-7 flex items-end justify-between gap-6 border-t border-white/12 pt-5 text-white/48">
                  <div><span className="block text-[8px] font-black tracking-[.22em] text-copad-green">COPAD PHARMA EGYPT</span><span className="mt-2 block text-[8px] tracking-[.12em]">SHERATON HELIOPOLIS · CAIRO</span></div>
                  <span className="grid size-11 place-items-center border border-white/18 text-[8px] font-black tracking-[.1em]">1989</span>
                </div>
              </div>
              <motion.div aria-hidden="true" style={{ opacity: reducedMotion ? 0 : flapShadow }} className="pointer-events-none absolute inset-x-[8%] top-[2%] h-[36%] rounded-full bg-black/45 blur-2xl [z-index:25]" />
              <motion.div style={reducedMotion ? { opacity: 0 } : { opacity: sealOpacity, scale: sealScale, y: sealY }} className="absolute left-1/2 top-[46%] z-40 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-[#013d60] text-lg font-black text-white shadow-[0_16px_38px_rgba(4,28,26,.4),inset_0_1px_0_rgba(255,255,255,.18)]">
                <span aria-hidden="true" className="absolute inset-[5px] rounded-full border border-copad-green/45" />
                <span aria-hidden="true" className="absolute inset-y-2 left-1/2 w-px -translate-x-1/2 rotate-[18deg] bg-white/12" />
                <span className="relative">C</span>
              </motion.div>
              <motion.div style={reducedMotion ? { rotateX: -166 } : { rotateX: flapRotate, z: flapZ }} className="absolute inset-x-0 top-0 z-30 h-[58%] origin-top [transform-style:preserve-3d]">
                <div className="absolute inset-0 rounded-t-[1.4rem] bg-[linear-gradient(145deg,#0090af,#0090af)] [clip-path:polygon(0_0,100%_0,50%_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,.28),0_12px_25px_rgba(4,28,26,.16)] [backface-visibility:hidden]">
                  <span className="absolute inset-x-0 top-0 h-px bg-white/35" />
                </div>
                <div className="absolute inset-0 rounded-t-[1.4rem] border border-copad-deep/8 bg-[linear-gradient(160deg,#e8f5fd,#7bcded)] [clip-path:polygon(0_0,100%_0,50%_100%)] shadow-[inset_0_-35px_70px_rgba(1,61,96,.08)] [backface-visibility:hidden] [transform:rotateX(180deg)_translateZ(1px)]">
                  <span className="absolute left-1/2 top-[38%] -translate-x-1/2 text-[8px] font-black tracking-[.24em] text-copad-deep/24">COPAD / 1989</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div style={reducedMotion ? undefined : { opacity: finalOpacity, y: finalY, scale: finalScale, rotateX: finalRotateX }} className={`absolute inset-x-5 top-[11%] bottom-[8%] z-40 [perspective:1600px] sm:inset-x-8 lg:inset-x-12 ${formReady ? "pointer-events-auto" : "pointer-events-none"}`}>
            <div className="relative h-full overflow-y-auto bg-[#f9fcff] text-copad-deep shadow-[0_50px_140px_rgba(0,0,0,.36)] [clip-path:polygon(0_0,calc(100%_-_3rem)_0,100%_3rem,100%_100%,0_100%)] lg:overflow-hidden">
              <div aria-hidden="true" className="absolute end-0 top-0 size-12 bg-copad-green/15 [clip-path:polygon(0_0,100%_100%,0_100%)]" />
              <div className="grid min-h-full lg:grid-cols-[.8fr_1.2fr]">
                <div className="flex flex-col border-b border-copad-deep/10 p-6 sm:p-9 lg:border-e lg:border-b-0 lg:p-12">
                  <div className="flex items-center justify-between border-b border-copad-deep/12 pb-5"><strong className="text-2xl font-black tracking-[-.05em]">COPAD</strong><span className="text-[8px] font-black tracking-[.2em] text-copad-green">MESSAGE / 01</span></div>
                  <h2 className={`${isArabic ? "font-sans font-black leading-[1.02]" : "font-display leading-[.88]"} mt-8 text-[clamp(2.8rem,5vw,5.6rem)] tracking-[-.055em]`}>{officeTitle}</h2>
                  <p className="mt-6 text-sm leading-7 text-copad-deep/62 sm:text-base sm:leading-8">{officeBody}</p>
                  <p className="mt-5 hidden text-sm leading-7 text-copad-deep/45 xl:block">{routingBody}</p>
                  <div className="mt-auto pt-8">
                    <p className="mb-4 text-[8px] font-black tracking-[.2em] text-copad-deep/35 uppercase">{isArabic ? "اختر نوع الرسالة" : "Choose message type"}</p>
                    <div className="flex flex-wrap gap-x-5 gap-y-3">
                      {channels.map((channel, index) => (
                        <button key={channel} type="button" onClick={() => setSelectedChannel(channel)} className={`group flex items-center gap-2 border-b pb-1 text-start text-[10px] font-black transition duration-300 ${selectedChannel === channel ? "border-copad-green text-copad-deep" : "border-transparent text-copad-deep/38 hover:border-copad-green/40 hover:text-copad-deep"}`}>
                          <span className="text-copad-green">0{index + 1}</span>{channel}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex min-h-0 flex-col p-6 sm:p-9 lg:p-12">
                  <div className="mb-5 flex items-end justify-between gap-5"><div><span className="text-[8px] font-black tracking-[.2em] text-copad-green uppercase">{isArabic ? "اكتب رسالتك" : "Compose your message"}</span><p className="mt-2 text-xs leading-5 text-copad-deep/45">{selectedChannel}</p></div><span className="hidden font-display text-5xl leading-none text-copad-deep/8 sm:block">01</span></div>
                  <ContactForm key={selectedChannel} locale={locale} variant="dispatch" initialCategory={selectedChannel} />
                </div>
              </div>
            </div>
          </motion.div>

          <div className="absolute inset-x-5 bottom-5 z-50 hidden items-center gap-4 lg:flex"><span className="text-[8px] font-black tracking-[.18em] text-white/35">OPEN / WRITE / SEND</span><div className="h-px flex-1 bg-white/12"><motion.span style={{ scaleX: reducedMotion ? 1 : sceneLine }} className="block h-full origin-start bg-copad-green rtl:origin-right" /></div><span className="text-[8px] font-black tracking-[.18em] text-white/35">01 / 01</span></div>
        </div>
      </div>
    </section>
  );
}
