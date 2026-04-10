"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { StartDigitalCardOverlayView } from "@/constants/start-digital-card-copy";
import { START_DC_CHROME } from "@/constants/start-digital-card-copy";
import type { DigitalCardTierId } from "../../lib/digital-card-product";
import { OverlayWelcomeBody } from "./OverlayWelcomeBody";
import { OverlayPricingBody } from "./OverlayPricingBody";
import { OverlayFaqBody } from "./OverlayFaqBody";

export type StartDigitalCardOverlayProps = {
  open: boolean;
  view: StartDigitalCardOverlayView;
  onViewChange: (v: StartDigitalCardOverlayView) => void;
  showCloseButton: boolean;
  onClose: () => void;
  onStartBuilding: () => void;
  onSkip: () => void;
  selectedTier: DigitalCardTierId;
  onSelectTier: (t: DigitalCardTierId) => void;
  isMobileLayout: boolean;
};

export function StartDigitalCardOverlay({
  open,
  view,
  onViewChange,
  showCloseButton,
  onClose,
  onStartBuilding,
  onSkip,
  selectedTier,
  onSelectTier,
  isMobileLayout,
}: StartDigitalCardOverlayProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    setDomReady(true);
  }, []);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
    setVisible(false);
    const t = window.setTimeout(() => setMounted(false), 350);
    return () => window.clearTimeout(t);
  }, [open]);

  if (!domReady || !mounted) return null;

  const useMobileVisualStyle = isMobileLayout || view === "pricing" || view === "faq";
  const rootClass = [
    "start-dc-overlay-root",
    useMobileVisualStyle ? "start-dc-overlay-root--mobile" : "",
    visible ? "start-dc-overlay-root--open" : "start-dc-overlay-root--exit",
  ]
    .filter(Boolean)
    .join(" ");

  const backdropClick = showCloseButton ? onClose : undefined;

  return createPortal(
    <div className={rootClass} role="dialog" aria-modal="true" aria-label="Genezisi Digital Card">
      <div
        className={useMobileVisualStyle ? "" : "start-dc-overlay-backdrop"}
        onClick={backdropClick}
        aria-hidden={!useMobileVisualStyle}
      />
      <div
        className="start-dc-overlay-card"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Escape" && showCloseButton) onClose();
        }}
      >
        {showCloseButton ? (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 z-10 rounded-lg p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            aria-label={START_DC_CHROME.closeOverlay}
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        ) : null}
        <div key={view} className="start-dc-overlay-view">
          {view === "welcome" ? (
            <OverlayWelcomeBody
              onViewPricing={() => onViewChange("pricing")}
              onViewFaq={() => onViewChange("faq")}
              onStartBuilding={onStartBuilding}
              onSkip={onSkip}
            />
          ) : null}
          {view === "pricing" ? (
            <OverlayPricingBody
              selectedTier={selectedTier}
              onSelectTier={onSelectTier}
              onBack={() => onViewChange("welcome")}
              onStartBuilding={onStartBuilding}
              isMobileStack={useMobileVisualStyle}
            />
          ) : null}
          {view === "faq" ? (
            <OverlayFaqBody onBack={() => onViewChange("welcome")} onStartBuilding={onStartBuilding} />
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}
