"use client";

import { ArrowRightIcon, FileArrowUpIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import type { ContentBlock } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { scrollSceneStyle, scrollSystem } from "@/lib/motion/scroll-system";

const fieldClass = "mt-2 w-full rounded-xl border border-copad-deep/12 bg-copad-sand/65 px-4 py-3 text-sm text-copad-deep outline-none transition placeholder:text-copad-deep/30 focus:border-copad-green focus:bg-white focus:ring-4 focus:ring-copad-green/10";

export function CareersApplication({ locale, block, cta }: { locale: Locale; block: ContentBlock; cta?: string }) {
  const ref = useRef<HTMLElement>(null); const reducedMotion = useReducedMotion(); const isArabic = locale === "ar";
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 50, damping: 29, mass: .75 });
  const sceneProgress = useTransform(progress, [0, scrollSystem.scene.completion], [0, 1]);
  const rotateX = useTransform(sceneProgress, [0, 1], [12, 0]); const rotateZ = useTransform(sceneProgress, [0, 1], [isArabic ? -3 : 3, 0]); const scale = useTransform(sceneProgress, [0, 1], [.86, 1]); const formY = useTransform(sceneProgress, [0, 1], [90, 0]);

  const labels = isArabic ? {
    kicker: "الخطوة التالية", title: "ابدأ مسارك معنا", name: "الاسم الكامل", email: "البريد الإلكتروني", area: "مجال الاهتمام", cv: "السيرة الذاتية", note: "نبذة قصيرة", placeholder: "عرّفنا بخبراتك والمجال الذي ترغب في الانضمام إليه", choose: "اختر المجال", upload: "PDF أو DOCX", status: "يُراجع بواسطة فريق التوظيف",
  } : {
    kicker: "Your next move", title: "Start your path with us", name: "Full name", email: "Email address", area: "Area of interest", cv: "Curriculum vitae", note: "Short introduction", placeholder: "Tell us about your experience and the area you want to join", choose: "Choose an area", upload: "PDF or DOCX", status: "Reviewed by the recruitment team",
  };
  const areas = isArabic ? ["التصنيع", "ضمان الجودة", "الشؤون التنظيمية", "العمليات التجارية", "الوظائف المؤسسية"] : ["Manufacturing", "Quality Assurance", "Regulatory Affairs", "Commercial Operations", "Corporate Functions"];

  return <section ref={ref} id="apply" style={scrollSceneStyle(2)} className="relative h-[var(--scroll-scene-height)] bg-copad-deep text-white"><div className="sticky top-0 h-[100svh] overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_45%,rgba(16,159,131,.22),transparent_29%)] rtl:bg-[radial-gradient(circle_at_28%_45%,rgba(16,159,131,.22),transparent_29%)]" />
    <div dir={isArabic ? "rtl" : "ltr"} className="relative mx-auto grid h-full max-w-[1440px] items-center gap-7 px-5 pb-20 pt-24 sm:px-8 lg:grid-cols-[.74fr_1.26fr] lg:px-12 lg:pt-28">
      <div><p className="text-[8px] font-black uppercase tracking-[.23em] text-copad-green">{labels.kicker}</p><h2 className={`${isArabic ? "font-sans font-black leading-[1.06]" : "font-display leading-[.88]"} mt-5 text-[clamp(3.2rem,8vw,6.6rem)] tracking-[-.065em]`}>{labels.title}</h2><p className="mt-7 max-w-xl text-sm leading-7 text-white/68 sm:text-base sm:leading-8">{block.body}</p><div className="mt-8 flex items-center gap-3 text-[8px] font-black uppercase tracking-[.17em] text-white/38"><span className="size-2 rounded-full bg-copad-green shadow-[0_0_14px_rgba(16,159,131,.8)]" />{labels.status}</div></div>

      <div className="relative mx-auto w-full max-w-[46rem] [perspective:1600px]">
        <motion.form style={reducedMotion ? undefined : { rotateX, rotateZ, scale, y: formY }} className="relative grid max-h-[72svh] gap-4 overflow-y-auto rounded-[2rem] bg-copad-white p-5 text-copad-deep shadow-[0_50px_120px_rgba(0,0,0,.42)] sm:grid-cols-2 sm:p-8 [transform-style:preserve-3d]">
          <div className="col-span-full flex items-start justify-between border-b border-copad-deep/12 pb-4"><div><strong className="text-xl font-black tracking-[-.04em]">COPAD</strong><p className="mt-1 text-[8px] font-black uppercase tracking-[.18em] text-copad-green">{isArabic ? "طلب انضمام" : "Career Application"}</p></div><span className="font-display text-4xl text-copad-deep/10">CV</span></div>
          <label className="text-xs font-black text-copad-deep/67">{labels.name}<input className={fieldClass} name="name" autoComplete="name" /></label>
          <label className="text-xs font-black text-copad-deep/67">{labels.email}<input className={fieldClass} type="email" name="email" autoComplete="email" /></label>
          <label className="text-xs font-black text-copad-deep/67">{labels.area}<select className={fieldClass} name="area" defaultValue=""><option value="" disabled>{labels.choose}</option>{areas.map(area => <option key={area}>{area}</option>)}</select></label>
          <label className="text-xs font-black text-copad-deep/67">{labels.cv}<span className={`${fieldClass} flex min-h-12 cursor-pointer items-center justify-between gap-3`}><span className="flex items-center gap-2 text-copad-deep/48"><FileArrowUpIcon size={18} className="text-copad-green" />{labels.upload}</span><input className="sr-only" type="file" name="cv" accept=".pdf,.doc,.docx" /></span></label>
          <label className="col-span-full text-xs font-black text-copad-deep/67">{labels.note}<textarea className={fieldClass} name="message" rows={3} placeholder={labels.placeholder} /></label>
          <button type="button" className="group col-span-full inline-flex min-h-12 items-center justify-center gap-4 rounded-full bg-copad-green px-7 text-xs font-black text-white shadow-[0_16px_36px_rgba(16,159,131,.22)] transition hover:-translate-y-0.5 hover:bg-copad-deep sm:col-span-1">{cta}<ArrowRightIcon className="transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" /></button>
        </motion.form>
        <div className="absolute -bottom-6 inset-x-16 h-10 rounded-full bg-black/35 blur-2xl" />
      </div>
    </div>
  </div></section>;
}
