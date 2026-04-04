"use client";

import { useEffect, useRef, useState, memo, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { HeroSegment } from "./segments/HeroSegment";
import { ServicesSegment } from "./segments/ServicesSegment";
import { ContactSocialSegment } from "./segments/ContactSocialSegment";
import { UtilitySegments } from "./segments/UtilitySegments";
import { BrandingFooter } from "./segments/BrandingFooter";
import { containerVariants, itemVariants } from "../lib/animations";
import { usePwaMetadata } from "../lib/usePwaMetadata";
import { useCardTilt } from "../lib/useCardTilt";
import { InlineEditable } from "./InlineEditable";
import { Scale, Briefcase, Building2, Sparkles } from "lucide-react";
import type { Lane1CustomizerState } from "../lib/types";
import { resolveStyleVariables } from "../lib/presets";
import { compressImageForLane1Storage } from "../lib/image-compress";
import "./business-card-template.css";

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
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useCardTilt(isResponsive);
  usePwaMetadata(state, vars);

  const [expandedService, setExpandedService] = useState<number | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [shareFeedback, setShareFeedback] = useState("");
  const [photoBusy, setPhotoBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const nameSlug = state.name.toLowerCase().replace(/\s+/g, "-") || "business-card";
    const url = `https://genezisi.com/c/${nameSlug}`;
    import("../lib/identity-kit").then(({ generateBrandedQR }) => {
      generateBrandedQR(state, url).then(setQrDataUrl);
    });
  }, [state.style.accentId, state.name]);

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
    if (!file || !onPatch) return;
    setPhotoBusy(true);
    try {
      const { dataUrl } = await compressImageForLane1Storage(file);
      onPatch({ photoDataUrl: dataUrl });
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

  return (
    <div className={`business-card-template relative mx-auto w-full overflow-hidden text-[var(--text-primary)] ${isResponsive ? "max-w-6xl md:rounded-3xl" : "max-w-[640px]"}`}
      style={{ ...vars, fontFamily: "var(--font-body)", background: "var(--bg-primary)" }}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
    >
      <div className="business-card-noise" aria-hidden /><div className="business-card-glow" aria-hidden />
      {state.secondaryMode === "pro" && (
        <div className="border-b px-4 py-2.5 text-center text-xs opacity-70" style={{ borderColor: "var(--accent-secondary)", background: "color-mix(in srgb, var(--accent) 7%, transparent)" }}>
          Georgian translation will be added after your order is confirmed.
        </div>
      )}
      <motion.div className={`pb-12 ${isResponsive ? "md:grid md:grid-cols-12 md:gap-8 md:p-8" : ""}`}
        variants={containerVariants} initial="hidden" animate="show" custom={vars["--stagger-delay"]}
      >
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPhotoPicked} />
        <div className={isResponsive ? "md:col-span-12 lg:col-span-4 md:sticky md:top-8 md:flex md:flex-col md:gap-6" : ""}>
          <motion.header variants={itemVariants(vars["--entrance-y"], vars["--spring-damping"])} className={`sticky top-0 z-20 flex items-center justify-between px-4 py-3 ${isResponsive ? "md:relative md:p-0 md:bg-transparent" : "bg-[var(--bg-primary)] border-b"}`} style={{ borderColor: "var(--accent)" }}>
            <div className="truncate text-sm font-bold"><InlineEditable value={useSecondary ? state.nameSecondary : state.name} onChange={(v) => patch(useSecondary ? { nameSecondary: v } : { name: v })} placeholder="Name" editable={editable} style={headingStyle} /></div>
            <div className="flex items-center gap-3">
              {onPreviewLangChange && state.secondaryMode === "self" && (
                <nav className="flex gap-2 text-xs font-semibold">
                  <button className={previewLang === "primary" ? "underline" : "opacity-50"} onClick={() => onPreviewLangChange("primary")}>EN</button>
                  <button className={previewLang === "secondary" ? "underline" : "opacity-50"} onClick={() => onPreviewLangChange("secondary")}>GE</button>
                </nav>
              )}
              <InlineEditable value={state.phone} onChange={(v) => patch({ phone: v })} placeholder="Phone" editable={editable} style={{ color: "var(--accent)", ...headingStyle }} />
            </div>
          </motion.header>
          <HeroSegment state={state} editable={editable} useSecondary={useSecondary} isResponsive={isResponsive} photoBusy={photoBusy} fileRef={fileRef} ownerName={ownerName} previewLang={previewLang} rotateX={rotateX} rotateY={rotateY} handleMouseMove={handleMouseMove} handleMouseLeave={handleMouseLeave} patch={patch} setServiceLine={setServiceLine} headingStyle={headingStyle} bodyStyle={bodyStyle} itemVariants={itemVariants(vars["--entrance-y"], vars["--spring-damping"])} glassStyle={glassStyle} />
        </div>
        <div className={isResponsive ? "md:col-span-12 lg:col-span-8 md:flex md:flex-col md:gap-6" : ""}>
          <ServicesSegment state={state} editable={editable} useSecondary={useSecondary} isResponsive={isResponsive} expandedService={expandedService} setExpandedService={setExpandedService} patch={patch} setServiceLine={setServiceLine} setServiceDescriptionLine={setServiceDescriptionLine} headingStyle={headingStyle} bodyStyle={bodyStyle} itemVariants={itemVariants(vars["--entrance-y"], vars["--spring-damping"])} glassStyle={glassStyle} icons={ICONS} />
          <ContactSocialSegment state={state} editable={editable} useSecondary={useSecondary} isResponsive={isResponsive} address={useSecondary ? state.addressSecondary || state.address : state.address} patch={patch} bodyStyle={bodyStyle} itemVariants={itemVariants(vars["--entrance-y"], vars["--spring-damping"])} glassStyle={glassStyle} />
          <UtilitySegments state={state} ownerName={ownerName} qrDataUrl={qrDataUrl} shareFeedback={shareFeedback} handleShare={handleShare} referHref={`https://wa.me/?text=${encodeURIComponent(`Exclusive Recommendation: ${state.name} — ${state.title}. \n\n${onPatch ? "https://genezisi.com" : window.location.href}`)}`} />
          <BrandingFooter ownerName={ownerName} hideBranding={hideBranding} homeHref={homeHref} />
        </div>
      </motion.div>
    </div>
  );
});

export default BusinessCardTemplate;
