"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const RULES = [
  {
    label: "30% commission on everything",
    detail: "Setup fees, add-ons, upgrades, and Shield renewals",
  },
  {
    label: "Commission is paid after the client accepts the build",
    detail: "Simple, fair, no risk of refund issues",
  },
  {
    label: "A client always stays with the same Partner",
    detail: "No reassignment unless the partner leaves or is terminated",
  },
  {
    label: "Every client has a direct line to Genezisi",
    detail: "If a partner is unresponsive, the client contacts us directly",
  },
  {
    label: "Smooth transitions",
    detail: "If a partner leaves, clients are personally transitioned to a new partner — no client is ever left without support",
  },
  {
    label: "Genezisi reserves the right to terminate partners",
    detail: "Who misrepresent the product or damage client relationships",
  },
];

export function PartnerTrust() {
  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold text-white sm:text-4xl">
            How it works, clearly.
          </h2>
          <p className="mt-3 text-base text-slate-400">
            No fine print. No surprises. Just honest rules.
          </p>
        </motion.div>

        <div className="space-y-3">
          {RULES.map((rule, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.06 }}
              className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
            >
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
              <div>
                <p className="text-sm font-semibold text-white">{rule.label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{rule.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
