import type { CSSProperties } from "react";

export const scrollSystem = {
  lenis: {
    // One deliberate global rhythm for every page. Large wheel/trackpad spikes
    // are capped by SmoothScroll before this multiplier is applied.
    lerp: 0.06,
    wheelMultiplier: 0.44,
    maxWheelDelta: 80,
  },
  scene: {
    // Complete the story early enough to leave a readable final hold.
    completion: 0.78,
    stageTravelVh: 92,
    navigationDuration: 1.4,
    transitionDuration: 1,
  },
} as const;

type SceneStyle = CSSProperties & { "--scroll-scene-height": string };

export function scrollSceneHeight(stages: number) {
  const safeStages = Math.max(1, stages);
  const travel = safeStages * scrollSystem.scene.stageTravelVh / scrollSystem.scene.completion;
  return `${Math.round(100 + travel)}vh`;
}

export function scrollSceneStyle(stages: number): SceneStyle {
  return { "--scroll-scene-height": scrollSceneHeight(stages) };
}

export function scrollSceneIndex(index: number, total: number) {
  return scrollSystem.scene.completion * index / Math.max(1, total - 1);
}

export function scrollSceneCenter(index: number, total: number) {
  return scrollSystem.scene.completion * (index + 0.5) / Math.max(1, total);
}
