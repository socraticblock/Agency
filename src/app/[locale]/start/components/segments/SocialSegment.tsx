"use client";

import { cloneElement, type ReactElement, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import type { Lane1CustomizerState, SocialPlatformId } from "../../lib/types";
import { MagneticButton } from "../../../_components/MagneticButton";
import {
  socialIconColorVar,
  socialIconFillStyle,
  socialIconFrameClass,
  socialIconPixelSize,
} from "../../lib/social-appearance";

interface SocialSegmentProps {
  state: Lane1CustomizerState;
  isResponsive: boolean;
  itemVariants: import("framer-motion").Variants;
}

function SocialIconLink({
  state,
  href,
  label,
  icon,
}: {
  state: Lane1CustomizerState;
  href: string;
  label: string;
  icon: ReactElement;
}) {
  const px = socialIconPixelSize(state.socialIconSize);
  const color = socialIconColorVar(state);
  const stroke = socialIconFillStyle(state.socialIconStyle);
  const frame = socialIconFrameClass(state.socialIconStyle);
  const roundedBg =
    state.socialIconStyle === "rounded"
      ? ({ background: "color-mix(in srgb, var(--accent) 12%, transparent)" } as const)
      : undefined;

  return (
    <MagneticButton
      as="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-1"
      style={{ color }}
      aria-label={label}
      magneticStrength={10}
    >
      <span className={frame} style={roundedBg}>
        {cloneElement(icon as ReactElement<{ size?: number; strokeWidth?: number }>, {
          size: px,
          ...stroke,
        })}
      </span>
      {state.showSocialLabels ? <span className="max-w-[5rem] text-center text-[0.65rem] font-semibold leading-tight">{label}</span> : null}
    </MagneticButton>
  );
}

export function SocialSegment({ state, isResponsive, itemVariants }: SocialSegmentProps) {
  const show = (u: string) => u?.trim().length > 0;
  const px = socialIconPixelSize(state.socialIconSize);
  const color = socialIconColorVar(state);
  const platformOrder = state.socialPlatformOrder?.length
    ? state.socialPlatformOrder
    : (["facebook", "instagram", "linkedin", "tiktok", "youtube"] as SocialPlatformId[]);
  const activePlatforms = state.activeSocialPlatforms?.length
    ? state.activeSocialPlatforms
    : (["facebook", "instagram", "linkedin", "tiktok", "youtube"] as SocialPlatformId[]);

  const items: Record<SocialPlatformId, { ok: boolean; node: ReactNode }> = {
    facebook: { ok: show(state.social.facebook), node: <SocialIconLink state={state} href={state.social.facebook} label="Facebook" icon={<Facebook />} /> },
    instagram: { ok: show(state.social.instagram), node: <SocialIconLink state={state} href={state.social.instagram} label="Instagram" icon={<Instagram />} /> },
    linkedin: { ok: show(state.social.linkedin), node: <SocialIconLink state={state} href={state.social.linkedin} label="LinkedIn" icon={<Linkedin />} /> },
    tiktok: {
      ok: show(state.social.tiktok),
      node: (
        <MagneticButton as="a" href={state.social.tiktok} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 font-black" style={{ color, fontSize: px * 0.55 }} aria-label="TikTok" magneticStrength={10}>
          <span className={socialIconFrameClass(state.socialIconStyle)}>TT</span>
          {state.showSocialLabels ? <span className="text-[0.65rem] font-semibold">TikTok</span> : null}
        </MagneticButton>
      ),
    },
    youtube: { ok: show(state.social.youtube), node: <SocialIconLink state={state} href={state.social.youtube} label="YouTube" icon={<Youtube />} /> },
  };

  return (
    <motion.section
      variants={itemVariants}
      className={`business-card-template-print-skip flex flex-wrap items-center justify-center gap-6 border-t px-4 py-6 ${isResponsive ? "md:rounded-3xl md:border md:p-8" : ""}`}
      style={{ borderColor: "var(--accent-secondary)" }}
    >
      {platformOrder
        .filter((id) => activePlatforms.includes(id))
        .map((id) => items[id])
        .filter((x) => x.ok)
        .map((x, i) => (
        <span key={i}>{x.node}</span>
      ))}
      {state.social.extra.map((e, i) =>
        e.url?.trim() ? (
          <a
            key={`ex-${i}`}
            href={e.url.trim()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 text-center text-xs font-bold uppercase tracking-widest underline underline-offset-4"
            style={{ color }}
          >
            {e.label || "Link"}
            {state.showSocialLabels ? <span className="text-[0.6rem] font-normal normal-case opacity-70">Extra</span> : null}
          </a>
        ) : null,
      )}
    </motion.section>
  );
}
