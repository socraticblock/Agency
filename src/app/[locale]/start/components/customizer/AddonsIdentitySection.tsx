"use client";

import { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Lane1CustomizerState, SecondaryLangMode } from "../../lib/types";
import { QrCode, Printer } from "lucide-react";
import { downloadQRCode, generateBrandedQR } from "../../lib/identity-kit";

interface AddonsSectionProps {
  state: Lane1CustomizerState;
  patch: (p: Partial<Lane1CustomizerState>) => void;
}

export function AddonsSection({ state, patch }: AddonsSectionProps) {
  return (
    <>
      <h4 className="start-subsection-title mb-2">Second language</h4>
      <p className="start-caption mb-3">
        Georgian as a second language on the card (bilingual toggle in the preview header).
      </p>
      {(
        [
          ["none", "None"],
          ["self", "I translate (+50 ₾)"],
          ["pro", "Professional translation (+150 ₾)"],
        ] as const
      ).map(([id, text]) => (
        <label key={id} className="mb-2 flex cursor-pointer items-start gap-3 text-sm text-[#1e293b]">
          <input
            type="radio"
            name="secondaryMode"
            className="mt-0.5 h-4 w-4 shrink-0 accent-[#1A2744]"
            checked={state.secondaryMode === id}
            onChange={() => patch({ secondaryMode: id as SecondaryLangMode })}
          />
          {text}
        </label>
      ))}
      {state.secondaryMode === "pro" ? (
        <label className="mt-3 flex cursor-pointer items-start gap-3 text-sm text-[#1e293b]">
          <input
            type="checkbox"
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-slate-300 accent-[#1A2744]"
            checked={state.proTranslationAcknowledged}
            onChange={(e) => patch({ proTranslationAcknowledged: e.target.checked })}
          />
          A professional translator will translate your content. This is not Google Translate.
        </label>
      ) : null}

      <div className="mt-6 border-t border-slate-200/80 pt-4">
        <label className="start-ios-toggle-row flex min-h-[52px] cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-200/60 bg-white/50 px-3 py-2">
          <span className="text-sm font-medium text-[#1e293b]">Google Maps (+75 ₾)</span>
          <button
            type="button"
            role="switch"
            aria-checked={state.addGoogleMap}
            onClick={() => patch({ addGoogleMap: !state.addGoogleMap })}
            className={`start-ios-toggle relative h-[31px] w-[51px] shrink-0 rounded-full transition-colors duration-200 ${
              state.addGoogleMap ? "bg-[#1A2744]" : "bg-[#CBD5E1]"
            }`}
          >
            <span
              className={`absolute top-[2px] left-[2px] h-[27px] w-[27px] rounded-full bg-white shadow transition-transform duration-200 ${
                state.addGoogleMap ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </label>
      </div>
    </>
  );
}

interface IdentityKitSectionProps {
  state: Lane1CustomizerState;
}

export function IdentityKitSection({ state }: IdentityKitSectionProps) {
  return (
    <>
      <p className="start-caption mb-4">
        Professional assets for your physical business cards and phone home-screen.
      </p>
      
      <div className="space-y-6">
        <div className="flex flex-col items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Branded QR Code</h4>
          <QRPreview state={state} />
          <button
            onClick={() => {
              const nameSlug = state.name.toLowerCase().replace(/\s+/g, "-") || "business-card";
              const url = `https://genezisi.com/c/${nameSlug}`;
              downloadQRCode(state, url);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold shadow-sm ring-1 ring-black/5 hover:bg-slate-50 active:scale-95 transition-all"
          >
            <QrCode className="h-4 w-4" />
            Download QR PNG
          </button>
          <p className="text-[10px] text-center text-slate-500 leading-tight">
            High-resolution PNG for printing on physical cards, office signage, or invoices.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Print Kit</h4>
          <button
            onClick={() => window.print()}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold shadow-sm ring-1 ring-black/5 hover:bg-slate-50 active:scale-95 transition-all text-[#1A2744]"
          >
            <Printer className="h-4 w-4" />
            Download Print PDF
          </button>
          <p className="text-[10px] text-center text-slate-500 leading-tight">
            Generates a clean, print-ready view of your name and QR code.
          </p>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
           <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 text-center text-slate-500">App-Like Experience</h4>
           <div className="flex items-center gap-3">
              <div className="h-12 w-12 shrink-0 rounded-xl bg-slate-200 overflow-hidden shadow-sm ring-1 ring-black/5">
                 {state.photoDataUrl ? (
                    <img 
                      key={state.photoDataUrl?.slice(0, 64) || "empty"}
                      src={state.photoDataUrl} 
                      alt="App Icon" 
                      className="h-full w-full object-cover" 
                    />
                 ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-100">
                       <span className="text-[10px] font-bold text-slate-400">Logo</span>
                    </div>
                 )}
              </div>
              <div className="flex-1 min-w-0">
                 <p className="text-xs font-bold text-slate-700 truncate">{state.name || "Your Name"}</p>
                 <p className="text-[10px] text-slate-500 leading-tight">
                    When users "Add to Home Screen" on iPhone/Android, they'll see your branded icon.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </>
  );
}

function QRPreview({ state }: { state: Lane1CustomizerState }) {
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    const nameSlug = state.name.toLowerCase().replace(/\s+/g, "-") || "business-card";
    const url = `https://genezisi.com/c/${nameSlug}`;
    generateBrandedQR(state, url).then(setDataUrl);
  }, [state.style.accentId, state.name]);

  return (
    <div className="flex h-32 w-32 items-center justify-center rounded-lg bg-white p-2 shadow-sm ring-1 ring-black/5">
      {dataUrl ? (
        <img src={dataUrl} alt="QR Preview" className="h-full w-full" />
      ) : (
        <div className="h-full w-full animate-pulse bg-slate-100 rounded" />
      )}
    </div>
  );
}
