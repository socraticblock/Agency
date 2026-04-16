"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { Variants } from "framer-motion";
import { MagneticButton } from "../../../_components/MagneticButton";
import { lane1CtaPrimarySurface, lane1UtilityPrimaryClasses } from "../../lib/button-styles";

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
  const btnStyleId = state.style.buttonStyleId;
  const primary = lane1CtaPrimarySurface(btnStyleId);

  const filledStyle = primary.filledAccent
    ? {
        background: primary.accentBackground ?? "var(--accent)",
        color: state.style.ctaTextHex?.trim() ? "var(--text-cta)" : "var(--accent-contrast, #fff)",
      }
    : {};

  return (
    <motion.section
      variants={itemVariants}
      className={`business-card-template-print-skip flex flex-col items-center gap-2 border-t px-4 py-6 ${isResponsive ? "md:rounded-3xl md:border md:p-8" : ""}`}
      style={{ borderColor: "var(--accent-secondary)" }}
    >
      {isDropdown ? (
        <div className="w-full max-w-[240px]">
          <MagneticButton
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`${primary.className} !justify-between px-5 tracking-wider uppercase active:scale-95`}
            style={filledStyle}
          >
            <span className="text-sm font-bold">{useSecondary ? "სკანირების დაკავშირება" : "Scan to connect"}</span>
            <span className="text-base font-medium opacity-60" aria-hidden>
              {open ? "−" : "+"}
            </span>
          </MagneticButton>
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
