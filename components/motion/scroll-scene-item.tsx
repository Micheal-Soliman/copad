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
  const copyX = useTransform(smoothProgress, [0, 0.2, 1], [direction * 4, 0, 0]);
  const copyY = useTransform(smoothProgress, [0, 0.2, 1], [8, 0, 0]);
  const copyScale = useTransform(smoothProgress, [0, 0.2, 1], [0.997, 1, 1]);
  const mediaX = useTransform(smoothProgress, [0, 0.06, 0.22, 1], [direction * 8, direction * 6, 0, 0]);
  const mediaY = useTransform(smoothProgress, [0, 0.06, 0.22, 1], [10, 7, 0, 0]);
  const mediaOpacity = useTransform(smoothProgress, [0, 0.05, 0.22, 1], [0.82, 0.9, 1, 1]);
  const mediaScale = useTransform(smoothProgress, [0, 0.08, 0.22, 1], [0.995, 0.997, 1, 1]);
  const mediaRotate = useTransform(smoothProgress, [0, 0.22], [direction * 0.08, 0]);
  const scrollDriven = active && !reduceMotion;

  return (
    <motion.div
      key={scrollDriven ? "scroll-timeline" : "entrance-timeline"}
      dir={dir}
      className={`transform-gpu will-change-transform ${className}`}
      initial={!scrollDriven && !reduceMotion ? role === "media" ? { opacity: 0.86, x: direction * 16, y: 10 } : { x: direction * 4, y: 8, scale: 0.997 } : false}
      whileInView={!scrollDriven && !reduceMotion ? role === "media" ? { opacity: 1, x: 0, y: 0 } : { x: 0, y: 0, scale: 1 } : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.58, ease }}
      style={scrollDriven ? role === "media" ? { x: mediaX, y: mediaY, opacity: mediaOpacity, scale: mediaScale, rotate: mediaRotate } : { x: copyX, y: copyY, scale: copyScale } : undefined}
    >
      {children}
    </motion.div>
  );
}
