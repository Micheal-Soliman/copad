"use client";

import { motion, useReducedMotion } from "framer-motion";
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
    <footer className="relative overflow-hidden border-t border-copad-green/35 bg-copad-deep px-4 pt-8 pb-5 text-white sm:px-8 sm:pt-12 sm:pb-7 lg:px-12 lg:pt-14">
      <div aria-hidden="true" className="absolute top-0 end-0 h-px w-1/3 bg-linear-to-l from-copad-green via-copad-green/40 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 z-0 hidden -translate-y-1/2 overflow-hidden text-center sm:block">
        <p className="select-none text-[clamp(5rem,25vw,18rem)] leading-none font-black tracking-[-0.075em] text-white/[.018]">COPAD</p>
        <motion.p
          className="absolute inset-0 select-none bg-clip-text text-[clamp(5rem,25vw,18rem)] leading-none font-black tracking-[-0.075em] text-transparent"
          style={{
            backgroundImage: "linear-gradient(100deg, transparent 38%, rgba(255,255,255,.12) 48%, rgba(0,144,175,.16) 52%, transparent 62%)",
            backgroundSize: "220% 100%",
          }}
          animate={reduceMotion ? undefined : { backgroundPosition: ["180% 50%", "-180% 50%"] }}
          transition={{ duration: 5.5, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        >
          COPAD
        </motion.p>
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
                className="group flex size-10 items-center justify-center rounded-full border border-white/18 text-[10px] font-black text-white/62 transition duration-300 hover:-translate-y-0.5 hover:border-copad-green hover:bg-copad-green hover:text-white sm:size-9 sm:text-[11px]"
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
            <FooterLink href={`/${locale}/manufacturing-quality`}>{copy.nav.manufacturing}</FooterLink>
            <FooterLink href={`/${locale}/insights`}>{copy.nav.insights}</FooterLink>
          </FooterColumn>
          <div className="col-span-2 sm:col-span-1">
            <FooterColumn title={ui.company} compact>
              <FooterLink href={`/${locale}/partner-with-us`}>{ui.partnership}</FooterLink>
              <FooterLink href={`/${locale}/careers`}>{ui.careers}</FooterLink>
              <FooterLink href={`/${locale}/contact`}>{copy.nav.contact}</FooterLink>
            </FooterColumn>
          </div>
        </nav>

        <div aria-hidden="true" className="relative col-span-full overflow-hidden border-t border-white/10 pt-3 text-center sm:hidden">
          <p className="select-none whitespace-nowrap text-[clamp(4.25rem,22vw,6rem)] leading-[.82] font-black tracking-[-0.075em] text-white/[.035]">COPAD</p>
          <motion.p
            className="absolute inset-x-0 bottom-0 select-none whitespace-nowrap bg-clip-text text-[clamp(4.25rem,22vw,6rem)] leading-[.82] font-black tracking-[-0.075em] text-transparent"
            style={{
              backgroundImage: "linear-gradient(100deg, transparent 36%, rgba(255,255,255,.22) 48%, rgba(0,144,175,.28) 53%, transparent 64%)",
              backgroundSize: "220% 100%",
            }}
            animate={reduceMotion ? undefined : { backgroundPosition: ["180% 50%", "-180% 50%"] }}
            transition={{ duration: 4.5, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          >
            COPAD
          </motion.p>
        </div>
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
      <span className={`mb-1 text-[9px] font-black tracking-[0.18em] text-copad-green uppercase ${compact ? "col-span-2" : ""}`}>{title}</span>
      {children}
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group relative inline-flex min-h-7 items-center text-[11px] font-bold text-white/58 transition-colors duration-300 hover:text-white sm:min-h-0 sm:text-sm">
      {children}
      <span aria-hidden="true" className="absolute -bottom-1 start-0 h-px w-full origin-start scale-x-0 bg-copad-green transition-transform duration-300 group-hover:scale-x-100" />
    </Link>
  );
}
