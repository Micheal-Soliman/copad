"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { useDesktopLayout } from "@/components/motion/use-desktop-layout";
import type { Section } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { homeScrollSceneStyle } from "@/lib/motion/scroll-system";
import styles from "./insights-book.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

export function InsightsHero({ locale, content }: { locale: Locale; content: Section }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isDesktop = useDesktopLayout();
  const ar = locale === "ar";
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 76, damping: 33, mass: 0.48 });
  const introOpacity = useTransform(progress, [0, 0.32, 0.62, 1], [1, 1, 0.35, 0.35]);
  const introX = useTransform(progress, [0, 0.62, 1], [0, ar ? 28 : -28, ar ? 28 : -28]);
  const bookScale = useTransform(progress, [0, 0.2, 0.7, 1], [0.92, 0.96, 1, 1]);
  const bookRotate = useTransform(progress, [0, 0.42, 1], [ar ? -2.5 : 2.5, 0, 0]);
  const scrollDriven = isDesktop && !reduceMotion;

  return <section ref={sectionRef} id="home" style={homeScrollSceneStyle(4)} className="relative min-h-svh bg-copad-deep text-white lg:h-[var(--scroll-scene-height)]">
    <div className="relative isolate min-h-[100svh] overflow-hidden lg:sticky lg:top-0 lg:h-screen">
      <div aria-hidden="true" className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_78%_35%,rgba(0,163,196,.18),transparent_31%),radial-gradient(circle_at_16%_88%,rgba(142,220,245,.07),transparent_26%),linear-gradient(125deg,#064f78,#064f78)]" />
      <motion.div aria-hidden="true" className="absolute inset-y-0 -z-20 w-[34vw] bg-linear-to-r from-transparent via-copad-green/[.065] to-transparent blur-3xl" animate={reduceMotion ? undefined : { x: ["-38vw", "120vw"] }} transition={{ duration: 11, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }} />
      <div aria-hidden="true" className="absolute inset-y-0 start-[48%] hidden w-px bg-white/[.05] lg:block" />

      <div dir={ar ? "rtl" : "ltr"} className="mx-auto grid min-h-[100svh] max-w-[1440px] items-center gap-7 px-4 pt-24 pb-12 sm:px-8 sm:pt-28 lg:h-screen lg:min-h-0 lg:grid-cols-[.66fr_1.34fr] lg:gap-7 lg:px-12 lg:pt-[5.8rem] lg:pb-7">
        <motion.div className="relative z-20 max-w-xl" style={scrollDriven ? { opacity: introOpacity, x: introX } : undefined}>
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08, ease }} className="flex items-center gap-3">
            <span className="size-2 rounded-full bg-copad-green shadow-[0_0_18px_rgba(0,163,196,.85)]" />
            <p className="text-[9px] font-black tracking-[.24em] text-copad-green uppercase">{ar ? "مكتبة كوباد الطبية" : "The COPAD Medical Library"}</p>
          </motion.div>
          <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.78, delay: 0.12, ease }} className="mt-5 font-display text-[clamp(3.75rem,15vw,6.25rem)] leading-[.95] tracking-[-.05em] lg:text-[clamp(4.75rem,6.5vw,6.8rem)]">{content.title}</motion.h1>
          <motion.p initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.78, delay: 0.28, ease }} className="mt-7 max-w-lg border-s-2 border-copad-green ps-5 text-sm leading-7 text-white/68 sm:text-base sm:leading-8">{content.intro}</motion.p>
        </motion.div>

        <motion.div className="relative mx-auto h-[22rem] w-full max-w-[59rem] sm:h-[33rem] lg:h-[min(35rem,calc(100vh-7.8rem))] lg:min-h-[29rem]" style={scrollDriven ? { scale: bookScale, rotateZ: bookRotate } : undefined}>
          <PageFlipBook ar={ar} reducedMotion={Boolean(reduceMotion)} />
        </motion.div>
      </div>
    </div>
  </section>;
}

