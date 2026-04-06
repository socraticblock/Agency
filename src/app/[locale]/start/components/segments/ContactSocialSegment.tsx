"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, Facebook, Instagram, Linkedin, Youtube, Map } from "lucide-react";
import type { Lane1CustomizerState } from "../../lib/types";
import { InlineEditable } from "../InlineEditable";
import { MagneticButton } from "../../../_components/MagneticButton";
import type { CSSProperties } from "react";

interface ContactSocialSegmentProps {
  state: Lane1CustomizerState;
  editable: boolean;
  useSecondary: boolean;
  isResponsive: boolean;
  address: string;
  patch: (p: Partial<Lane1CustomizerState>) => void;
  bodyStyle: CSSProperties;
  itemVariants: any;
  glassStyle: CSSProperties;
}

export function ContactSocialSegment({
  state,
  editable,
  useSecondary,
  isResponsive,
  address,
  patch,
  bodyStyle,
  itemVariants,
  glassStyle,
}: ContactSocialSegmentProps) {
  function waHref(phone: string): string {
    const digits = phone.replace(/\D/g, "");
    if (!digits) return "#";
    return `https://wa.me/${digits}`;
  }

  const showSocial = (url: string) => url?.trim().length > 0;

  return (
    <motion.section
      variants={itemVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`border-t px-4 py-8 ${isResponsive ? "md:rounded-3xl md:border md:p-8" : ""}`}
      style={{
        borderColor: "var(--accent-secondary)",
        ...glassStyle
      }}
    >
      <div className={`space-y-3 text-sm ${isResponsive ? "md:text-base" : ""}`}>
        <div className="flex items-center gap-2 font-semibold">
          <Phone className="h-4 w-4 shrink-0" aria-hidden />
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
        <div className="flex items-start gap-2">
          <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
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
        <a
          href={waHref(state.phone)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-semibold"
          style={{ color: "var(--accent)" }}
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          WhatsApp
        </a>
        <div className="flex flex-wrap gap-3 pt-2">
          {showSocial(state.social.facebook) && (
            <MagneticButton
              as="a"
              href={state.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)]"
              aria-label="Facebook"
              magneticStrength={10}
            >
              <Facebook className="h-6 w-6" />
            </MagneticButton>
          )}
          {showSocial(state.social.instagram) && (
            <MagneticButton
              as="a"
              href={state.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)]"
              aria-label="Instagram"
              magneticStrength={10}
            >
              <Instagram className="h-6 w-6" />
            </MagneticButton>
          )}
          {showSocial(state.social.linkedin) && (
            <MagneticButton
              as="a"
              href={state.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)]"
              aria-label="LinkedIn"
              magneticStrength={10}
            >
              <Linkedin className="h-6 w-6" />
            </MagneticButton>
          )}
          {showSocial(state.social.tiktok) && (
            <a
              href={state.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)]"
              aria-label="TikTok"
            >
              <span className="text-xs font-bold">TT</span>
            </a>
          )}
          {showSocial(state.social.youtube) && (
            <MagneticButton
              as="a"
              href={state.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)]"
              aria-label="Visit YouTube Profile"
              magneticStrength={10}
            >
              <Youtube className="h-6 w-6" />
            </MagneticButton>
          )}
          {state.social.extra.map((e, i) =>
            e.url?.trim() ? (
              <a
                key={i}
                href={e.url.trim()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold underline"
                style={{ color: "var(--accent)" }}
              >
                {e.label || "Link"}
              </a>
            ) : null
          )}
        </div>
        <div className="pt-2">
          {state.addGoogleMap && address?.trim() ? (
            <div
              className="mb-2 text-[var(--text-primary)] underline"
              style={bodyStyle}
            >
              <InlineEditable
                value={useSecondary ? state.addressSecondary : state.address}
                onChange={(v) =>
                  patch(
                    useSecondary ? { addressSecondary: v } : { address: v },
                  )
                }
                fallbackIfEmpty={useSecondary ? state.address : ""}
                showFallbackIndicator={useSecondary}
                placeholder="Address"
                multiline
                editable={editable}
                className="block w-full"
                style={bodyStyle}
              />
            </div>
          ) : (
            <div className="text-[var(--text-primary)]" style={bodyStyle}>
              <InlineEditable
                value={useSecondary ? state.addressSecondary : state.address}
                onChange={(v) =>
                  patch(
                    useSecondary ? { addressSecondary: v } : { address: v },
                  )
                }
                fallbackIfEmpty={useSecondary ? state.address : ""}
                showFallbackIndicator={useSecondary}
                placeholder="Address"
                multiline
                editable={editable}
                className="block w-full"
                style={bodyStyle}
              />
            </div>
          )}
        </div>
        <div>
          <InlineEditable
            value={useSecondary ? state.hoursSecondary : state.hours}
            onChange={(v) =>
              patch(useSecondary ? { hoursSecondary: v } : { hours: v })
            }
            fallbackIfEmpty={useSecondary ? state.hours : ""}
            showFallbackIndicator={useSecondary}
            placeholder="Hours"
            editable={editable}
            className="block w-full"
            style={bodyStyle}
          />
        </div>
        {state.addGoogleMap && state.showMapPreview && address?.trim() ? (
          <div className="mt-8 space-y-4">
            <MagneticButton
              as="a"
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 py-3.5 text-[14px] font-bold transition-transform"
              style={{
                borderColor: "var(--accent)",
                color: "white",
                background: "rgba(255, 255, 255, 0.05)"
              }}
            >
              <Map className="h-4 w-4 opacity-70" />
              Get Directions
            </MagneticButton>
          </div>
        ) : null}
      </div>
    </motion.section>
  );
}
