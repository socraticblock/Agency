"use client";

import { useEffect } from "react";
import type { Lane1CustomizerState } from "./types";

export function usePwaMetadata(state: Lane1CustomizerState, vars: any) {
  useEffect(() => {
    if (typeof document === "undefined") return;

    // 1. Favicon (Browser Tab)
    let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      document.head.appendChild(favicon);
    }
    favicon.href = state.photoDataUrl || "/favicon.ico";

    // 2. Apple Touch Icon (Home Screen Logo)
    let appleIcon = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement;
    if (!appleIcon) {
      appleIcon = document.createElement("link");
      appleIcon.rel = "apple-touch-icon";
      document.head.appendChild(appleIcon);
    }
    appleIcon.href = state.photoDataUrl || "/favicon.ico";

    // 3. Theme Color (Mobile UI browser bars)
    let themeColor = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
    if (!themeColor) {
      themeColor = document.createElement("meta");
      themeColor.name = "theme-color";
      document.head.appendChild(themeColor);
    }
    const accent = (vars as any)["--accent"] || "#1A2744";
    themeColor.content = accent;
  }, [state.photoDataUrl, state.style.accentId, vars]);
}
