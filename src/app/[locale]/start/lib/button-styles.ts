import type { ButtonStyleId } from "./types";

const ctaBase =
  "inline-flex min-h-[56px] w-full items-center justify-center px-6 py-4 text-base font-bold transition-all active:scale-[0.98]";

/** Layered or mixed accent fills (tint / glass / mesh) — applied inline instead of plain `var(--accent)`. */
export interface Lane1CtaSurface {
  className: string;
  /** When true, caller applies accent fill (`var(--accent)` or `accentBackground`). */
  filledAccent: boolean;
  accentBackground?: string;
}

export function lane1CtaPrimarySurface(id: ButtonStyleId): Lane1CtaSurface {
  switch (id) {
    case "outlined":
      return {
        className: `${ctaBase} rounded-xl border-2 bg-white/95 text-[var(--accent)] shadow-sm hover:bg-black/[0.04]`,
        filledAccent: false,
      };
    case "sharp":
      return {
        className: `${ctaBase} rounded-none text-white shadow-lg hover:opacity-90`,
        filledAccent: true,
      };
    case "luxury":
      return {
        className: `${ctaBase} rounded-2xl text-white shadow-2xl ring-1 ring-black/10 hover:opacity-95`,
        filledAccent: true,
      };
    case "minimal":
      return {
        className: `${ctaBase} rounded-lg text-white shadow-sm hover:opacity-90`,
        filledAccent: true,
      };
    case "brutalist":
      return {
        className: `${ctaBase} rounded-md border-[3px] border-slate-950 text-white shadow-[5px_5px_0_0_rgb(15,23,42)] hover:brightness-[1.03] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[3px_3px_0_0_rgb(15,23,42)]`,
        filledAccent: true,
      };
    case "stripe":
      return {
        className: `${ctaBase} min-h-[52px] rounded-none border-y-2 border-[var(--accent)]/70 py-3 text-white shadow-none hover:opacity-95`,
        filledAccent: true,
      };
    case "tint":
      return {
        className: `${ctaBase} rounded-xl border border-[color:color-mix(in_srgb,var(--accent)_55%,transparent)] text-white shadow-sm`,
        filledAccent: true,
        accentBackground: "color-mix(in srgb, var(--accent) 42%, transparent)",
      };
    case "clay":
      return {
        className: `${ctaBase} rounded-[1.75rem] text-white shadow-[0_10px_0_0_rgba(15,23,42,0.14),inset_0_-8px_16px_rgba(0,0,0,0.08)] hover:brightness-[1.02]`,
        filledAccent: true,
      };
    case "metal":
      return {
        className: `${ctaBase} rounded-xl text-white shadow-[inset_0_2px_0_rgba(255,255,255,0.38),inset_0_-4px_10px_rgba(0,0,0,0.22)] ring-1 ring-inset ring-white/30 hover:brightness-[1.03]`,
        filledAccent: true,
      };
    case "mesh":
      return {
        className: `${ctaBase} rounded-xl text-white ring-1 ring-white/20`,
        filledAccent: true,
        accentBackground:
          "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 42%), linear-gradient(var(--accent), var(--accent))",
      };
    case "glassmorph":
      return {
        className: `${ctaBase} rounded-xl border border-white/35 text-white shadow-lg backdrop-blur-md isolate`,
        filledAccent: true,
        accentBackground: "color-mix(in srgb, var(--accent) 30%, rgba(255,255,255,0.2))",
      };
    case "classic":
    default:
      return {
        className: `${ctaBase} rounded-xl text-white shadow-xl hover:opacity-90`,
        filledAccent: true,
      };
  }
}

export function lane1PrimaryAccentBackground(id: ButtonStyleId): string | undefined {
  return lane1CtaPrimarySurface(id).accentBackground;
}

const utilBase = "flex w-full items-center justify-center gap-2 font-semibold transition-transform";

