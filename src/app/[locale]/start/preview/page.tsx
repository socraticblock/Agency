"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { X } from "lucide-react";
import type { Lane1CustomizerState } from "../lib/types";
import { BusinessCardTemplate } from "../components/BusinessCardTemplate";
import { normalizeLane1StateFromUnknown } from "../lib/customizer-store";
import { parseImportedOrderFile } from "../lib/order-payload";
import { resolveStyleVariables } from "../lib/presets";

export default function PreviewPage() {
  const params = useParams();
  const locale = typeof params?.locale === "string" ? params.locale : "en";
  const fileRef = useRef<HTMLInputElement>(null);

  const [state, setState] = useState<Lane1CustomizerState | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

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

  const homeHref = `/${locale}`;
  const vars = state ? resolveStyleVariables(state.style) : undefined;

  const onPickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    setLoadError(null);
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as unknown;
        const raw = parseImportedOrderFile(parsed) ?? parsed;
        const normalized = normalizeLane1StateFromUnknown(raw);
        if (normalized) {
          setState(normalized);
          try {
            sessionStorage.setItem("businessCardPreview", JSON.stringify(normalized));
          } catch {
            /* ignore quota */
          }
        } else {
          setLoadError("Could not read this file. Use a Genezisi order export or card JSON.");
        }
      } catch {
        setLoadError("Invalid JSON file.");
      }
    };
    reader.readAsText(f);
  };

  if (!state || !vars) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#faf8f5] p-6 text-[#64748b]">
        <p className="text-center text-sm">No preview data in this tab.</p>
        <p className="max-w-md text-center text-xs">
          Open Live Preview from the customizer, or load a downloaded <span className="font-mono text-slate-700">genezisi-order-*.json</span> file.
        </p>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={onPickFile}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
        >
          Load order file
        </button>
        {loadError ? <p className="text-center text-xs text-amber-800">{loadError}</p> : null}
      </div>
    );
  }

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

      <div className="mx-auto w-full max-w-6xl transition-all duration-700">
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
