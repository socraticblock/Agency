# The scroll-scrub media pipeline

Everything needed to produce, verify and record the motion layer behind the
Signal story. The rule that governs all of it: **the frames are the master
asset.** An MP4 is derived from them, never the other way round.

## Why frames and not a video

The layer used to ship one MP4 and scrub it by seeking `video.currentTime` on
every scroll tick. Seeking is not frame-exact and not free, so the code built
a runtime cache of 90 decoded canvases at 960×540 to make the scrub smooth
anyway — 90 × 960 × 540 × 4 bytes ≈ **178 MB of decoded RGBA**, built by
seeking the video 90 times at load.

With frames the index is arithmetic on scroll progress: no seek, no decode,
nothing to drift. Memory is a 16-frame LRU (~33 MB), bounded by the LRU
instead of the clip length.

## The two layers

| | `3d` (default) | `flat` (`?layer=flat`) |
|---|---|---|
| Made with | Blender Cycles | Remotion (`product-demo-video` repo) |
| Reads as | a *place* | a *system diagram* |
| Frames | 96 | 120 |
| Size | 1.9 MB | 812 KB |
| Render time | 15m44s (RTX 3090) | **22 seconds** |

Both sit behind the DOM panels at the same opacity, so the choice is
aesthetic: atmosphere vs precision. `?layer=flat` on
`/[locale]/scroll-preview` switches between them.

## Produce the frames

**3D layer** — from this repo:

```bash
scripts/media/build-scrub-frames.sh          # 96 frames, 1920 wide, 48 samples
scripts/media/build-scrub-frames.sh 120 1280 32   # frames, width, samples
```

Blender renders PNG frames, ffmpeg encodes them to 960-wide WebP at
`public/media/scrub-frames/`, and the poster comes from the same render at
72% (never a separately hand-made image — it is the LCP candidate).

**Flat layer** — from the `product-demo-video` repo:

```bash
npx remotion render ScrubLayer out/layer --sequence \
  --image-sequence-pattern "f[frame].[ext]"
```

Remotion substitutes `[frame]` and `[ext]`. A printf-style `%04d` pattern is
written out as a *literal* filename, not substituted.

Then encode to WebP the same way the build script does.

**MiniMax**, when the account has video quota (it currently returns HTTP 402
— the video product is a separate plan from chat):

```bash
MINIMAX_API_KEY=... python3 scripts/media/generate-scroll-video.py \
  --prompt-file scripts/media/prompts/hero-scrub.txt \
  --out /tmp/hero-scrub.mp4 --duration 10 --resolution 768P --ratio 16:9
```

Its output is a **source clip**, not a site asset: convert it to frames, or
keep it as a standalone video (social, reel). A text-to-video model cannot
render legible interface, which is the one thing this studio sells — so a
generated clip is atmosphere only.

## Verify

Run against a served origin (a `next start` on a port, or the tunnel):

```bash
node scripts/media/test-scrub-frames.mjs          # pure logic, no browser
node scripts/media/verify-scrub-browser.mjs http://127.0.0.1:3311
node scripts/media/verify-scrub-browser.mjs http://127.0.0.1:3311 flat
node scripts/media/probe-layer-requests.mjs http://127.0.0.1:3311 flat
node scripts/media/probe-scrub-story.mjs http://127.0.0.1:3311
node scripts/media/probe-signal-path.mjs http://127.0.0.1:3311
```

What each one is for, and the trap it exists to catch:

- **`test-scrub-frames.mjs`** — the frame index is arithmetic, so it is
  testable without a browser. Index mapping, monotonicity, every frame
  reachable, the nearest-frame fallback, the LRU bound.
- **`verify-scrub-browser.mjs`** — drives headless Chromium, scrolls in
  steps, reads the canvas pixels. A changing mean luminance proves the layer
  advances; `has-frames` at every step proves the layer is not blank.
- **`probe-layer-requests.mjs`** — records the **requested URLs**. Two
  layers can read within 0.3 of the same luminance, so a brightness
  comparison cannot tell them apart — and it would "confirm" a switch that
  was not happening. Requested paths are unambiguous.
- **`probe-scrub-story.mjs`** — reads the *foreground* story at each step, so
  the DOM panels and the footage are checked together rather than
  independently.
- **`probe-signal-path.mjs`** — the signal paths' dashoffset attribute and
  computed style.

## Record

```bash
node scripts/media/record-scrub.mjs http://127.0.0.1:3311 out/3d.webm
node scripts/media/record-scrub.mjs http://127.0.0.1:3311 out/flat.webm flat
node scripts/media/capture-scrub-stills.mjs http://127.0.0.1:3311 out/stills flat
```

`record-scrub.mjs` scrolls with **`mouse.wheel()`, not `window.scrollTo()`**.
The video encoder records *painted* frames, and a programmatic scroll moves
the DOM without reliably producing one — the first recording came out frozen
on a single state while the page was demonstrably changing. Real input
events produce frames.

These are **emulated desktop viewports**: evidence of the choreography, not
of device performance. The owner's own phone pass is the device evidence.

## Traps this pipeline has already paid for

- **Frame filenames are 1-based** (`f001`…`f096`). A 0-based request
  (`f000`…`f095`) 404s every frame, and the layer silently falls back to
  drawing whatever it happens to have.
- **`has-frames` must be set on frame *draw*, not on frame *load*.** Setting
  it on load cross-fades to an empty canvas — a black flash over the poster.
- **A `"use client"` module's exports are client references to a server
  component, not values.** Reading a property off one yields `undefined`, so
  a server component passing `LAYERS[key]` down silently falls back to the
  default for *every* input. Keep plain data in a module with no
  `"use client"`.
- **Rebuilding `.next` under a running `next start` serves a stale chunk
  manifest.** Kill the server first, then rebuild, then start. Killing the
  `npm start` parent is not enough — the `next-server` child holds the port.
- **`waitUntil: "networkidle"` never settles here**, because the layer keeps
  prefetching frames as the scroll advances. Use `"load"` plus a settle.
