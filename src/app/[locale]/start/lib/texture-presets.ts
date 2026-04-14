import type { BackgroundEffectId, TextureId } from "./types";

/** Dark ink on light surfaces; light ink on dark card surface (readable at 100% strength). */
function ink(darkSurface: boolean, a: number): string {
  return darkSurface ? `rgba(248,250,252,${a})` : `rgba(15,23,42,${a})`;
}

function isValidHex6(s: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(s.trim());
}

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.trim().replace("#", "");
  if (h.length !== 6) return ink(false, alpha);
  const n = parseInt(h, 16);
  if (Number.isNaN(n)) return ink(false, alpha);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

function lineInk(darkSurface: boolean, a: number, tintHex: string | undefined): string {
  const t = (tintHex ?? "").trim();
  if (isValidHex6(t)) return hexToRgba(t, a);
  return ink(darkSurface, a);
}

const noiseSvg = (freq: string, op: number) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)" opacity="${op}"/></svg>`,
  )}")`;

/** Repeating CSS backgrounds for the texture layer (no external assets). */
export function textureBackgroundImage(
  id: TextureId,
  darkSurface = false,
  tintHex?: string | null,
): string {
  const t = (tintHex ?? "").trim();
  const useTint = isValidHex6(t);

  switch (id) {
    case "fine-grain": {
      const base = noiseSvg("0.9", darkSurface ? 0.58 : 0.55);
      if (!useTint) return base;
      return `linear-gradient(${hexToRgba(t, 0.16)}, ${hexToRgba(t, 0.16)}), ${base}`;
    }
    case "coarse-grain": {
      const base = noiseSvg("0.35", darkSurface ? 0.65 : 0.62);
      if (!useTint) return base;
      return `linear-gradient(${hexToRgba(t, 0.18)}, ${hexToRgba(t, 0.18)}), ${base}`;
    }
    case "dot-grid":
      return `radial-gradient(circle, ${lineInk(darkSurface, 0.16, t)} 1px, transparent 1px)`;
    case "diagonal-lines":
      return `repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 3px,
        ${lineInk(darkSurface, 0.14, t)} 3px,
        ${lineInk(darkSurface, 0.14, t)} 4px
      )`;
    case "cross-hatch":
      return `repeating-linear-gradient(0deg, transparent, transparent 5px, ${lineInk(darkSurface, 0.12, t)} 5px, ${lineInk(darkSurface, 0.12, t)} 6px), repeating-linear-gradient(90deg, transparent, transparent 5px, ${lineInk(darkSurface, 0.12, t)} 5px, ${lineInk(darkSurface, 0.12, t)} 6px)`;
    case "waves": {
      const w = useTint ? hexToRgba(t, 0.14) : darkSurface ? "rgba(226,232,240,0.12)" : "rgba(30,58,95,0.11)";
      return `repeating-radial-gradient(circle at 50% 120%, transparent 0 18px, ${w} 18px 19px)`;
    }
    case "geometric":
      return `linear-gradient(135deg, ${lineInk(darkSurface, 0.09, t)} 25%, transparent 25%), linear-gradient(225deg, ${lineInk(darkSurface, 0.09, t)} 25%, transparent 25%)`;
    case "topographic":
      return `repeating-radial-gradient(circle at 40% 40%, transparent 0, transparent 12px, ${lineInk(darkSurface, 0.1, t)} 12px 13px)`;
    case "none":
    default:
      return "none";
  }
}

export function textureBackgroundSize(id: TextureId): string {
  if (id === "fine-grain" || id === "coarse-grain") return "220px 220px";
  if (id === "dot-grid") return "10px 10px";
  if (id === "geometric") return "14px 14px";
  return "auto";
}

export const TEXTURE_OPTION_META: { id: TextureId; labelEn: string }[] = [
  { id: "none", labelEn: "None" },
  { id: "fine-grain", labelEn: "Fine grain" },
  { id: "coarse-grain", labelEn: "Coarse grain" },
  { id: "dot-grid", labelEn: "Dot grid" },
  { id: "diagonal-lines", labelEn: "Diagonal" },
  { id: "cross-hatch", labelEn: "Cross hatch" },
  { id: "waves", labelEn: "Waves" },
  { id: "geometric", labelEn: "Geometric" },
  { id: "topographic", labelEn: "Topo" },
];

export const BG_EFFECT_OPTION_META: { id: BackgroundEffectId; labelEn: string }[] = [
  { id: "none", labelEn: "None" },
  { id: "ambient-glow", labelEn: "Ambient glow" },
  { id: "floating-orbs", labelEn: "Floating orbs" },
  { id: "gradient-shift", labelEn: "Gradient shift" },
  { id: "vignette", labelEn: "Vignette" },
  { id: "light-leak", labelEn: "Light leak" },
];
