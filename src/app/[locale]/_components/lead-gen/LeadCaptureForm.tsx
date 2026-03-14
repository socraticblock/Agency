"use client";

import { useActionState, useEffect } from "react";
import { motion } from "framer-motion";
import { captureLeadAction } from "@/app/actions/lead";
import { useRouter } from "next/navigation";

interface LeadCaptureFormProps {
  toolName: string;
  painPoint: string;
  ctaText: string;
  locale: string;
}

export function LeadCaptureForm({
  toolName,
  painPoint,
  ctaText,
  locale,
}: LeadCaptureFormProps) {
  const [state, formAction, isPending] = useActionState(captureLeadAction, null);
  const router = useRouter();

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
          Success! We've received your details.
        </p>
        <p className="mt-2 text-sm text-slate-400">
          Redirecting you to schedule a call...
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
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Your email address"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
          />
        </div>

        <div>
          <label htmlFor="phone" className="sr-only">
            Phone Number (Optional)
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Phone number (optional)"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
          />
        </div>

        {state?.error && (
          <p className="text-sm text-red-400">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl bg-emerald-500/20 px-6 py-3 font-medium text-emerald-200 transition hover:bg-emerald-500/30 disabled:opacity-50"
        >
          {isPending ? "Submitting..." : "Get Started"}
        </button>
      </form>
    </motion.div>
  );
}
