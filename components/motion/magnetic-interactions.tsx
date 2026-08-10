"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect } from "react";

const selector = "[data-magnetic]";

export function MagneticInteractions() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let active: HTMLElement | null = null;
    let frame = 0;

    const reset = (element: HTMLElement | null) => {
      if (!element) return;
      element.style.setProperty("--magnetic-x", "0px");
      element.style.setProperty("--magnetic-y", "0px");
    };

    const onMove = (event: PointerEvent) => {
      const next = (event.target as Element | null)?.closest<HTMLElement>(selector) ?? null;
      if (active !== next) {
        reset(active);
        active = next;
      }
      if (!active) return;

      const target = active;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = target.getBoundingClientRect();
        const x = Math.max(-10, Math.min(10, (event.clientX - (rect.left + rect.width / 2)) * 0.11));
        const y = Math.max(-7, Math.min(7, (event.clientY - (rect.top + rect.height / 2)) * 0.13));
        target.style.setProperty("--magnetic-x", `${x.toFixed(2)}px`);
        target.style.setProperty("--magnetic-y", `${y.toFixed(2)}px`);
      });
    };

    const onLeave = () => {
      reset(active);
      active = null;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      reset(active);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [reduceMotion]);

  return null;
}
