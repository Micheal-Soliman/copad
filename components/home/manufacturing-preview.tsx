"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";

type ManufacturingPreviewProps = {
  locale: Locale;
  eyebrow: string;
  title: string;
  body: string;
  action: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function ManufacturingPreview({ locale, eyebrow, title, body, action }: ManufacturingPreviewProps) {
  const reduceMotion = useReducedMotion();
  const ui = siteCopy[locale].ui.home;

  return (
    <section className="overflow-hidden bg-copad-white px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div dir="ltr" className="mx-auto grid max-w-[1440px] items-center gap-14 lg:grid-cols-[.98fr_1.02fr] lg:gap-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease }}
          className="relative mx-auto w-full max-w-2xl lg:col-start-1 lg:row-start-1"
        >
          <motion.div
            className="relative aspect-[5/4] overflow-hidden rounded-[2.5rem] rounded-bl-[6rem] border border-copad-deep/10 bg-copad-deep shadow-[0_30px_80px_rgba(15,61,57,.14)]"
            whileHover={reduceMotion ? undefined : { scale: 1.015 }}
            transition={{ duration: 0.6, ease }}
          >
            <Image
              className="object-cover transition-transform duration-[1400ms] hover:scale-[1.035]"
              src="/images/copad-cleanroom.png"
              alt={ui.manufacturingImageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-copad-deep/72 via-copad-deep/5 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 rounded-[1.5rem] border border-white/15 bg-copad-deep/62 p-5 text-white backdrop-blur-md lg:inset-x-8 lg:bottom-8 lg:p-6">
              <span className="text-[9px] font-black tracking-[0.2em] text-copad-green uppercase">{ui.manufacturingImageEyebrow}</span>
              <p className="mt-2 max-w-sm text-xs leading-6 font-bold text-white/82">{ui.manufacturingImageCaption}</p>
            </div>
            <motion.span
              aria-hidden="true"
              className="absolute top-7 right-7 h-px bg-copad-green"
              initial={reduceMotion ? false : { width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.35, ease }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          dir={locale === "ar" ? "rtl" : "ltr"}
          initial={reduceMotion ? false : { opacity: 0, x: 48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, delay: 0.06, ease }}
          className="lg:col-start-2 lg:row-start-1"
        >
          <p className="border-s-2 border-copad-green ps-4 text-[10px] font-black tracking-[0.22em] text-copad-green uppercase">{eyebrow}</p>
          <h2 className="mt-5 max-w-3xl font-display text-5xl leading-[1.02] tracking-[-0.045em] text-copad-deep lg:text-7xl">{title}</h2>
          <p className="mt-8 max-w-2xl text-base leading-8 text-copad-deep/66 lg:text-lg lg:leading-9">{body}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3" aria-label={ui.manufacturingPrinciplesLabel}>
            {ui.manufacturingPrinciples.map((principle, index) => (
              <motion.div
                key={principle}
                initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.6, delay: 0.16 + index * 0.1, ease }}
                whileHover={reduceMotion ? undefined : { y: -5 }}
                className="group/principle relative isolate overflow-hidden rounded-2xl border border-copad-deep/10 bg-copad-sand/45 px-4 py-4 shadow-[0_10px_30px_rgba(15,61,57,.04)]"
              >
                <span aria-hidden="true" className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-copad-deep transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/principle:scale-y-100" />
                <span className="text-[9px] font-black tracking-[0.18em] text-copad-green">{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-2 text-[10px] leading-5 font-black tracking-[0.1em] text-copad-deep/62 uppercase transition-colors duration-500 group-hover/principle:text-white">{principle}</p>
                <span aria-hidden="true" className="absolute inset-x-4 bottom-0 h-px origin-left scale-x-0 bg-copad-green transition-transform duration-500 group-hover/principle:scale-x-100 rtl:origin-right" />
              </motion.div>
            ))}
          </div>

          <Link href={`/${locale}/manufacturing-quality`} className="group relative isolate mt-9 inline-flex min-w-60 items-center justify-center overflow-hidden rounded-full bg-copad-deep px-8 py-4 text-xs font-black text-white shadow-[0_15px_34px_rgba(15,61,57,.17)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_22px_44px_rgba(16,159,131,.22)]">
            <span aria-hidden="true" className="absolute inset-0 -z-10 origin-right scale-x-0 bg-copad-green transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100 rtl:origin-left" />
            <span>{action}</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
