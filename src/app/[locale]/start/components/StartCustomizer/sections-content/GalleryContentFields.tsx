"use client";

import { useRef, useState } from "react";
import type { Lane1CustomizerState } from "../../../lib/types";
import { compressImageForLane1Storage } from "../../../lib/image-compress";
type GalleryTuple = Lane1CustomizerState["galleryImageDataUrls"];

export function GalleryContentFields({
  state,
  patch,
}: {
  state: Lane1CustomizerState;
  patch: (p: Partial<Lane1CustomizerState>) => void;
}) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const [busy, setBusy] = useState<number | null>(null);

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

  return (
    <fieldset className="space-y-3 border-t border-black/10 pt-4">
      <legend className="start-label font-semibold text-[#1e293b]">Gallery (6 images)</legend>
      <p className="start-caption">Images are stored in your browser only (compressed).</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {state.galleryImageDataUrls.map((src, i) => (
          <div key={i} className="space-y-1">
            <div className="relative aspect-square overflow-hidden rounded-lg border border-black/10 bg-black/5">
              {src ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={src} alt="" className="h-full w-full object-cover" />
              ) : (
                <button
                  type="button"
                  className="flex h-full w-full items-center justify-center text-xs text-black/40"
                  onClick={() => inputs.current[i]?.click()}
                >
                  {busy === i ? "…" : `+ ${i + 1}`}
                </button>
              )}
            </div>
            <input
              ref={(el) => {
                inputs.current[i] = el;
              }}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onFile(i, e.target.files?.[0] ?? null)}
            />
            <div className="flex gap-1">
              <button
                type="button"
                className="flex-1 rounded border border-black/10 py-1 text-[10px] font-medium"
                onClick={() => inputs.current[i]?.click()}
              >
                {src ? "Replace" : "Upload"}
              </button>
              {src ? (
                <button
                  type="button"
                  className="rounded border border-black/10 px-2 py-1 text-[10px] font-medium"
                  onClick={() => clearSlot(i)}
                >
                  Clear
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
