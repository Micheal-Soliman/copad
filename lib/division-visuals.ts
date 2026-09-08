import type { CSSProperties } from "react";

export const divisionVisuals = [
  { src: "/images/brand/copad-laboratory-team.png", size: "cover", position: "center" },
  { src: "/images/copad-divisions-atlas.png", size: "400% auto", position: "33.333% center" },
  { src: "/images/brand/copad-animal-health.png", size: "cover", position: "center" },
  { src: "/images/copad-divisions-atlas.png", size: "400% auto", position: "100% center" },
] as const;

export function getDivisionVisualStyle(index: number): CSSProperties {
  const visual = divisionVisuals[index] ?? divisionVisuals[0];
  return {
    backgroundImage: `url('${visual.src}')`,
    backgroundSize: visual.size,
    backgroundPosition: visual.position,
  };
}
