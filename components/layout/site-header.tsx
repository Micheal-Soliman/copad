"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  ["partnership", "partner-with-us"],
  ["careers", "careers"],
] as const;

const homeSectionIds = {
  about: ["introduction", "snapshot"],
  divisions: ["divisions"],
  areas: ["therapy"],
  manufacturing: ["manufacturing"],
  insights: ["connect"],
} as const;

export function SiteHeader({ locale, transparent = false }: { locale: Locale; transparent?: boolean }) {
  const copy = siteCopy[locale];
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [activeHomeKey, setActiveHomeKey] = useState<string | null>(null);
  const overlay = transparent && !open;
  const isHomepage = /^\/(en|ar)\/?$/.test(pathname);
  const localeHref = pathname.replace(/^\/(en|ar)/, `/${otherLocale(locale)}`);
  const languageLabel = locale === "en" ? "AR" : "EN";
  const accessibility = copy.ui.accessibility;

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  useEffect(() => {
    if (!isHomepage) return;

    const updateActiveSection = () => {
      const marker = window.innerHeight * 0.42;
      let next: string | null = null;

      for (const [key, ids] of Object.entries(homeSectionIds)) {
        for (const id of ids) {
          const section = document.getElementById(id);
          if (!section) continue;
          const rect = section.getBoundingClientRect();
          if (rect.top <= marker && rect.bottom >= marker) {
            next = key;
            break;
          }
        }
        if (next) break;
      }

      setActiveHomeKey((current) => current === next ? current : next);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [isHomepage]);

  return (
    <header className={`fixed inset-x-0 top-0 border-b transition-[box-shadow,backdrop-filter] duration-500 ${open ? "z-[200]" : "z-50"} ${overlay ? "copad-scroll-header text-white backdrop-blur-md" : "border-copad-deep/10 bg-copad-white/92 text-copad-deep shadow-[0_12px_40px_rgba(6,79,120,.08)] backdrop-blur-xl"}`}>
      <div className="relative mx-auto flex h-[4.5rem] w-full max-w-[1440px] items-center px-4 sm:h-20 sm:px-8 lg:px-12 xl:h-[5.5rem]">
        <Brand locale={locale} inverted={overlay} />

        <nav className="absolute start-1/2 hidden -translate-x-1/2 items-center xl:flex rtl:translate-x-1/2" aria-label={accessibility.primaryNavigation}>
          {navItems.map(([key, href]) => {
            const route = `/${locale}/${href}`;
            const active = pathname === route || pathname.startsWith(`${route}/`) || (isHomepage && activeHomeKey === key);
            const className = `group relative px-2.5 py-3.5 text-[10px] font-bold whitespace-nowrap transition-colors 2xl:px-3 2xl:text-[11px] ${active ? (overlay ? "text-white" : "text-copad-deep") : overlay ? "text-white/65 hover:text-white" : "text-copad-deep/58 hover:text-copad-deep"}`;
            const content = <>
                {copy.nav[key]}
                {active && (
                  <motion.span layoutId="primary-nav-active" className="absolute inset-x-2 bottom-1 h-[3px] overflow-hidden rounded-full bg-linear-to-r from-copad-red via-copad-green to-copad-sky shadow-[0_0_13px_rgba(228,61,72,.3),0_0_13px_rgba(0,163,196,.62)] 2xl:inset-x-3" transition={{ type: "spring", stiffness: 360, damping: 32 }}>
                    <motion.span className="absolute inset-y-0 w-1/3 bg-linear-to-r from-transparent via-white/90 to-transparent" animate={reduceMotion ? undefined : { x: ["-130%", "380%"] }} transition={{ duration: 1.7, repeat: Infinity, ease: "linear", repeatDelay: 0.45 }} />
                  </motion.span>
                )}
                {!active && <span className="absolute inset-x-2 bottom-1 h-[2px] origin-start scale-x-0 rounded-full bg-linear-to-r from-copad-red to-copad-green transition-transform duration-500 group-hover:scale-x-100 2xl:inset-x-3" />}
              </>;

            return <Link key={key} href={route} aria-current={active ? "page" : undefined} className={className}>{content}</Link>;
          })}
        </nav>

        <div className="ms-auto hidden items-center gap-3 xl:flex">
          <Link href={localeHref} aria-label={`${accessibility.switchLanguage}: ${languageLabel}`} className="group relative isolate flex size-12 items-center justify-center overflow-hidden rounded-full p-px">
            <span className={`absolute -inset-8 animate-spin-slow bg-conic from-copad-red via-copad-sky to-copad-green transition-opacity ${overlay ? "opacity-75" : "opacity-60"}`} />
            <span className={`relative flex size-full items-center justify-center rounded-full text-[11px] font-black tracking-[0.14em] transition duration-300 group-hover:scale-[.88] ${overlay ? "bg-copad-deep/80 text-white" : "bg-copad-white text-copad-deep group-hover:text-copad-green"}`}>{languageLabel}</span>
          </Link>

          <Link href={`/${locale}/contact`} className="group relative isolate min-w-34 overflow-hidden rounded-full bg-copad-green px-7 py-3.5 text-center text-xs font-black text-white shadow-[0_12px_28px_rgba(0,163,196,.2)] transition duration-500 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(0,163,196,.34)]">
            <span aria-hidden="true" className="absolute inset-x-4 top-0 h-[2px] rounded-full bg-copad-red/80" />
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
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={accessibility.mobileNavigation}
            initial={reduceMotion ? false : { clipPath: "inset(0 0 100% 0)", opacity: 0.7 }}
            animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
            exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0.7 }}
            transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[200] flex h-svh flex-col overflow-hidden bg-copad-deep text-white xl:hidden"
          >
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_88%_10%,rgba(228,61,72,.13),transparent_22%),radial-gradient(circle_at_82%_18%,rgba(0,163,196,.25),transparent_32%),linear-gradient(145deg,#064f78_0%,#064f78_100%)]" />
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(7rem,35vw,15rem)] leading-none tracking-[-0.08em] text-white/[.025] rtl:translate-x-1/2"
              animate={reduceMotion ? undefined : { opacity: [0.018, 0.05, 0.018], scale: [0.98, 1.02, 0.98] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              COPAD
            </motion.span>

            <div className="relative z-10 flex h-[4.5rem] shrink-0 items-center justify-between border-b border-white/12 px-4 sm:h-20 sm:px-8">
              <Brand locale={locale} inverted onClick={() => setOpen(false)} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={accessibility.closeNavigation}
                className="group flex size-11 items-center justify-center rounded-full border border-white/24 text-white transition duration-300 active:scale-90"
              >
                <span className="relative block size-5" aria-hidden="true">
                  <span className="absolute start-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rotate-45 rounded-full bg-current transition-transform duration-300 group-hover:rotate-[135deg]" />
                  <span className="absolute start-0 top-1/2 h-0.5 w-5 -translate-y-1/2 -rotate-45 rounded-full bg-current transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </button>
            </div>

            <div className="relative z-10 min-h-0 flex-1 px-4 sm:px-8">
              <nav className="absolute inset-x-4 top-[calc(50svh-4.5rem)] mx-auto flex max-h-[calc(100svh-11rem)] w-auto max-w-3xl -translate-y-1/2 flex-col justify-center gap-1 overflow-x-hidden overflow-y-auto overscroll-contain py-2 sm:inset-x-8 sm:top-[calc(50svh-5rem)]" aria-label={accessibility.mobileNavigation}>
                {navItems.map(([key, href], index) => {
                  const route = `/${locale}/${href}`;
                  const active = pathname === route || pathname.startsWith(`${route}/`) || (isHomepage && activeHomeKey === key);
                  const side = (index % 2 === 0 ? -1 : 1) * (locale === "ar" ? -1 : 1);

                  return (
                    <motion.div
                      key={key}
                      initial={reduceMotion ? false : { opacity: 0, x: side * 34 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.16 + index * 0.055, ease: [0.22, 1, 0.36, 1] }}
                      className="text-center"
                    >
                      <Link
                        onClick={() => setOpen(false)}
                        href={route}
                        className={`group relative flex min-h-12 items-center justify-center py-2.5 font-display text-[clamp(1.55rem,7vw,2.5rem)] leading-none tracking-[-0.035em] transition-colors duration-300 sm:min-h-16 sm:py-3 ${active ? "text-copad-green" : "text-white/78 hover:text-white"}`}
                      >
                        {copy.nav[key]}
                        <span aria-hidden="true" className={`absolute bottom-0 start-1/2 h-px w-14 -translate-x-1/2 bg-linear-to-r from-copad-red to-copad-green transition-transform duration-500 rtl:translate-x-1/2 ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-active:scale-x-100"}`} />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-4 bottom-5 mx-auto flex w-auto max-w-3xl items-center gap-3 border-t border-white/12 pt-4 sm:inset-x-8 sm:bottom-7 sm:pt-5"
              >
                <Link href={localeHref} className="flex size-12 shrink-0 items-center justify-center rounded-full border border-copad-red/75 text-[10px] font-black tracking-widest transition active:scale-90">{languageLabel}</Link>
                <Link onClick={() => setOpen(false)} href={`/${locale}/contact`} className="group relative isolate flex min-h-12 flex-1 items-center justify-center overflow-hidden rounded-full bg-copad-green px-5 text-xs font-black text-white shadow-[0_14px_34px_rgba(0,163,196,.25)] transition active:scale-[.98]">
                  <span aria-hidden="true" className="absolute inset-0 -z-10 origin-start scale-x-0 bg-white transition-transform duration-500 group-active:scale-x-100" />
                  <span className="transition-colors duration-500 group-active:text-copad-deep">{copy.nav.contact}</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
