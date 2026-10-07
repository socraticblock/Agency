"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { Lane1CustomizerState } from "../../lib/types";
import { InlineEditable } from "../InlineEditable";

interface AboutSegmentProps {
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

export function AboutSegment({
  state,
  editable,
  useSecondary,
  isResponsive,
  patch,
  headingStyle,
  bodyStyle,
  itemVariants,
  glassStyle,
}: AboutSegmentProps) {
  const primary = useSecondary ? state.aboutBioSecondary : state.aboutBio;
  const fallback = useSecondary ? state.aboutBio : "";

  const hasContent = primary.trim().length > 0 || (useSecondary && fallback.trim().length > 0);
  if (!editable && !hasContent) return null;

  return (
    <motion.section
      variants={itemVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`border-t px-4 py-8 ${isResponsive ? "md:rounded-3xl md:border md:p-8" : ""}`}
      style={{ borderColor: "var(--accent-secondary)", ...glassStyle }}
    >
      <h2 className="mb-3 text-lg font-bold" style={headingStyle}>
        {useSecondary ? "შესახებ" : "About"}
      </h2>
      <div className="text-sm leading-relaxed opacity-90" style={bodyStyle}>
        <InlineEditable
          value={primary}
          onChange={(v) =>
            patch(useSecondary ? { aboutBioSecondary: v } : { aboutBio: v })
          }
          fallbackIfEmpty={fallback}
          showFallbackIndicator={useSecondary}
          placeholder={
            useSecondary
              ? "მოუყევით სტუმრებს ვინ ხართ და რას აკეთებთ…"
              : "Tell visitors who you are and what you do…"
          }
          editable={editable}
          multiline
          className="block w-full whitespace-pre-wrap"
          style={bodyStyle}
        />
      </div>
    </motion.section>
  );
}
