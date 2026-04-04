"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Youtube, Twitter, Github } from "lucide-react";
import type { Lane1CustomizerState } from "../../lib/types";
import { MagneticButton } from "../../../_components/MagneticButton";

interface SocialSegmentProps {
  state: Lane1CustomizerState;
  isResponsive: boolean;
  itemVariants: any;
}

export function SocialSegment({
  state,
  isResponsive,
  itemVariants,
}: SocialSegmentProps) {
  const showSocial = (url: string) => url?.trim().length > 0;

  return (
    <motion.section
      variants={itemVariants}
      className={`px-4 py-6 border-t flex flex-wrap items-center justify-center gap-6 ${isResponsive ? "md:rounded-3xl md:border md:p-8" : ""}`}
      style={{ borderColor: "var(--accent-secondary)" }}
    >
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
          <Facebook className="h-7 w-7" />
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
          <Instagram className="h-7 w-7" />
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
          <Linkedin className="h-7 w-7" />
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
          <span className="text-sm font-black">TT</span>
        </a>
      )}
      {showSocial(state.social.youtube) && (
        <MagneticButton
          as="a"
          href={state.social.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--accent)]"
          aria-label="YouTube Profile"
          magneticStrength={10}
        >
          <Youtube className="h-7 w-7" />
        </MagneticButton>
      )}
      {state.social.extra.map((e, i) =>
        e.url?.trim() ? (
          <a
            key={i}
            href={e.url.trim()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold uppercase tracking-widest underline underline-offset-4"
            style={{ color: "var(--accent)" }}
          >
            {e.label || "Link"}
          </a>
        ) : null
      )}
    </motion.section>
  );
}
