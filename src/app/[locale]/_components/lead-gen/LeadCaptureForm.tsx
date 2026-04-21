"use client";

import { useActionState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { captureLeadAction } from "@/app/actions/lead";
import { useRouter } from "next/navigation";
import { getMessages, type Locale } from "@/lib/i18n";
import {
  isLeadCaptureError,
  isLeadCaptureSuccess,
} from "@/lib/formActionState";
import { GENEZISI_LEAD_KEY } from "@/lib/leadSession";
import { MagneticButton } from "../MagneticButton";

interface LeadCaptureFormProps {
  toolName: string;
  painPoint: string;
  ctaText: string;
  locale: Locale;
}

export function LeadCaptureForm({
  toolName,
  painPoint,
  ctaText,
  locale,
}: LeadCaptureFormProps) {
  const [state, formAction, isPending] = useActionState(captureLeadAction, null);
  const router = useRouter();
  const t = getMessages(locale);
  const redirectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isLeadCaptureSuccess(state)) return;

    try {
      sessionStorage.setItem(
        GENEZISI_LEAD_KEY,
        JSON.stringify({
          source: "lead-tool",
          toolName,
          painPoint,
          locale,
          email: state.email,
          phone: state.phone,
          capturedAt: new Date().toISOString(),
        }),
      );
    } catch {
      // storage may be unavailable (private mode)
    }

    redirectTimer.current = setTimeout(() => {
      router.push(`/${locale}/pricing`);
    }, 2200);

    return () => {
      if (redirectTimer.current) clearTimeout(redirectTimer.current);
    };
  }, [state, router, locale, toolName, painPoint]);

  const goToBooking = () => {
    if (redirectTimer.current) clearTimeout(redirectTimer.current);
    router.push(`/${locale}/architect`);
  };

  if (isLeadCaptureSuccess(state)) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center"
      >
        <p className="text-lg font-semibold text-emerald-200">
          {t.leadCapture.successTitle}
        </p>
        <p className="mt-2 text-sm text-slate-400">
          {t.leadCapture.successSub}
        </p>
        <MagneticButton
          type="button"
          onClick={goToBooking}
          magneticStrength={8}
          textStrength={3}
          className="mt-6 w-full rounded-xl bg-emerald-500/30 px-6 py-3 font-medium text-emerald-100 transition-colors hover:bg-emerald-500/40"
        >
          <span className="block w-full">{t.leadCapture.continueBtn}</span>
        </MagneticButton>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
    >
      <h3 className="mb-4 text-xl font-semibold text-slate-100">{ctaText}</h3>
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="toolName" value={toolName} />
        <input type="hidden" name="painPoint" value={painPoint} />

        <div>
          <label htmlFor="email" className="sr-only">
            {t.leadCapture.emailPlaceholder}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder={t.leadCapture.emailPlaceholder}
            className="touch-form-control w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-slate-100 placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
          />
        </div>

        <div>
          <label htmlFor="phone" className="sr-only">
            {t.leadCapture.phonePlaceholder}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder={t.leadCapture.phonePlaceholder}
            className="touch-form-control w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-slate-100 placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
          />
        </div>

        {isLeadCaptureError(state) && (
          <p className="text-sm text-red-400">{state.error}</p>
        )}

        <MagneticButton
          type="submit"
          disabled={isPending}
          magneticStrength={10}
          textStrength={4}
          className="w-full rounded-xl bg-emerald-500/20 px-6 py-3 font-medium text-emerald-200 transition-colors hover:bg-emerald-500/30 disabled:opacity-50"
        >
          <span className="block w-full">{isPending ? t.leadCapture.submittingLabel : t.leadCapture.submitLabel}</span>
        </MagneticButton>
      </form>
    </motion.div>
  );
}
