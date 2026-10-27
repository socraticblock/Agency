/**
 * The scrub layers, and where their frames live.
 *
 * This file must NOT have "use client". It is imported by the server
 * component (the preview route) to choose a layer, and by the client
 * component (the hero) to render it. A "use client" module exports CLIENT
 * REFERENCES to a server component — reading a property off one yields
 * undefined, so the server would silently pass `layer={undefined}` and the
 * hero would always fall back to its default. Keep the data here, plain.
 */

export type ScrubLayerSpec = {
  /** Directory holding f001.webp, f002.webp, ... */
  base: string;
  /** Number of frames in the sequence. */
  count: number;
  /** Poster — the LCP candidate, painted before any frame arrives. */
  poster: string;
};

/**
 * Two layers, both rendered as frame sequences:
 *
 * - "3d" is the Blender Cycles scene: a real 3D space with volumetric mist,
 *   a moving camera and depth of field. It reads as a PLACE. 96 frames,
 *   1.9 MB, ~16 minutes to render on the RTX 3090.
 * - "flat" is the Remotion composition: the same story told in the site's own
 *   vector language, with no type. It reads as a SYSTEM DIAGRAM. 120 frames,
 *   656 KB, ~22 seconds to render.
 *
 * Both sit behind the DOM panels at the same opacity, so the choice is
 * aesthetic: atmosphere vs precision. `?layer=flat` on the preview route
 * switches between them.
 */
export const SCRUB_LAYERS: Record<string, ScrubLayerSpec> = {
  "3d": {
    base: "/media/scrub-frames",
    count: 96,
    poster: "/media/scrub-frames/poster.jpg",
  },
  flat: {
    base: "/media/scrub-frames-flat",
    count: 120,
    poster: "/media/scrub-frames-flat/poster.jpg",
  },
};

export const DEFAULT_SCRUB_LAYER = "3d";

export function getScrubLayer(key: string | undefined): ScrubLayerSpec {
  return SCRUB_LAYERS[key ?? ""] ?? SCRUB_LAYERS[DEFAULT_SCRUB_LAYER];
}
