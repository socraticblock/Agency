"use client";

import { motion } from "framer-motion";
import { Phone, Mail, Map } from "lucide-react";
import type { Lane1CustomizerState } from "../../lib/types";
import { InlineEditable } from "../InlineEditable";
import { MagneticButton } from "../../../_components/MagneticButton";
import type { CSSProperties } from "react";

interface ContactSegmentProps {
  state: Lane1CustomizerState;
  editable: boolean;
  useSecondary: boolean;
  isResponsive: boolean;
  patch: (p: Partial<Lane1CustomizerState>) => void;
  bodyStyle: CSSProperties;
  itemVariants: any;
  glassStyle: CSSProperties;
}

export function ContactSegment({
  state,
  editable,
  useSecondary,
  isResponsive,
  patch,
  bodyStyle,
  itemVariants,
  glassStyle,
}: ContactSegmentProps) {
  const address = useSecondary ? state.addressSecondary || state.address : state.address;

  return (
    <motion.section
      variants={itemVariants}
      className={`px-4 py-8 ${isResponsive ? "md:rounded-3xl md:border md:p-8" : "border-t"}`}
      style={{ borderColor: "var(--accent-secondary)", ...glassStyle }}
    >
      <div className={`space-y-4 text-sm ${isResponsive ? "md:text-base" : ""}`}>
        <div className="flex items-center gap-3 font-semibold">
          <Phone className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
          <InlineEditable
            value={state.phone}
            onChange={(v) => patch({ phone: v })}
            placeholder="Phone"
            editable={editable}
            inputMode="tel"
            className="min-w-0 flex-1"
            style={{ color: "var(--accent)", ...bodyStyle }}
          />
        </div>

        <div className="flex items-start gap-3">
          <Mail className="mt-1 h-4 w-4 shrink-0 opacity-70" aria-hidden />
          <span className="min-w-0 flex-1 underline">
            <InlineEditable
              value={state.email}
              onChange={(v) => patch({ email: v })}
              placeholder="Email"
              editable={editable}
              inputMode="email"
              className="block w-full"
              style={bodyStyle}
            />
          </span>
        </div>

        <div className="flex items-start gap-3">
          <Map className="mt-1 h-4 w-4 shrink-0 opacity-70" aria-hidden />
          <div className="min-w-0 flex-1" style={bodyStyle}>
            <InlineEditable
              value={useSecondary ? state.addressSecondary : state.address}
              onChange={(v) => patch(useSecondary ? { addressSecondary: v } : { address: v })}
              placeholder="Address"
              multiline
              editable={editable}
              className="block w-full"
              style={bodyStyle}
            />
          </div>
        </div>

        <div className="pt-2">
          <InlineEditable
            value={useSecondary ? state.hoursSecondary : state.hours}
            onChange={(v) => patch(useSecondary ? { hoursSecondary: v } : { hours: v })}
            placeholder="Operating Hours"
            editable={editable}
            className="block w-full text-xs opacity-70"
            style={bodyStyle}
          />
        </div>

        {state.addGoogleMap && address?.trim() && (
          <div className="pt-4">
            <MagneticButton
              as="a"
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 py-3.5 text-[14px] font-bold transition-all hover:bg-black/5"
              style={{
                borderColor: "var(--accent)",
                color: "var(--accent)",
                background: "rgba(255, 255, 255, 0.05)"
              }}
            >
              <Map className="h-4 w-4 opacity-70" />
              Get Directions
            </MagneticButton>
          </div>
        )}
      </div>
    </motion.section>
  );
}
