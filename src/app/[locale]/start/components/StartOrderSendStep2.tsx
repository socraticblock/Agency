"use client";

import { Mail, MessageCircle } from "lucide-react";
import { buildOrderMailtoUrl } from "../lib/order-email";

import type { Lane1CustomizerState } from "../lib/types";

type Props = {
  orderId: string;
  state: Lane1CustomizerState;
  waHref: string;
  onOrderClick: () => void;
};

export function StartOrderSendStep2({ orderId, state, waHref, onOrderClick }: Props) {
  const orderEmailHref = buildOrderMailtoUrl(state, orderId);

  return (
    <div className="space-y-6">
      {/* Order reference */}
      <div className="text-center">
        <p className="text-sm text-[#64748b]">Order reference</p>
        <p className="font-mono text-base font-bold text-slate-800">{orderId}</p>
      </div>

      {/* Primary: WhatsApp */}
      <div className="space-y-3">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onOrderClick}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500"
        >
          <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
          Open WhatsApp
        </a>
        <p className="text-center text-xs text-[#64748b]">
          Sends your order reference and tier to Genezisi. Add any notes or photos right in the chat.
        </p>
      </div>

      {/* Secondary: Email */}
      <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
        <div className="text-left">
          <h3 className="text-base font-bold text-slate-900">Prefer email?</h3>
          <p className="mt-1 text-sm text-[#64748b]">Send us a message and we will get back to you.</p>
        </div>
        <a
          href={orderEmailHref}
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
