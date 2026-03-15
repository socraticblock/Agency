"use client";

import { useActionState, useEffect } from "react";
import { motion } from "framer-motion";
import { captureLeadAction } from "@/app/actions/lead";
import { useRouter } from "next/navigation";
import { getMessages, type Locale } from "@/lib/i18n";
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

  useEffect(() => {
    if (state?.success) {
      setTimeout(() => {
        router.push(`/${locale}/book-strategy`);
      }, 1500);
    }
  }, [state, router, locale]);

  if (state?.success) {
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
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
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
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
          />
        </div>

        {state?.error && (
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
