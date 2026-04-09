"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { Lane1CustomizerState } from "../../lib/types";
import type { Variants } from "framer-motion";

export function QrOnCardSegment({
  state,
  qrDataUrl,
  itemVariants,
  isResponsive,
  useSecondary,
}: {
  state: Lane1CustomizerState;
  qrDataUrl: string;
  itemVariants: Variants;
  isResponsive: boolean;
  useSecondary: boolean;
}) {
  if (!state.showQrOnCard || !qrDataUrl) return null;

  const radius =
    state.qrStyle === "rounded"
      ? "rounded-2xl"
      : state.qrStyle === "dots"
        ? "rounded-3xl"
        : "rounded-none";
  const bg = state.qrBackgroundColor?.trim() || "#ffffff";
  const [open, setOpen] = useState(false);
  const isDropdown = state.qrDisplayMode === "dropdown";

  return (
    <motion.section
      variants={itemVariants}
      className={`business-card-template-print-skip flex flex-col items-center gap-2 border-t px-4 py-6 ${isResponsive ? "md:rounded-3xl md:border md:p-8" : ""}`}
      style={{ borderColor: "var(--accent-secondary)" }}
    >
      {isDropdown ? (
        <div className="w-full max-w-[220px]">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex w-full items-center justify-between rounded-xl border border-[color:var(--accent-secondary)]/50 px-3 py-2 text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--text-primary)", background: "color-mix(in srgb, var(--accent) 8%, transparent)" }}
          >
            <span>{useSecondary ? "სკანირების დაკავშირება" : "Scan to connect"}</span>
            <span aria-hidden>{open ? "−" : "+"}</span>
          </button>
          {open ? (
            <div className="mt-2 flex justify-center">
              <div
                className={`overflow-hidden border border-black/10 p-2 shadow-sm ${radius}`}
                style={{ backgroundColor: bg === "transparent" ? "rgba(255,255,255,0.92)" : bg }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qrDataUrl} alt="" width={144} height={144} className="h-36 w-36 object-contain" />
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <>
          <p className="text-center text-xs font-semibold uppercase tracking-widest opacity-60" style={{ color: "var(--text-primary)" }}>
            {useSecondary ? "სკანირების დაკავშირება" : "Scan to connect"}
          </p>
          <div
            className={`overflow-hidden border border-black/10 p-2 shadow-sm ${radius}`}
            style={{ backgroundColor: bg === "transparent" ? "rgba(255,255,255,0.92)" : bg }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrDataUrl} alt="" width={144} height={144} className="h-36 w-36 object-contain" />
          </div>
        </>
      )}
    </motion.section>
  );
}
