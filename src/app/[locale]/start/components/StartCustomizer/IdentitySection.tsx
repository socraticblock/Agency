import { useEffect, useState } from "react";
import { CollapsibleSection } from "../CollapsibleSection";
import { QrCode, Printer } from "lucide-react";
import { downloadQRCode, generateBrandedQR } from "../../lib/identity-kit";
import { type Lane1CustomizerState } from "../../lib/types";
import { type SectionProps } from "./types";

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

export function IdentitySection({ state, isOpen, onToggle }: Pick<SectionProps, "state" | "isOpen" | "onToggle">) {
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
