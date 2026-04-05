"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { Lane1CustomizerState } from "../../lib/types";

interface GallerySegmentProps {
  state: Lane1CustomizerState;
  editable: boolean;
  isResponsive: boolean;
  headingStyle: CSSProperties;
  itemVariants: import("framer-motion").Variants;
  glassStyle: CSSProperties;
}

export function GallerySegment({
  state,
  editable,
  isResponsive,
  headingStyle,
  itemVariants,
  glassStyle,
}: GallerySegmentProps) {
  const urls = state.galleryImageDataUrls.filter((x): x is string => Boolean(x));
  if (!editable && urls.length === 0) return null;

  return (
    <motion.section
      variants={itemVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`border-t px-4 py-8 ${isResponsive ? "md:rounded-3xl md:border md:p-8" : ""}`}
      style={{ borderColor: "var(--accent-secondary)", ...glassStyle }}
    >
      <h2 className="mb-4 text-lg font-bold" style={headingStyle}>
        Gallery
      </h2>
      {urls.length === 0 && editable ? (
        <p className="text-sm opacity-60" style={{ color: "var(--text-primary)" }}>
          Add images in the editor under Sections → Gallery.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {state.galleryImageDataUrls.map((src, i) => {
            if (!src) return null;
            return (
              <li key={i} className="aspect-square overflow-hidden rounded-lg border border-black/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
              </li>
            );
          })}
        </ul>
      )}
    </motion.section>
  );
}
