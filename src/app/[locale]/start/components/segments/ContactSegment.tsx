"use client";

import { motion } from "framer-motion";
import { Phone, Mail, Map } from "lucide-react";
import type { Lane1CustomizerState, MobileButtonId } from "../../lib/types";
import { InlineEditable } from "../InlineEditable";
import { MagneticButton } from "../../../_components/MagneticButton";
import type { CSSProperties } from "react";
import { hasValidAddress, MAP_ADDRESS_HELPER_TEXT } from "../../lib/location";
import { lane1DirectionsClasses, lane1PrimaryAccentBackground } from "../../lib/button-styles";

interface ContactSegmentProps {
  state: Lane1CustomizerState;
  editable: boolean;
  useSecondary: boolean;
  isResponsive: boolean;
  patch: (p: Partial<Lane1CustomizerState>) => void;
  bodyStyle: CSSProperties;
  ctaLabelStyle: CSSProperties;
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
  ctaLabelStyle,
  itemVariants,
  glassStyle,
}: ContactSegmentProps) {
  const address = useSecondary ? state.addressSecondary || state.address : state.address;
  const validAddress = hasValidAddress(address);
  const mobileButtonOrder = state.mobileButtonOrder?.length
    ? state.mobileButtonOrder
    : (["map-preview", "get-directions"] as MobileButtonId[]);
  const btnId = state.style.buttonStyleId;
  const directionsFill = lane1PrimaryAccentBackground(btnId);

  return (
    <motion.section
      variants={itemVariants}
      className={`business-card-print-contact px-4 py-8 ${isResponsive ? "md:rounded-3xl md:border md:p-8" : "border-t"}`}
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

        {mobileButtonOrder.map((id) => {
          if (id === "map-preview" && state.addGoogleMap && state.showMapPreview && validAddress) {
            return (
              <div key={id} className="overflow-hidden rounded-xl border border-[color:var(--accent-secondary)]/45 bg-black/10">
                <iframe
                  title="Location map preview"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
                  className="h-40 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            );
          }
          if (id === "map-preview" && state.addGoogleMap && state.showMapPreview && !validAddress) {
            return (
              <p key={`${id}-hint`} className="text-xs opacity-75">
                {MAP_ADDRESS_HELPER_TEXT}
              </p>
            );
          }
          if (id === "get-directions" && state.addGoogleMap && state.showGetDirectionsButton && validAddress) {
            return (
              <div key={id} className="pt-4">
                <MagneticButton
                  as="a"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${lane1DirectionsClasses(btnId)} shadow-lg active:scale-95`}
                  style={{
                    ...ctaLabelStyle,
                    background: directionsFill ?? "var(--accent)",
                    color: state.style.ctaTextHex?.trim()
                      ? "var(--text-cta)"
                      : "var(--accent-contrast, #fff)",
                  }}
                >
                  <Map className="h-4 w-4 opacity-70" />
                  Get Directions
                </MagneticButton>
              </div>
            );
          }
          return null;
        })}
      </div>
    </motion.section>
  );
}
