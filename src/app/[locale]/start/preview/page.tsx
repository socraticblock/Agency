"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { X } from "lucide-react";
import type { Lane1CustomizerState } from "../lib/types";
import { BusinessCardTemplate } from "../components/BusinessCardTemplate";
import { normalizeLane1StateFromUnknown } from "../lib/customizer-store";
import { resolveStyleVariables } from "../lib/presets";

export default function PreviewPage() {
  const params = useParams();
  const locale = typeof params?.locale === "string" ? params.locale : "en";

  const [state, setState] = useState<Lane1CustomizerState | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("businessCardPreview");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as unknown;
      const normalized = normalizeLane1StateFromUnknown(parsed);
      if (normalized) setState(normalized);
    } catch (e) {
      console.error("Failed to parse preview state", e);
    }
  }, []);

  if (!state) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf8f5] text-[#64748b]">
        <p>No preview data found. Please return to the customizer.</p>
      </div>
    );
  }

  const homeHref = `/${locale}`;
  const vars = resolveStyleVariables(state.style);

  return (
    <div 
      className="relative min-h-screen bg-[var(--background,#030717)] antialiased transition-colors duration-700 md:p-8 xl:p-12"
      style={vars}
    >
      <button
        type="button"
        onClick={() => window.close()}
        className="fixed top-4 right-4 z-[100] flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-white shadow-lg transition hover:bg-black active:scale-95 md:h-12 md:w-12"
        aria-label="Close preview"
      >
        <X className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      <div className="mx-auto w-full max-w-6xl md:rounded-3xl md:shadow-2xl md:overflow-hidden md:bg-[var(--bg-primary)] md:p-2 xl:p-6 transition-all duration-700">
        <BusinessCardTemplate
          state={state}
          previewLang="primary"
          homeHref={homeHref}
          ownerName={state.name}
          hideBranding={true}
          layoutMode="responsive"
        />
      </div>

      <div className="mt-8 pb-12 text-center">
        <button
          type="button"
          onClick={() => window.close()}
          className="text-xs font-semibold text-[#64748b] underline decoration-[#64748b]/30 underline-offset-4 hover:decoration-[#64748b]"
        >
          Close this tab
        </button>
      </div>
    </div>
  );
}
