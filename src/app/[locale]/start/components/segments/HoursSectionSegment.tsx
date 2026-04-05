"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import type { CSSProperties } from "react";
import type { Lane1CustomizerState } from "../../lib/types";
import { InlineEditable } from "../InlineEditable";

interface HoursSectionSegmentProps {
  state: Lane1CustomizerState;
  editable: boolean;
  useSecondary: boolean;
  isResponsive: boolean;
  patch: (p: Partial<Lane1CustomizerState>) => void;
  headingStyle: CSSProperties;
  bodyStyle: CSSProperties;
  itemVariants: import("framer-motion").Variants;
  glassStyle: CSSProperties;
}

export function HoursSectionSegment({
  state,
  editable,
  useSecondary,
  isResponsive,
  patch,
  headingStyle,
  bodyStyle,
  itemVariants,
  glassStyle,
}: HoursSectionSegmentProps) {
  const value = useSecondary ? state.hoursSecondary : state.hours;
  const fallback = useSecondary ? state.hours : "";

  if (!editable && !value.trim() && !(useSecondary && fallback.trim())) return null;

  return (
    <motion.section
      variants={itemVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`border-t px-4 py-8 ${isResponsive ? "md:rounded-3xl md:border md:p-8" : ""}`}
      style={{ borderColor: "var(--accent-secondary)", ...glassStyle }}
    >
      <h2 className="mb-3 flex items-center gap-2 text-lg font-bold" style={headingStyle}>
        <Clock className="h-5 w-5 opacity-70" style={{ color: "var(--accent)" }} aria-hidden />
        Hours
      </h2>
      <div className="text-sm leading-relaxed" style={bodyStyle}>
        <InlineEditable
          value={value}
          onChange={(v) => patch(useSecondary ? { hoursSecondary: v } : { hours: v })}
          fallbackIfEmpty={fallback}
          showFallbackIndicator={useSecondary}
          placeholder="Mon–Fri: 09:00 – 18:00"
          editable={editable}
          multiline
          className="block w-full whitespace-pre-wrap"
          style={bodyStyle}
        />
      </div>
    </motion.section>
  );
}
