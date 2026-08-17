"use client";

import { motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";

type ScrollAtmosphereProps = {
  progress: MotionValue<number>;
  reverse?: boolean;
  chapter?: string;
};

export function ScrollAtmosphere({ progress, reverse = false }: ScrollAtmosphereProps) {
  const reduceMotion = useReducedMotion();
  const washX = useTransform(progress, [0, 1], reverse ? ["22%", "-12%"] : ["-12%", "22%"]);
  const washY = useTransform(progress, [0, 0.55, 1], ["8%", "-5%", "5%"]);
  const washScale = useTransform(progress, [0, 0.6, 1], [0.9, 1.04, 1]);
  const haloRotate = useTransform(progress, [0, 1], reverse ? [12, -12] : [-12, 12]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-36 start-[6%] size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(123,205,237,.2),rgba(0,144,175,.055)_46%,transparent_72%)] blur-3xl sm:size-[38rem]"
        style={reduceMotion ? undefined : { x: washX, y: washY, scale: washScale }}
      />
      <motion.div
        className="absolute top-[12%] -end-56 size-[34rem] rounded-full border border-copad-sky/18 sm:size-[44rem]"
        style={reduceMotion ? undefined : { rotate: haloRotate }}
      />
    </div>
  );
}
