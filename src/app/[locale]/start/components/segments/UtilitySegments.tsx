"use client";

import { Share2, Send } from "lucide-react";
import type { CSSProperties } from "react";
import type { Lane1CustomizerState } from "../../lib/types";
import { MagneticButton } from "../../../_components/MagneticButton";
import { lane1UtilityPrimaryClasses } from "../../lib/button-styles";

interface UtilitySegmentsProps {
  state: Lane1CustomizerState;
  ownerName: string;
  qrDataUrl: string;
  shareFeedback: string;
  handleShare: () => void;
  referHref: string;
  ctaLabelStyle: CSSProperties;
}

export function UtilitySegments({
  state,
  ownerName,
  qrDataUrl,
  shareFeedback,
  handleShare,
  referHref,
  ctaLabelStyle,
}: UtilitySegmentsProps) {
  const id = state.style.buttonStyleId;
  const shareFilled = id !== "ghost" && id !== "outlined";
  const utilitySurfaceStyle: CSSProperties = shareFilled
    ? {
        ...ctaLabelStyle,
        background: "var(--accent)",
        color: state.style.ctaTextHex?.trim()
          ? "var(--text-cta)"
          : "var(--accent-contrast, #fff)",
      }
    : { ...ctaLabelStyle };

  return (
    <>
      <div className="business-card-template-print-skip mt-10 flex flex-col gap-3">
        <MagneticButton
          onClick={handleShare}
          className={lane1UtilityPrimaryClasses(id)}
          style={utilitySurfaceStyle}
        >
          <Share2 className="h-4 w-4" />
          {shareFeedback || "Share Card"}
        </MagneticButton>

        <MagneticButton
          as="a"
          href={referHref}
          target="_blank"
          rel="noopener noreferrer"
          className={lane1UtilityPrimaryClasses(id)}
          style={utilitySurfaceStyle}
          aria-label={`Refer ${state.name.split(" ")[0] || "me"} via WhatsApp`}
        >
          <Send className="h-4 w-4" />
          Refer {state.name.split(" ")[0] || "Me"}
        </MagneticButton>
      </div>

      <div className="qr-code-print-view hidden p-8 text-center" aria-hidden>
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold">{state.name}</h3>
            {ownerName && <p className="text-sm font-semibold opacity-80">{ownerName}</p>}
            <p className="text-xs uppercase tracking-widest opacity-60">{state.title}</p>
          </div>
          <div className="my-4 flex justify-center rounded-2xl bg-white p-4 shadow-sm">
            {qrDataUrl && <img src={qrDataUrl} alt="QR Code" className="h-48 w-48" />}
          </div>
          <div className="max-w-[200px]">
            <p className="text-[10px] font-medium leading-tight opacity-50">
              Scan to view full digital business card, services, and practice areas.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
