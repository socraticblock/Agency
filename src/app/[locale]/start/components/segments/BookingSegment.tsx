"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import type { CSSProperties } from "react";
import type { Lane1CustomizerState } from "../../lib/types";
import { MagneticButton } from "../../../_components/MagneticButton";
import { lane1BookingPrimaryClasses, lane1PrimaryAccentBackground } from "../../lib/button-styles";
import { InlineEditable } from "../InlineEditable";

interface BookingSegmentProps {
  state: Lane1CustomizerState;
  editable: boolean;
  useSecondary: boolean;
  patch: (p: Partial<Lane1CustomizerState>) => void;
  isResponsive: boolean;
  headingStyle: CSSProperties;
  ctaLabelStyle: CSSProperties;
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
  useSecondary,
  patch,
  isResponsive,
  headingStyle,
  ctaLabelStyle,
  itemVariants,
  glassStyle,
}: BookingSegmentProps) {
  const href = safeHttpUrl(state.bookingUrl);

  const btnId = state.style.buttonStyleId;
  const filled = btnId !== "outlined";
  const accentFill = lane1PrimaryAccentBackground(btnId);

  return (
    <motion.section
      variants={itemVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`border-t px-4 py-8 ${isResponsive ? "md:rounded-3xl md:border md:p-8" : ""}`}
      style={{ borderColor: "var(--accent-secondary)", ...glassStyle }}
    >
      <h2 className="mb-4 text-lg font-bold" style={headingStyle}>
        {useSecondary ? "დაჯავშნა" : "Book time"}
      </h2>

      {editable && (
        <div className="mb-6">
          <label className="block text-[10px] uppercase font-bold tracking-wider opacity-50 mb-1">
            {useSecondary ? "დაჯავშნა URL" : "Booking / Calendar Link"}
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-black/10 bg-black/5 px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-colors"
            placeholder={useSecondary ? "დაჯავშნა URL" : "https://calendly.com/your-link"}
            value={state.bookingUrl}
            onChange={(e) => patch({ bookingUrl: e.target.value })}
          />
        </div>
      )}

      {href || editable ? (
        <MagneticButton
          as={href ? "a" : "button"}
          href={href || undefined}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 font-semibold ${lane1BookingPrimaryClasses(btnId)}`}
          style={
            filled
              ? {
                  ...ctaLabelStyle,
                  background: accentFill ?? "var(--accent)",
                  color: state.style.ctaTextHex?.trim()
                    ? "var(--text-cta)"
                    : "var(--accent-contrast, #fff)",
                }
              : {
                  ...ctaLabelStyle,
                  borderColor: "var(--accent)",
                  background: "transparent",
                }
          }
        >
          <Calendar className="h-4 w-4 shrink-0" aria-hidden />
          <InlineEditable
            value={state.bookingLabel}
            onChange={(v) => patch({ bookingLabel: v })}
            placeholder={useSecondary ? "დაჯავშნის ეტიკეტი" : "Book"}
            editable={editable}
          />
        </MagneticButton>
      ) : null}
    </motion.section>
  );
}
