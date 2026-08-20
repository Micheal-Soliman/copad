"use client";

import { motion, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import type { ReactNode } from "react";

type ScrollSceneItemProps = {
  children: ReactNode;
  progress: MotionValue<number>;
  side: "left" | "right";
  role?: "media" | "copy";
  active?: boolean;
  className?: string;
  dir?: "ltr" | "rtl";
};

const ease = [0.22, 1, 0.36, 1] as const;

export function ScrollSceneItem({ children, progress, side, role = "copy", active = true, className = "", dir }: ScrollSceneItemProps) {
  const reduceMotion = useReducedMotion();
  const direction = side === "right" ? 1 : -1;
  const smoothProgress = useSpring(progress, { stiffness: 125, damping: 30, mass: 0.3, restDelta: 0.0005 });
  const copyX = useTransform(smoothProgress, [0, 0.3, 1], [direction * 18, 0, 0]);
  const copyY = useTransform(smoothProgress, [0, 0.3, 1], [10, 0, 0]);
  const copyOpacity = useTransform(smoothProgress, [0, 0.12, 0.3, 1], [0.28, 0.62, 1, 1]);
  const mediaX = useTransform(smoothProgress, [0, 0.25, 0.64, 1], [direction * 16, direction * 16, 0, 0]);
  const mediaY = useTransform(smoothProgress, [0, 0.25, 0.64, 1], [24, 24, 0, 0]);
  const mediaOpacity = useTransform(smoothProgress, [0, 0.2, 0.52, 1], [0.18, 0.5, 1, 1]);
  const mediaScale = useTransform(smoothProgress, [0, 0.3, 0.64, 1], [0.985, 0.985, 1, 1]);
  const mediaRotate = useTransform(smoothProgress, [0.25, 0.64], [direction * 0.16, 0]);
  const scrollDriven = active && !reduceMotion;

  return (
    <motion.div
      key={scrollDriven ? "scroll-timeline" : "entrance-timeline"}
      dir={dir}
      className={`transform-gpu will-change-transform ${className}`}
      initial={!scrollDriven && !reduceMotion ? { opacity: 0.86, x: direction * 16, y: 10 } : false}
      whileInView={!scrollDriven && !reduceMotion ? { opacity: 1, x: 0, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.58, ease }}
      style={scrollDriven ? role === "media" ? { x: mediaX, y: mediaY, opacity: mediaOpacity, scale: mediaScale, rotate: mediaRotate } : { x: copyX, y: copyY, opacity: copyOpacity } : undefined}
    >
      {children}
    </motion.div>
  );
}
