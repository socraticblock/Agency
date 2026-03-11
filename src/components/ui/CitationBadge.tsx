"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen } from "lucide-react";

type CitationBadgeProps = {
  title: string;
  source: string;
  quote: string;
};

export function CitationBadge({ title, source, quote }: CitationBadgeProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <span className="relative inline-flex align-middle">
      <span
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="ml-1.5 inline-flex cursor-help rounded-full border border-white/20 bg-white/5 p-1 text-slate-400 transition-colors hover:border-[#00FF80]/40 hover:text-[#00FF80]"
        aria-label="View source"
      >
        <BookOpen size={14} strokeWidth={2} />
      </span>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="absolute bottom-full left-0 z-50 mb-2 w-72 rounded-xl border border-white/10 bg-[#0a0a0a] p-4 shadow-xl backdrop-blur-xl"
          >
            <p className="font-semibold text-white">{title}</p>
            <p className="mt-1 text-xs font-mono text-slate-500">{source}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              &ldquo;{quote}&rdquo;
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
