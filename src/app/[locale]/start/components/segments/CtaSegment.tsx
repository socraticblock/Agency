"use client";

import { Phone, MessageCircle } from "lucide-react";
import { MagneticButton } from "../../../_components/MagneticButton";
import { InlineEditable } from "../InlineEditable";
import type { Lane1CustomizerState } from "../../lib/types";
import type { CSSProperties } from "react";
import { lane1CtaPrimarySurface } from "../../lib/button-styles";

interface CtaSegmentProps {
  state: Lane1CustomizerState;
  editable: boolean;
  patch: (p: Partial<Lane1CustomizerState>) => void;
  headingStyle: CSSProperties;
}

export function CtaSegment({ state, editable, patch, headingStyle }: CtaSegmentProps) {
  function telHref(phone: string): string {
    const digits = phone.replace(/\D/g, "");
    return digits ? `tel:+${digits}` : "tel:";
  }

  function waHref(phone: string): string {
    const digits = phone.replace(/\D/g, "");
    return digits ? `https://wa.me/${digits}` : "#";
  }

  const btnId = state.style.buttonStyleId;
  const primary = lane1CtaPrimarySurface(btnId);

  return (
    <section className="business-card-template-print-skip relative z-20 flex flex-col gap-3 bg-transparent px-4 py-6">
      <MagneticButton
        as="a"
        href={editable ? undefined : telHref(state.phone)}
        className={primary.className}
        style={
          primary.filledAccent
            ? { background: "var(--accent)", color: "var(--accent-contrast, #fff)", ...headingStyle }
            : { ...headingStyle }
        }
      >
        <Phone className="mr-2 h-5 w-5" />
        <InlineEditable
          value={state.ctaTextCall}
          onChange={(v) => patch({ ctaTextCall: v })}
          placeholder="Call Me"
          editable={editable}
          className="inline-block"
        />
      </MagneticButton>

      <MagneticButton
        as="a"
        href={editable ? undefined : waHref(state.phone)}
        target="_blank"
        rel="noopener noreferrer"
        className={primary.className}
        style={
          primary.filledAccent
            ? { background: "var(--accent)", color: "var(--accent-contrast, #fff)", ...headingStyle }
            : { ...headingStyle }
        }
      >
        <MessageCircle className="mr-2 h-5 w-5" />
        <InlineEditable
          value={state.ctaTextWhatsApp}
          onChange={(v) => patch({ ctaTextWhatsApp: v })}
          placeholder="WhatsApp Me"
          editable={editable}
          className="inline-block"
        />
      </MagneticButton>
    </section>
  );
}
