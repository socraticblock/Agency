"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { Lane1CustomizerState } from "../../lib/types";
import { videoUrlToEmbedSrc } from "../../lib/video-embed";

interface VideoSegmentProps {
  state: Lane1CustomizerState;
  editable: boolean;
  isResponsive: boolean;
  headingStyle: CSSProperties;
  bodyStyle: CSSProperties;
  itemVariants: import("framer-motion").Variants;
  glassStyle: CSSProperties;
}

export function VideoSegment({
  state,
  editable,
  isResponsive,
  headingStyle,
  bodyStyle,
  itemVariants,
  glassStyle,
}: VideoSegmentProps) {
  const embed = videoUrlToEmbedSrc(state.videoUrl);
  if (!embed) {
    if (!editable) return null;
    return (
      <motion.section
        variants={itemVariants}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className={`border-t px-4 py-8 ${isResponsive ? "md:rounded-3xl md:border md:p-8" : ""}`}
        style={{ borderColor: "var(--accent-secondary)", ...glassStyle }}
      >
        <h2 className="mb-2 text-lg font-bold" style={headingStyle}>
          Video
        </h2>
        <p className="text-sm opacity-60" style={bodyStyle}>
          Add a YouTube or Vimeo link under Sections → Content.
        </p>
      </motion.section>
    );
  }

  return (
    <motion.section
      variants={itemVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`border-t px-4 py-8 ${isResponsive ? "md:rounded-3xl md:border md:p-8" : ""}`}
      style={{ borderColor: "var(--accent-secondary)", ...glassStyle }}
    >
      <h2 className="mb-3 text-lg font-bold" style={headingStyle}>
        Video
      </h2>
      <div className="aspect-video w-full overflow-hidden rounded-xl border border-black/10 bg-black/5">
        <iframe
          title="Video"
          src={embed}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </motion.section>
  );
}
