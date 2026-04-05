"use client";

import { Phone, MessageCircle } from "lucide-react";
import { MagneticButton } from "../../../_components/MagneticButton";
import type { Lane1CustomizerState } from "../../lib/types";
import type { CSSProperties } from "react";
import { lane1CtaPrimarySurface, lane1CtaSecondarySurface } from "../../lib/button-styles";

interface CtaSegmentProps {
  state: Lane1CustomizerState;
  headingStyle: CSSProperties;
}

export function CtaSegment({ state, headingStyle }: CtaSegmentProps) {
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
  const secondary = lane1CtaSecondarySurface(btnId);

  return (
    <section className="business-card-template-print-skip relative z-10 flex flex-col gap-3 bg-transparent px-4 py-6">
      <MagneticButton
        as="a"
        href={telHref(state.phone)}
        className={primary.className}
        style={
          primary.filledAccent
            ? { background: "var(--accent)", ...headingStyle }
            : { ...headingStyle }
        }
      >
        <Phone className="mr-2 h-5 w-5" />
        {state.ctaTextCall || "Call Me"}
      </MagneticButton>

      <MagneticButton
        as="a"
        href={waHref(state.phone)}
        target="_blank"
        rel="noopener noreferrer"
        className={secondary.className}
        style={{
          borderColor: "var(--accent)",
          color: "var(--accent)",
          ...headingStyle,
        }}
      >
        <MessageCircle className="mr-2 h-5 w-5" />
        {state.ctaTextWhatsApp || "WhatsApp Me"}
      </MagneticButton>
    </section>
  );
}