export function lane1UtilityPrimaryClasses(id: ButtonStyleId): string {
  switch (id) {
    case "sharp":
      return `${utilBase} rounded-none py-3.5 text-[0.875rem] text-white shadow-lg`;
    case "luxury":
      return `${utilBase} rounded-2xl py-3.5 text-[0.875rem] text-white shadow-2xl ring-1 ring-black/10`;
    case "minimal":
      return `${utilBase} rounded-lg py-3.5 text-[0.875rem] text-white shadow-sm`;
    case "brutalist":
      return `${utilBase} rounded-md border-[3px] border-slate-950 py-3.5 text-[0.875rem] text-white shadow-[4px_4px_0_0_rgb(15,23,42)]`;
    case "stripe":
      return `${utilBase} rounded-none border-y-2 border-[var(--accent)]/70 py-2.5 text-[0.875rem] text-white`;
    case "tint":
      return `${utilBase} rounded-xl border border-[color:color-mix(in_srgb,var(--accent)_50%,transparent)] py-3.5 text-[0.875rem] text-white shadow-sm`;
    case "clay":
      return `${utilBase} rounded-[1.75rem] py-3.5 text-[0.875rem] text-white shadow-[0_8px_0_0_rgba(15,23,42,0.12)]`;
    case "metal":
      return `${utilBase} rounded-xl py-3.5 text-[0.875rem] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] ring-1 ring-inset ring-white/25`;
    case "mesh":
      return `${utilBase} rounded-xl py-3.5 text-[0.875rem] text-white ring-1 ring-white/20`;
    case "glassmorph":
      return `${utilBase} rounded-xl border border-white/35 py-3.5 text-[0.875rem] text-white shadow-lg backdrop-blur-md isolate`;
    case "outlined":
      return `${utilBase} rounded-xl border-2 border-[var(--accent)] bg-white py-3.5 text-[0.875rem] text-[var(--accent)]`;
    case "classic":
    default:
      return `${utilBase} rounded-xl py-3.5 text-[0.875rem] text-white shadow-lg`;
  }
}

/** Map / directions style (secondary/outline family). */
export function lane1DirectionsClasses(id: ButtonStyleId): string {
  switch (id) {
    case "sharp":
      return "flex w-full items-center justify-center gap-2 rounded-none border-2 py-3.5 text-[14px] font-bold transition-all hover:bg-black/[0.04]";
    case "luxury":
      return "flex w-full items-center justify-center gap-2 rounded-2xl border-2 py-3.5 text-[14px] font-bold shadow-md transition-all hover:bg-black/[0.04]";
    case "minimal":
      return "flex w-full items-center justify-center gap-2 rounded-lg border py-3.5 text-[14px] font-bold transition-all hover:bg-black/[0.04]";
    case "brutalist":
      return "flex w-full items-center justify-center gap-2 rounded-md border-[3px] border-slate-950 py-3.5 text-[14px] font-bold shadow-[4px_4px_0_0_rgb(15,23,42)] transition-all hover:brightness-[1.02]";
    case "stripe":
      return "flex w-full items-center justify-center gap-2 rounded-none border-y-2 border-[var(--accent)]/70 py-3 text-[14px] font-bold transition-all hover:opacity-95";
    case "tint":
      return "flex w-full items-center justify-center gap-2 rounded-xl border border-[color:color-mix(in_srgb,var(--accent)_50%,transparent)] py-3.5 text-[14px] font-bold shadow-sm transition-all hover:bg-black/[0.04]";
    case "clay":
      return "flex w-full items-center justify-center gap-2 rounded-[1.75rem] border-2 py-3.5 text-[14px] font-bold shadow-[0_8px_0_0_rgba(15,23,42,0.1)] transition-all hover:brightness-[1.02]";
    case "metal":
      return "flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[14px] font-bold shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] ring-1 ring-inset ring-white/20 transition-all hover:brightness-[1.02]";
    case "mesh":
      return "flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[14px] font-bold ring-1 ring-white/15 transition-all hover:bg-black/[0.04]";
    case "glassmorph":
      return "flex w-full items-center justify-center gap-2 rounded-xl border border-white/35 py-3.5 text-[14px] font-bold shadow-lg backdrop-blur-md isolate transition-all hover:bg-white/[0.06]";
    case "classic":
    case "outlined":
    default:
      return "flex w-full items-center justify-center gap-2 rounded-xl border-2 py-3.5 text-[14px] font-bold transition-all hover:bg-black/[0.04]";
  }
}

export function lane1BookingPrimaryClasses(id: ButtonStyleId): string {
  const p = lane1CtaPrimarySurface(id);
  return p.className.replace("min-h-[56px]", "min-h-[52px]").replace("px-6 py-4", "px-5 py-3").replace("text-base", "text-sm");
}
