"use client";

import { motion } from "framer-motion";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export function StatusBadge({ locale }: { locale: Locale }) {
  const t = getMessages(locale);

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
      className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md"
    >
      <motion.span
        className="h-2 w-2 rounded-full bg-[#10b981]"
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <span className="text-sm font-medium text-slate-200">
        {t.hero.statusBadge}
      </span>
    </motion.div>
  );
}
