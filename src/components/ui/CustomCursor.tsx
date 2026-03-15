"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const CURSOR_SIZE = 20;

export function CustomCursor() {
  const [hasHover, setHasHover] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isXRayHover, setIsXRayHover] = useState(false);
  
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

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
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);

      const target = document.elementFromPoint(e.clientX, e.clientY);
      setIsXRayHover(target?.closest('.x-ray-zone') !== null);
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

  const currentSize = isXRayHover ? 160 : CURSOR_SIZE;

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none fixed left-0 top-0 z-[9999] hidden rounded-full border-2 transition-colors duration-300 md:block ${
        isXRayHover ? "border-transparent bg-white/5" : "border-white"
      }`}
      animate={{
        width: currentSize,
        height: currentSize,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        opacity: isVisible ? 1 : 0,
        mixBlendMode: isXRayHover ? "normal" : "difference",
        backdropFilter: isXRayHover ? "blur(8px) brightness(1.2)" : "none",
        WebkitBackdropFilter: isXRayHover ? "blur(8px) brightness(1.2)" : "none",
      }}
    />
  );
}
