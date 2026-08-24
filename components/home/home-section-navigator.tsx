"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useLenis } from "lenis/react";
import { useCallback, useEffect, useRef, useState } from "react";

type NavigatorItem = { id: string; label: string };

export function HomeSectionNavigator({ label, items }: { label: string; items: NavigatorItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "home");
  const [dockVisible, setDockVisible] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 125, damping: 28, mass: 0.3 });

  const updateDockVisibility = useCallback(() => {
    const hero = document.getElementById("home");
    const shouldShow = hero ? hero.getBoundingClientRect().bottom <= window.innerHeight + 2 : window.scrollY > window.innerHeight;
    setDockVisible((current) => current === shouldShow ? current : shouldShow);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", () => {
    updateDockVisibility();
    const marker = window.innerHeight * 0.46;
    let closest = items[0]?.id;
    let distance = Number.POSITIVE_INFINITY;

    for (const item of items) {
      const section = document.getElementById(item.id);
      if (!section) continue;
      const rect = section.getBoundingClientRect();
      const sectionDistance = rect.top <= marker && rect.bottom >= marker ? 0 : Math.min(Math.abs(rect.top - marker), Math.abs(rect.bottom - marker));
      if (sectionDistance < distance) {
        distance = sectionDistance;
        closest = item.id;
      }
    }

    if (closest) setActiveId(closest);
  });

  useEffect(() => {
    const frame = window.requestAnimationFrame(updateDockVisibility);
    return () => window.cancelAnimationFrame(frame);
  }, [updateDockVisibility]);

  useEffect(() => {
    const activeButton = navRef.current?.querySelector<HTMLElement>(`[data-section-id="${activeId}"]`);
    activeButton?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeId]);

  function goToSection(id: string) {
    const section = document.getElementById(id);
    if (!section) return;
    setActiveId(id);
    if (lenis) {
      lenis.scrollTo(section, { duration: 1.15, easing: (value) => 1 - Math.pow(1 - value, 4) });
    } else {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <AnimatePresence>
      {dockVisible && <motion.nav
      key="home-section-dock"
      ref={navRef}
      aria-label={label}
      initial={{ opacity: 0, y: 42, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 26, scale: 0.96 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 bottom-2 z-[75] mx-auto w-[calc(100%-1.5rem)] origin-bottom overflow-hidden rounded-full border border-white/16 bg-linear-to-r from-copad-deep/94 via-copad-deep/89 to-copad-deep/94 text-white shadow-[0_10px_30px_rgba(1,61,96,.2)] backdrop-blur-xl [perspective:1000px] sm:bottom-3 sm:w-[calc(100%-3rem)] sm:max-w-[820px]"
    >
      <span aria-hidden="true" className="absolute inset-x-[8%] top-0 h-px bg-linear-to-r from-transparent via-white/28 to-transparent" />
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-24 -skew-x-12 bg-linear-to-r from-transparent via-white/18 to-transparent blur-sm"
        initial={{ x: "-140%" }}
        animate={{ x: "760%" }}
        transition={{ duration: 1.15, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="relative flex items-center gap-0.5 overflow-x-auto px-1.5 pt-1.5 pb-2 [scrollbar-width:none] sm:gap-1 sm:px-2 sm:pt-2 sm:pb-2.5 [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const active = activeId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              data-section-id={item.id}
              data-cursor="interactive"
              aria-current={active ? "location" : undefined}
              onClick={() => goToSection(item.id)}
              className={`group relative isolate flex min-h-9 min-w-max flex-1 items-center justify-center gap-1.5 rounded-full px-2.5 py-1.5 text-[9px] font-black tracking-[0.025em] transition-colors duration-500 sm:px-3 sm:text-[9.5px] lg:text-[10px] ${active ? "text-copad-deep" : "text-white/62 hover:text-white"}`}
            >
              {active && <motion.span layoutId="home-section-active" className="absolute inset-0 -z-10 rounded-full bg-copad-white shadow-[0_7px_20px_rgba(0,0,0,.14),inset_0_-2px_0_rgba(0,144,175,.16)]" transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.42 }} />}
              <span className={`size-1.25 shrink-0 rounded-full transition-all duration-500 ${active ? "bg-copad-green shadow-[0_0_10px_rgba(0,144,175,.7)]" : "bg-white/22 group-hover:bg-copad-green"}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10">
        <motion.span className="block h-full origin-left bg-copad-green shadow-[0_0_18px_rgba(0,144,175,.75)] rtl:origin-right" style={{ scaleX: progress }} />
      </div>
      </motion.nav>}
    </AnimatePresence>
  );
}
