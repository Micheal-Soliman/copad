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
    <footer className="relative overflow-hidden border-t border-copad-green/35 bg-copad-deep px-5 pt-12 pb-7 text-white sm:px-8 lg:px-12 lg:pt-14">
      <div aria-hidden="true" className="absolute top-0 end-0 h-px w-1/3 bg-linear-to-l from-copad-green via-copad-green/40 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 overflow-hidden text-center">
        <p className="select-none text-[clamp(7rem,20vw,18rem)] leading-none font-black tracking-[-0.075em] text-white/[.018]">COPAD</p>
        <motion.p
          className="absolute inset-0 select-none bg-clip-text text-[clamp(7rem,20vw,18rem)] leading-none font-black tracking-[-0.075em] text-transparent"
          style={{
            backgroundImage: "linear-gradient(100deg, transparent 38%, rgba(255,255,255,.12) 48%, rgba(16,159,131,.16) 52%, transparent 62%)",
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
        className="relative z-10 mx-auto grid max-w-[1440px] gap-12 border-b border-white/12 pb-11 md:grid-cols-[1fr_1.4fr] lg:gap-24"
      >
        <div>
          <Brand locale={locale} inverted />
          <p className="mt-5 max-w-md text-sm leading-7 text-white/55">{copy.footer.statement}</p>

          <div className="mt-7 flex items-center gap-3">
            {ui.socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="group flex size-9 items-center justify-center rounded-full border border-white/18 text-[11px] font-black text-white/62 transition duration-300 hover:-translate-y-0.5 hover:border-copad-green hover:bg-copad-green hover:text-white"
              >
                {social.shortLabel}
              </a>
            ))}
          </div>
        </div>

        <nav className="grid grid-cols-2 gap-9 sm:grid-cols-3" aria-label={ui.navigationLabel}>
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
          <FooterColumn title={ui.company}>
            <FooterLink href={`/${locale}/partner-with-us`}>{ui.partnership}</FooterLink>
            <FooterLink href={`/${locale}/careers`}>{ui.careers}</FooterLink>
            <FooterLink href={`/${locale}/contact`}>{copy.nav.contact}</FooterLink>
          </FooterColumn>
        </nav>
      </motion.div>

      <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col gap-2 pt-6 text-[10px] leading-5 text-white/34 lg:flex-row lg:items-start lg:justify-between">
        <p>{copy.footer.legal}</p>
        <p className="max-w-xl lg:text-end">{copy.footer.disclaimer}</p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-3">
      <span className="mb-1 text-[9px] font-black tracking-[0.18em] text-copad-green uppercase">{title}</span>
      {children}
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group relative text-xs font-bold text-white/54 transition-colors duration-300 hover:text-white sm:text-sm">
      {children}
      <span aria-hidden="true" className="absolute -bottom-1 start-0 h-px w-full origin-start scale-x-0 bg-copad-green transition-transform duration-300 group-hover:scale-x-100" />
    </Link>
  );
}
