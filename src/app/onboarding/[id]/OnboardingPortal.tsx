"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const STEPS = [
  { id: "assets", title: "Brand DNA", desc: "Upload your visual assets." },
  { id: "access", title: "Technical Access", desc: "Connect your social nodes." },
  { id: "voice", title: "AI Profiling", desc: "Define your autonomous voice." },
  { id: "vault", title: "Finalizing", desc: "Locking the Sovereign Vault." },
];

type Props = { sessionId?: string };

async function saveOnboarding(
  sessionId: string | undefined,
  formData: Record<string, string>,
  step: number
) {
  if (!sessionId) return;
  try {
    await fetch("/api/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: sessionId,
        form_data: formData,
        step,
      }),
    });
  } catch {
    // Non-blocking; form still works without storage
  }
}

export default function OnboardingPortal({ sessionId }: Props) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isCompleting, setIsCompleting] = useState(false);

  const nextStep = useCallback(() => {
    const next = Math.min(step + 1, STEPS.length - 1);
    setStep(next);
    saveOnboarding(sessionId, formData, next);
  }, [step, formData, sessionId]);

  const prevStep = () => setStep((s) => Math.max(0, s - 1));

  const handleComplete = useCallback(async () => {
    setIsCompleting(true);
    await saveOnboarding(sessionId, formData, STEPS.length - 1);
    router.push("/success");
  }, [sessionId, formData, router]);

  return (
    <div className="min-h-screen bg-[#050505] p-4 font-sans text-white selection:bg-emerald-500/30 sm:p-8">
      <div className="noise-overlay" />

      {/* Progress: stacked on mobile, horizontal on desktop */}
      <div className="relative z-10 mx-auto mb-10 max-w-4xl sm:mb-16">
        <div className="absolute left-0 top-1/2 -z-10 hidden h-px w-full bg-white/10 md:block" />
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                  i <= step
                    ? "border-emerald-500 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                    : "border-white/10 bg-zinc-900 text-zinc-600"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`mt-2 text-[10px] uppercase tracking-[0.2em] sm:mt-4 ${
                  i <= step ? "text-white" : "text-zinc-600"
                }`}
              >
                {s.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <main className="relative z-10 mx-auto max-w-2xl px-2 sm:px-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="glass-card rounded-3xl p-6 sm:p-12"
          >
            <h2 className="mb-2 font-black uppercase tracking-tighter text-2xl sm:text-3xl">
              {STEPS[step].title}
            </h2>
            <p className="mb-8 font-mono text-sm text-zinc-500">
              {STEPS[step].desc}
            </p>

            {step === 0 && (
              <div className="space-y-6">
                <div className="cursor-pointer rounded-xl border-2 border-dashed border-white/10 p-8 text-center transition-colors hover:border-emerald-500/50 sm:p-12">
                  <p className="font-mono text-sm text-zinc-400">
                    DRAG BRAND KIT / LOGOS (.SVG Preferred)
                  </p>
                </div>
                <input
                  type="text"
                  placeholder="Primary Brand Color (Hex)"
                  value={formData.brandColor ?? ""}
                  onChange={(e) =>
                    setFormData((d) => ({ ...d, brandColor: e.target.value }))
                  }
                  className="touch-form-control w-full border-b border-white/10 bg-transparent py-4 font-mono text-base outline-none focus:border-emerald-500"
                />
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <input
                  type="text"
                  placeholder="Instagram Handle (@...)"
                  value={formData.instagram ?? ""}
                  onChange={(e) =>
                    setFormData((d) => ({ ...d, instagram: e.target.value }))
                  }
                  className="touch-form-control w-full border-b border-white/10 bg-transparent py-4 font-mono text-base outline-none focus:border-emerald-500"
                />
                <input
                  type="text"
                  placeholder="Facebook Pixel ID"
                  value={formData.pixelId ?? ""}
                  onChange={(e) =>
                    setFormData((d) => ({ ...d, pixelId: e.target.value }))
                  }
                  className="touch-form-control w-full border-b border-white/10 bg-transparent py-4 font-mono text-base outline-none focus:border-emerald-500"
                />
                <p className="text-[10px] uppercase text-zinc-600">
                  Note: Our architect will request collaborative access via Meta
                  Business Suite.
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <label className="text-xs uppercase text-zinc-500">
                  How should your AI Agent sound?
                </label>
                <select
                  value={formData.voice ?? ""}
                  onChange={(e) =>
                    setFormData((d) => ({ ...d, voice: e.target.value }))
                  }
                  className="touch-form-control w-full rounded-lg border border-white/10 bg-zinc-900 p-4 font-mono text-base outline-none focus:border-emerald-500"
                >
                  <option value="">Select...</option>
                  <option value="luxury">Luxury & Minimalist</option>
                  <option value="direct">High-Energy & Direct</option>
                  <option value="academic">Knowledgeable & Academic</option>
                  <option value="warm">Warm & Welcoming</option>
                </select>
                <textarea
                  placeholder="Describe your brand in 3 words..."
                  value={formData.brandWords ?? ""}
                  onChange={(e) =>
                    setFormData((d) => ({ ...d, brandWords: e.target.value }))
                  }
                  className="h-32 w-full resize-none border-b border-white/10 bg-transparent py-4 font-mono text-base outline-none focus:border-emerald-500"
                />
              </div>
            )}

            {step === 3 && (
              <div className="py-12 text-center">
                <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-2 border-t-emerald-500" />
                <p className="animate-pulse font-mono text-sm uppercase tracking-[0.2em] text-emerald-400">
                  Locking Sovereign Vault...
                </p>
              </div>
            )}

            <div className="mt-12 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className={`text-xs uppercase tracking-[0.2em] text-zinc-500 hover:text-white ${
                  step === 0 ? "invisible" : ""
                }`}
              >
                [ Back ]
              </button>
              {step === 3 ? (
                <button
                  type="button"
                  onClick={handleComplete}
                  disabled={isCompleting}
                  className="rounded-full bg-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-emerald-500 hover:text-white disabled:opacity-70"
                >
                  {isCompleting ? "Saving…" : "Complete Extraction"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={nextStep}
                  className="rounded-full bg-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-emerald-500 hover:text-white"
                >
                  Next Protocol
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
