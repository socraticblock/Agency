"use client";

import { Share2, Send } from "lucide-react";
import type { Lane1CustomizerState } from "../../lib/types";
import { MagneticButton } from "../../../_components/MagneticButton";

interface UtilitySegmentsProps {
  state: Lane1CustomizerState;
  ownerName: string;
  qrDataUrl: string;
  shareFeedback: string;
  handleShare: () => void;
  referHref: string;
}

export function UtilitySegments({
  state,
  ownerName,
  qrDataUrl,
  shareFeedback,
  handleShare,
  referHref,
}: UtilitySegmentsProps) {
  return (
    <>
      {/* Growth & Distribution Section */}
      <div className="mt-10 flex flex-col gap-3">
        <MagneticButton
          onClick={handleShare}
          className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[0.875rem] font-semibold text-white shadow-lg transition-transform"
          style={{ background: "var(--accent)" }}
        >
          <Share2 className="h-4 w-4" />
          {shareFeedback || "Share Card"}
        </MagneticButton>

        <MagneticButton
          as="a"
          href={referHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 py-3 text-[0.875rem] font-semibold shadow-sm transition-transform"
          style={{
            borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)",
            color: "var(--text-primary)",
            background: "transparent"
          }}
          aria-label={`Refer ${state.name.split(" ")[0] || "me"} via WhatsApp`}
        >
          <Send className="h-4 w-4 opacity-70" />
          Refer {state.name.split(" ")[0] || "Me"}
        </MagneticButton>
      </div>

      {/* Phase 3.2: Hidden QR View for Print Kit (Back of Card) */}
      <div className="qr-code-print-view hidden p-8 text-center" aria-hidden>
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold">{state.name}</h3>
            {ownerName && <p className="text-sm font-semibold opacity-80">{ownerName}</p>}
            <p className="text-xs opacity-60 uppercase tracking-widest">{state.title}</p>
          </div>
          <div className="flex justify-center my-4 p-4 bg-white rounded-2xl shadow-sm">
            {qrDataUrl && <img src={qrDataUrl} alt="QR Code" className="h-48 w-48" />}
          </div>
          <div className="max-w-[200px]">
            <p className="text-[10px] leading-tight opacity-50 font-medium">Scan to view full digital business card, services, and practice areas.</p>
          </div>
        </div>
      </div>
    </>
  );
}
