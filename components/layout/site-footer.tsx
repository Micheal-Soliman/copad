"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Brand } from "@/components/brand";
import { siteCopy } from "@/content/site";
import type { Locale } from "@/lib/i18n";

const ease = [0.22, 1, 0.36, 1] as const;

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];
  const ui = copy.ui.footer;
  const reduceMotion = useReducedMotion();

  return (
    <footer className="relative overflow-hidden border-t border-copad-red/45 bg-copad-deep px-4 pt-8 pb-5 text-white sm:px-8 sm:pt-12 sm:pb-7 lg:px-12 lg:pt-14">
      <div aria-hidden="true" className="absolute top-0 end-0 h-[2px] w-1/2 bg-linear-to-l from-copad-red via-copad-green/70 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Image src="/logo.png" alt="" width={4500} height={4500} unoptimized className="absolute top-1/2 left-1/2 h-[clamp(28rem,62vw,54rem)] w-[clamp(28rem,62vw,54rem)] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain brightness-0 invert opacity-[.025]" />
        <motion.span
          className="absolute inset-y-0 w-[28%] -skew-x-12 bg-linear-to-r from-transparent via-white/9 to-transparent blur-xl"
          animate={reduceMotion ? undefined : { x: ["-45vw", "125vw"] }}
          transition={{ duration: 6.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65, ease }}
        className="relative z-10 mx-auto grid max-w-[1440px] gap-8 border-b border-white/12 pb-4 sm:gap-12 sm:pb-11 md:grid-cols-[1fr_1.4fr] lg:gap-24"
      >
        <div>
          <Brand locale={locale} inverted />
          <p className="mt-4 max-w-md text-xs leading-6 text-white/55 sm:mt-5 sm:text-sm sm:leading-7">{copy.footer.statement}</p>

          <div className="mt-5 flex items-center gap-3 sm:mt-7">
            {ui.socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="group flex size-10 items-center justify-center rounded-full border border-white/18 text-[10px] font-black text-white/62 transition duration-300 hover:-translate-y-0.5 hover:border-copad-red hover:bg-copad-red hover:text-white sm:size-9 sm:text-[11px]"
              >
                {social.shortLabel}
              </a>
            ))}
          </div>
        </div>

        <nav className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 sm:gap-9" aria-label={ui.navigationLabel}>
          <FooterColumn title={ui.explore}>
            <FooterLink href={`/${locale}/about`}>{copy.nav.about}</FooterLink>
            <FooterLink href={`/${locale}/divisions`}>{copy.nav.divisions}</FooterLink>
            <FooterLink href={`/${locale}/therapeutic-areas`}>{copy.nav.areas}</FooterLink>
          </FooterColumn>
          <FooterColumn title={ui.portfolio}>
            <FooterLink href={`/${locale}/products`}>{copy.nav.products}</FooterLink>
            <FooterLink disabled href={`/${locale}/manufacturing-quality`}>{copy.nav.manufacturing}</FooterLink>
            <FooterLink disabled href={`/${locale}/insights`}>{copy.nav.insights}</FooterLink>
          </FooterColumn>
          <div className="col-span-2 sm:col-span-1">
            <FooterColumn title={ui.company} compact>
              <FooterLink disabled href={`/${locale}/partner-with-us`}>{ui.partnership}</FooterLink>
              <FooterLink disabled href={`/${locale}/careers`}>{ui.careers}</FooterLink>
              <FooterLink href={`/${locale}/contact`}>{copy.nav.contact}</FooterLink>
            </FooterColumn>
          </div>
        </nav>

      </motion.div>

      <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col gap-1.5 pt-4 text-[9px] leading-4 text-white/42 sm:gap-2 sm:pt-6 sm:text-[10px] sm:leading-5 lg:flex-row lg:items-start lg:justify-between">
        <p>{copy.footer.legal}</p>
        <p className="max-w-xl lg:text-end">{copy.footer.disclaimer}</p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children, compact = false }: { title: string; children: React.ReactNode; compact?: boolean }) {
  return (
    <div className={compact ? "grid grid-cols-2 items-start gap-x-6 gap-y-1 sm:flex sm:flex-col sm:gap-3" : "flex flex-col items-start gap-2 sm:gap-3"}>
      <span className={`mb-1 flex items-center gap-2 text-[9px] font-black tracking-[0.18em] text-copad-sky uppercase before:size-1.5 before:shrink-0 before:rounded-full before:bg-copad-red ${compact ? "col-span-2" : ""}`}>{title}</span>
      {children}
    </div>
  );
}

function FooterLink({ href, children, disabled = false }: { href: string; children: React.ReactNode; disabled?: boolean }) {
  const className = "group relative inline-flex min-h-7 items-center text-[11px] font-bold text-white/58 transition-colors duration-300 sm:min-h-0 sm:text-sm";

  if (disabled) {
    return <span aria-disabled="true" className={`${className} cursor-default`}>{children}</span>;
  }

  return (
    <Link href={href} className={`${className} hover:text-white`}>
      {children}
      <span aria-hidden="true" className="absolute -bottom-1 start-0 h-px w-full origin-start scale-x-0 bg-linear-to-r from-copad-red to-copad-green transition-transform duration-300 group-hover:scale-x-100" />
    </Link>
  );
}
