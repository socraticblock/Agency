"use client";

import { Phone, MessageCircle } from "lucide-react";
import { MagneticButton } from "../../../_components/MagneticButton";
import type { Lane1CustomizerState } from "../../lib/types";
import type { CSSProperties } from "react";

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

  return (
    <section className="px-4 py-6 flex flex-col gap-3">
      <MagneticButton
        as="a"
        href={telHref(state.phone)}
        className="inline-flex min-h-[56px] w-full items-center justify-center rounded-xl px-6 py-4 text-base font-bold text-white shadow-xl transition-all hover:opacity-90 active:scale-[0.98]"
        style={{ background: "var(--accent)", ...headingStyle }}
      >
        <Phone className="mr-2 h-5 w-5" />
        {state.ctaTextCall || "Call Me"}
      </MagneticButton>

      <MagneticButton
        as="a"
        href={waHref(state.phone)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[56px] w-full items-center justify-center rounded-xl border-2 px-6 py-4 text-base font-bold transition-all hover:bg-black/5 active:scale-[0.98]"
        style={{ borderColor: "var(--accent)", color: "var(--accent)", ...headingStyle }}
      >
        <MessageCircle className="mr-2 h-5 w-5" />
        {state.ctaTextWhatsApp || "WhatsApp Me"}
      </MagneticButton>
    </section>
  );
}
