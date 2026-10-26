"use client";

import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";

/**
 * Scroll-scrubbed video layer.
 *
 * The scroll position IS the video timeline: a fixed clip advances only as the
 * reader scrolls, smoothed with a lerp. Technique 7 of
 * references/techniques/video-and-media.md.
 *
 * Two things make this specific implementation unusual:
 *
 * 1. THE PROGRESS IS DRIVEN BY THE STORY, NOT BY A SCROLL LISTENER.
 *    The Signal story in hero.timeline.ts is a single GSAP timeline with one
 *    ScrollTrigger (scrub: 0.35). If the video used its own scroll listener
 *    with its own smoothing, the clip and the DOM panels would drift apart at
 *    different rates and the layers would visibly disagree. Instead the
 *    timeline tweens `scrubProgress.value` and this component reads it — one
 *    clock, one easing curve, no drift.
 *
 * 2. LAYER ORDER IS POSTER -> VIDEO -> CANVAS.
 *    The poster paints immediately (it is the LCP candidate), the video takes
 *    over once it has data, and the canvas takes over once the frame cache is
 *    built. Each crossfade is 500ms. Nothing ever flashes empty.
 *
 * Memory: 90 frames at 960x540 RGBA is ~190 MB, which is why this only runs on
 * the desktop branch. The mobile branch renders a still poster instead.
 */

/** Shared clock. Written by hero.timeline.ts, read here. */
export const scrubProgress = { value: 0 };

const MAX_FRAME_WIDTH = 960;
const FRAME_COUNT = 90;

type Props = {
  /** Desktop clip. */
  src: string;
  /** Poster frame — the LCP candidate, so it must be small and eager. */
  poster: string;
  className?: string;
};

/**
 * The layer only exists on the desktop branch.
 *
 * Its parent is `hidden lg:block`, so on a phone the layer is never painted —
 * but a mounted <video preload="auto"> still DOWNLOADS. Measured: a 1.28 MB
 * clip fetched on mobile for a layer that phone never shows. Gating the mount
 * itself (not just the visibility) is what actually saves the bytes.
 */
const DESKTOP_QUERY = "(min-width: 1024px)";

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

export function ScrubVideo({ src, poster, className }: Props) {
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
    const video = root.querySelector<HTMLVideoElement>("video");
    const canvas = root.querySelector<HTMLCanvasElement>("canvas");
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frames: HTMLCanvasElement[] = [];
    let lastIndex = -1;
    let raf = 0;
    let disposed = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      lastIndex = -1;
    };

    const drawCover = (img: HTMLCanvasElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const s = Math.max(cw / img.width, ch / img.height);
      const w = img.width * s;
      const h = img.height * s;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    };

    const once = (el: EventTarget, ev: string) =>
      new Promise<void>((resolve) => el.addEventListener(ev, () => resolve(), { once: true }));

    const seekTo = (v: HTMLVideoElement, t: number) =>
      new Promise<void>((resolve) => {
        const done = () => {
          clearTimeout(timer);
          resolve();
        };
        const timer = setTimeout(done, 1000);
        v.addEventListener("seeked", done, { once: true });
        v.currentTime = t;
      });

    const buildFrameCache = async () => {
      const v = document.createElement("video");
      v.muted = true;
      v.playsInline = true;
      v.preload = "auto";
      v.src = video.currentSrc || video.src;
      // iOS ignores preload until play() is called at least once.
      v.play().then(() => v.pause()).catch(() => {});
      if (v.readyState < 2) await once(v, "loadeddata");
      if (disposed) return;

      const count = Math.max(24, Math.min(FRAME_COUNT, Math.round(v.duration * 12)));
      const scale = Math.min(1, MAX_FRAME_WIDTH / v.videoWidth);
      const w = Math.round(v.videoWidth * scale);
      const h = Math.round(v.videoHeight * scale);
      const out: HTMLCanvasElement[] = [];

      for (let i = 0; i < count; i++) {
        if (disposed) return;
        await seekTo(v, (i / (count - 1)) * (v.duration - 0.05));
        const c = document.createElement("canvas");
        c.width = w;
        c.height = h;
        c.getContext("2d")?.drawImage(v, 0, 0, w, h);
        out.push(c);
      }
      frames = out;
    };

    const tick = () => {
      if (disposed) return;
      const p = scrubProgress.value;
      if (frames.length) {
        const i = Math.round(p * (frames.length - 1));
        if (i !== lastIndex) {
          drawCover(frames[i]);
          lastIndex = i;
        }
      } else if (video.readyState >= 1 && video.duration) {
        // Before the cache is ready, seek the <video> itself.
        const t = p * (video.duration - 0.05);
        if (!video.seeking && Math.abs(video.currentTime - t) > 0.04) {
          video.currentTime = t;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    video.play().then(() => video.pause()).catch(() => {});

    video.addEventListener(
      "loadeddata",
      async () => {
        root.classList.add("has-video");
        // Give the first paint room before the cache build starves it.
        await new Promise((r) => setTimeout(r, 300));
        try {
          await buildFrameCache();
          if (disposed) return;
          lastIndex = -1;
          root.classList.add("has-frames");
        } catch {
          // Keep the seek fallback; the scrub still works, just less smooth.
        }
      },
      { once: true },
    );

    // The video may already be decoded by the time this effect runs (it is
    // preload="auto" and the poster is preloaded alongside it). In that case
    // "loadeddata" will never fire again and the layer would sit at opacity 0
    // forever — so check the ready state first.
    if (video.readyState >= 2) {
      void (async () => {
        root.classList.add("has-video");
        await new Promise((r) => setTimeout(r, 300));
        try {
          await buildFrameCache();
          if (disposed) return;
          lastIndex = -1;
          root.classList.add("has-frames");
        } catch {
          /* keep the seek fallback */
        }
      })();
    }

    raf = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      frames = [];
    };
  }, [src, isDesktop]);

  if (!isDesktop) return null;

  return (
    <div ref={rootRef} aria-hidden className={`scrubbg ${className ?? ""}`}>
      {/*
        The poster is the FIRST PAINT of this layer, so it must be a plain
        file with no optimizer round-trip: it is already a 15 KB hand-compressed
        JPEG at the right size, and the site's next/image quality allowlist
        (75 only) would otherwise reject a custom quality or push the browser
        into requesting upscaled 3840px variants of a 1200px source.

        Deliberately NOT `priority`: the page's LCP element is the headline
        (measured 372ms desktop / 196ms mobile), not this layer, and the
        layer lives inside a `hidden lg:block` container — preloading it would
        spend mobile bandwidth on an image a phone never shows.
        `fill` keeps it a direct child of .scrubbg, which the CSS crossfade
        rules depend on.
      */}
      <Image
        className="scrubbg__poster"
        src={poster}
        alt=""
        fill
        sizes="100vw"
        unoptimized
      />
      <video className="scrubbg__video" src={src} muted playsInline preload="auto" />
      <canvas className="scrubbg__canvas" />
    </div>
  );
}
