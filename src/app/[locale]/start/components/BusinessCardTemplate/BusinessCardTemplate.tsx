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
import { buildItemVariants, containerVariants } from "../../lib/animations";
import { usePwaMetadata } from "../../lib/usePwaMetadata";
import { useCardTilt } from "../../lib/useCardTilt";
import { Scale, Briefcase, Building2, Sparkles } from "lucide-react";
import type { Lane1CustomizerState } from "../../lib/types";
import { ANIMATION_PRESETS, resolveStyleVariables } from "../../lib/presets";
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
  onPatch?: (p: Partial<Lane1CustomizerState>) => void;
  onPreviewLangChange?: (lang: "primary" | "secondary") => void;
  hideBranding?: boolean;
  layoutMode?: "mobile" | "responsive";
}) {
  const editable = Boolean(onPatch);
  const isResponsive = layoutMode === "responsive";
  const vars = resolveStyleVariables(state.style) as any;
  const useSecondary = previewLang === "secondary" && state.secondaryMode === "self";
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useCardTilt(isResponsive, {
    enabled: state.cardTiltEnabled,
    maxDeg: state.cardTiltMaxDeg,
  });
  usePwaMetadata(state, vars);

  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [shareFeedback, setShareFeedback] = useState("");
  const [photoBusy, setPhotoBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const nameSlug = state.name.toLowerCase().replace(/\s+/g, "-") || "business-card";
    const url = `https://genezisi.com/c/${nameSlug}`;
    import("../../lib/identity-kit").then(({ generateBrandedQR }) => {
      generateBrandedQR(state, url).then(setQrDataUrl);
    });
  }, [state.style.accentId, state.name, state]);

  const patch = (p: Partial<Lane1CustomizerState>) => onPatch?.(p);
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
      catch { navigator.clipboard.writeText(url); setShareFeedback("Link copied!"); }
    } else { navigator.clipboard.writeText(url); setShareFeedback("Link copied!"); }
    setTimeout(() => setShareFeedback(""), 2500);
  };

  const glassStyle: CSSProperties = state.style.vibeId === "glass" ? {
    backgroundColor: "rgba(255, 255, 255, 0.05)", backdropFilter: "blur(var(--glass-blur))",
    border: "1px solid rgba(255, 255, 255, var(--border-opacity))", boxShadow: "var(--card-shadow)",
  } : state.style.vibeId === "neon" ? { boxShadow: "var(--card-shadow)", border: "1px solid var(--accent)" } : {};

  const headingStyle: CSSProperties = { fontFamily: "var(--font-heading)", fontWeight: "var(--font-heading-weight)" as any, color: "var(--text-primary)" };
  const bodyStyle: CSSProperties = { fontFamily: "var(--font-body)", fontWeight: "var(--font-body-weight)" as any, color: "var(--text-primary)" };

  const animPreset =
    ANIMATION_PRESETS.find((a) => a.id === state.style.animationId) ??
    ANIMATION_PRESETS.find((x) => x.id === "fade")!;
  const speed = Math.max(0.5, Math.min(1.75, state.style.animationSpeed / 100));
  const customItemVariants = buildItemVariants(state.style.animationId, state.style.animationSpeed);
  const hoverLayerClass =
    isResponsive && state.cardHoverEffectId !== "none"
      ? `business-card-hover-${state.cardHoverEffectId}`
      : "";

  return (
    <div className={`business-card-template relative mx-auto w-full text-[var(--text-primary)] ${isResponsive ? "max-w-6xl" : "max-w-[640px]"}`}
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
        <div className="business-card-glow absolute inset-0 -z-[6]" aria-hidden />
      </div>

      {state.secondaryMode === "pro" && (
        <div className="business-card-template-print-skip border-b px-4 py-2.5 text-center text-xs opacity-70 relative z-20" style={{ borderColor: "var(--accent-secondary)", background: "color-mix(in srgb, var(--accent) 7%, transparent)" }}>
          English will be used for professional translation in this preview.
        </div>
      )}

      {/* Interactive Layer (Front) */}
      <motion.div
        className={`business-card-template-font-layer relative z-10 pb-12 ${isResponsive ? "md:p-8" : ""} ${hoverLayerClass}`}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        custom={animPreset.stagger / speed}
        style={{ pointerEvents: "auto" }}
      >
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPhotoPicked} />

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

        <CtaSegment state={state} editable={editable} patch={patch} headingStyle={headingStyle} />

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
            bodyStyle={bodyStyle}
            itemVariants={customItemVariants}
            glassStyle={glassStyle}
            icons={ICONS}
          />
        </div>

        <ContactSegment state={state} editable={editable} useSecondary={useSecondary} isResponsive={isResponsive} patch={patch} bodyStyle={bodyStyle} itemVariants={customItemVariants} glassStyle={glassStyle} />
        <SocialSegment state={state} isResponsive={isResponsive} itemVariants={customItemVariants} />
        <QrOnCardSegment state={state} qrDataUrl={qrDataUrl} itemVariants={customItemVariants} isResponsive={isResponsive} />

        <UtilitySegments
          state={state}
          ownerName={ownerName}
          qrDataUrl={qrDataUrl}
          shareFeedback={shareFeedback}
          handleShare={handleShare}
          referHref={`https://wa.me/?text=${encodeURIComponent(`I highly recommend ${state.name} — ${state.title}. View their card: ${typeof window !== "undefined" ? window.location.href : ""}`)}`}
        />

        <BrandingFooter ownerName={ownerName} hideBranding={hideBranding} homeHref={homeHref} />
      </motion.div>
    </div>
  );
});

export default BusinessCardTemplate;
