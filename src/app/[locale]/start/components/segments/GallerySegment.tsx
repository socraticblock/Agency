"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { Lane1CustomizerState } from "../../lib/types";
import { compressImageForLane1Storage } from "../../lib/image-compress";

type GalleryTuple = Lane1CustomizerState["galleryImageDataUrls"];

interface GallerySegmentProps {
  state: Lane1CustomizerState;
  editable: boolean;
  patch: (p: Partial<Lane1CustomizerState>) => void;
  isResponsive: boolean;
  headingStyle: CSSProperties;
  itemVariants: import("framer-motion").Variants;
  glassStyle: CSSProperties;
}

export function GallerySegment({
  state,
  editable,
  patch,
  isResponsive,
  headingStyle,
  itemVariants,
  glassStyle,
}: GallerySegmentProps) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const [busy, setBusy] = useState<number | null>(null);

  const urls = state.galleryImageDataUrls.filter((x): x is string => Boolean(x));
  if (!editable && urls.length === 0) return null;

  async function onFile(slot: number, file: File | null) {
    if (!file) return;
    setBusy(slot);
    try {
      const { dataUrl } = await compressImageForLane1Storage(file);
      const next = [...state.galleryImageDataUrls] as unknown as GalleryTuple;
      next[slot] = dataUrl;
      patch({ galleryImageDataUrls: next });
    } finally {
      setBusy(null);
    }
  }

  function clearSlot(slot: number) {
    const next = [...state.galleryImageDataUrls] as unknown as GalleryTuple;
    next[slot] = null;
    patch({ galleryImageDataUrls: next });
  }

  // Only show up to galleryCount slots
  const activeSlots = state.galleryImageDataUrls.slice(0, state.galleryCount);

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
      
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {activeSlots.map((src, i) => {
          return (
            <li key={i} className="group relative aspect-square overflow-hidden rounded-lg border border-black/10 bg-black/5">
              {src ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                  {editable && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        type="button"
                        className="rounded bg-white/90 px-2 py-1 text-[10px] font-bold text-black"
                        onClick={() => inputs.current[i]?.click()}
                      >
                        Change
                      </button>
                      <button
                        type="button"
                        className="rounded bg-red-500/90 px-2 py-1 text-[10px] font-bold text-white"
                        onClick={() => clearSlot(i)}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </>
              ) : editable ? (
                <button
                  type="button"
                  className="flex h-full w-full items-center justify-center text-xs font-medium text-black/40 hover:bg-black/10 transition-colors"
                  onClick={() => inputs.current[i]?.click()}
                >
                  {busy === i ? "..." : `+ Photos`}
                </button>
              ) : null}
              
              {editable && (
                <input
                  ref={(el) => {
                    inputs.current[i] = el;
                  }}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onFile(i, e.target.files?.[0] ?? null)}
                />
              )}
            </li>
          );
        })}
      </ul>
    </motion.section>
  );
}
