"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import type { Lane1CustomizerState } from "../../lib/types";
import { buildLane1WhatsAppUrl } from "../../lib/whatsapp";
import { LANE1_BASE_GEL, computeLane1Total } from "../../lib/lane1-pricing";
import { clearLane1State } from "../../lib/customizer-store";
import { defaultLane1State } from "../../lib/types";
import { MessageCircle, Eye } from "lucide-react";

import { ContentSection } from "./ContentSection";
import { PhotoSection } from "./PhotoSection";
import { ServicesSection } from "./ServicesSection";
import { SocialSection } from "./SocialSection";
import { BackgroundSection } from "./BackgroundSection";
import { AccentSection, FontSection, ButtonStyleSection, ExperienceSection } from "./StyleSections";
import { AddonsSection } from "./AddonsSection";
import { IdentitySection } from "./IdentitySection";
import { ThemePresetsSection } from "./ThemePresetsSection";
import { CardChromeSection } from "./CardChromeSection";
import { SectionsLayoutSection } from "./SectionsLayoutSection";
import { SectionsContentSection } from "./SectionsContentSection";

export function StartCustomizer({
  state,
  setState,
  showOrderFooter = true,
}: {
  state: Lane1CustomizerState;
  setState: Dispatch<SetStateAction<Lane1CustomizerState>>;
  /** Set false when the mobile sheet renders a sticky footer outside. */
  showOrderFooter?: boolean;
}) {
  const params = useParams();
  const total = computeLane1Total({
    secondaryMode: state.secondaryMode,
    addGoogleMap: state.addGoogleMap,
  });

  const [openSection, setOpenSection] = useState<string | null>("content"); // Default to first section open
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showToast(message: string) {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2600);
  }

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  function patch(p: Partial<Lane1CustomizerState>) {
    setState((s) => ({ ...s, ...p }));
  }

  function toggleSection(sectionId: string) {
    setOpenSection((current) => (current === sectionId ? null : sectionId));
  }

  const onBackgroundStylePatch = useCallback(
    (p: Partial<Lane1CustomizerState["style"]>) => {
      setState((s) => ({
        ...s,
        style: { ...s.style, ...p },
      }));
    },
    [setState],
  );

  const sectionProps = {
    state,
    setState,
    patch,
  };

  const waUrl = buildLane1WhatsAppUrl(state);

  return (
    <div className="relative space-y-4 pb-4 md:space-y-6 md:pb-8">
      {toast ? (
        <div
          className="fixed bottom-6 left-1/2 z-50 max-w-sm -translate-x-1/2 rounded-xl border border-black/10 bg-[#0f172a] px-4 py-2.5 text-center text-sm font-medium text-white shadow-lg"
          role="status"
        >
          {toast}
        </div>
      ) : null}
      <div className="flex flex-wrap items-center justify-end gap-3 px-0.5">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => {
              sessionStorage.setItem("businessCardPreview", JSON.stringify(state));
              window.open(`/${params.locale}/start/preview`, "_blank");
            }}
            className="flex items-center gap-2 text-sm font-semibold underline underline-offset-4 transition hover:opacity-80"
            style={{ color: "var(--accent)", textDecorationColor: "color-mix(in srgb, var(--accent) 30%, transparent)" }}
          >
            <Eye className="h-4 w-4" />
            Preview my site
          </button>
          <button
            type="button"
            onClick={() => {
              clearLane1State();
              setState(defaultLane1State());
            }}
            className="text-xs font-medium text-[var(--start-caption)] transition hover:text-[var(--start-text)]"
          >
            Reset
          </button>
        </div>
      </div>

      <ContentSection {...sectionProps} isOpen={openSection === "content"} onToggle={() => toggleSection("content")} />
      
      <PhotoSection {...sectionProps} isOpen={openSection === "photo"} onToggle={() => toggleSection("photo")} />
      
      <ServicesSection {...sectionProps} isOpen={openSection === "services"} onToggle={() => toggleSection("services")} />

      <SectionsLayoutSection {...sectionProps} isOpen={openSection === "sections"} onToggle={() => toggleSection("sections")} />

      <SectionsContentSection {...sectionProps} isOpen={openSection === "sections-content"} onToggle={() => toggleSection("sections-content")} />
      
      <SocialSection {...sectionProps} isOpen={openSection === "social"} onToggle={() => toggleSection("social")} />
      
      <BackgroundSection {...sectionProps} onPatch={onBackgroundStylePatch} isOpen={openSection === "background"} onToggle={() => toggleSection("background")} />
      
      <AccentSection {...sectionProps} onPatch={onBackgroundStylePatch} isOpen={openSection === "accent"} onToggle={() => toggleSection("accent")} />
      
      <FontSection {...sectionProps} onPatch={onBackgroundStylePatch} isOpen={openSection === "font"} onToggle={() => toggleSection("font")} />

      <ButtonStyleSection {...sectionProps} onPatch={onBackgroundStylePatch} isOpen={openSection === "buttons"} onToggle={() => toggleSection("buttons")} />
      
      <ExperienceSection {...sectionProps} onPatch={onBackgroundStylePatch} isOpen={openSection === "experience"} onToggle={() => toggleSection("experience")} />
      
      <AddonsSection {...sectionProps} isOpen={openSection === "addons"} onToggle={() => toggleSection("addons")} />

      <ThemePresetsSection
        state={state}
        setState={setState}
        showToast={showToast}
        isOpen={openSection === "themes"}
        onToggle={() => toggleSection("themes")}
      />

      <CardChromeSection
        state={state}
        onPatch={onBackgroundStylePatch}
        isOpen={openSection === "card-chrome"}
        onToggle={() => toggleSection("card-chrome")}
      />
      
      <IdentitySection {...sectionProps} isOpen={openSection === "identity"} onToggle={() => toggleSection("identity")} />

      {showOrderFooter ? (
        <div className="start-glass-heavy space-y-4 p-4 md:p-6">
          <p className="start-body">
            Total:{" "}
            <span className="start-cta-price">
              {total} ₾
            </span>{" "}
            <span className="text-[#64748b]">(one-time, base {LANE1_BASE_GEL} ₾ + add-ons)</span>
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="start-wa-cta mt-2 inline-flex items-center justify-center gap-2"
          >
            <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
            Order on WhatsApp
          </a>
        </div>
      ) : null}
    </div>
  );
}
