"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const interactiveSelector = "a, button, input, textarea, select, [role='button'], [data-cursor='interactive']";

type ClickPulse = {
  id: number;
  x: number;
  y: number;
};

export function InteractiveCursor() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const ringX = useSpring(pointerX, { stiffness: 520, damping: 38, mass: 0.24 });
  const ringY = useSpring(pointerY, { stiffness: 520, damping: 38, mass: 0.24 });
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);
  const [pulse, setPulse] = useState<ClickPulse | null>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateCapability = () => setEnabled(finePointer.matches);
    updateCapability();
    finePointer.addEventListener("change", updateCapability);

    return () => finePointer.removeEventListener("change", updateCapability);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("copad-custom-cursor");
    let pulseTimer: number | undefined;

    const onPointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      setVisible(true);
      const target = (event.target as Element | null)?.closest<HTMLElement>(interactiveSelector) ?? null;
      setInteractive(Boolean(target));
      setLabel(target?.dataset.cursorLabel ?? null);
    };
    const onPointerDown = (event: PointerEvent) => {
      setPressed(true);
      setPulse({ id: Date.now(), x: event.clientX, y: event.clientY });
      window.clearTimeout(pulseTimer);
      pulseTimer = window.setTimeout(() => setPulse(null), 620);
    };
    const onPointerUp = () => setPressed(false);
    const onPointerLeave = () => setVisible(false);
    const onPointerEnter = () => setVisible(true);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);
    document.documentElement.addEventListener("mouseenter", onPointerEnter);

    return () => {
      document.body.classList.remove("copad-custom-cursor");
      window.clearTimeout(pulseTimer);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      document.documentElement.removeEventListener("mouseenter", onPointerEnter);
    };
  }, [enabled, pointerX, pointerY]);

  if (!enabled) return null;

  return (
    <>
      <motion.span
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[100] -mt-[18px] -ml-[18px] size-9 rounded-full border border-copad-green/70 bg-copad-green/[.04]"
        style={{ x: ringX, y: ringY }}
        initial={false}
        animate={{
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.72 : label ? 1.85 : interactive ? 1.55 : 1,
        }}
        transition={{ opacity: { duration: 0.18 }, scale: { duration: 0.24, ease: [0.22, 1, 0.36, 1] } }}
      />
      <motion.span
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[101] -mt-[3px] -ml-[3px] size-1.5 rounded-full bg-copad-green shadow-[0_0_10px_rgba(16,159,131,.55)]"
        style={{ x: pointerX, y: pointerY }}
        initial={false}
        animate={{ opacity: visible ? 1 : 0, scale: interactive ? 0 : pressed ? 1.5 : 1 }}
        transition={{ duration: 0.16 }}
      />
      <AnimatePresence>
        {visible && label && (
          <motion.span
            key={label}
            aria-hidden="true"
            className="pointer-events-none fixed top-0 left-0 z-[102] -mt-1.5 -ml-7 w-14 text-center text-[7px] font-black tracking-[0.12em] text-copad-deep uppercase"
            style={{ x: ringX, y: ringY }}
            initial={{ opacity: 0, scale: 0.72 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.72 }}
            transition={{ duration: 0.18 }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {pulse && (
          <motion.span
            key={pulse.id}
            aria-hidden="true"
            className="pointer-events-none fixed z-[99] size-8 rounded-full border border-copad-green/80"
            style={{ left: pulse.x - 16, top: pulse.y - 16 }}
            initial={{ opacity: 0.72, scale: 0.35 }}
            animate={{ opacity: 0, scale: 2.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
