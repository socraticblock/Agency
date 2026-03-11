"use client";

import Link from "next/link";

export default function OnboardingBriefView() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="noise-overlay" aria-hidden />

      <div className="relative z-10 mx-auto max-w-2xl px-6 py-16 print:py-8">
        <header className="mb-12 border-b border-white/10 pb-8 print:mb-8 print:pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
            Sovereign Onboarding
          </p>
          <h1 className="mt-4 text-4xl font-black uppercase tracking-tight text-white print:text-3xl">
            Your Brief
          </h1>
          <p className="mt-3 font-mono text-sm text-zinc-400">
            Everything you need to know for the next 7 days.
          </p>
        </header>

        <div className="glass-card rounded-3xl p-8 print:border print:bg-zinc-900/80 print:shadow-none">
          <section className="mb-10">
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
              What happens next
            </h2>
            <ul className="mt-4 space-y-3 font-mono text-sm text-zinc-300">
              <li className="flex gap-3">
                <span className="text-emerald-500">1.</span>
                Our Lead Architect will contact you via WhatsApp or Email within{" "}
                <strong className="text-white">24 hours</strong> to confirm your
                build and collect access.
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500">2.</span>
                You’ll receive a secure link to the <strong className="text-white">Sovereign Vault</strong>—
                a short form for brand assets, Instagram access, and AI voice
                preferences.
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500">3.</span>
                Within 48 hours of your submission, your environment goes live
                on the edge. You’ll get a walkthrough and ongoing support.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
              What we need from you
            </h2>
            <ul className="mt-4 space-y-2 font-mono text-sm text-zinc-300">
              <li>• High-res logo (SVG preferred) and primary brand color</li>
              <li>• Instagram handle and (if applicable) Facebook Pixel ID</li>
              <li>• A 3-word brand vibe and how your AI agent should sound</li>
            </ul>
            <p className="mt-4 text-xs text-zinc-500">
              All of this is collected inside the Vault—no back-and-forth emails.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
              7-day build schedule
            </h2>
            <div className="mt-4 grid gap-2 font-mono text-sm text-zinc-300">
              <div className="flex justify-between border-b border-white/5 py-2">
                <span>Day 1–2</span>
                <span>Architect contact + Vault completion</span>
              </div>
              <div className="flex justify-between border-b border-white/5 py-2">
                <span>Day 3–4</span>
                <span>Infrastructure + design lock</span>
              </div>
              <div className="flex justify-between border-b border-white/5 py-2">
                <span>Day 5–6</span>
                <span>Deploy + QA</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Day 7</span>
                <span>Handover + walkthrough</span>
              </div>
            </div>
          </section>

          <section className="border-t border-white/10 pt-8">
            <p className="font-mono text-xs text-zinc-500">
              Questions? Reply to your welcome email or message us on WhatsApp.
              We’re here to make this feel like a 5-star handover—not a ticket
              queue.
            </p>
            <p className="mt-4 text-sm font-semibold text-emerald-400">
              — The Kvali Team
            </p>
          </section>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 print:hidden">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Ready to submit your assets?
          </p>
          <Link
            href="/onboarding"
            className="rounded-full bg-white px-8 py-3 text-sm font-bold uppercase tracking-[0.2em] text-black transition hover:bg-emerald-500 hover:text-white"
          >
            Enter the Vault
          </Link>
          <p className="text-[10px] text-zinc-600">
            Use the personalized link from your email to open your Vault
            session.
          </p>
        </div>
      </div>
    </div>
  );
}
