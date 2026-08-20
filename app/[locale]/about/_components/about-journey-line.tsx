"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export function AboutJourneyLine() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });
  const opacity = useTransform(progress, [0, 0.12, 0.94, 1], [0, 1, 1, 0]);

  return (
    <motion.div aria-hidden="true" className="pointer-events-none fixed top-[27%] end-5 z-[62] hidden h-[46%] w-px bg-copad-deep/10 lg:block" style={{ opacity }}>
      <motion.span className="absolute inset-0 origin-top bg-linear-to-b from-copad-green via-copad-green to-copad-deep/45 shadow-[0_0_16px_rgba(0,144,175,.28)]" style={{ scaleY: progress }} />
      {[0, 0.33, 0.66, 1].map((position) => (
        <span key={position} className="absolute start-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-copad-green/55 bg-copad-white shadow-[0_0_0_4px_rgba(249,252,255,.78)]" style={{ top: `${position * 100}%` }} />
      ))}
      <motion.span className="absolute start-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-copad-green shadow-[0_0_18px_5px_rgba(0,144,175,.42)]" style={{ top: useTransform(progress, [0, 1], ["0%", "100%"]) }} />
    </motion.div>
  );
}
