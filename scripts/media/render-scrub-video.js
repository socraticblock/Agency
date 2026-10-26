#!/usr/bin/env node
/**
 * Render scripts/media/scrub-source.html to a scroll-scrub-ready MP4.
 *
 * Why render locally instead of generating with MiniMax H3
 * -------------------------------------------------------
 * The account hit its Token Plan limit (402 insufficient_balance_error) when
 * this was first attempted, and a text-to-video model cannot render legible
 * interface — which is the one thing this studio sells. Rendering the clip
 * from a deterministic canvas source gives exact control over the frames,
 * costs no quota, and reproduces byte-for-byte.
 *
 * If MiniMax credits come back, `generate-scroll-video.py` produces a clip for
 * exactly the same slot; drop it in as public/media/hero-scrub.mp4.
 *
 * Encoding notes (techniques/video-and-media.md #7):
 *  - short GOPs (-g 5) so a scroll seek lands on a real frame boundary
 *  - +faststart so the moov atom is at the front and the scrub can start early
 *  - no audio (a scrubbed clip has no sound)
 *
 * Usage:
 *   node scripts/media/render-scrub-video.js [--fps 24] [--seconds 8]
 *                                             [--out public/media/hero-scrub.mp4]
 */
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');

const PW = require('/home/socraticblock/.hermes/hermes-agent/node_modules/playwright');
const CHROME = '/home/socraticblock/.hermes/tools/chromium-1208/chrome-linux64/chrome';

function arg(name, dflt) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : dflt;
}

const FPS = parseInt(arg('fps', '24'), 10);
const SECONDS = parseFloat(arg('seconds', '8'));
const OUT = arg('out', 'public/media/hero-scrub.mp4');
const SRC = path.resolve(__dirname, 'scrub-source.html');
const FRAMES = Math.round(FPS * SECONDS);
const TMP = path.resolve(__dirname, '.frames');

(async () => {
  fs.rmSync(TMP, { recursive: true, force: true });
  fs.mkdirSync(TMP, { recursive: true });

  const browser = await PW.chromium.launch({
    executablePath: CHROME,
    args: ['--force-device-scale-factor=1', '--hide-scrollbars', '--disable-gpu'],
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 810 }, deviceScaleFactor: 1 });
  await page.goto('file://' + SRC, { waitUntil: 'load' });
  await page.waitForFunction(() => window.__ready === true, { timeout: 20000 });

  for (let i = 0; i < FRAMES; i++) {
    const p = i / (FRAMES - 1);
    await page.evaluate((v) => window.setProgress(v), p);
    await page.screenshot({
      path: path.join(TMP, `f${String(i).padStart(4, '0')}.png`),
      clip: { x: 0, y: 0, width: 1440, height: 810 },
    });
    if (i % 24 === 0) process.stdout.write(`  frame ${i}/${FRAMES}\n`);
  }
  await browser.close();

  // Poster: a frame from ~70% where the route is lit but the frame is closing.
  const posterFrame = Math.round(FRAMES * 0.72);
  fs.mkdirSync(path.dirname(path.resolve(OUT)), { recursive: true });
  fs.copyFileSync(
    path.join(TMP, `f${String(posterFrame).padStart(4, '0')}.png`),
    OUT.replace(/\.mp4$/, '-poster.jpg'),
  );

  execFileSync('ffmpeg', [
    '-y', '-framerate', String(FPS), '-i', path.join(TMP, 'f%04d.png'),
    '-an', '-c:v', 'libx264', '-crf', '20',
    '-g', '5', '-keyint_min', '5',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    '-r', String(FPS),
    OUT,
  ], { stdio: ['ignore', 'ignore', 'inherit'] });

  // A 640px-wide mobile variant: the frame cache halves its width on phones,
  // so a full-size file is wasted bandwidth there.
  execFileSync('ffmpeg', [
    '-y', '-i', OUT, '-vf', 'scale=640:-2',
    '-an', '-c:v', 'libx264', '-crf', '22', '-g', '5', '-keyint_min', '5',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    OUT.replace(/\.mp4$/, '-mobile.mp4'),
  ], { stdio: ['ignore', 'ignore', 'inherit'] });

  fs.rmSync(TMP, { recursive: true, force: true });

  const sz = (f) => (fs.existsSync(f) ? (fs.statSync(f).size / 1e6).toFixed(2) + ' MB' : 'MISSING');
  console.log(`DONE ${OUT} (${sz(OUT)})`);
  console.log(`     poster ${OUT.replace(/\.mp4$/, '-poster.jpg')} (${sz(OUT.replace(/\.mp4$/, '-poster.jpg'))})`);
  console.log(`     mobile ${OUT.replace(/\.mp4$/, '-mobile.mp4')} (${sz(OUT.replace(/\.mp4$/, '-mobile.mp4'))})`);
})().catch((e) => { console.error(e); process.exit(1); });
