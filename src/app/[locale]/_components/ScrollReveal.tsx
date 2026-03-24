"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollReveal({ children, className = "" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Entry/exit: scale + translate only. Avoid scroll-linked opacity: before Framer’s
  // scroll measurements (or on very slow dev/LAN hydration), a low opacity floor
  // left sections looking “ghosted” while content was otherwise ready.
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.97, 1, 1, 0.97]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [30, 0, 0, -20]
  );

  return (
    <motion.div
      ref={ref}
      style={{ scale, y, willChange: "transform" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
