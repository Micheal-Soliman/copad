"use client";

import { useReducedMotion } from "framer-motion";
import { ReactLenis } from "lenis/react";

export function SmoothScroll() {
  const reduceMotion = useReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        anchors: true,
        stopInertiaOnNavigate: true,
        smoothWheel: !reduceMotion,
        syncTouch: false,
        lerp: reduceMotion ? 1 : 0.075,
        wheelMultiplier: 0.9,
      }}
    />
  );
}
