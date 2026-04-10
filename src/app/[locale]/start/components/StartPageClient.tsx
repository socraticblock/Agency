"use client";

import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import type { Locale } from "@/lib/i18n";
import type { StartDigitalCardOverlayView } from "@/constants/start-digital-card-copy";
import type { Lane1CustomizerState, Lane1StatePatch, StylePresetSelection } from "../lib/types";
import { defaultLane1State } from "../lib/types";
import { loadLane1State, saveLane1State } from "../lib/customizer-store";
import { buildLane1WhatsAppUrl } from "../lib/whatsapp";
import { getDigitalCardPricingSummary } from "../lib/lane1-pricing";
import { getLanguagePreviewMode } from "../lib/language-profile";
import { resolveStyleVariables } from "../lib/presets";
import {
  readCustomizerEntered,
  writeCustomizerEntered,
  readWelcomeToastShownThisSession,
  writeWelcomeToastShownThisSession,
} from "../lib/start-overlay-storage";
import { StartDigitalCardOverlay } from "./start-digital-card/StartDigitalCardOverlay";
import { ReturningToast } from "./start-digital-card/ReturningToast";
import { StartPageEditorColumn } from "./StartPageEditorColumn";

const START_OVERLAY_OPEN_EVENT = "genezisi:start-overlay-open";

export function StartPageClient({ locale }: { locale: Locale }) {
  const [state, setState] = useState<Lane1CustomizerState>(defaultLane1State);
  const [hydrated, setHydrated] = useState(false);
  const [previewLang, setPreviewLang] = useState<"primary" | "secondary">("primary");
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlayView, setOverlayView] = useState<StartDigitalCardOverlayView>("welcome");
  const [overlayClosable, setOverlayClosable] = useState(false);
  const [chromeVisible, setChromeVisible] = useState(false);
  const [isMdUp, setIsMdUp] = useState(true);
  const [showReturningToast, setShowReturningToast] = useState(false);

  const languageMode = getLanguagePreviewMode(state);
  const waUrl = buildLane1WhatsAppUrl(state);
  const vars = useMemo(() => resolveStyleVariables(state.style), [state.style]);
  const { setupGel, hostingAnnualGel } = getDigitalCardPricingSummary(state.selectedTier);

  useEffect(() => {
    const loaded = loadLane1State();
    setState(loaded);
    const entered = readCustomizerEntered();
    setChromeVisible(entered);
    setOverlayOpen(!entered);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (!readCustomizerEntered()) return;
    if (readWelcomeToastShownThisSession()) return;
    setShowReturningToast(true);
    writeWelcomeToastShownThisSession();
  }, [hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    const t = window.setTimeout(() => saveLane1State(state), 400);
    return () => window.clearTimeout(t);
  }, [state, hydrated]);

  useEffect(() => {
    if (languageMode.fixedPreview) setPreviewLang(languageMode.fixedPreview);
  }, [languageMode.fixedPreview]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => setIsMdUp(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const onPatch = useCallback((p: Lane1StatePatch) => {
    setState((s) => {
      if (p.style) {
        const { style: stylePatch, ...rest } = p;
        return {
          ...s,
          ...rest,
          style: { ...s.style, ...stylePatch } as StylePresetSelection,
        } as Lane1CustomizerState;
      }
      return { ...s, ...p } as Lane1CustomizerState;
    });
  }, []);

  const finishOverlayEntry = useCallback(() => {
    writeCustomizerEntered();
    setChromeVisible(true);
    setOverlayOpen(false);
    setOverlayClosable(false);
    setOverlayView("welcome");
  }, []);

  const openOverlayFromChrome = useCallback((view: StartDigitalCardOverlayView) => {
    setOverlayView(view);
    setOverlayClosable(true);
    setOverlayOpen(true);
  }, []);

  const closeOverlay = useCallback(() => {
    setOverlayOpen(false);
    setOverlayClosable(false);
  }, []);

  useEffect(() => {
    const onOpen = (ev: Event) => {
      const ce = ev as CustomEvent<{ view?: StartDigitalCardOverlayView }>;
      const view = ce.detail?.view;
      if (view !== "pricing" && view !== "faq" && view !== "welcome") return;
      openOverlayFromChrome(view);
    };
    window.addEventListener(START_OVERLAY_OPEN_EVENT, onOpen as EventListener);
    return () => window.removeEventListener(START_OVERLAY_OPEN_EVENT, onOpen as EventListener);
  }, [openOverlayFromChrome]);

  useEffect(() => {
    const lockScroll = overlayOpen && (overlayView === "pricing" || overlayView === "faq");
    if (!lockScroll) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [overlayOpen, overlayView]);

  const dismissToast = useCallback(() => {
    setShowReturningToast(false);
  }, []);

  const onOrderClick = useCallback(() => {
    writeCustomizerEntered();
    setChromeVisible(true);
  }, []);

  return (
    <>
      <StartDigitalCardOverlay
        open={overlayOpen}
        view={overlayView}
        onViewChange={setOverlayView}
        showCloseButton={overlayClosable}
        onClose={closeOverlay}
        onStartBuilding={finishOverlayEntry}
        onSkip={finishOverlayEntry}
        selectedTier={state.selectedTier}
        onSelectTier={(t) => onPatch({ selectedTier: t })}
        isMobileLayout={!isMdUp}
      />
      <ReturningToast show={showReturningToast} onDismiss={dismissToast} />
      <div
        style={
          {
            "--accent": (vars as Record<string, string | number>)["--accent"],
            "--accent-secondary": (vars as Record<string, string | number>)["--accent-secondary"],
          } as CSSProperties
        }
      >
        <StartPageEditorColumn
          locale={locale}
          state={state}
          onPatch={onPatch}
          previewLang={previewLang}
          setPreviewLang={setPreviewLang}
          blurLocked={overlayOpen}
          chromeVisible={chromeVisible}
          setupGel={setupGel}
          hostingGel={hostingAnnualGel}
          waUrl={waUrl}
          onOrderClick={onOrderClick}
        />
      </div>
    </>
  );
}
