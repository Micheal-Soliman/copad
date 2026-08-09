"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";

type TherapyAreasPreviewProps = {
  locale: Locale;
  eyebrow: string;
  title: string;
  body: string;
  action: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function TherapyAreasPreview({ locale, eyebrow, title, body, action }: TherapyAreasPreviewProps) {
  const reduceMotion = useReducedMotion();
  const ui = siteCopy[locale].ui.home;

  return (
    <section className="overflow-hidden bg-copad-sand/38 px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div dir="ltr" className="mx-auto grid max-w-[1440px] items-center gap-14 lg:grid-cols-[1.02fr_.98fr] lg:gap-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease }}
          className="relative mx-auto w-full max-w-2xl lg:col-start-2 lg:row-start-1"
        >
          <motion.div
            role="img"
            aria-label={ui.therapyImageAlt}
            className="relative aspect-[5/4] overflow-hidden rounded-[2.5rem] rounded-tr-[6rem] border border-copad-deep/10 bg-copad-deep bg-no-repeat shadow-[0_30px_80px_rgba(15,61,57,.14)]"
            style={{ backgroundImage: "url('/images/copad-divisions-atlas.png')", backgroundSize: "400% auto", backgroundPosition: "0% center" }}
            whileHover={reduceMotion ? undefined : { scale: 1.015 }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-copad-deep/72 via-copad-deep/5 to-transparent" aria-hidden="true" />
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-6 rounded-[1.5rem] border border-white/15 bg-copad-deep/62 p-5 text-white backdrop-blur-md lg:inset-x-8 lg:bottom-8 lg:p-6">
              <p className="max-w-xs text-xs leading-6 font-bold text-white/82">{ui.therapyImageCaption}</p>
              <span className="font-display text-5xl leading-none tracking-[-0.06em]">09</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          dir={locale === "ar" ? "rtl" : "ltr"}
          initial={reduceMotion ? false : { opacity: 0, x: -48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, delay: 0.06, ease }}
          className="lg:col-start-1 lg:row-start-1"
        >
          <p className="border-s-2 border-copad-green ps-4 text-[10px] font-black tracking-[0.22em] text-copad-green uppercase">{eyebrow}</p>
          <h2 className="mt-5 max-w-3xl font-display text-5xl leading-[1.02] tracking-[-0.045em] text-copad-deep lg:text-7xl">{title}</h2>
          <p className="mt-8 max-w-2xl text-base leading-8 text-copad-deep/66 lg:text-lg lg:leading-9">{body}</p>

          <Link href={`/${locale}/therapeutic-areas`} className="group relative isolate mt-9 inline-flex min-w-52 items-center justify-center overflow-hidden rounded-full bg-copad-deep px-7 py-4 text-xs font-black text-white shadow-[0_15px_34px_rgba(15,61,57,.17)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_22px_44px_rgba(16,159,131,.22)]">
            <span aria-hidden="true" className="absolute inset-0 -z-10 origin-left scale-x-0 bg-copad-green transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100 rtl:origin-right" />
            <span>{action}</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
