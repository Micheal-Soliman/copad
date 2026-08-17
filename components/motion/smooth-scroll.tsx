"use client";

import { useReducedMotion } from "framer-motion";
import { ReactLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { scrollSystem } from "@/lib/motion/scroll-system";

export function SmoothScroll() {
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const isHomepage = /^\/(en|ar)\/?$/.test(pathname);

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        anchors: true,
        stopInertiaOnNavigate: true,
        smoothWheel: !reduceMotion,
        syncTouch: false,
        overscroll: false,
        // Lenis smooths input globally; pinned-scene pacing comes from the
        // shared scroll system rather than section-specific speed values.
        lerp: reduceMotion ? 1 : isHomepage ? scrollSystem.lenis.homepageLerp : scrollSystem.lenis.lerp,
        wheelMultiplier: isHomepage ? scrollSystem.lenis.homepageWheelMultiplier : scrollSystem.lenis.wheelMultiplier,
        virtualScroll: (input) => {
          if (reduceMotion || ("ctrlKey" in input.event && input.event.ctrlKey)) {
            return true;
          }

          const delta = input.deltaY;
          input.deltaY = Math.sign(delta) * Math.min(
            Math.abs(delta),
            scrollSystem.lenis.maxWheelDelta,
          );
          return true;
        },
      }}
    />
  );
}
