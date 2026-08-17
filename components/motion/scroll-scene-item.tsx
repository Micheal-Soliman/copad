"use client";

import { motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
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
  const copyX = useTransform(progress, [0, 0.24, 1], [direction * 30, 0, 0]);
  const copyY = useTransform(progress, [0, 0.24, 1], [18, 0, 0]);
  const copyOpacity = useTransform(progress, [0, 0.08, 0.24, 1], [0.08, 0.52, 1, 1]);
  const mediaX = useTransform(progress, [0, 0.4, 0.76, 1], [direction * 28, direction * 28, 0, 0]);
  const mediaY = useTransform(progress, [0, 0.4, 0.82, 1], [70, 70, 0, 0]);
  const mediaOpacity = useTransform(progress, [0, 0.4, 0.56, 1], [0, 0, 1, 1]);
  const mediaScale = useTransform(progress, [0, 0.42, 0.82, 1], [0.965, 0.965, 1, 1]);
  const mediaRotate = useTransform(progress, [0.4, 0.82], [direction * 0.65, 0]);
  const scrollDriven = active && !reduceMotion;

  return (
    <motion.div
      key={scrollDriven ? "scroll-timeline" : "entrance-timeline"}
      dir={dir}
      className={`transform-gpu will-change-transform ${className}`}
      initial={!scrollDriven && !reduceMotion ? { opacity: 0.82, x: direction * 24, y: 12 } : false}
      whileInView={!scrollDriven && !reduceMotion ? { opacity: 1, x: 0, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease }}
      style={scrollDriven ? role === "media" ? { x: mediaX, y: mediaY, opacity: mediaOpacity, scale: mediaScale, rotate: mediaRotate } : { x: copyX, y: copyY, opacity: copyOpacity } : undefined}
    >
      {children}
    </motion.div>
  );
}
