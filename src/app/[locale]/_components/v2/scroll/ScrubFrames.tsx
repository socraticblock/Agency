"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

/**
 * Scroll-scrubbed FRAME layer.
 *
 * Why frames and not a video
 * -------------------------
 * The previous implementation shipped one MP4 and scrubbed it by seeking
 * `video.currentTime` on every scroll tick. That has two costs:
 *
 *   1. Seeking is not frame-exact and not free. On a fast flick the browser
 *      decodes from the previous keyframe and lands on the wrong frame, so
 *      the layer visibly lags or stutters behind the DOM panels.
 *   2. To make the scrub smooth anyway, the code built a runtime cache of 90
 *      decoded canvases at 960x540. That is 90 x 960 x 540 x 4 bytes =
 *      ~178 MB of decoded RGBA held for the life of the page, built by
 *      seeking the video 90 times at load.
 *
 * Shipping the frames as images removes both problems. The frames ARE the
 * timeline: frame index is derived from scroll progress arithmetically, so
 * there is no seek, no decode, and no drift. Memory is bounded by the LRU
 * below, not by the length of the clip.
 *
 * The frames are the master asset, not a derivative. Render them directly
 * (Blender PNG sequence, Remotion `--sequence`) and derive any MP4 from
 * them. Encoding a video and then pulling frames back out of it costs a
 * generation of lossy compression for nothing.
 *
 * Progressive loading
 * -------------------
 * Frames are fetched on demand as the scroll approaches them, so the layer
 * costs only what the reader has actually scrolled to. The poster is the
 * first paint; the first decoded frame replaces it.
 */

export const scrubProgress = { value: 0 };

const DESKTOP_QUERY = "(min-width: 1024px)";

/** How many decoded frames to keep alive. 16 x 960x540x4 = ~33 MB. */
const LRU_SIZE = 16;

/** How far ahead of the current frame to fetch. */
const PREFETCH_RADIUS = 6;

function subscribeDesktop(onStoreChange: () => void) {
  const media = window.matchMedia(DESKTOP_QUERY);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getDesktopSnapshot() {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

function getDesktopServerSnapshot() {
  return false;
}

type Props = {
  /** Directory holding f000.webp, f001.webp, ... */
  base: string;
  /** Number of frames in the sequence. */
  count: number;
  /** Poster — the LCP candidate, painted before any frame arrives. */
  poster: string;
  className?: string;
};

export function ScrubFrames({ base, count, poster, className }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    getDesktopSnapshot,
    getDesktopServerSnapshot,
  );

  useEffect(() => {
    if (!isDesktop) return;
    const root = rootRef.current;
    if (!root) return;

    const canvas = root.querySelector<HTMLCanvasElement>("canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // index -> ImageBitmap. Insertion order is the LRU order.
    const cache = new Map<number, ImageBitmap>();
    const pending = new Set<number>();
    let lastDrawn = -1;
    let disposed = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      lastDrawn = -1;
    };

    const drawCover = (bmp: ImageBitmap) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const s = Math.max(cw / bmp.width, ch / bmp.height);
      const w = bmp.width * s;
      const h = bmp.height * s;
      ctx.drawImage(bmp, (cw - w) / 2, (ch - h) / 2, w, h);
    };

    const evict = () => {
      while (cache.size > LRU_SIZE) {
        const oldest = cache.keys().next().value;
        if (oldest === undefined) break;
        const bmp = cache.get(oldest);
        cache.delete(oldest);
        bmp?.close();
      }
    };

    const load = async (index: number) => {
      if (index < 0 || index >= count) return;
      if (cache.has(index) || pending.has(index)) return;
      pending.add(index);
      try {
        const res = await fetch(`${base}/f${String(index).padStart(3, "0")}.webp`);
        if (!res.ok) throw new Error(`frame ${index}: HTTP ${res.status}`);
        const blob = await res.blob();
        const bmp = await createImageBitmap(blob);
        if (disposed) {
          bmp.close();
          return;
        }
        cache.set(index, bmp);
        pending.delete(index);
        evict();
        root.classList.add("has-frames");
      } catch {
        pending.delete(index);
      }
    };

    const prefetchAround = (index: number) => {
      for (let d = 0; d <= PREFETCH_RADIUS; d++) {
        void load(index + d);
        if (d > 0) void load(index - d);
      }
    };

    const tick = () => {
      if (disposed) return;
      const p = scrubProgress.value;
      const target = Math.max(0, Math.min(count - 1, Math.round(p * (count - 1))));

      if (target !== lastDrawn) {
        // Draw the exact frame if it is decoded; otherwise hold the previous
        // one and keep it. A brief hold beats a flash of the wrong frame.
        const bmp = cache.get(target);
        if (bmp) {
          drawCover(bmp);
          lastDrawn = target;
        }
      }

      prefetchAround(target);
      raf = requestAnimationFrame(tick);
    };

    let raf = 0;
    resize();
    window.addEventListener("resize", resize);
    // Prime the first frame before the first paint of the layer.
    void load(0);
    raf = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      for (const bmp of cache.values()) bmp.close();
      cache.clear();
    };
  }, [base, count, isDesktop]);

  if (!isDesktop) return null;

  return (
    <div ref={rootRef} aria-hidden className={`scrubbg ${className ?? ""}`}>
      <img className="scrubbg__poster" src={poster} alt="" />
      <canvas className="scrubbg__canvas" />
    </div>
  );
}
