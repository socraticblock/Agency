"use client";

import { useEffect, useRef, useState } from "react";

type UseHideOnScrollOptions = {
  threshold?: number;
  topOffset?: number;
};

/** Hides on downward scroll and reveals on upward scroll. */
export function useHideOnScroll(options?: UseHideOnScrollOptions): boolean {
  const threshold = options?.threshold ?? 6;
  const topOffset = options?.topOffset ?? 24;
  const [visible, setVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    setVisible(true);

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollYRef.current;

      if (currentY <= topOffset) {
        setVisible(true);
      } else if (delta > threshold) {
        setVisible(false);
      } else if (delta < -threshold) {
        setVisible(true);
      }

      lastScrollYRef.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, topOffset]);

  return visible;
}
