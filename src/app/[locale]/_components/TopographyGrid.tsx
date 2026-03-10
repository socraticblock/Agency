"use client";

import { motion } from "framer-motion";

export function TopographyGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-20 overflow-hidden"
      style={{
        maskImage:
          "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, black 80%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, black 80%)",
      }}
    >
      <motion.div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
        animate={{
          opacity: [0.04, 0.07, 0.04],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
