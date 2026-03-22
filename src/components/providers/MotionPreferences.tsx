"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Respects `prefers-reduced-motion` for Framer Motion across the tree. */
export function MotionPreferences({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
