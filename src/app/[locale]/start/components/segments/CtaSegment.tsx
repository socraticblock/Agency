"use client";

import { Phone, MessageCircle } from "lucide-react";
import { MagneticButton } from "../../../_components/MagneticButton";
import { InlineEditable } from "../InlineEditable";
import type { CtaChannelId, Lane1CustomizerState } from "../../lib/types";
import { orderedActiveCtaChannels } from "../../lib/types";
import type { CSSProperties } from "react";
import { lane1CtaPrimarySurface } from "../../lib/button-styles";

interface CtaSegmentProps {
  state: Lane1CustomizerState;
  editable: boolean;
  patch: (p: Partial<Lane1CustomizerState>) => void;
  ctaLabelStyle: CSSProperties;
  useSecondary: boolean;
}

export function CtaSegment({ state, editable, patch, ctaLabelStyle, useSecondary }: CtaSegmentProps) {
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
  const filledStyle =
    primary.filledAccent
      ? {
          ...ctaLabelStyle,
          background: primary.accentBackground ?? "var(--accent)",
          color: state.style.ctaTextHex?.trim()
            ? "var(--text-cta)"
            : "var(--accent-contrast, #fff)",
        }
      : { ...ctaLabelStyle };

  const sequence = orderedActiveCtaChannels(state);

  function renderChannel(id: CtaChannelId) {
    if (id === "call") {
      return (
        <MagneticButton
          key="call"
          as="a"
          href={editable ? undefined : telHref(state.phone)}
          className={primary.className}
          style={filledStyle}
        >
          <Phone className="mr-2 h-5 w-5" />
          <InlineEditable
            value={state.ctaTextCall}
            onChange={(v) => patch({ ctaTextCall: v })}
            placeholder={useSecondary ? "დამირეკე" : "Call Me"}
            editable={editable}
            className="inline-block"
          />
        </MagneticButton>
      );
    }
    return (
      <MagneticButton
        key="whatsapp"
        as="a"
        href={editable ? undefined : waHref(state.phone)}
        target="_blank"
        rel="noopener noreferrer"
        className={primary.className}
        style={filledStyle}
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
    );
  }

  return (
    <section className="business-card-template-print-skip relative z-20 flex flex-col gap-3 bg-transparent px-4 py-6">
      {sequence.map((id) => renderChannel(id))}
    </section>
  );
}
