"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export function PartnerCompetitiveEdge() {
  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
            <Zap className="h-6 w-6" />
          </div>

          <h2 className="text-xl font-bold text-white sm:text-3xl">
            Your price is your advantage.
          </h2>

          <div className="mt-6 space-y-4 text-base text-slate-300 leading-relaxed sm:text-lg">
            <p>
              Genezisi offers the most competitive pricing in the Georgian market for this level
              of quality. That&apos;s not a disadvantage — <span className="text-emerald-300 font-semibold">it&apos;s your advantage</span>.
            </p>
            <p>
              Lower prices mean faster decisions, fewer objections, and more closed deals.
              You&apos;re not convincing someone to spend 5,000₾ on a website. You&apos;re showing them
              they can have a premium digital presence for a fraction of what they&apos;d pay elsewhere.
            </p>
            <p className="text-emerald-300 font-semibold">
              The product sells itself. You just open the door.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
