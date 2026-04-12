"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, Mail, MessageCircle } from "lucide-react";
import { buildArchitectMailtoUrl, buildWhatsAppOrderPasteText } from "../lib/order-email";

import type { Lane1CustomizerState } from "../lib/types";

type Props = {
  orderId: string;
  state: Lane1CustomizerState;
  waHref: string;
  onOrderClick: () => void;
};

export function StartOrderSendStep2({ orderId, state, waHref, onOrderClick }: Props) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const pasteText = useMemo(() => buildWhatsAppOrderPasteText(state, orderId), [state, orderId]);
  const architectHref = buildArchitectMailtoUrl(state, orderId);

  useEffect(() => {
    setCopyState("idle");
  }, [orderId]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(pasteText);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 2800);
    } catch {
      setCopyState("failed");
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-sm text-[#64748b]">Order reference</p>
        <p className="font-mono text-sm font-semibold text-slate-800">{orderId}</p>
      </div>

      <p className="text-center text-sm text-[#64748b]">
        <span className="font-medium text-slate-800">1.</span> Copy your full order message.{" "}
        <span className="font-medium text-slate-800">2.</span> Open WhatsApp.{" "}
        <span className="font-medium text-slate-800">3.</span> Paste into the chat and send. You can add photos right
        after.
      </p>

      <div className="space-y-3 rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-4">
        <div className="text-left">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">Recommended</p>
          <h3 className="mt-1 text-base font-bold text-slate-900">WhatsApp — copy &amp; paste</h3>
          <p className="mt-1 text-sm text-[#64748b]">
            One message with everything we need to build your card — same details as the architect email.
          </p>
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1A2744] px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#243552]"
        >
          <Copy className="h-4 w-4 shrink-0" aria-hidden />
          Copy full order message
        </button>
        {copyState === "copied" ? (
          <p className="text-center text-xs font-semibold text-emerald-800">Copied — open WhatsApp below and paste.</p>
        ) : null}
        {copyState === "failed" ? (
          <p className="text-center text-xs text-amber-800">
            Could not copy automatically. Use the email option below, or select and copy from your browser if your device
            allows it.
          </p>
        ) : null}
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onOrderClick}
          className="start-wa-cta inline-flex w-full items-center justify-center gap-2 py-3.5"
        >
          <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
          Open WhatsApp
        </a>
        <p className="text-center text-xs text-[#64748b]">
          Sends a short first message with your order ID. Send your pasted order as the <span className="font-medium text-slate-700">next</span> message.
        </p>
      </div>

      <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
        <div className="text-left">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Optional</p>
          <h3 className="mt-1 text-base font-bold text-slate-900">Email the architect instead</h3>
          <p className="mt-1 text-sm text-[#64748b]">Opens your mail app with the same build brief prefilled.</p>
        </div>
        <a
          href={architectHref}
          onClick={onOrderClick}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
        >
          <Mail className="h-4 w-4 shrink-0" aria-hidden />
          Send via email
        </a>
      </div>
    </div>
  );
}
