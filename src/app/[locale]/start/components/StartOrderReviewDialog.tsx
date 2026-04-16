"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { generateOrderId } from "../lib/order-payload";
import { validateOrderState } from "../lib/order-validation";
import type { Lane1CustomizerState } from "../lib/types";
import { StartOrderReviewIssues } from "./StartOrderReviewIssues";
import { StartOrderSendStep2 } from "./StartOrderSendStep2";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCloseAttempt?: (detail: { step: 1 | 2; bypassed: boolean }) => void;
  state: Lane1CustomizerState;
  buildWhatsAppUrl: (orderId: string) => string;
  onOrderClick: () => void;
};

async function submitOrderToApi(
  state: Lane1CustomizerState,
  orderId: string
): Promise<{ ok: boolean; error?: string; isConfigError?: boolean }> {
  try {
    // Only strip bgBaseImageDataUrl — hero and gallery must be preserved in state_json (DB has no separate photo field).
    // bgBaseImageDataUrl is the payload bloat culprit (full base64, up to 2-5MB per image).
    const leanState = {
      ...state,
      style: { ...state.style, bgBaseImageDataUrl: null },
    };
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: orderId,
        state: leanState,
        tier: state.selectedTier,
        digitalCardUrlHint: state.digitalCardUrlHint,
      }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      const error = data.error ?? `Request failed (${res.status})`;
      // If we get a 500 with "configuration" or "database" in the message/detail, mark it as a config error.
      const isConfigError =
        res.status === 500 &&
        (String(data.error).toLowerCase().includes("config") ||
          String(data.detail).toLowerCase().includes("env var") ||
          String(data.error).toLowerCase().includes("database"));
      return { ok: false, error, isConfigError };
    }
    return { ok: true };
  } catch {
    return {
      ok: false,
      error:
        "Network error. Your order ID is still valid — you can still send via WhatsApp.",
    };
  }
}

function AnimatedCheckmark() {
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50"
      >
        <motion.svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="20"
            cy="20"
            r="18"
            stroke="#10B981"
            strokeWidth="3"
            fill="none"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.2 }}
          />
          <motion.path
            d="M12 20L17 25L28 14"
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.25, duration: 0.35, ease: "easeOut" }}
          />
        </motion.svg>
      </motion.div>
      <p className="text-center text-sm font-semibold text-emerald-800">
        Everything looks great
      </p>
    </div>
  );
}

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
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { blocking, advisory } = useMemo(
    () => validateOrderState(state),
    [state]
  );

  const allClear = blocking.length === 0 && advisory.length === 0;

  useEffect(() => {
    if (open) {
      setOrderId(generateOrderId());
      setStep(1);
      setSubmitting(false);
      setSubmitError(null);
    }
  }, [open]);

  if (!open) return null;

  const goToStep2 = async (bypassed: boolean) => {
    setSubmitting(true);
    setSubmitError(null);
    const result = await submitOrderToApi(state, orderId);
    setSubmitting(false);
    if (!result.ok) {
      setSubmitError(result.error ?? "Something went wrong.");
      return;
    }
    onCloseAttempt?.({ step: 1, bypassed });
    setStep(2);
  };

  const dismiss = (fromStep: 1 | 2) => {
    onCloseAttempt?.({ step: fromStep, bypassed: false });
    onOpenChange(false);
  };

  const close = () => dismiss(step);
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
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-4 py-3">
          <h2
            id="start-order-review-title"
            className="text-base font-bold text-slate-900"
          >
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

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
          {step === 1 ? (
            <div className="space-y-4">
              {/* Happy path — all clear */}
              {allClear ? (
                <AnimatedCheckmark />
              ) : (
                <>
                  {/* Issues list */}
                  <StartOrderReviewIssues
                    title="Required before order"
                    issues={blocking}
                    variant="blocking"
                  />
                  <StartOrderReviewIssues
                    title="Recommended"
                    issues={advisory}
                    variant="advisory"
                  />

                  {/* Submit error */}
                  {submitError ? (
                    <div className="space-y-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
                      <p className="text-center text-sm font-medium text-amber-900">
                        {submitError}
                      </p>
                      <button
                        type="button"
                        disabled={submitting}
                        onClick={() => goToStep2(true)}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-800 disabled:opacity-50"
                      >
                        {submitting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : null}
                        Continue anyway
                      </button>
                    </div>
                  ) : null}

                  {/* Two equal-weight choices */}
                  <div className="flex flex-col gap-2.5 pt-2">
                    {/* Fix first — close dialog, go back to card — emerald primary */}
                    <button
                      type="button"
                      onClick={close}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500"
                    >
                      Fix these items first
                    </button>
                    {/* Continue anyway — proceed with WhatsApp — grey secondary */}
                    <button
                      type="button"
                      disabled={submitting}
                      onClick={() => goToStep2(true)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-800 disabled:opacity-50"
                    >
                      {submitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : null}
                      Continue anyway
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <StartOrderSendStep2
              orderId={orderId}
              state={state}
              waHref={waHref}
              onOrderClick={onOrderClick}
            />
          )}
        </div>

        {/* Footer — only shown for happy path (all clear) */}
        <div className="shrink-0 border-t border-slate-100 px-4 py-3">
          {step === 1 && allClear ? (
            <button
              type="button"
              disabled={submitting}
              onClick={() => goToStep2(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1A2744] py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#243552] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : null}
              {submitting ? "Saving your order..." : "Continue to WhatsApp"}
            </button>
          ) : step === 2 ? (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500"
            >
              Back to review
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
