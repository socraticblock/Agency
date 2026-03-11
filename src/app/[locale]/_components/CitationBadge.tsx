"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

type ResearchVariant = "speed" | "trust" | "genesis";

export function CitationBadge({
  locale,
  variant,
}: {
  locale: Locale;
  variant: ResearchVariant;
}) {
  const [hovered, setHovered] = useState(false);
  const research = getMessages(locale).auditResults.research;
  const title =
    variant === "speed"
      ? research.speedTitle
      : variant === "trust"
        ? research.trustTitle
        : research.genesisTitle;
  const source =
    variant === "speed"
      ? research.speedSource
      : variant === "trust"
        ? research.trustSource
        : research.genesisSource;
  const quote =
    variant === "speed"
      ? research.speedQuote
      : variant === "trust"
        ? research.trustQuote
        : research.genesisQuote;

  return (
    <span className="relative inline-flex align-middle">
      <span
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="ml-1.5 inline-flex cursor-help rounded-full border border-white/20 bg-white/5 p-1 backdrop-blur-xl text-slate-400 transition-colors hover:border-[#00FF80]/40 hover:text-[#00FF80]"
        aria-label="View source"
      >
        <Info size={14} strokeWidth={2} />
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
            className="absolute bottom-full left-0 z-50 mb-2 w-72 rounded-xl border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur-xl"
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
