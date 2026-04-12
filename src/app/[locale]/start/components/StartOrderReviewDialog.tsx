"use client";

import { useEffect, useMemo, useState } from "react";
import { Mail, MessageCircle, X } from "lucide-react";
import { buildArchitectMailtoUrl } from "../lib/order-email";
import { generateOrderId } from "../lib/order-payload";
import { validateOrderState } from "../lib/order-validation";
import type { Lane1CustomizerState } from "../lib/types";
import { StartOrderReviewIssues } from "./StartOrderReviewIssues";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Fired when the dialog is dismissed (X / backdrop) or when the user bypasses checklist to step 2. */
  onCloseAttempt?: (detail: { step: 1 | 2; bypassed: boolean }) => void;
  state: Lane1CustomizerState;
  buildWhatsAppUrl: (orderId: string) => string;
  onOrderClick: () => void;
};

export function StartOrderReviewDialog({
  open,
  onOpenChange,
  onCloseAttempt,
  state,
  buildWhatsAppUrl,
  onOrderClick,
}: Props) {
  const [orderId, setOrderId] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const { blocking, advisory } = useMemo(() => validateOrderState(state), [state]);

  useEffect(() => {
    if (open) {
      setOrderId(generateOrderId());
      setStep(1);
    }
  }, [open]);

  if (!open) return null;

  const dismiss = (fromStep: 1 | 2) => {
    onCloseAttempt?.({ step: fromStep, bypassed: false });
    onOpenChange(false);
  };

  const close = () => dismiss(step);
  const architectHref = orderId ? buildArchitectMailtoUrl(state, orderId) : "#";
  const waHref = orderId ? buildWhatsAppUrl(orderId) : "#";

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center bg-black/45 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="start-order-review-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        className="flex max-h-[min(100dvh,720px)] w-full max-w-lg flex-col rounded-t-2xl border border-slate-200/90 bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-4 py-3">
          <h2 id="start-order-review-title" className="text-base font-bold text-slate-900">
            {step === 1 ? "Review your order" : "Send to Genezisi"}
          </h2>
          <button
            type="button"
            onClick={close}
            className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
          {step === 1 ? (
            <div className="space-y-4">
              <p className="text-center text-sm text-[#64748b]">
                A quick check so your card and hosting details are clear. Fix required items to continue.
              </p>
              <StartOrderReviewIssues title="Required before order" issues={blocking} variant="blocking" />
              <StartOrderReviewIssues title="Recommended" issues={advisory} variant="advisory" />
              {blocking.length === 0 && advisory.length === 0 ? (
                <p className="rounded-lg border border-emerald-200/80 bg-emerald-50/80 p-3 text-center text-sm text-emerald-900">
                  Everything essential looks ready. Continue to send your build brief.
                </p>
              ) : null}
              {blocking.length > 0 ? (
                <button
                  type="button"
                  onClick={() => {
                    onCloseAttempt?.({ step: 1, bypassed: true });
                    setStep(2);
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Continue without checklist — talk to Genezisi
                </button>
              ) : null}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-[#64748b]">Order reference</p>
                <p className="font-mono text-sm font-semibold text-slate-800">{orderId}</p>
              </div>

              <p className="text-center text-sm text-[#64748b]">
                Email is the recommended way to send your full custom build brief to the architect. If you would rather
                start the conversation directly, WhatsApp is available below.
              </p>

              <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                <div className="text-left">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Recommended</p>
                  <h3 className="mt-1 text-base font-bold text-slate-900">Send your custom build design to the architect</h3>
                  <p className="mt-1 text-sm text-[#64748b]">
                    Opens your email app with a full build brief in copy-and-paste format so we can start quickly.
                  </p>
                </div>
                <a
                  href={architectHref}
                  onClick={onOrderClick}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1A2744] px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#243552]"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden />
                  Send My Custom Build to the Architect
                </a>
              </div>

              <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-left">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Alternative</p>
                  <h3 className="mt-1 text-base font-bold text-slate-900">I Prefer Communication Directly via WhatsApp</h3>
                  <p className="mt-1 text-sm text-[#64748b]">
                    Sends a shorter reference message with your order number, name, company, and email so we can continue
                    in chat.
                  </p>
                </div>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onOrderClick}
                  className="start-wa-cta inline-flex w-full items-center justify-center gap-2 py-3.5"
                >
                  <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
                  I Prefer Communication Directly via WhatsApp
                </a>
              </div>

              <p className="text-center text-xs text-[#64748b]">
                If your email app does not open, use the WhatsApp option below. Photos can be sent in WhatsApp after the
                email or during the conversation.
              </p>
            </div>
          )}
        </div>

        <div className="shrink-0 border-t border-slate-100 px-4 py-3">
          {step === 1 ? (
            <button
              type="button"
              disabled={blocking.length > 0}
              onClick={() => {
                onCloseAttempt?.({ step: 1, bypassed: false });
                setStep(2);
              }}
              className="w-full rounded-xl bg-[#1A2744] py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#243552] disabled:cursor-not-allowed disabled:opacity-45"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Back to review
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
