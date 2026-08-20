"use client";

import { motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";

type ScrollImageRevealProps = {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right";
  progress?: MotionValue<number>;
  timeline?: boolean;
  cursorLabel?: string;
};

export function ScrollImageReveal({ children, className = "", direction = "right", progress: controlledProgress, timeline = false, cursorLabel }: ScrollImageRevealProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const entered = useInView(frameRef, { once: true, amount: 0.18 });
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start 92%", "end 38%"] });
  const progress = useSpring(controlledProgress ?? scrollYProgress, { stiffness: 125, damping: 30, mass: 0.3, restDelta: 0.0005 });
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothTiltX = useSpring(tiltX, { stiffness: 180, damping: 24, mass: 0.35 });
  const smoothTiltY = useSpring(tiltY, { stiffness: 180, damping: 24, mass: 0.35 });
  const closedClip = direction === "right" ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)";
  const timelineStartClip = direction === "right" ? "inset(0 78% 0 0)" : "inset(0 0 0 78%)";
  const openClip = "inset(0 0 0 0)";
  const timelineClip = useTransform(progress, [0, 0.46, 1], [timelineStartClip, openClip, openClip]);
  const timelineCurtainClip = useTransform(
    progress,
    [0, 0.46, 1],
    direction === "right"
      ? ["inset(0 0 0 22%)", "inset(0 0 0 100%)", "inset(0 0 0 100%)"]
      : ["inset(0 22% 0 0)", "inset(0 100% 0 0)", "inset(0 100% 0 0)"],
  );
  const mediaScale = useTransform(progress, [0, 0.5], [1.035, 1]);
  const mediaY = useTransform(progress, [0, 0.54, 1], [8, 0, 0]);
  const glowOpacity = useTransform(progress, [0, 0.18, 0.5, 0.62], [0.25, 1, 0.7, 0]);
  const scanPosition = useTransform(progress, [0.08, 0.7], ["12%", "88%"]);
  const scanOpacity = useTransform(progress, [0.04, 0.16, 0.58, 0.72], [0, 0.72, 0.72, 0]);
  const depthLightX = useTransform(progress, [0, 1], direction === "right" ? ["-22%", "24%"] : ["24%", "-22%"]);
  const depthLightY = useTransform(progress, [0, 0.5, 1], ["12%", "-8%", "6%"]);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    tiltY.set(((event.clientX - rect.left) / rect.width - 0.5) * 3.2);
    tiltX.set(-((event.clientY - rect.top) / rect.height - 0.5) * 2.6);
  }

  function resetTilt() {
    tiltX.set(0);
    tiltY.set(0);
  }

  return (
    <motion.div
      ref={frameRef}
      data-cursor="interactive"
      data-cursor-label={cursorLabel}
      className={`group/reveal relative isolate overflow-hidden ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      style={reduceMotion ? undefined : { rotateX: smoothTiltX, rotateY: smoothTiltY, transformPerspective: 1100 }}
      whileHover={reduceMotion ? undefined : { scale: 1.008 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        key={timeline ? "timeline-media" : "entrance-media"}
        className="absolute inset-0 transform-gpu will-change-transform [backface-visibility:hidden]"
        initial={false}
        animate={timeline ? undefined : { clipPath: reduceMotion || entered ? openClip : closedClip }}
        transition={{ duration: reduceMotion ? 0 : 0.62, ease: [0.22, 1, 0.36, 1] }}
        style={reduceMotion ? { clipPath: openClip } : timeline ? { clipPath: timelineClip } : { scale: mediaScale, y: mediaY }}
      >
        {children}
      </motion.div>

      {!reduceMotion && (
        <motion.div
          key={timeline ? "timeline-curtain" : "entrance-curtain"}
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 z-30 bg-linear-to-r from-copad-deep via-copad-deep/94 to-copad-green/60 ${direction === "left" ? "-scale-x-100" : ""}`}
          initial={false}
          animate={timeline ? undefined : { x: entered ? (direction === "right" ? "102%" : "-102%") : "0%" }}
          transition={{ duration: 0.66, ease: [0.22, 1, 0.36, 1] }}
          style={timeline ? { clipPath: timelineCurtainClip } : undefined}
        >
          <motion.span
            className={`absolute inset-y-0 w-px bg-copad-green shadow-[0_0_24px_8px_rgba(0,144,175,.46)] ${direction === "right" ? "start-0" : "end-0"}`}
            style={{ opacity: glowOpacity }}
          />
          <span className="absolute top-1/2 -end-8 h-px w-16 bg-linear-to-r from-transparent via-copad-green to-transparent" />
        </motion.div>
      )}

      {!reduceMotion && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[18%] z-20 bg-[radial-gradient(circle,rgba(255,255,255,.24),rgba(0,144,175,.09)_24%,transparent_58%)] mix-blend-soft-light"
          style={{ x: depthLightX, y: depthLightY }}
        />
      )}

      {!reduceMotion && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[8%] z-30 h-px bg-linear-to-r from-transparent via-white/80 to-transparent shadow-[0_0_18px_3px_rgba(0,144,175,.3)]"
          style={{ top: scanPosition, opacity: scanOpacity }}
        />
      )}

      <span aria-hidden="true" className="pointer-events-none absolute top-4 start-4 z-40 size-5 border-t border-s border-white/45 opacity-0 transition-opacity duration-700 group-hover/reveal:opacity-100" />
      <span aria-hidden="true" className="pointer-events-none absolute end-4 bottom-4 z-40 size-5 border-e border-b border-white/45 opacity-0 transition-opacity duration-700 group-hover/reveal:opacity-100" />
    </motion.div>
  );
}
