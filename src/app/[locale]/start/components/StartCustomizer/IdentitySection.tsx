import { useEffect, useState } from "react";
import { CollapsibleSection } from "../CollapsibleSection";
import { QrCode, Printer } from "lucide-react";
import { downloadQRCode, generateBrandedQR } from "../../lib/identity-kit";
import type { Lane1CustomizerState, QrStyle } from "../../lib/types";
import { type SectionProps, fieldClass, labelClass } from "./types";

function QRPreview({ state }: { state: Lane1CustomizerState }) {
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    const nameSlug = state.name.toLowerCase().replace(/\s+/g, "-") || "business-card";
    const url = `https://genezisi.com/c/${nameSlug}`;
    generateBrandedQR(state, url).then(setDataUrl);
  }, [state.name, state.qrForegroundColor, state.qrBackgroundColor, state.showQrLogo]);

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

export function IdentitySection({
  state,
  patch,
  isOpen,
  onToggle,
}: Pick<SectionProps, "state" | "patch" | "isOpen" | "onToggle">) {
  return (
    <CollapsibleSection
      id="identity"
      title="Identity Kit"
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <p className="start-caption mb-4">
        Professional assets for your physical business cards and phone home-screen.
      </p>

      <fieldset className="mb-6 space-y-3 rounded-xl border border-slate-100 bg-white/80 p-4">
        <legend className={`${labelClass} px-1 font-semibold text-[#1e293b]`}>QR code</legend>
        <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-[#1e293b]">
          <input
            type="checkbox"
            className="h-4 w-4"
            style={{ accentColor: "var(--accent)" }}
            checked={state.showQrOnCard}
            onChange={(e) => patch({ showQrOnCard: e.target.checked })}
          />
          Show QR on digital card
        </label>
        <label className={labelClass}>
          QR shape (display)
          <select
            className={fieldClass}
            value={state.qrStyle}
            onChange={(e) => patch({ qrStyle: e.target.value as QrStyle })}
          >
            <option value="square">Square</option>
            <option value="rounded">Rounded</option>
            <option value="dots">Soft (rounded+)</option>
          </select>
        </label>
        <label className={labelClass}>
          Foreground (modules)
          <div className="flex gap-2">
            <input
              type="color"
              value={state.qrForegroundColor}
              onChange={(e) => patch({ qrForegroundColor: e.target.value })}
              className="h-10 w-10 cursor-pointer rounded border border-slate-200"
            />
            <input
              className={fieldClass}
              value={state.qrForegroundColor}
              onChange={(e) => patch({ qrForegroundColor: e.target.value })}
              placeholder="#111827"
              onFocus={(e) => e.target.select()}
            />
          </div>
        </label>
        <label className={labelClass}>
          Background
          <div className="flex gap-2">
            <input
              type="color"
              value={state.qrBackgroundColor === "transparent" ? "#ffffff" : state.qrBackgroundColor}
              onChange={(e) => patch({ qrBackgroundColor: e.target.value })}
              className="h-10 w-10 cursor-pointer rounded border border-slate-200"
            />
            <input
              className={fieldClass}
              value={state.qrBackgroundColor}
              onChange={(e) => patch({ qrBackgroundColor: e.target.value })}
              placeholder="#ffffff or transparent"
              onFocus={(e) => e.target.select()}
            />
          </div>
        </label>
        <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-[#1e293b]">
          <input
            type="checkbox"
            className="h-4 w-4"
            style={{ accentColor: "var(--accent)" }}
            checked={state.showQrLogo}
            onChange={(e) => patch({ showQrLogo: e.target.checked })}
          />
          Show QR logo
        </label>
      </fieldset>
      
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
    </CollapsibleSection>
  );
}
