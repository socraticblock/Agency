"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function JargonTooltip({
  children,
  tip,
}: {
  children: React.ReactNode;
  tip: string;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <span
      ref={ref}
      className="relative inline"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      <span className="cursor-help border-b border-dotted border-slate-500/80 border-b-slate-500/80">
        {children}
      </span>
      {visible && <span aria-hidden className="block pt-2" />}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-1/2 top-full z-[100] w-56 -translate-x-1/2 rounded-xl border border-white/10 bg-slate-900/95 px-3 py-2.5 text-xs leading-snug text-slate-200 shadow-xl backdrop-blur-xl"
          >
            {tip}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
