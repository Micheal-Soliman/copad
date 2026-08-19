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
  const copyX = useTransform(progress, [0, 0.22, 1], [direction * 22, 0, 0]);
  const copyY = useTransform(progress, [0, 0.22, 1], [12, 0, 0]);
  const copyOpacity = useTransform(progress, [0, 0.08, 0.22, 1], [0.62, 0.84, 1, 1]);
  const mediaX = useTransform(progress, [0, 0.28, 0.62, 1], [direction * 20, direction * 20, 0, 0]);
  const mediaY = useTransform(progress, [0, 0.28, 0.64, 1], [34, 34, 0, 0]);
  const mediaOpacity = useTransform(progress, [0, 0.18, 0.44, 1], [0.24, 0.55, 1, 1]);
  const mediaScale = useTransform(progress, [0, 0.3, 0.64, 1], [0.985, 0.985, 1, 1]);
  const mediaRotate = useTransform(progress, [0.28, 0.64], [direction * 0.3, 0]);
  const scrollDriven = active && !reduceMotion;

  return (
    <motion.div
      key={scrollDriven ? "scroll-timeline" : "entrance-timeline"}
      dir={dir}
      className={`transform-gpu will-change-transform ${className}`}
      initial={!scrollDriven && !reduceMotion ? { opacity: 0.82, x: direction * 24, y: 12 } : false}
      whileInView={!scrollDriven && !reduceMotion ? { opacity: 1, x: 0, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.68, ease }}
      style={scrollDriven ? role === "media" ? { x: mediaX, y: mediaY, opacity: mediaOpacity, scale: mediaScale, rotate: mediaRotate } : { x: copyX, y: copyY, opacity: copyOpacity } : undefined}
    >
      {children}
    </motion.div>
  );
}
