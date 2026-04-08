"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, Facebook, Instagram, Linkedin, Youtube, Map } from "lucide-react";
import type { Lane1CustomizerState, MobileButtonId, SocialPlatformId } from "../../lib/types";
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

  const hasUrl = (url: string) => url?.trim().length > 0;
  const platformOrder = state.socialPlatformOrder?.length
    ? state.socialPlatformOrder
    : (["facebook", "instagram", "linkedin", "tiktok", "youtube"] as SocialPlatformId[]);
  const activePlatforms = state.activeSocialPlatforms?.length
    ? state.activeSocialPlatforms
    : (["facebook", "instagram", "linkedin", "tiktok", "youtube"] as SocialPlatformId[]);
  const mobileButtonOrder = state.mobileButtonOrder?.length
    ? state.mobileButtonOrder
    : (["map-preview", "get-directions"] as MobileButtonId[]);

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
          {platformOrder
            .filter((id) => activePlatforms.includes(id))
            .map((id) => {
              if (id === "facebook") {
                return (
                  <MagneticButton
                    key={id}
                    as="a"
                    href={hasUrl(state.social.facebook) ? state.social.facebook : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-[var(--accent)] ${hasUrl(state.social.facebook) ? "" : "pointer-events-none opacity-60"}`}
                    aria-label="Facebook"
                    magneticStrength={10}
                    aria-disabled={!hasUrl(state.social.facebook)}
                  >
                    <Facebook className="h-6 w-6" />
                  </MagneticButton>
                );
              }
              if (id === "instagram") {
                return (
                  <MagneticButton
                    key={id}
                    as="a"
                    href={hasUrl(state.social.instagram) ? state.social.instagram : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-[var(--accent)] ${hasUrl(state.social.instagram) ? "" : "pointer-events-none opacity-60"}`}
                    aria-label="Instagram"
                    magneticStrength={10}
                    aria-disabled={!hasUrl(state.social.instagram)}
                  >
                    <Instagram className="h-6 w-6" />
                  </MagneticButton>
                );
              }
              if (id === "linkedin") {
                return (
                  <MagneticButton
                    key={id}
                    as="a"
                    href={hasUrl(state.social.linkedin) ? state.social.linkedin : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-[var(--accent)] ${hasUrl(state.social.linkedin) ? "" : "pointer-events-none opacity-60"}`}
                    aria-label="LinkedIn"
                    magneticStrength={10}
                    aria-disabled={!hasUrl(state.social.linkedin)}
                  >
                    <Linkedin className="h-6 w-6" />
                  </MagneticButton>
                );
              }
              if (id === "tiktok") {
                return (
                  <a
                    key={id}
                    href={hasUrl(state.social.tiktok) ? state.social.tiktok : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-[var(--accent)] ${hasUrl(state.social.tiktok) ? "" : "opacity-60"}`}
                    aria-label="TikTok"
                    aria-disabled={!hasUrl(state.social.tiktok)}
                    onClick={(e) => {
                      if (!hasUrl(state.social.tiktok)) e.preventDefault();
                    }}
                  >
                    <span className="text-xs font-bold">TT</span>
                  </a>
                );
              }
              if (id === "youtube") {
                return (
                  <MagneticButton
                    key={id}
                    as="a"
                    href={hasUrl(state.social.youtube) ? state.social.youtube : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-[var(--accent)] ${hasUrl(state.social.youtube) ? "" : "pointer-events-none opacity-60"}`}
                    aria-label="Visit YouTube Profile"
                    magneticStrength={10}
                    aria-disabled={!hasUrl(state.social.youtube)}
                  >
                    <Youtube className="h-6 w-6" />
                  </MagneticButton>
                );
              }
              return null;
            })}
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
        {mobileButtonOrder.map((id) => {
          if (id === "map-preview" && state.addGoogleMap && state.showMapPreview && address?.trim()) {
            return (
              <div key={id} className="mt-6 overflow-hidden rounded-xl border border-[color:var(--accent-secondary)]/45 bg-black/10">
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
          if (id === "get-directions" && state.addGoogleMap && state.showGetDirectionsButton && address?.trim()) {
            return (
              <div key={id} className="mt-8 space-y-4">
                <MagneticButton
                  as="a"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[14px] font-bold transition-all shadow-lg active:scale-95"
                  style={{
                    background: "var(--accent)",
                    color: "var(--accent-contrast, #fff)"
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
