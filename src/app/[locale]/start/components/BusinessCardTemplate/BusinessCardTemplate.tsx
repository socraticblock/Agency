"use client";

import { useEffect, useRef, useState, memo, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { HeroSegment } from "../segments/HeroSegment";
import { CtaSegment } from "../segments/CtaSegment";
import { SectionDispatcher } from "../segments/SectionDispatcher";
import { ContactSegment } from "../segments/ContactSegment";
import { SocialSegment } from "../segments/SocialSegment";
import { QrOnCardSegment } from "../segments/QrOnCardSegment";
import { UtilitySegments } from "../segments/UtilitySegments";
import { BrandingFooter } from "../segments/BrandingFooter";
import { SectionManagerPanel } from "../segments/SectionManagerPanel";
import { SocialManagerPanel } from "../segments/SocialManagerPanel";
import { LocationManagerPanel } from "../segments/LocationManagerPanel";
import { BackgroundManagerPanel } from "../segments/BackgroundManagerPanel";
import { TypographyManagerPanel } from "../segments/TypographyManagerPanel";
import { ExperienceManagerPanel } from "../segments/ExperienceManagerPanel";
import { LookManagerPanel } from "../segments/LookManagerPanel";
import { QrManagerPanel } from "../segments/QrManagerPanel";
import { ProfileSetupManagerPanel } from "../segments/ProfileSetupManagerPanel";
import { buildItemVariants, containerVariants } from "../../lib/animations";
import { usePwaMetadata } from "../../lib/usePwaMetadata";
import { useCardTilt } from "../../lib/useCardTilt";
import { Scale, Briefcase, Building2, Sparkles } from "lucide-react";
import type { Lane1CustomizerState, Lane1StatePatch, SectionId } from "../../lib/types";
import { ANIMATION_PRESETS, resolveStyleVariables } from "../../lib/presets";
import { getLanguagePreviewMode } from "../../lib/language-profile";
import { compressImageForLane1Storage } from "../../lib/image-compress";
import "../business-card-template.css";
import { BackgroundEngine } from "./BackgroundEngine";

const ICONS = [Scale, Briefcase, Building2, Sparkles];

export const BusinessCardTemplate = memo(function BusinessCardTemplate({
  state,
  previewLang,
  homeHref,
  ownerName,
  onPatch,
  onPreviewLangChange,
  hideBranding = false,
  layoutMode = "mobile",
}: {
  state: Lane1CustomizerState;
  previewLang: "primary" | "secondary";
  homeHref: string;
  ownerName: string;
  onPatch?: (p: Lane1StatePatch) => void;
  onPreviewLangChange?: (lang: "primary" | "secondary") => void;
  hideBranding?: boolean;
  layoutMode?: "mobile" | "responsive";
}) {
  const editable = Boolean(onPatch);
  const isResponsive = layoutMode === "responsive";
  const vars = resolveStyleVariables(state.style) as any;
  const languageMode = getLanguagePreviewMode(state);
  const useSecondary = previewLang === "secondary";
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useCardTilt(isResponsive, {
    enabled: state.cardTiltEnabled,
    maxDeg: state.cardTiltMaxDeg,
  });
  usePwaMetadata(state, vars);

  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [shareFeedback, setShareFeedback] = useState("");
  const [photoBusy, setPhotoBusy] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [pulseSectionId, setPulseSectionId] = useState<SectionId | null>(null);
  const [pulseToken, setPulseToken] = useState(0);
  const [animationReplayKey, setAnimationReplayKey] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const pulseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const nameSlug = state.name.toLowerCase().replace(/\s+/g, "-") || "business-card";
    const url = `https://genezisi.com/c/${nameSlug}`;
    import("../../lib/identity-kit").then(({ generateBrandedQR }) => {
      generateBrandedQR(state, url).then(setQrDataUrl);
    });
  }, [state.style.accentId, state.name, state]);

  useEffect(() => {
    return () => {
      if (pulseTimerRef.current) clearTimeout(pulseTimerRef.current);
    };
  }, []);

  const patch = (p: Lane1StatePatch) => onPatch?.(p);
  const triggerSectionPulse = (sectionId: SectionId) => {
    if (pulseTimerRef.current) clearTimeout(pulseTimerRef.current);
    setPulseSectionId(sectionId);
    setPulseToken((v) => v + 1);
    pulseTimerRef.current = setTimeout(() => setPulseSectionId(null), 320);
  };
  const triggerAnimationReplay = () => setAnimationReplayKey((v) => v + 1);
  const setServiceLine = (i: number, v: string) => {
    const next = useSecondary ? [...state.serviceAreasSecondary] : [...state.serviceAreas];
    next[i] = v;
    patch(useSecondary ? { serviceAreasSecondary: next as any } : { serviceAreas: next as any });
  };
  const setServiceDescriptionLine = (i: number, v: string) => {
    const next = useSecondary ? [...state.serviceDescriptionsSecondary] : [...state.serviceDescriptions];
    next[i] = v;
    patch(useSecondary ? { serviceDescriptionsSecondary: next as any } : { serviceDescriptions: next as any });
  };

  async function onPhotoPicked(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !onPatch) return;
    setPhotoBusy(true);
    try {
      // Reset transform first so the incoming image never inherits prior pan/zoom.
      onPatch({
        style: {
          ...state.style,
          photoZoom: 100,
          photoPositionX: 50,
          photoPositionY: 50,
        },
      });
      const { dataUrl } = await compressImageForLane1Storage(file);
      onPatch({ 
        photoDataUrl: dataUrl,
        style: {
          ...state.style,
          photoZoom: 100,
          photoPositionX: 50,
          photoPositionY: 50
        }
      });
    } finally { setPhotoBusy(false); }
  }

  const handleShare = async () => {
    const url = onPatch ? "https://genezisi.com" : window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: state.name, url }); }
      catch {
        navigator.clipboard.writeText(url);
        setShareFeedback(useSecondary ? "ბმული გადაწერა!" : "Link copied!");
      }
    } else {
      navigator.clipboard.writeText(url);
      setShareFeedback(useSecondary ? "ბმული გადაწერა!" : "Link copied!");
    }
    setTimeout(() => setShareFeedback(""), 2500);
  };

  const glassStyle: CSSProperties = state.style.vibeId === "glass" ? {
    backgroundColor: "rgba(255, 255, 255, 0.05)", backdropFilter: "blur(var(--glass-blur))",
    border: "1px solid rgba(255, 255, 255, var(--border-opacity))", boxShadow: "var(--card-shadow)",
  } : state.style.vibeId === "neon" ? { boxShadow: "var(--card-shadow)", border: "1px solid var(--accent)" } : {};

  const headingStyle: CSSProperties = {
    fontFamily: "var(--font-heading)",
    fontWeight: "var(--font-heading-weight)" as any,
    color: "var(--text-heading)",
  };
  const ctaLabelStyle: CSSProperties = {
    fontFamily: "var(--font-cta)",
    fontWeight: "var(--font-cta-weight)" as any,
    color: "var(--text-cta)",
  };
  const bodyStyle: CSSProperties = {
    fontFamily: "var(--font-body)",
    fontWeight: "var(--font-body-weight)" as any,
    lineHeight: "var(--font-body-line-height)",
    letterSpacing: "var(--font-body-letter-spacing)",
    color: "var(--text-body)",
  };

  const animPreset =
    ANIMATION_PRESETS.find((a) => a.id === state.style.animationId) ??
    ANIMATION_PRESETS.find((x) => x.id === "fade")!;
  const speed = Math.max(0.15, Math.min(1.5, state.style.animationSpeed / 100));
  const customItemVariants = buildItemVariants(state.style.animationId, state.style.animationSpeed);
  const hoverLayerClass =
    isResponsive && state.cardHoverEffectId !== "none"
      ? `business-card-hover-${state.cardHoverEffectId}`
      : "";

  return (
    <div className={`business-card-template relative mx-auto w-full text-[var(--text-body)] ${isResponsive ? "max-w-6xl" : "max-w-[640px]"}`}
      style={{
        ...vars,
        fontFamily: "var(--font-body)",
        borderRadius: "var(--card-radius)",
        boxShadow: "var(--card-chrome-shadow)",
      }}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
    >
      {/* Visual Stack (Behind) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
        <BackgroundEngine style={state.style} />
        <div className="business-card-noise opacity-[0.04] mix-blend-overlay absolute inset-0 -z-5" aria-hidden />
      </div>

      {languageMode.showProfessionalNote && (
        <div className="business-card-template-print-skip border-b px-4 py-2.5 text-center text-xs opacity-70 relative z-20" style={{ borderColor: "var(--accent-secondary)", background: "color-mix(in srgb, var(--accent) 7%, transparent)" }}>
          {state.translationSourceLang === "ka"
            ? useSecondary
              ? "ქართული იქნება გამოყენებული პროფესიული თარგმანი ამ გადახედვისას."
              : "Georgian will be used for professional translation in this preview."
            : useSecondary
              ? "ინგლისური იქნება გამოყენებული პროფესიული თარგმანი ამ გადახედვისას."
              : "English will be used for professional translation in this preview."}
        </div>
      )}

      {/* Interactive Layer (Front) */}
      <div
        className={`business-card-template-font-layer relative z-10 pb-12 ${isResponsive ? "md:p-8" : ""} ${hoverLayerClass}`}
        style={{ pointerEvents: "auto" }}
      >
        <motion.div
          key={animationReplayKey}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          custom={animPreset.stagger / speed}
        >
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPhotoPicked} />
        <ProfileSetupManagerPanel editable={editable} state={state} patch={patch} useSecondary={useSecondary} />

        <HeroSegment
          state={state}
          editable={editable}
          useSecondary={useSecondary}
          isResponsive={isResponsive}
          photoBusy={photoBusy}
          fileRef={fileRef}
          ownerName={ownerName}
          previewLang={previewLang}
          rotateX={rotateX}
          rotateY={rotateY}
          handleMouseMove={handleMouseMove}
          handleMouseLeave={handleMouseLeave}
          patch={patch}
          setServiceLine={setServiceLine}
          headingStyle={headingStyle}
          bodyStyle={bodyStyle}
          itemVariants={customItemVariants}
          glassStyle={glassStyle}
        />

        <CtaSegment
          state={state}
          editable={editable}
          patch={patch}
          ctaLabelStyle={ctaLabelStyle}
          useSecondary={useSecondary}
        />
        <SectionManagerPanel
          editable={editable}
          state={state}
          patch={patch}
          useSecondary={useSecondary}
          onStructureChange={triggerSectionPulse}
        />

        <div className="business-card-template-print-skip">
          <SectionDispatcher
            state={state}
            editable={editable}
            useSecondary={useSecondary}
            isResponsive={isResponsive}
            patch={patch}
            setServiceLine={setServiceLine}
            setServiceDescriptionLine={setServiceDescriptionLine}
            headingStyle={headingStyle}
            ctaLabelStyle={ctaLabelStyle}
            bodyStyle={bodyStyle}
            itemVariants={customItemVariants}
            glassStyle={glassStyle}
            icons={ICONS}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            pulseSectionId={pulseSectionId}
            pulseToken={pulseToken}
          />
        </div>

        <LocationManagerPanel editable={editable} state={state} patch={patch} useSecondary={useSecondary} />
        <ContactSegment
          state={state}
          editable={editable}
          useSecondary={useSecondary}
          isResponsive={isResponsive}
          patch={patch}
          bodyStyle={bodyStyle}
          ctaLabelStyle={ctaLabelStyle}
          itemVariants={customItemVariants}
          glassStyle={glassStyle}
        />
        <SocialManagerPanel editable={editable} state={state} patch={patch} useSecondary={useSecondary} />
        <SocialSegment state={state} isResponsive={isResponsive} itemVariants={customItemVariants} />
        <QrManagerPanel editable={editable} state={state} patch={patch} useSecondary={useSecondary} />
        <QrOnCardSegment
          state={state}
          qrDataUrl={qrDataUrl}
          itemVariants={customItemVariants}
          isResponsive={isResponsive}
          useSecondary={useSecondary}
        />

        <UtilitySegments
          state={state}
          ownerName={ownerName}
          qrDataUrl={qrDataUrl}
          shareFeedback={shareFeedback}
          handleShare={handleShare}
          ctaLabelStyle={ctaLabelStyle}
          useSecondary={useSecondary}
          referHref={`https://wa.me/?text=${encodeURIComponent(`I highly recommend ${state.name} — ${state.title}. View their card: ${typeof window !== "undefined" ? window.location.href : ""}`)}`}
        />

        <BrandingFooter
          ownerName={ownerName}
          hideBranding={hideBranding}
          homeHref={homeHref}
          useSecondary={useSecondary}
        />
        </motion.div>
        <BackgroundManagerPanel editable={editable} state={state} patch={patch} useSecondary={useSecondary} />
        <LookManagerPanel editable={editable} state={state} patch={patch} useSecondary={useSecondary} />
        <TypographyManagerPanel editable={editable} state={state} patch={patch} useSecondary={useSecondary} />
        <ExperienceManagerPanel
          editable={editable}
          state={state}
          patch={patch}
          useSecondary={useSecondary}
          onAnimationPreviewReplay={triggerAnimationReplay}
        />
      </div>

    </div>
  );
});

export default BusinessCardTemplate;
