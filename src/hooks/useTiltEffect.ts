"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";

/**
 * 3D tilt effect hook for desktop only.
 * On mobile (< 768px), all values are inert (zero) to skip heavy physics calculations.
 */
export function useTiltEffect() {
  const ref = useRef<HTMLButtonElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const background = useTransform(
    [glowX, glowY],
    ([xVal, yVal]) =>
      `radial-gradient(140px circle at ${xVal}px ${yVal}px, rgba(16,185,129,0.18), transparent)`
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!isDesktop || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      glowX.set(mouseX);
      glowY.set(mouseY);
      x.set(mouseX / rect.width - 0.5);
      y.set(mouseY / rect.height - 0.5);
    },
    [isDesktop, glowX, glowY, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    if (!isDesktop) return;
    x.set(0);
    y.set(0);
  }, [isDesktop, x, y]);

  return {
    ref,
    background,
    handleMouseMove,
    handleMouseLeave,
    isDesktop,
  };
}
