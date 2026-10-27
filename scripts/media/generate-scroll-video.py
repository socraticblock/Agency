#!/usr/bin/env python3
"""
Generate a MiniMax H3 clip for the Genezisi scroll experience.

Where this sits in the pipeline
-------------------------------
The scroll-scrubbed hero ships FRAMES, not a video: the frame index is
arithmetic on scroll progress, so there is no seek, no decode and no drift.
The frames are the master asset and are produced by
`scripts/media/build-scrub-frames.sh` (Blender -> PNG -> WebP).

This script is the OTHER source: a generated clip, when the account has
video quota. A text-to-video model cannot render legible interface, which is
the one thing this studio sells, so a generated clip is atmosphere only —
it works as a source for the frames the same way Blender does, and it is
converted to frames by the build script rather than shipped as a video.

If you DO want a video artifact from the generated clip (social, reel), it
must survive being scrubbed frame by frame:
  - short GOPs, so every seek lands on a real keyframe boundary
  - a stable first frame, so the poster and the scrub start agree
  - one continuous shot with no cuts, because a cut mid-scrub reads as a glitch

Those are encode-time properties, so this script also re-encodes the raw
MiniMax output with `ffmpeg -g 5`. Generation alone is not enough.

Usage
-----
    MINIMAX_API_KEY=... python3 scripts/media/generate-scroll-video.py \
        --prompt-file scripts/media/prompts/hero.txt \
        --out public/media/hero-scrub.mp4 \
        --duration 10 --resolution 768P --ratio 16:9

    # then, to make a 2K upgrade of an approved 768P clip (costs $0.05/s):
    MINIMAX_API_KEY=... python3 scripts/media/generate-scroll-video.py \
        --regenerate 2K --task-id <task_id> --out public/media/hero-scrub.mp4

Cost: MiniMax-H3 = $0.08/s at 768P, $0.13/s at 2K. A 10s 768P clip = $0.80.
Quota: the account allows 3 generations per day — generate one, review the
frames, THEN spend the next.

Status on this account: the video product returned HTTP 402
(insufficient_balance_error) — the chat product is a separate plan and
keeps working. The local Blender renderer is the working path today.
"""

import argparse
import json
import os
import subprocess
import sys
import time
import urllib.error
import urllib.request

BASE = "https://api.minimax.io"
CREATE = f"{BASE}/v2/video_generation"
QUERY = f"{BASE}/v2/query/video_generation"
POLL_SECONDS = 10


def api(method: str, url: str, key: str, payload: dict | None = None) -> dict:
    data = json.dumps(payload).encode() if payload is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Authorization", f"Bearer {key}")
    req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            return json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors="replace")
        try:
            err = json.loads(body)["error"]
            msg = err.get("message", body)
            code = err.get("http_code", e.code)
        except Exception:
            msg, code = body, e.code
        if e.code == 402:
            sys.exit(
                f"MiniMax rejected the request: HTTP {code}\n"
                f"  {msg}\n"
                "\nThe video product is out of quota on this account (the chat\n"
                "product keeps working — it is a separate plan). Fix it by buying\n"
                "credits and enabling auto consumption, or use the Hailuo web\n"
                "product, or fall back to the local renderer:\n"
                "  node scripts/media/render-scrub-video.js --out public/media/hero-scrub.mp4"
            )
        sys.exit(f"MiniMax request failed: HTTP {code}\n  {msg}")


def create(key: str, model: str, prompt: str, duration: int, resolution: str, ratio: str) -> str:
    payload = {
        "model": model,
        "content": [{"type": "text", "text": prompt}],
        "duration": duration,
        "resolution": resolution,
    }
    if ratio and ratio != "adaptive":
        payload["ratio"] = ratio
    out = api("POST", CREATE, key, payload)
    task_id = out.get("task_id") or out.get("task", {}).get("id")
    if not task_id:
        sys.exit(f"no task_id in response: {json.dumps(out)[:500]}")
    return task_id


def regenerate(key: str, resolution: str, task_id: str) -> str:
    """Upgrade an existing 768P task to 2K (separate, cheaper endpoint path)."""
    payload = {"model": "MiniMax-H3", "resolution": resolution, "task_id": task_id}
    out = api("POST", f"{BASE}/v2/video_generation/regenerate", key, payload)
    return out.get("task_id") or out.get("task", {}).get("id") or task_id


def poll(key: str, task_id: str, timeout_s: int = 1800) -> str:
    deadline = time.time() + timeout_s
    while time.time() < deadline:
        out = api("GET", f"{QUERY}/{task_id}", key)
        task = out.get("task", out)
        status = task.get("status")
        print(f"  status={status}", flush=True)
        if status == "succeeded":
            url = task.get("content", {}).get("url")
            if not url:
                sys.exit(f"succeeded but no content.url: {json.dumps(task)[:500]}")
            return url
        if status in ("failed", "cancelled"):
            sys.exit(f"generation {status}: {json.dumps(task.get('error', task))[:500]}")
        time.sleep(POLL_SECONDS)
    sys.exit("timed out waiting for generation")


def download(url: str, dest: str) -> None:
    os.makedirs(os.path.dirname(dest) or ".", exist_ok=True)
    with urllib.request.urlopen(url, timeout=300) as r, open(dest, "wb") as f:
        f.write(r.read())


def encode_for_scrub(src: str, dest: str) -> None:
    """Short GOPs so scroll seeks land instantly (silky, not steppy)."""
    subprocess.run(
        [
            "ffmpeg", "-y", "-i", src, "-an",
            "-c:v", "libx264", "-crf", "20",
            "-g", "5", "-keyint_min", "5",
            "-pix_fmt", "yuv420p", "-movflags", "+faststart",
            dest,
        ],
        check=True,
    )


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--prompt-file")
    p.add_argument("--prompt")
    p.add_argument("--out", required=True)
    p.add_argument("--model", default="MiniMax-H3")
    p.add_argument("--duration", type=int, default=10)
    p.add_argument("--resolution", default="768P")
    p.add_argument("--ratio", default="16:9")
    p.add_argument("--regenerate", help="resolution to upgrade to, e.g. 2K")
    p.add_argument("--task-id", help="task_id of the 768P clip to upgrade")
    p.add_argument("--raw", help="write the raw download here (no re-encode)")
    p.add_argument("--no-encode", action="store_true")
    args = p.parse_args()

    key = os.environ.get("MINIMAX_API_KEY", "")
    if not key:
        sys.exit("MINIMAX_API_KEY not set")

    if args.regenerate:
        if not args.task_id:
            sys.exit("--regenerate needs --task-id")
        task_id = regenerate(key, args.regenerate, args.task_id)
    else:
        prompt = args.prompt
        if args.prompt_file:
            prompt = open(args.prompt_file, encoding="utf-8").read().strip()
        if not prompt:
            sys.exit("need --prompt or --prompt-file")
        task_id = create(key, args.model, prompt, args.duration, args.resolution, args.ratio)

    print(f"task_id={task_id}", flush=True)
    url = poll(key, task_id)

    raw = args.raw or (args.out + ".raw.mp4")
    print(f"downloading -> {raw}", flush=True)
    download(url, raw)

    if args.no_encode:
        os.replace(raw, args.out)
    else:
        print("encoding for scrub (short GOPs)", flush=True)
        encode_for_scrub(raw, args.out)
        os.remove(raw)

    size = os.path.getsize(args.out)
    print(f"DONE {args.out} ({size/1e6:.2f} MB) task_id={task_id}")


if __name__ == "__main__":
    main()
