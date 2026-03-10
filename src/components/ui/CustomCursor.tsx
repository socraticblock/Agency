"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const CURSOR_SIZE = 20;

export function CustomCursor() {
  const [hasHover, setHasHover] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-CURSOR_SIZE);
  const cursorY = useMotionValue(-CURSOR_SIZE);

  const springConfig = { damping: 25, stiffness: 400 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    setHasHover(!mq.matches);
  }, []);

  useEffect(() => {
    if (!hasHover) return;

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - CURSOR_SIZE / 2);
      cursorY.set(e.clientY - CURSOR_SIZE / 2);
      setIsVisible(true);
    };

    const handleLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [hasHover, cursorX, cursorY]);

  if (!hasHover) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden rounded-full border-2 border-white md:block"
      style={{
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        x,
        y,
        opacity: isVisible ? 1 : 0,
        mixBlendMode: "difference",
      }}
    />
  );
}
