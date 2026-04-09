"use client";

import { useState, useRef, useEffect, useCallback, type CSSProperties, type RefObject } from "react";
import { motion, AnimatePresence, type MotionValue } from "framer-motion";
import Image from "next/image";
import { Camera } from "lucide-react";
import type { Lane1CustomizerState } from "../../lib/types";
import { InlineEditable } from "../InlineEditable";
import { PhotoToolbelt } from "./PhotoToolbelt";
import { PhotoEditModal } from "./PhotoEditModal";
import { PHOTO_EFFECT_PRESETS } from "../../lib/presets";

interface HeroSegmentProps {
  state: Lane1CustomizerState;
  editable: boolean;
  useSecondary: boolean;
  isResponsive: boolean;
  photoBusy: boolean;
  fileRef: RefObject<HTMLInputElement | null>;
  ownerName: string;
  previewLang: "primary" | "secondary";
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseLeave: () => void;
  patch: (p: Partial<Lane1CustomizerState>) => void;
  setServiceLine: (i: number, v: string) => void;
  headingStyle: CSSProperties;
  bodyStyle: CSSProperties;
  itemVariants: any;
  glassStyle: CSSProperties;
}

export function HeroSegment({
  state,
  editable,
  useSecondary,
  isResponsive,
  photoBusy,
  fileRef,
  ownerName,
  previewLang,
  rotateX,
  rotateY,
  handleMouseMove,
  handleMouseLeave,
  patch,
  setServiceLine,
  headingStyle,
  bodyStyle,
  itemVariants,
  glassStyle,
}: HeroSegmentProps) {
  const style = state.style || {};
  const {
    photoShape = "circle",
    photoZoom = 100,
    photoPositionX = 50,
    photoPositionY = 50,
    photoEffect = "none",
    photoOverlay = "none",
    photoBorder = "none",
    photoAlignment = "left",
  } = style as any;

  const [mobileModalOpen, setMobileModalOpen] = useState(false);

  // ─── Desktop: non-passive wheel for zoom ────────────────────────────────
  const photoContainerRef = useRef<HTMLDivElement>(null);
  const photoToolbeltWrapperRef = useRef<HTMLDivElement>(null);
  const heroActiveZoneRef = useRef<HTMLDivElement>(null);
  const photoHoverRef = useRef(false);
  // Use a ref to always get the latest zoom value without re-attaching the listener
  const zoomRef = useRef(photoZoom);
  zoomRef.current = photoZoom;
  const styleRef = useRef(state.style);
  styleRef.current = state.style;

  useEffect(() => {
    const el = photoContainerRef.current;
    if (!el || !editable || !state.photoDataUrl) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const zoomDelta = -e.deltaY * 0.15;
      const nextZoom = Math.max(80, Math.min(400, zoomRef.current + zoomDelta));
      patch({ style: { ...styleRef.current, photoZoom: Math.round(nextZoom) } });
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editable, state.photoDataUrl]);

  // Prevent document scroll while interacting with the photo zone.
  useEffect(() => {
    if (!editable || !state.photoDataUrl) return;
    const handleGlobalWheel = (e: WheelEvent) => {
      if (!photoHoverRef.current) return;
      e.preventDefault();
    };
    window.addEventListener("wheel", handleGlobalWheel, { passive: false, capture: true });
    return () => window.removeEventListener("wheel", handleGlobalWheel, true);
  }, [editable, state.photoDataUrl]);

  // ─── Desktop: raw pointer events for drag/pan ───────────────────────────
  const dragState = useRef<{ x: number; y: number } | null>(null);
  const posXRef = useRef(photoPositionX);
  const posYRef = useRef(photoPositionY);
  posXRef.current = photoPositionX;
  posYRef.current = photoPositionY;

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!editable || !state.photoDataUrl) return;
    // On mobile (<768), open modal instead
    if (window.innerWidth < 768) return;
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragState.current = { x: e.clientX, y: e.clientY };
  }, [editable, state.photoDataUrl]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current || !editable) return;
    e.preventDefault();
    const dx = (e.clientX - dragState.current.x) / 1.8;
    const dy = (e.clientY - dragState.current.y) / 1.8;
    dragState.current = { x: e.clientX, y: e.clientY };
    patch({
      style: {
        ...styleRef.current,
        photoPositionX: Math.max(-50, Math.min(150, posXRef.current + dx)),
        photoPositionY: Math.max(-50, Math.min(150, posYRef.current + dy)),
      },
    });
  }, [editable, patch]);

  const onPointerUp = useCallback(() => {
    dragState.current = null;
  }, []);

  // ─── Click handler: mobile opens modal, desktop is no-op ────────────────
  const onPhotoClick = useCallback((e: React.MouseEvent) => {
    if (!editable || photoBusy) return;
    if (!state.photoDataUrl) {
      fileRef.current?.click();
      return;
    }
    if (window.innerWidth < 768) {
      e.stopPropagation();
      setMobileModalOpen(true);
    }
  }, [editable, photoBusy, state.photoDataUrl, fileRef]);

  // ─── Visual helpers ──────────────────────────────────────────────────────
  const cssGrainDataUrl = `url("data:image/svg+xml,${encodeURIComponent(
    `<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noiseFilter)'/></svg>`,
  )}")`;

  const shapeClass = ({
    circle: "w-[250px]",
    "rounded-square": "w-[250px]",
    "wide-cinematic": "w-full",
  } as Record<string, string>)[photoShape as string] || "w-[250px]";
  const shapeRadius =
    photoShape === "circle" ? "50%" : photoShape === "rounded-square" ? "16px" : "12px";
  const imageFitClass = photoShape === "wide-cinematic" ? "object-contain" : "object-cover";

  const effectFilter = PHOTO_EFFECT_PRESETS.find(p => p.id === photoEffect)?.filter || "none";

  const getBorderStyle = (): CSSProperties => {
    const accentColor = "var(--accent)";
    if (photoBorder === "thin-ring") return { border: `1px solid ${accentColor}` };
    if (photoBorder === "thick-ring") return { border: `4px solid ${accentColor}` };
    if (photoBorder === "glow-ring") return { border: `2px solid ${accentColor}`, boxShadow: `0 0 15px ${accentColor}` };
    if (photoBorder === "double-frame") return {
      border: `1px solid ${accentColor}`,
      padding: "3px",
      outline: `1px solid ${accentColor}`,
      outlineOffset: "-4px",
    };
    if (photoBorder === "gradient-border") return {
      border: "3px solid transparent",
      backgroundImage: `linear-gradient(var(--bg-primary), var(--bg-primary)), var(--bg-gradient)`,
      backgroundOrigin: "border-box",
      backgroundClip: "content-box, border-box",
    };
    return { border: "none" };
  };

  const borderStyle = getBorderStyle();
  const companyValue =
    useSecondary && state.company.trim() === "Company Name" ? "" : state.company;

  return (
    <>
      {/* Sovereign Mobile Modal */}
      {mobileModalOpen && editable && (
        <PhotoEditModal
          state={state}
          patch={patch}
          onClose={() => setMobileModalOpen(false)}
          onReplace={() => {
            setMobileModalOpen(false);
            fileRef.current?.click();
          }}
        />
      )}

      <motion.section
        variants={itemVariants}
        style={{
          borderColor: "var(--accent-secondary)",
          ...glassStyle,
          rotateX: isResponsive ? rotateX : 0,
          rotateY: isResponsive ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className={`business-card-print-hero relative border-t px-4 pb-8 pt-8 transition-all duration-500 ${
          isResponsive ? "md:rounded-3xl md:border hover:shadow-2xl" : ""
        }`}
      >
        <div className={`flex w-full flex-col gap-5 ${
          photoAlignment === "center" ? "items-center text-center" : "items-start text-left"
        }`}>

          {/* ── Photo Zone with fixed toolbar anchor ───────────────────── */}
          <div
            ref={photoToolbeltWrapperRef}
            className={`relative flex min-h-[200px] w-full flex-shrink-0 justify-center ${
              photoShape === "wide-cinematic" ? "max-w-[520px]" : "max-w-[250px]"
            }`}
          >
            {/* ── Photo Zone ─────────────────────────────────────── */}
            <div
              ref={photoContainerRef}
              className={`group relative ${shapeClass} ${
                isResponsive ? "md:sticky md:top-4 md:z-20" : "z-20"
              }`}
              style={{
                cursor: editable
                  ? state.photoDataUrl
                    ? "move"
                    : "pointer"
                  : "default",
                touchAction: "none",
                width: photoShape === "wide-cinematic" ? "100%" : "250px",
                height: photoShape === "wide-cinematic" ? "250px" : "250px",
                aspectRatio: photoShape === "wide-cinematic" ? "16/9" : undefined,
                borderRadius: shapeRadius,
              }}
              onMouseEnter={() => {
                photoHoverRef.current = true;
              }}
              onMouseLeave={() => {
                photoHoverRef.current = false;
              }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onClick={onPhotoClick}
            >
            {state.photoDataUrl ? (
              <div className="h-full w-full relative">
                {/* Masked Image Layer */}
                <div
                  className="absolute inset-0 overflow-hidden bg-slate-100"
                  style={{ ...borderStyle, borderRadius: shapeRadius }}
                >
                  <Image
                    key={state.photoDataUrl?.slice(0, 64) || "empty"}
                    src={state.photoDataUrl}
                    alt=""
                    width={400}
                    height={400}
                    className={`h-full w-full ${imageFitClass} pointer-events-none select-none`}
                    style={{
                      filter: effectFilter,
                      transform: `scale(${(photoZoom || 100) / 100}) translate(${(photoPositionX || 50) - 50}%, ${(photoPositionY || 50) - 50}%)`,
                      transformOrigin: "center center",
                    }}
                    unoptimized
                    draggable={false}
                  />

                  {/* Overlay Layers (Masked) */}
                  <div className="absolute inset-0 pointer-events-none z-10">
                    {photoOverlay === "gradient-fade" && (
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-80" />
                    )}
                    {photoOverlay === "color-tint" && (
                      <div className="absolute inset-0 bg-[var(--accent)] opacity-20" />
                    )}
                    {photoOverlay === "dark-vignette" && (
                      <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.5)]" />
                    )}
                    {photoEffect === "duotone" && (
                      <div className="absolute inset-0 bg-[var(--accent)] mix-blend-multiply opacity-60" />
                    )}
                    {photoEffect === "film-grain" && (
                      <div
                        className="absolute inset-0 opacity-[0.22] mix-blend-overlay"
                        style={{ backgroundImage: cssGrainDataUrl, backgroundSize: "220px 220px" }}
                      />
                    )}
                    {photoEffect === "fade-to-white" && (
                      <div className="absolute inset-0 shadow-[inset_0_0_40px_var(--bg-primary)]" />
                    )}
                  </div>
                </div>

                {/* Mobile tap hint */}
                {editable && (
                  <div className="absolute inset-0 flex items-center justify-center md:hidden pointer-events-none">
                    <span className="rounded-full bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white opacity-0 transition group-hover:opacity-100 group-active:opacity-100">
                      {useSecondary ? "შეეხეთ რედაქტირებას" : "Tap to edit"}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div
                className="flex h-full w-full flex-col items-center justify-center gap-1 text-xs text-slate-500 transition-colors group-hover:bg-slate-200 bg-slate-100"
                style={{ ...borderStyle, borderRadius: shapeRadius }}
              >
                <Camera className="h-10 w-10 opacity-30" />
                <span>{useSecondary ? "პირადობის პროფილი" : "Identity Profile"}</span>
              </div>
            )}
            </div>

            {/* Desktop Toolbelt — anchored to shell bottom */}
            <AnimatePresence>
              {editable && state.photoDataUrl && (
                <div
                  className="absolute bottom-2 left-1/2 z-[100] hidden -translate-x-1/2 md:block"
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <PhotoToolbelt
                    photoContainerRef={photoContainerRef}
                    state={state}
                    patch={patch}
                    onReplace={() => fileRef.current?.click()}
                    width={photoShape === "wide-cinematic" ? "min(520px, 100%)" : "320px"}
                  />
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Identity Text ───────────────────────────────────── */}
          <div ref={heroActiveZoneRef} className={`w-full space-y-1 transition-all bg-transparent relative z-10 pt-4 ${
            photoAlignment === "center" ? "text-center" : "text-left"
          }`}>
            <h1 className="text-2xl md:text-3xl font-bold leading-tight" style={headingStyle}>
              <InlineEditable
                value={useSecondary ? state.nameSecondary : state.name}
                onChange={(v) => patch(useSecondary ? { nameSecondary: v } : { name: v })}
                placeholder={useSecondary ? "შენი სახელი" : "Your Name"}
                editable={editable}
                className="block w-full"
                style={{ ...headingStyle, textAlign: photoAlignment === "center" ? "center" : "inherit" }}
              />
            </h1>

            <p className="text-lg opacity-90" style={bodyStyle}>
              <InlineEditable
                value={useSecondary ? state.titleSecondary : state.title}
                onChange={(v) => patch(useSecondary ? { titleSecondary: v } : { title: v })}
                placeholder={useSecondary ? "სამუშაოს დასახელება" : "Job title"}
                editable={editable}
                className="block w-full"
                style={{ ...bodyStyle, textAlign: photoAlignment === "center" ? "center" : "inherit" }}
              />
            </p>

            <p
              className="text-sm font-semibold tracking-wide uppercase opacity-80"
              style={{ ...bodyStyle, color: "var(--accent)" }}
            >
              <InlineEditable
                value={companyValue}
                onChange={(v) => patch({ company: v })}
                placeholder={useSecondary ? "კომპანიის სახელი" : "Company Name"}
                editable={editable}
                className="block w-full"
                style={{ ...bodyStyle, textAlign: photoAlignment === "center" ? "center" : "inherit" }}
              />
            </p>

            {(editable || (useSecondary ? state.taglineSecondary : state.tagline)?.trim()) && (
              <div className="pt-2">
                <p
                  className={`text-xs italic opacity-70 leading-relaxed max-w-[90%] ${
                    photoAlignment === "center" ? "mx-auto" : ""
                  }`}
                  style={bodyStyle}
                >
                  <InlineEditable
                    value={useSecondary ? state.taglineSecondary : state.tagline}
                    onChange={(v) => patch(useSecondary ? { taglineSecondary: v } : { tagline: v })}
                    placeholder={useSecondary ? "დაამატეთ პროფესიონალური სლოგანი" : "add professional tagline"}
                    editable={editable}
                    className="block w-full"
                    style={{ ...bodyStyle, textAlign: photoAlignment === "center" ? "center" : "inherit" }}
                  />
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.section>
    </>
  );
}
