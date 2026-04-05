"use client";

import { motion } from "framer-motion";
import type { Lane1CustomizerState } from "../../lib/types";
import type { Variants } from "framer-motion";

export function QrOnCardSegment({
  state,
  qrDataUrl,
  itemVariants,
  isResponsive,
}: {
  state: Lane1CustomizerState;
  qrDataUrl: string;
  itemVariants: Variants;
  isResponsive: boolean;
}) {
  if (!state.showQrOnCard || !qrDataUrl) return null;

  const radius =
    state.qrStyle === "rounded" ? "rounded-2xl" : state.qrStyle === "dots" ? "rounded-3xl" : "rounded-md";
  const bg = state.qrBackgroundColor?.trim() || "#ffffff";

  return (
    <motion.section
      variants={itemVariants}
      className={`flex flex-col items-center gap-2 border-t px-4 py-6 ${isResponsive ? "md:rounded-3xl md:border md:p-8" : ""}`}
      style={{ borderColor: "var(--accent-secondary)" }}
    >
      <p className="text-center text-xs font-semibold uppercase tracking-widest opacity-60" style={{ color: "var(--text-primary)" }}>
        Scan to connect
      </p>
      <div
        className={`overflow-hidden border border-black/10 p-2 shadow-sm ${radius}`}
        style={{ backgroundColor: bg === "transparent" ? "rgba(255,255,255,0.92)" : bg }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={qrDataUrl} alt="" width={144} height={144} className="h-36 w-36 object-contain" />
      </div>
    </motion.section>
  );
}
