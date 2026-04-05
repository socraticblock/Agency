"use client";

import type { Variants } from "framer-motion";
import { ANIMATION_PRESETS } from "./presets";

export const containerVariants = {
  hidden: { opacity: 0 },
  show: (stagger: number) => ({
    opacity: 1,
    transition: {
      staggerChildren: stagger || 0.1,
      delayChildren: 0.1,
    },
  }),
};

function clampSpeed(s: number) {
  return Math.min(1.75, Math.max(0.45, s));
}

export function buildItemVariants(animationId: string, speedPercent: number): Variants {
  const p =
    ANIMATION_PRESETS.find((a) => a.id === animationId) ??
    ANIMATION_PRESETS.find((x) => x.id === "fade")!;
  const s = clampSpeed(speedPercent / 100);

  const springTransition = {
    type: "spring" as const,
    damping: p.springDamping * s,
    stiffness: 88 * s,
    mass: 1.15,
  };

  if (p.flavor === "fade") {
    return {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.22 / s } },
    };
  }

  if (p.flavor === "scale") {
    return {
      hidden: { opacity: 0, y: p.entranceY, scale: 0.9 },
      show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: springTransition,
      },
    };
  }

  const blurHidden = p.flavor === "spring-blur" ? "blur(12px)" : "blur(0px)";
  return {
    hidden: {
      opacity: 0,
      y: p.entranceY,
      scale: p.flavor === "spring-blur" ? 0.98 : 1,
      filter: blurHidden,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: springTransition,
    },
  };
}
