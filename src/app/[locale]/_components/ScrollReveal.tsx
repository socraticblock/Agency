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

  // Entry: dim + small + pushed down → full + normal
  // Exit:  full + normal → dim + small + pushed up
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.15, 1, 1, 0.15]
  );
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
      style={{ opacity, scale, y, willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
