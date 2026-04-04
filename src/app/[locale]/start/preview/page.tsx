"use client";

import { useEffect, useState } from "react";
import { X, ExternalLink } from "lucide-react";
import type { Lane1CustomizerState } from "../lib/types";
import { BusinessCardTemplate } from "../components/BusinessCardTemplate";

export default function PreviewPage({ params }: { params: { locale: string } }) {
  const [state, setState] = useState<Lane1CustomizerState | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("businessCardPreview");
    if (raw) {
      try {
        setState(JSON.parse(raw));
      } catch (e) {
        console.error("Failed to parse preview state", e);
      }
    }
  }, []);

  if (!state) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf8f5] text-[#64748b]">
        <p>No preview data found. Please return to the customizer.</p>
      </div>
    );
  }

  const homeHref = `/${params.locale}`;

  return (
    <div className="relative min-h-screen bg-[var(--background,#030717)] antialiased md:p-8 xl:p-12">
      <button
        type="button"
        onClick={() => window.close()}
        className="fixed top-4 right-4 z-[100] flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-white shadow-lg transition hover:bg-black active:scale-95 md:h-12 md:w-12"
        aria-label="Close preview"
      >
        <X className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      {/* Actual Site Content */}
      <div className="mx-auto w-full max-w-6xl md:rounded-3xl md:shadow-2xl md:overflow-hidden md:bg-[var(--bg-primary,#faf8f5)] md:p-2 xl:p-6 transition-all">
        <BusinessCardTemplate
          state={state}
          previewLang="primary"
          homeHref={homeHref}
          ownerName={state.name}
          hideBranding={true}
          layoutMode="responsive"
        />
      </div>

      {/* Fallback Close for environments where window.close() fails */}
      <div className="mt-8 pb-12 text-center">
        <button
          onClick={() => window.close()}
          className="text-xs font-semibold text-[#64748b] underline decoration-[#64748b]/30 underline-offset-4 hover:decoration-[#64748b]"
        >
          Close this tab
        </button>
      </div>
    </div>
  );
}
