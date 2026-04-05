import type { ButtonStyleId } from "./types";

const ctaBase =
  "inline-flex min-h-[56px] w-full items-center justify-center px-6 py-4 text-base font-bold transition-all active:scale-[0.98]";

export interface Lane1CtaSurface {
  className: string;
  /** When true, caller should set solid `background: var(--accent)` and light text. */
  filledAccent: boolean;
}

export function lane1CtaPrimarySurface(id: ButtonStyleId): Lane1CtaSurface {
  switch (id) {
    case "outlined":
      return {
        className: `${ctaBase} rounded-xl border-2 bg-white/95 text-[var(--accent)] shadow-sm hover:bg-black/[0.04]`,
        filledAccent: false,
      };
    case "ghost":
      return {
        className: `${ctaBase} rounded-xl border-2 border-current bg-transparent text-[var(--accent)] hover:bg-black/[0.04]`,
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
    case "classic":
    default:
      return {
        className: `${ctaBase} rounded-xl text-white shadow-xl hover:opacity-90`,
        filledAccent: true,
      };
  }
}

export function lane1CtaSecondarySurface(id: ButtonStyleId): Lane1CtaSurface {
  switch (id) {
    case "ghost":
      return {
        className: `${ctaBase} rounded-xl border border-transparent text-[var(--accent)] hover:bg-black/[0.04]`,
        filledAccent: false,
      };
    case "sharp":
      return {
        className: `${ctaBase} rounded-none border-2 hover:bg-black/[0.04]`,
        filledAccent: false,
      };
    case "luxury":
      return {
        className: `${ctaBase} rounded-2xl border-2 shadow-md hover:bg-black/[0.04]`,
        filledAccent: false,
      };
    case "minimal":
      return {
        className: `${ctaBase} rounded-lg border hover:bg-black/[0.04]`,
        filledAccent: false,
      };
    case "outlined":
      return {
        className: `${ctaBase} rounded-xl border bg-white/80 hover:bg-black/[0.04]`,
        filledAccent: false,
      };
    case "classic":
    default:
      return {
        className: `${ctaBase} rounded-xl border-2 hover:bg-black/[0.04]`,
        filledAccent: false,
      };
  }
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
    case "ghost":
      return `${utilBase} rounded-xl border-2 border-current bg-transparent py-3.5 text-[0.875rem] text-[var(--accent)]`;
    case "outlined":
      return `${utilBase} rounded-xl border-2 border-[var(--accent)] bg-white py-3.5 text-[0.875rem] text-[var(--accent)]`;
    case "classic":
    default:
      return `${utilBase} rounded-xl py-3.5 text-[0.875rem] text-white shadow-lg`;
  }
}

export function lane1UtilitySecondaryClasses(id: ButtonStyleId): string {
  switch (id) {
    case "sharp":
      return `${utilBase} rounded-none border-2 py-3 text-[0.875rem] shadow-sm`;
    case "luxury":
      return `${utilBase} rounded-2xl border-2 py-3 text-[0.875rem] shadow-md`;
    case "minimal":
      return `${utilBase} rounded-lg border py-3 text-[0.875rem] shadow-sm`;
    case "ghost":
      return `${utilBase} rounded-xl py-3 text-[0.875rem] text-[var(--text-primary)] hover:bg-black/[0.04]`;
    case "outlined":
      return `${utilBase} rounded-xl border-2 py-3 text-[0.875rem] bg-transparent`;
    case "classic":
    default:
      return `${utilBase} rounded-xl border-2 py-3 text-[0.875rem] shadow-sm`;
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
    case "ghost":
      return "flex w-full items-center justify-center gap-2 rounded-xl border-2 border-current py-3.5 text-[14px] font-bold text-[var(--accent)] transition-all hover:bg-black/[0.04]";
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
