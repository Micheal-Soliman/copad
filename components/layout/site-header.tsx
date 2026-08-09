"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Brand } from "@/components/brand";
import { siteCopy } from "@/content/site";
import { otherLocale, type Locale } from "@/lib/i18n";

const navItems = [
  ["about", "about"],
  ["divisions", "divisions"],
  ["areas", "therapeutic-areas"],
  ["products", "products"],
  ["manufacturing", "manufacturing-quality"],
  ["insights", "insights"],
] as const;

export function SiteHeader({ locale, transparent = false }: { locale: Locale; transparent?: boolean }) {
  const copy = siteCopy[locale];
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const overlay = transparent && !open;
  const localeHref = pathname.replace(/^\/(en|ar)/, `/${otherLocale(locale)}`);
  const languageLabel = locale === "en" ? "AR" : "EN";
  const accessibility = copy.ui.accessibility;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-[box-shadow,backdrop-filter] duration-500 ${overlay ? "copad-scroll-header text-white backdrop-blur-md" : "border-copad-deep/10 bg-copad-white/92 text-copad-deep shadow-[0_12px_40px_rgba(15,61,57,.08)] backdrop-blur-xl"}`}>
      <div className="relative mx-auto flex h-20 w-full max-w-[1440px] items-center px-5 sm:px-8 lg:px-12">
        <Brand locale={locale} inverted={overlay} />

        <nav className="absolute start-1/2 hidden -translate-x-1/2 items-center gap-1 xl:flex rtl:translate-x-1/2" aria-label={accessibility.primaryNavigation}>
          {navItems.map(([key, href]) => {
            const active = pathname === `/${locale}/${href}`;
            return (
              <Link key={key} href={`/${locale}/${href}`} className={`group relative px-3 py-3 text-[11px] font-bold whitespace-nowrap transition-colors ${active ? (overlay ? "text-white" : "text-copad-deep") : overlay ? "text-white/65 hover:text-white" : "text-copad-deep/58 hover:text-copad-deep"}`}>
                {copy.nav[key]}
                <span className={`absolute inset-x-3 bottom-1 h-[2px] origin-start overflow-hidden rounded-full transition-transform duration-500 ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}>
                  <span className="absolute inset-0 bg-copad-green" />
                  {active && !reduceMotion && <motion.span className="absolute inset-y-0 w-1/2 bg-linear-to-r from-transparent via-white/90 to-transparent" animate={{ x: ["-120%", "240%"] }} transition={{ duration: 1.7, repeat: Infinity, ease: "linear", repeatDelay: 0.35 }} />}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="ms-auto hidden items-center gap-3 xl:flex">
          <Link href={localeHref} aria-label={`${accessibility.switchLanguage}: ${languageLabel}`} className="group relative isolate flex size-11 items-center justify-center overflow-hidden rounded-full p-px">
            <span className={`absolute -inset-8 animate-spin-slow bg-conic from-copad-green via-transparent to-copad-green transition-opacity ${overlay ? "opacity-70" : "opacity-55"}`} />
            <span className={`relative flex size-full items-center justify-center rounded-full text-[10px] font-black tracking-[0.14em] transition duration-300 group-hover:scale-[.88] ${overlay ? "bg-copad-deep/80 text-white" : "bg-copad-white text-copad-deep group-hover:text-copad-green"}`}>{languageLabel}</span>
          </Link>

          <Link href={`/${locale}/contact`} className="group relative isolate min-w-32 overflow-hidden rounded-full bg-copad-green px-6 py-3 text-center text-[11px] font-black text-white shadow-[0_12px_28px_rgba(16,159,131,.2)] transition duration-500 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(16,159,131,.34)]">
            <span className="absolute inset-0 -z-10 translate-y-full rounded-full bg-copad-deep transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0" />
            <motion.span aria-hidden="true" className="absolute inset-y-0 -z-10 w-10 -skew-x-12 bg-white/18 blur-sm" animate={reduceMotion ? undefined : { x: ["-300%", "500%"] }} transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }} />
            <span className="relative">{copy.nav.contact}</span>
          </Link>
        </div>

        <button type="button" className={`ms-auto flex size-11 items-center justify-center rounded-full border xl:hidden ${overlay ? "border-white/25" : "border-copad-deep/15"}`} aria-label={open ? accessibility.closeNavigation : accessibility.openNavigation} aria-expanded={open} onClick={() => setOpen((current) => !current)}>
          <span className="relative block h-4 w-5" aria-hidden="true">
            <span className={`absolute start-0 top-0.5 h-0.5 w-5 rounded-full bg-current transition ${open ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`absolute start-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition ${open ? "opacity-0" : ""}`} />
            <span className={`absolute start-0 top-[13px] h-0.5 w-5 rounded-full bg-current transition ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: reduceMotion ? 0 : 0.25 }} className="border-t border-copad-deep/10 bg-copad-white px-5 py-5 text-copad-deep shadow-2xl xl:hidden">
            <nav className="mx-auto grid max-w-[1440px] gap-1" aria-label={accessibility.mobileNavigation}>
              {navItems.map(([key, href]) => <Link key={key} href={`/${locale}/${href}`} className={`relative rounded-xl px-4 py-3 text-sm font-bold hover:bg-copad-sand ${pathname === `/${locale}/${href}` ? "text-copad-green" : ""}`}>{copy.nav[key]}</Link>)}
              <div className="mt-3 flex items-center gap-3 border-t border-copad-deep/10 pt-4">
                <Link href={localeHref} className="rounded-full border border-copad-green px-4 py-2 text-[10px] font-black tracking-widest">{languageLabel}</Link>
                <Link href={`/${locale}/contact`} className="rounded-full bg-copad-green px-5 py-2.5 text-xs font-black text-white">{copy.nav.contact}</Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
