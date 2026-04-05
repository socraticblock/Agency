"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import type { CSSProperties } from "react";
import type { Lane1CustomizerState } from "../../lib/types";
import { MagneticButton } from "../../../_components/MagneticButton";
import { lane1BookingPrimaryClasses } from "../../lib/button-styles";

interface BookingSegmentProps {
  state: Lane1CustomizerState;
  editable: boolean;
  isResponsive: boolean;
  headingStyle: CSSProperties;
  itemVariants: import("framer-motion").Variants;
  glassStyle: CSSProperties;
}

function safeHttpUrl(raw: string): string | null {
  const t = raw.trim();
  if (!t) return null;
  try {
    const u = new URL(t.startsWith("http") ? t : `https://${t}`);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    return u.href;
  } catch {
    return null;
  }
}

export function BookingSegment({
  state,
  editable,
  isResponsive,
  headingStyle,
  itemVariants,
  glassStyle,
}: BookingSegmentProps) {
  const href = safeHttpUrl(state.bookingUrl);
  if (!href && !editable) return null;

  const btnId = state.style.buttonStyleId;
  const filled = btnId !== "ghost" && btnId !== "outlined";

  return (
    <motion.section
      variants={itemVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`border-t px-4 py-8 ${isResponsive ? "md:rounded-3xl md:border md:p-8" : ""}`}
      style={{ borderColor: "var(--accent-secondary)", ...glassStyle }}
    >
      <h2 className="mb-4 text-lg font-bold" style={headingStyle}>
        Book time
      </h2>
      {href ? (
        <MagneticButton
          as="a"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 font-semibold ${lane1BookingPrimaryClasses(btnId)}`}
          style={
            filled
              ? {
                  background: "var(--accent)",
                  color: "var(--accent-contrast, #fff)",
                }
              : {
                  borderColor: "var(--accent)",
                  color: "var(--accent)",
                  background: "transparent",
                }
          }
        >
          <Calendar className="h-4 w-4 shrink-0" aria-hidden />
          {state.bookingLabel.trim() || "Book"}
        </MagneticButton>
      ) : (
        <p className="text-sm opacity-60" style={{ color: "var(--text-primary)" }}>
          Set a booking URL under Sections → Content.
        </p>
      )}
    </motion.section>
  );
}
