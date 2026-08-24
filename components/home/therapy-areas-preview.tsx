"use client";

import { useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ScrollAtmosphere } from "@/components/motion/scroll-atmosphere";
import { ScrollImageReveal } from "@/components/motion/scroll-image-reveal";
import { ScrollSceneItem } from "@/components/motion/scroll-scene-item";
import { useDesktopLayout } from "@/components/motion/use-desktop-layout";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { homeScrollSceneStyle } from "@/lib/motion/scroll-system";

type TherapyAreasPreviewProps = {
  locale: Locale;
  eyebrow: string;
  title: string;
  body: string;
  action: string;
};

export function TherapyAreasPreview({ locale, eyebrow, title, body, action }: TherapyAreasPreviewProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isDesktop = useDesktopLayout();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const ui = siteCopy[locale].ui.home;

  return (
    <section id="therapy" ref={sectionRef} style={homeScrollSceneStyle(1)} className="relative scroll-mt-20 overflow-clip bg-copad-sand/38 px-4 py-16 sm:px-8 sm:py-24 lg:h-[var(--scroll-scene-height)] lg:px-12 lg:py-0">
      <ScrollAtmosphere progress={scrollYProgress} reverse chapter="03" />
      <div dir="ltr" className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-10 sm:gap-14 lg:sticky lg:top-20 lg:h-[calc(100svh-5rem)] lg:min-h-0 lg:overflow-hidden lg:grid-cols-[1.02fr_.98fr] lg:gap-12 lg:py-6 2xl:gap-20">
        <ScrollSceneItem
          progress={scrollYProgress}
          active={isDesktop}
          side="right"
          role="media"
          className="relative mx-auto w-full max-w-2xl lg:col-start-2 lg:row-start-1"
        >
          <ScrollImageReveal
            className="relative aspect-[5/4] overflow-hidden rounded-[2rem] rounded-tr-[4rem] border border-copad-deep/10 bg-copad-deep bg-no-repeat shadow-[0_22px_60px_rgba(1,61,96,.13)] sm:rounded-[2.5rem] sm:rounded-tr-[6rem] sm:shadow-[0_30px_80px_rgba(1,61,96,.14)] lg:h-[min(64svh,34rem)] lg:aspect-auto"
            direction="right"
            progress={isDesktop ? scrollYProgress : undefined}
            timeline={isDesktop}
            cursorLabel={ui.interactionLabels.view}
          >
            <Image
              src="/images/about/about-researcher.png"
              alt={ui.therapyImageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-t from-copad-deep/72 via-copad-deep/5 to-transparent" aria-hidden="true" />
            <div className="absolute inset-x-4 bottom-4 rounded-[1.25rem] border border-white/15 bg-copad-deep/62 p-4 text-white backdrop-blur-md sm:inset-x-6 sm:bottom-6 sm:rounded-[1.5rem] sm:p-5 lg:inset-x-8 lg:bottom-8 lg:p-6">
              <p className="max-w-xs text-xs leading-6 font-bold text-white/82">{ui.therapyImageCaption}</p>
            </div>
          </ScrollImageReveal>
        </ScrollSceneItem>

        <ScrollSceneItem
          progress={scrollYProgress}
          active={isDesktop}
          side="left"
          role="copy"
          dir={locale === "ar" ? "rtl" : "ltr"}
          className="lg:col-start-1 lg:row-start-1"
        >
          <p className="border-s-2 border-copad-green ps-4 text-[10px] font-black tracking-[0.22em] text-copad-green uppercase">{eyebrow}</p>
          <h2 className="mt-4 max-w-4xl text-pretty font-display text-[clamp(2.3rem,3.7vw,4.25rem)] leading-[1.06] font-bold tracking-[-0.035em] text-copad-deep">{title}</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-copad-deep/66 sm:mt-7 lg:mt-5 lg:text-[15px] lg:leading-7 2xl:text-lg 2xl:leading-9">{body}</p>

          <Link data-magnetic data-cursor-label={ui.interactionLabels.go} href={`/${locale}/therapeutic-areas`} className="group relative isolate mt-5 inline-flex min-h-11 w-full min-w-52 items-center justify-center overflow-hidden rounded-full bg-copad-deep px-7 py-3.5 text-xs font-black text-white shadow-[0_15px_34px_rgba(1,61,96,.17)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_22px_44px_rgba(0,144,175,.22)] sm:w-auto 2xl:mt-7">
            <span aria-hidden="true" className="absolute inset-0 -z-10 origin-left scale-x-0 bg-copad-green transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100 rtl:origin-right" />
            <span>{action}</span>
          </Link>
        </ScrollSceneItem>
      </div>
    </section>
  );
}
