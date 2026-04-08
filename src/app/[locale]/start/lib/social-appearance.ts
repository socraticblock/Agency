import type { Lane1CustomizerState, SocialIconSize, SocialIconStyle } from "./types";

function isHexColor(value: string): boolean {
  return /^#[0-9a-fA-F]{6}$/.test(value.trim());
}

export function socialIconColorVar(state: Lane1CustomizerState): string {
  switch (state.socialIconColorMode) {
    case "text":
      return "var(--text-primary)";
    case "custom":
      return isHexColor(state.socialIconCustomHex) ? state.socialIconCustomHex.trim() : "var(--accent)";
    case "accent":
    default:
      return "var(--accent)";
  }
}

export function socialIconPixelSize(size: SocialIconSize): number {
  switch (size) {
    case "small":
      return 20;
    case "large":
      return 36;
    case "medium":
    default:
      return 28;
  }
}

/** Wrapper classes around each icon (touch targets stay comfortable). */
export function socialIconFrameClass(style: SocialIconStyle): string {
  switch (style) {
    case "outlined":
      return "rounded-lg border-2 border-current p-1.5";
    case "rounded":
      return "rounded-full p-2";
    case "minimal":
      return "p-1";
    case "filled":
    default:
      return "p-1";
  }
}

export function socialIconFillStyle(style: SocialIconStyle): { fill?: string; strokeWidth?: number } {
  if (style === "filled") return { strokeWidth: 2.4 };
  return { strokeWidth: 1.75 };
}
