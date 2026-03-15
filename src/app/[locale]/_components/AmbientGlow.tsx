"use client";

import { useScroll, useTransform, useMotionTemplate, motion } from "framer-motion";

export function AmbientGlow() {
  const { scrollYProgress } = useScroll();

  // Top-left glow: cool blue → warm indigo
  const g1r = useTransform(scrollYProgress, [0, 1], [29, 99]);
  const g1g = useTransform(scrollYProgress, [0, 1], [78, 56]);
  const g1b = useTransform(scrollYProgress, [0, 1], [216, 235]);

  // Bottom-right glow: indigo → violet
  const g2r = useTransform(scrollYProgress, [0, 1], [67, 124]);
  const g2g = useTransform(scrollYProgress, [0, 1], [56, 58]);
  const g2b = useTransform(scrollYProgress, [0, 1], [202, 237]);

  // Bottom-center glow: cyan → warm rose
  const g3r = useTransform(scrollYProgress, [0, 1], [14, 168]);
  const g3g = useTransform(scrollYProgress, [0, 1], [165, 85]);
  const g3b = useTransform(scrollYProgress, [0, 1], [233, 247]);

  const bg1 = useMotionTemplate`radial-gradient(ellipse 65% 55% at 10% 25%, rgba(${g1r}, ${g1g}, ${g1b}, 0.07), transparent 150%)`;
  const bg2 = useMotionTemplate`radial-gradient(ellipse 65% 55% at 85% 65%, rgba(${g2r}, ${g2g}, ${g2b}, 0.08), transparent 50%)`;
  const bg3 = useMotionTemplate`radial-gradient(ellipse 60% 50% at 40% 95%, rgba(${g3r}, ${g3g}, ${g3b}, 0.04), transparent 45%)`;
  const combined = useMotionTemplate`${bg1}, ${bg2}, ${bg3}`;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ backgroundImage: combined }}
    />
  );
}
