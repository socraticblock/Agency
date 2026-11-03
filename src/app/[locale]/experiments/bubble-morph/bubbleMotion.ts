/**
 * Geometry and timing for the Genezisi bubble-to-card study.
 * No React, global state, browser APIs, filters or runtime dependencies.
 * The SAME generated contour drives fill, reflected light and rim stroke.
 */
export type Rect = { left: number; top: number; width: number; height: number };
export type Point = { x: number; y: number };

const TAU = Math.PI * 2;
export const SHAPE_POINTS = 96;

export const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
export const mix = (a: number, b: number, p: number) => a + (b - a) * p;
export const smoothStep = (v: number) => { const t = clamp(v); return t * t * (3 - 2 * t); };

/** Analytic, underdamped unit step. No frame-rate-dependent Euler integration. */
export function springStep(seconds: number, damping = 0.76, naturalFrequency = 13): number {
  const t = Math.max(0, seconds);
  const z = clamp(damping, 0.05, 0.999);
  const wd = naturalFrequency * Math.sqrt(1 - z * z);
  const k = z / Math.sqrt(1 - z * z);
  return 1 - Math.exp(-z * naturalFrequency * t) * (Math.cos(wd * t) + k * Math.sin(wd * t));
}

/** A circle and squircle have matching angular samples. A point can travel
 * directly from one to the other without a path-topology discontinuity. */
export function contourPoints(rect: Rect, squareness: number, count = SHAPE_POINTS): Point[] {
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const rx = rect.width / 2;
  const ry = rect.height / 2;
  const exponent = 2 / squareness;
  return Array.from({ length: count }, (_, i) => {
    const theta = -Math.PI / 2 + (i * TAU) / count;
    const co = Math.cos(theta), si = Math.sin(theta);
    return {
      x: cx + rx * Math.sign(co) * Math.pow(Math.abs(co), exponent),
      y: cy + ry * Math.sign(si) * Math.pow(Math.abs(si), exponent),
    };
  });
}

/** A closed, smooth contour. SVG paint, clipping and rim all share this d. */
export function contourPath(points: Point[]): string {
  if (points.length < 3) return "";
  const mid = (a: Point, b: Point): Point => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
  const first = mid(points[points.length - 1], points[0]);
  let path = `M ${first.x.toFixed(2)} ${first.y.toFixed(2)}`;
  for (let i = 0; i < points.length; i += 1) {
    const p = points[i], q = mid(p, points[(i + 1) % points.length]);
    path += ` Q ${p.x.toFixed(2)} ${p.y.toFixed(2)} ${q.x.toFixed(2)} ${q.y.toFixed(2)}`;
  }
  return path + " Z";
}

/** The liquid silhouette gets a little edge drag: the leading side moves first,
 * and the opposite side follows by at most 30ms. All movement uses physical
 * elapsed time (rather than pre-authored size keyframes). */
export function morphContour(
  from: Rect,
  to: Rect,
  seconds: number,
  opening: boolean,
  reducedMotion = false,
): Point[] {
  const initial = contourPoints(from, opening ? 2 : 6.8);
  const final = contourPoints(to, opening ? 6.8 : 2);
  if (reducedMotion) return final;
  const motionSeconds = Math.max(0, seconds);
  return initial.map((a, i) => {
    const theta = -Math.PI / 2 + (i * TAU) / SHAPE_POINTS;
    const delay = 0.018 * (1 - Math.cos(theta + .52));
    const progress = springStep(Math.max(0, motionSeconds - delay));
    return {
      x: mix(a.x, final[i].x, progress),
      y: mix(a.y, final[i].y, progress),
    };
  });
}

export function geometryProgress(seconds: number, reducedMotion = false): number {
  return reducedMotion ? 1 : springStep(seconds);
}

/** Content never appears while the outline is still smaller than the reading
 * area; the title stays visible throughout, so there's no empty-card phase. */
export function contentOpacity(progress: number, opening: boolean, seconds: number): number {
  if (opening) {
    // Shape first, explanation second. Continuous title remains on screen.
    const enoughRoom = smoothStep((clamp(progress) - .64) / .36);
    const reveal = smoothStep((seconds - .14) / .30);
    return enoughRoom * reveal;
  }
  // Outgoing text clears before the contour becomes smaller than the copy.
  return 1 - smoothStep(seconds / .12);
}

/** Prefer the shorter closed-state geometry for reduced-motion users. */
export const MORPH_SECONDS = { open: 1.06, close: .88 } as const;