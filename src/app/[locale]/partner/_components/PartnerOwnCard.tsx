"use client";

import { motion } from "framer-motion";
import { CreditCard, Award } from "lucide-react";

export function PartnerOwnCard() {
  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.06] to-transparent p-6 sm:p-10"
        >
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-10">
            {/* Card mockup */}
            <div className="shrink-0">
              <div className="relative h-56 w-36 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-emerald-500/30 shadow-xl shadow-emerald-500/10 p-4 flex flex-col items-center justify-center text-center">
                <div className="h-12 w-12 rounded-full bg-emerald-500/30 border-2 border-emerald-400/50 mb-3 flex items-center justify-center text-emerald-300 font-bold text-sm">
                  GP
                </div>
                <div className="h-2 w-16 rounded bg-white/30 mb-1.5" />
                <div className="h-1.5 w-12 rounded bg-white/15 mb-1" />
                <div className="h-1.5 w-20 rounded bg-white/10" />
                <p className="mt-3 text-[8px] uppercase tracking-[0.2em] text-emerald-400/60 font-bold">
                  Genezisi Partner
                </p>
              </div>
              {/* Glow under card */}
              <div className="mx-auto mt-2 h-4 w-24 rounded-full bg-emerald-500/20 blur-md" />
            </div>

            {/* Text */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-emerald-400" />
                <h3 className="text-xl font-bold text-white sm:text-2xl">
                  Your card is your demo.
                </h3>
              </div>

              <p className="text-base text-slate-300 leading-relaxed mb-4">
                Every Genezisi Partner receives their own digital business card. When you share your card,
                you&apos;re not just giving your contact info — you&apos;re <span className="text-emerald-300 font-semibold">showing the product in action</span>.
                Every WhatsApp message, every meeting, every introduction becomes a live demo.
              </p>

              <div className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <Award className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                <p className="text-sm text-slate-300 leading-relaxed">
                  Partners who perform at a high level over time may earn a{" "}
                  <span className="text-emerald-300 font-semibold">custom landing page</span> —
                  a dedicated online presence that positions them as a premium digital consultant.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
