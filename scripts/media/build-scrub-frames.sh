#!/usr/bin/env bash
#
# Build the scroll-scrub frame sequence.
#
# Why frames and not a video
# --------------------------
# The scrub layer used to ship one MP4 and seek `video.currentTime` on every
# scroll tick, then build a runtime cache of 90 decoded canvases to make the
# scrub smooth — ~178 MB of decoded RGBA, built by seeking 90 times at load.
#
# Shipping the frames as images removes the seek entirely: the frame index is
# arithmetic on scroll progress, so there is nothing to decode and nothing to
# drift. Memory is bounded by an LRU in the client, not by the clip length.
#
# The frames are the MASTER asset. This script renders them straight from
# Blender to PNG and encodes them to WebP. An MP4 can be derived from the
# frames afterwards (for social or a poster), never the other way round:
# encoding a video and then pulling frames back out of it costs a generation
# of lossy compression for nothing.
#
# Usage:
#   scripts/media/build-scrub-frames.sh [frame_count] [width] [samples]
#
# Defaults: 96 frames, 1920 wide, 48 samples.
#
# Requirements: blender (with a CUDA device), ffmpeg.
# Measured on an RTX 3090: 96 frames at 1920x1080 / 48 samples = 15m44s.

set -euo pipefail

FRAMES="${1:-96}"
WIDTH="${2:-1920}"
SAMPLES="${3:-48}"
HEIGHT=$((WIDTH * 9 / 16))

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
OUT_DIR="$REPO_ROOT/public/media/scrub-frames"
WORK_DIR="$(mktemp -d)"
trap 'rm -rf "$WORK_DIR"' EXIT

echo "==> Rendering $FRAMES frames at ${WIDTH}x${HEIGHT} ($SAMPLES samples)"
blender -b --factory-startup \
  --python "$REPO_ROOT/scripts/media/render-scrub-frames-blender.py" -- \
  --frames "$FRAMES" --out "$WORK_DIR/png" --samples "$SAMPLES" \
  --width "$WIDTH" --height "$HEIGHT"

echo "==> Encoding to WebP at 960 wide"
rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"
i=0
for f in $(ls "$WORK_DIR/png"/*.png | sort); do
  i=$((i + 1))
  printf -v n "%03d" "$i"
  ffmpeg -v error -i "$f" -vf "scale=960:-2" \
    -c:v libwebp -quality 62 -compression_level 6 "$OUT_DIR/f$n.webp"
done

# The poster is the layer's first paint and the LCP candidate, so it comes
# from the same render at the same grade — not a separate hand-made image.
echo "==> Poster"
poster_index=$((FRAMES * 72 / 100))
printf -v p "%04d" "$poster_index"
ffmpeg -v error -i "$WORK_DIR/png/f$p.png" -vf "scale=1200:-2" -q:v 6 \
  -y "$OUT_DIR/poster.jpg"

echo "==> Done: $(ls "$OUT_DIR"/*.webp | wc -l) frames, $(du -sh "$OUT_DIR" | cut -f1)"
