"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { normalizeLane1StateFromUnknown } from "../lib/customizer-store";
import { parseImportedOrderFile } from "../lib/order-payload";
import { validateOrderState } from "../lib/order-validation";
import { buildLane1WhatsAppOpenerUrl } from "../lib/whatsapp";
import type { Lane1CustomizerState, Lane1StatePatch } from "../lib/types";
import { getLanguagePreviewMode } from "../lib/language-profile";
import { BusinessCardTemplate } from "./BusinessCardTemplate";
import { StartOrderCheckoutBlock } from "./StartOrderCheckoutBlock";
import { StartOrderReviewDialog } from "./StartOrderReviewDialog";

type Props = {
  locale: Locale;
  state: Lane1CustomizerState;
  onPatch: (p: Lane1StatePatch) => void;
  previewLang: "primary" | "secondary";
  setPreviewLang: (v: "primary" | "secondary") => void;
  blurLocked: boolean;
  chromeVisible: boolean;
  setupGel: number;
  hostingGel: number;
  onOrderClick: () => void;
  onImportOrderState?: (next: Lane1CustomizerState) => void;
};

export function StartPageEditorColumn({
  locale,
  state,
  onPatch,
  previewLang,
  setPreviewLang,
  blurLocked,
  chromeVisible,
  setupGel,
  hostingGel,
  onOrderClick,
  onImportOrderState,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [reviewOpen, setReviewOpenState] = useState(false);
  const [orderHighlightIssueIds, setOrderHighlightIssueIds] = useState<string[]>([]);
  const [waIncompleteChecklist, setWaIncompleteChecklist] = useState(false);

  const setReviewOpen = useCallback((open: boolean) => {
    setReviewOpenState(open);
    if (!open) setWaIncompleteChecklist(false);
  }, []);
  const languageMode = getLanguagePreviewMode(state);
  const homeHref = `/${locale}`;

  const orderHighlightSet = useMemo(() => new Set(orderHighlightIssueIds), [orderHighlightIssueIds]);

  const buildWhatsAppUrl = useCallback(
    (orderId: string) =>
      buildLane1WhatsAppOpenerUrl(state, orderId, { incompleteChecklist: waIncompleteChecklist }),
    [state, waIncompleteChecklist],
  );

  const handleReviewCloseAttempt = useCallback(
    (detail: { step: 1 | 2; bypassed: boolean }) => {
      if (detail.bypassed) {
        setOrderHighlightIssueIds([]);
        setWaIncompleteChecklist(true);
        return;
      }
      if (detail.step === 2) {
        setOrderHighlightIssueIds([]);
        return;
      }
      const { blocking } = validateOrderState(state);
      if (blocking.length > 0) {
        setOrderHighlightIssueIds(blocking.map((b) => b.id));
      } else {
        setOrderHighlightIssueIds([]);
      }
    },
    [state],
  );

  useEffect(() => {
    setOrderHighlightIssueIds((prev) => {
      if (prev.length === 0) return prev;
      const { blocking } = validateOrderState(state);
      const allowed = new Set(blocking.map((b) => b.id));
      const next = prev.filter((id) => allowed.has(id));
      return next.length === prev.length ? prev : next;
    });
  }, [state]);

  const onPatchInner = (p: Lane1StatePatch) => {
    onPatch(p);
  };

  return (
    <div
      className={`mx-auto max-w-4xl px-4 font-sans transition-colors duration-500 md:px-6 ${
        chromeVisible ? "pt-3 pb-10 md:pb-14" : "py-10 md:py-14"
      }`}
    >
      <StartOrderReviewDialog
        open={reviewOpen}
        onOpenChange={setReviewOpen}
        onCloseAttempt={handleReviewCloseAttempt}
        state={state}
        buildWhatsAppUrl={buildWhatsAppUrl}
        onOrderClick={onOrderClick}
      />
      <header className="mb-10 text-center">
        <p className="mb-2 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-[#64748b]">
          Genezisi
        </p>
        <h1 className="start-page-title mb-2">Customize your card</h1>
        <p className="start-body text-[#64748b]">
          Preview updates as you edit. Order via WhatsApp.
        </p>
        {onImportOrderState ? (
          <div className="mt-3 text-center">
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                e.target.value = "";
                if (!f) return;
                setImportError(null);
                const reader = new FileReader();
                reader.onload = () => {
                  try {
                    const parsed = JSON.parse(String(reader.result)) as unknown;
                    const raw = parseImportedOrderFile(parsed) ?? parsed;
                    const next = normalizeLane1StateFromUnknown(raw);
                    if (next) onImportOrderState(next);
                    else setImportError("Could not read this file. Use a Genezisi order export (.json).");
                  } catch {
                    setImportError("Invalid JSON file.");
                  }
                };
                reader.readAsText(f);
              }}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="text-xs font-semibold text-[#64748b] underline decoration-[#64748b]/35 underline-offset-4 hover:decoration-[#64748b]"
            >
              Import saved order (.json)
            </button>
            {importError ? <p className="mt-2 text-xs text-amber-800">{importError}</p> : null}
          </div>
        ) : null}
      </header>

      <div className="mb-4 flex flex-wrap items-center gap-3 lg:hidden">
        {languageMode.canToggle ? (
          <div className="start-glass-heavy flex rounded-full p-1 text-xs font-semibold">
            <button
              type="button"
              className={`rounded-full px-3 py-2 transition-colors duration-200 ${
                previewLang === "primary" ? "bg-[#1A2744] text-white" : "text-[#64748b]"
              }`}
              onClick={() => setPreviewLang("primary")}
            >
              EN
            </button>
            <button
              type="button"
              className={`rounded-full px-3 py-2 transition-colors duration-200 ${
                previewLang === "secondary" ? "bg-[#1A2744] text-white" : "text-[#64748b]"
              }`}
              onClick={() => setPreviewLang("secondary")}
            >
              GE
            </button>
          </div>
        ) : null}
      </div>

      <div className={`start-dc-blur-target space-y-5 ${blurLocked ? "start-dc-blur-target--locked" : ""}`}>
        <div className="hidden justify-center lg:flex">
          {languageMode.canToggle ? (
            <div className="start-glass-heavy flex rounded-full p-1 text-xs font-semibold">
              <button
                type="button"
                className={`rounded-full px-3 py-2 transition-colors duration-200 ${
                  previewLang === "primary" ? "bg-[#1A2744] text-white" : "text-[#64748b]"
                }`}
                onClick={() => setPreviewLang("primary")}
              >
                EN
              </button>
              <button
                type="button"
                className={`rounded-full px-3 py-2 transition-colors duration-200 ${
                  previewLang === "secondary" ? "bg-[#1A2744] text-white" : "text-[#64748b]"
                }`}
                onClick={() => setPreviewLang("secondary")}
              >
                GE
              </button>
            </div>
          ) : null}
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[var(--start-shadow-md)]">
          <BusinessCardTemplate
            state={state}
            previewLang={languageMode.fixedPreview ?? previewLang}
            homeHref={homeHref}
            ownerName={state.name}
            onPatch={onPatchInner}
            onPreviewLangChange={
              languageMode.canToggle
                ? (v) => setPreviewLang(v)
                : undefined
            }
            orderHighlightIssueIds={orderHighlightSet}
          />
        </div>
        <StartOrderCheckoutBlock
          state={state}
          setupGel={setupGel}
          hostingGel={hostingGel}
          onPatch={onPatch}
          onReviewOrderClick={() => setReviewOpen(true)}
          orderHighlightIssueIds={orderHighlightSet}
        />
      </div>

      <div className="business-card-template-print-skip fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-[115] -translate-x-1/2">
        <div className="start-glass-heavy flex rounded-full p-1 shadow-[var(--start-shadow-lg)]">
          <button
            type="button"
            onClick={() => {
              sessionStorage.setItem("businessCardPreview", JSON.stringify(state));
              window.open(`/${locale}/start/preview`, "_blank");
            }}
            className="h-8 w-[10.5rem] whitespace-nowrap rounded-full border border-emerald-200/55 bg-emerald-500/55 px-4 text-center text-xs font-semibold leading-none text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_6px_18px_rgba(16,185,129,0.28)] backdrop-blur-xl transition hover:bg-emerald-400/60"
          >
            Live Preview
          </button>
        </div>
      </div>
    </div>
  );
}