function PageFlipBook({ ar, reducedMotion }: { ar: boolean; reducedMotion: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<import("page-flip").PageFlip | null>(null);
  const currentStageRef = useRef(0);
  const desiredStageRef = useRef(0);
  const busyRef = useRef(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false;
    let instance: import("page-flip").PageFlip | null = null;
    let mobileOpenTimer: number | undefined;
    const host = document.createElement("div");
    host.className = styles.host;
    host.innerHTML = createBookPages(ar);
    mount.replaceChildren(host);
    const syncStage = () => {
      const book = bookRef.current;
      if (!book || !window.matchMedia("(min-width: 960px)").matches || busyRef.current || desiredStageRef.current === currentStageRef.current) return;
      busyRef.current = true;
      if (desiredStageRef.current > currentStageRef.current) book.flipNext();
      else book.flipPrev();
    };
    const updateFromScroll = () => {
      const book = bookRef.current;
      const section = mount.closest("section");
      if (!book || !section || !window.matchMedia("(min-width: 960px)").matches || reducedMotion) return;
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const value = Math.max(0, Math.min(1, (window.scrollY - section.offsetTop) / travel));
      const targetStage = value < 0.24 ? 0 : value < 0.64 ? 1 : 2;
      desiredStageRef.current = targetStage;
      syncStage();
    };
    window.addEventListener("scroll", updateFromScroll, { passive: true });

    void import("page-flip").then(({ PageFlip }) => {
      if (disposed) return;
      const desktop = window.matchMedia("(min-width: 960px)").matches;
      instance = new PageFlip(host, {
        width: 420,
        height: 560,
        size: "stretch",
        minWidth: 220,
        maxWidth: 420,
        minHeight: 294,
        maxHeight: 560,
        drawShadow: true,
        flippingTime: 1050,
        usePortrait: !desktop,
        startPage: 0,
        startZIndex: 10,
        autoSize: true,
        maxShadowOpacity: 0.32,
        showCover: true,
        mobileScrollSupport: false,
        useMouseEvents: !desktop,
        showPageCorners: false,
        disableFlipByClick: false,
      });
      const pages = host.querySelectorAll<HTMLElement>("[data-book-page]");
      instance.on("flip", (event) => {
        const page = Number(event.data);
        currentStageRef.current = page >= 3 ? 2 : page >= 1 ? 1 : 0;
      });
      instance.on("changeState", (event) => {
        busyRef.current = event.data === "flipping";
        if (!busyRef.current) window.setTimeout(syncStage, 0);
      });
      instance.loadFromHTML(pages);
      bookRef.current = instance;
      updateFromScroll();
      if (!desktop) {
        if (reducedMotion) {
          instance.turnToPage(1);
          currentStageRef.current = 1;
        } else {
          mobileOpenTimer = window.setTimeout(() => instance?.flipNext(), 650);
        }
      } else if (reducedMotion) {
        window.setTimeout(() => instance?.turnToPage(1), 80);
        currentStageRef.current = 1;
        desiredStageRef.current = 1;
      }
    });

    return () => {
      disposed = true;
      if (mobileOpenTimer !== undefined) window.clearTimeout(mobileOpenTimer);
      window.removeEventListener("scroll", updateFromScroll);
      bookRef.current = null;
      busyRef.current = false;
      currentStageRef.current = 0;
      desiredStageRef.current = 0;
      if (instance) instance.destroy();
      mount.replaceChildren();
    };
  }, [ar, reducedMotion]);

  return <div ref={mountRef} className={styles.mount} aria-label={ar ? "عدد كوباد الطبي التفاعلي" : "Interactive COPAD medical issue"} />;
}

function createBookPages(ar: boolean) {
  const c = {
    issue: ar ? "الإصدار الأول" : "Issue No. 01",
    title: ar ? "رؤى كوباد" : "COPAD Insights",
    edition: ar ? "المعرفة الصحية بوضوح" : "Healthcare knowledge, clearly considered",
    purpose: ar ? "معرفة موثوقة، بلغة واضحة." : "Credible knowledge, clearly communicated.",
    purposeBody: ar ? "محتوى صحي وتعليمي يساعد القارئ على فهم الموضوع قبل أي شيء آخر." : "Health and educational content designed to help readers understand the subject before anything else.",
    inside: ar ? "داخل هذا العدد" : "Inside this issue",
    streams: ar ? ["الوعي بالأمراض", "التغذية والعافية", "الشركة والقطاع"] : ["Disease Awareness", "Nutrition & Wellness", "Corporate & Industry"],
    feature: ar ? "من المعلومة إلى الفهم" : "From information to understanding",
    featureBody: ar ? "نقدّم السياق الطبي بصورة مبسطة ومسؤولة، بعيدًا عن الترويج للمنتجات." : "Medical context presented in an accessible and responsible way, without product promotion.",
    close: ar ? "اقرأ بوعي." : "Read with perspective.",
  };
  const page = (inside: string, extra = "", density = "soft") => `<div data-book-page data-density="${density}" class="${styles.page} ${extra}"><div class="${styles.pageInner}">${inside}</div></div>`;
  const header = (number: string) => `<div class="${styles.paperHeader}"><span>COPAD / INSIGHTS</span><span>${number}</span></div>`;
  return [
    page(`<div class="${styles.coverMark}">${c.issue}</div><h2 class="${styles.coverTitle}">${c.title}</h2><div class="${styles.coverFooter}"><span>${c.edition}</span><strong class="${styles.coverNumber}">01</strong></div>`, styles.cover, "hard"),
    page(`${header("01")}<p class="${styles.kicker}">${ar ? "رؤيتنا التحريرية" : "Editorial perspective"}</p><h3 class="${styles.pageTitle}">${c.purpose}</h3><p class="${styles.body}">${c.purposeBody}</p><span class="${styles.folio}">COPAD Pharma Egypt · 1989—2026</span>`),
    page(`${header("02")}<p class="${styles.kicker}">${c.inside}</p><h3 class="${styles.pageTitle}">${ar ? "ثلاثة مسارات للقراءة" : "Three ways into the story"}</h3><div class="${styles.streamList}">${c.streams.map((stream, index) => `<div class="${styles.stream}"><span>0${index + 1}</span>${stream}</div>`).join("")}</div><span class="${styles.folio}">The COPAD Medical Library</span>`),
    page(`${header("03")}<p class="${styles.kicker}">${ar ? "المقال الرئيسي" : "Lead feature"}</p><h3 class="${styles.pageTitle}">${c.feature}</h3><p class="${styles.body}">${c.featureBody}</p><span class="${styles.folio}">Knowledge · Context · Responsibility</span>`),
    page(`${header("04")}<p class="${styles.kicker}">${ar ? "كلمة أخيرة" : "Closing note"}</p><h3 class="${styles.pageTitle}">${c.close}</h3><p class="${styles.body}">${ar ? "كل موضوع بداية لفهم أعمق، وليس نهاية للحوار." : "Every topic is a starting point for deeper understanding, not the end of the conversation."}</p><span class="${styles.folio}">COPAD / Insights</span>`),
    page(`<div class="${styles.coverMark}">COPAD Pharma Egypt</div><h2 class="${styles.coverTitle}">${ar ? "معرفة مسؤولة." : "Knowledge, responsibly shared."}</h2><div class="${styles.coverFooter}"><span>copad.com.eg</span><strong class="${styles.coverNumber}">C</strong></div>`, styles.backCover, "hard"),
  ].join("");
}
