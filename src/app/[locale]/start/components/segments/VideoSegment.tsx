"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { Lane1CustomizerState } from "../../lib/types";
import { videoUrlToEmbedSrc } from "../../lib/video-embed";

interface VideoSegmentProps {
  state: Lane1CustomizerState;
  editable: boolean;
  patch: (p: Partial<Lane1CustomizerState>) => void;
  isResponsive: boolean;
  headingStyle: CSSProperties;
  bodyStyle: CSSProperties;
  itemVariants: import("framer-motion").Variants;
  glassStyle: CSSProperties;
}

export function VideoSegment({
  state,
  editable,
  patch,
  isResponsive,
  headingStyle,
  bodyStyle,
  itemVariants,
  glassStyle,
}: VideoSegmentProps) {
  const embed = videoUrlToEmbedSrc(state.videoUrl);

  return (
    <motion.section
      variants={itemVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`border-t px-4 py-8 ${isResponsive ? "md:rounded-3xl md:border md:p-8" : ""}`}
      style={{ borderColor: "var(--accent-secondary)", ...glassStyle }}
    >
      <div className="flex items-center justify-between gap-4 mb-3">
        <h2 className="text-lg font-bold" style={headingStyle}>
          Video
        </h2>
      </div>

      {editable && (
        <div className="mb-4">
          <label className="block text-[10px] uppercase font-bold tracking-wider opacity-50 mb-1">
            YouTube or Vimeo Link
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-black/10 bg-black/5 px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-colors"
            placeholder="https://www.youtube.com/watch?v=..."
            value={state.videoUrl}
            onChange={(e) => patch({ videoUrl: e.target.value })}
          />
        </div>
      )}

      {embed ? (
        <div className="aspect-video w-full overflow-hidden rounded-xl border border-black/10 bg-black/5">
          <iframe
            title="Video"
            src={embed}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : !editable ? (
        null
      ) : (
        <div className="aspect-video w-full flex items-center justify-center rounded-xl border border-dashed border-black/20 bg-black/5 text-sm opacity-40">
          Enter a valid link above to preview video
        </div>
      )}
    </motion.section>
  );
}
