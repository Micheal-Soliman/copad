"use client";

import { motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";

type ScrollAtmosphereProps = {
  progress: MotionValue<number>;
  reverse?: boolean;
  chapter?: string;
};

export function ScrollAtmosphere({ progress, reverse = false, chapter }: ScrollAtmosphereProps) {
  const reduceMotion = useReducedMotion();
  const orbX = useTransform(progress, [0, 1], reverse ? ["28%", "-18%"] : ["-18%", "28%"]);
  const orbY = useTransform(progress, [0, 0.5, 1], ["12%", "-8%", "18%"]);
  const orbScale = useTransform(progress, [0, 0.55, 1], [0.82, 1.06, 0.92]);
  const ringRotate = useTransform(progress, [0, 1], reverse ? [18, -28] : [-18, 28]);
  const ringScale = useTransform(progress, [0, 0.65, 1], [0.78, 1, 1.08]);
  const beamX = useTransform(progress, [0, 1], reverse ? ["110%", "-35%"] : ["-35%", "110%"]);
  const lineScale = useTransform(progress, [0.02, 0.78], [0, 1]);
  const detailOpacity = useTransform(progress, [0, 0.06, 0.92, 1], [0, 1, 1, 0]);
  const travelerPosition = useTransform(progress, [0.04, 0.86], reverse ? ["92%", "8%"] : ["8%", "92%"]);
  const chapterY = useTransform(progress, [0, 1], [70, -90]);
  const chapterOpacity = useTransform(progress, [0, 0.18, 0.78, 1], [0, 0.11, 0.11, 0.025]);
  const ribbonClip = useTransform(
    progress,
    [0.02, 0.68],
    reverse
      ? ["polygon(100% 0,100% 0,100% 100%,100% 100%)", "polygon(0 0,100% 0,100% 100%,0 100%)"]
      : ["polygon(0 0,0 0,0 100%,0 100%)", "polygon(0 0,100% 0,100% 100%,0 100%)"],
  );
  const handoffScale = useTransform(progress, [0.7, 0.96], [0, 1]);
  const handoffOpacity = useTransform(progress, [0.68, 0.86, 1], [0, 0.38, 0.62]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className={`absolute inset-x-[-8%] top-[42%] h-[18%] -translate-y-1/2 rotate-[-4deg] bg-linear-to-r from-transparent via-copad-green/[.075] to-copad-deep/[.035] ${reverse ? "-scale-x-100" : ""}`}
        style={reduceMotion ? undefined : { clipPath: ribbonClip, opacity: detailOpacity }}
      />
      <motion.div
        className="absolute -top-40 start-[8%] size-[32rem] rounded-full bg-[radial-gradient(circle,rgba(16,159,131,.22),rgba(16,159,131,.055)_46%,transparent_72%)] blur-2xl"
        style={reduceMotion ? undefined : { x: orbX, y: orbY, scale: orbScale }}
      />
      <motion.div
        className="absolute top-[9%] -end-44 size-[30rem] rounded-full border border-copad-green/20 sm:size-[42rem]"
        style={reduceMotion ? undefined : { rotate: ringRotate, scale: ringScale }}
      >
        <span className="absolute inset-14 rounded-full border border-copad-deep/10" />
        <span className="absolute start-1/2 top-[-5px] size-2.5 rounded-full bg-copad-green/70 shadow-[0_0_22px_rgba(16,159,131,.6)]" />
      </motion.div>

      {chapter && (
        <motion.span
          className={`absolute top-[26%] hidden select-none font-display text-[clamp(12rem,24vw,29rem)] leading-none tracking-[-0.08em] text-copad-deep sm:block ${reverse ? "start-[3%]" : "end-[5%]"}`}
          style={reduceMotion ? { opacity: 0.055 } : { y: chapterY, opacity: chapterOpacity }}
        >
          {chapter}
        </motion.span>
      )}

      <motion.div
        className="absolute inset-x-[7%] top-[22%] h-px origin-left bg-linear-to-r from-copad-green/0 via-copad-green/55 to-copad-green/0 rtl:origin-right"
        style={reduceMotion ? undefined : { scaleX: lineScale, opacity: detailOpacity }}
      />
      <motion.span
        className="absolute top-[calc(22%_-_4px)] size-2 rounded-full bg-copad-green shadow-[0_0_24px_rgba(16,159,131,.75)]"
        style={reduceMotion ? undefined : { left: travelerPosition, opacity: detailOpacity }}
      />

      <motion.span
        className="absolute top-[72%] h-px w-72 bg-linear-to-r from-transparent via-copad-green/28 to-transparent blur-[.5px]"
        style={reduceMotion ? undefined : { x: beamX, opacity: detailOpacity }}
      />
      <motion.div className="absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-copad-green/[.045] to-transparent" style={reduceMotion ? undefined : { opacity: handoffOpacity }} />
      <motion.div
        className="absolute inset-x-[8%] bottom-0 h-px origin-left bg-linear-to-r from-transparent via-copad-green/70 to-transparent shadow-[0_0_14px_rgba(16,159,131,.26)] rtl:origin-right"
        style={reduceMotion ? undefined : { scaleX: handoffScale }}
      />
    </div>
  );
}
