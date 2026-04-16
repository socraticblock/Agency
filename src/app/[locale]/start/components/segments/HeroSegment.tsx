"use client";

import { useState, useRef, useEffect, useCallback, type CSSProperties, type RefObject } from "react";
import { motion, AnimatePresence, type MotionValue } from "framer-motion";
import Image from "next/image";
import { Camera, Crosshair, FrameIcon, Layers, RefreshCw, RotateCcw, Shapes, Wand2 } from "lucide-react";
import type { Lane1CustomizerState } from "../../lib/types";
import { InlineEditable } from "../InlineEditable";
import { PhotoToolbelt } from "./PhotoToolbelt";
import { PHOTO_BORDER_PRESETS, PHOTO_EFFECT_PRESETS, PHOTO_OVERLAY_PRESETS, PHOTO_SHAPE_PRESETS } from "../../lib/presets";
import { usePillOnboardingGlow } from "./usePillOnboardingGlow";

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
  orderHighlightIssueIds?: ReadonlySet<string>;
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
  orderHighlightIssueIds,
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
  } = style as any;
  const [mobileFloatingLabel, setMobileFloatingLabel] = useState<{ label: string; key: number } | null>(null);
  const [mobilePhotoToolsOpen, setMobilePhotoToolsOpen] = useState(false);
  const shouldGlowEditPhoto = usePillOnboardingGlow("edit-photo-mobile", mobilePhotoToolsOpen);
  const mobileToolsRef = useRef<HTMLDivElement | null>(null);

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
  const didDragRef = useRef(false);
  const lastTouchRef = useRef<{ x: number; y: number } | null>(null);
  const lastPinchDistRef = useRef<number | null>(null);
  const posXRef = useRef(photoPositionX);
  const posYRef = useRef(photoPositionY);
  posXRef.current = photoPositionX;
  posYRef.current = photoPositionY;

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!editable || !state.photoDataUrl) return;
    didDragRef.current = false;
    // On mobile (<768), open modal instead
    if (window.innerWidth < 768) return;
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragState.current = { x: e.clientX, y: e.clientY };
  }, [editable, state.photoDataUrl]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current || !editable) return;
    didDragRef.current = true;
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

  const onTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!editable || !state.photoDataUrl || window.innerWidth >= 768) return;
    if (e.touches.length === 1) {
      lastTouchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      lastPinchDistRef.current = null;
      return;
    }
    if (e.touches.length === 2) {
      const [t1, t2] = [e.touches[0], e.touches[1]];
      lastPinchDistRef.current = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      lastTouchRef.current = null;
    }
  }, [editable, state.photoDataUrl]);

  const onTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!editable || !state.photoDataUrl || window.innerWidth >= 768) return;

    if (e.touches.length === 1 && lastTouchRef.current) {
      didDragRef.current = true;
      e.preventDefault();
      const dx = (e.touches[0].clientX - lastTouchRef.current.x) / 2.5;
      const dy = (e.touches[0].clientY - lastTouchRef.current.y) / 2.5;
      lastTouchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      patch({
        style: {
          ...styleRef.current,
          photoPositionX: Math.max(-50, Math.min(150, posXRef.current + dx)),
          photoPositionY: Math.max(-50, Math.min(150, posYRef.current + dy)),
        },
      });
      return;
    }

    if (e.touches.length === 2 && lastPinchDistRef.current !== null) {
      didDragRef.current = true;
      e.preventDefault();
      const [t1, t2] = [e.touches[0], e.touches[1]];
      const nextDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      const ratio = nextDist / lastPinchDistRef.current;
      lastPinchDistRef.current = nextDist;
      const nextZoom = Math.max(80, Math.min(400, zoomRef.current * ratio));
      patch({ style: { ...styleRef.current, photoZoom: Math.round(nextZoom) } });
    }
  }, [editable, patch, state.photoDataUrl]);

  const onTouchEnd = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (window.innerWidth >= 768) return;
    if (e.touches.length === 0) {
      lastTouchRef.current = null;
      lastPinchDistRef.current = null;
      return;
    }
    if (e.touches.length === 1) {
      lastTouchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      lastPinchDistRef.current = null;
    }
  }, []);

  // ─── Click handler: mobile opens modal, desktop is no-op ────────────────
  const onPhotoClick = useCallback((e: React.MouseEvent) => {
    if (!editable || photoBusy) return;
    if (didDragRef.current) {
      didDragRef.current = false;
      return;
    }
    e.stopPropagation();
    fileRef.current?.click();
  }, [editable, photoBusy, fileRef]);

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
  const imageFitClass = "object-contain";

  const effectFilter = PHOTO_EFFECT_PRESETS.find(p => p.id === photoEffect)?.filter || "none";
  const showMobileLabel = (label: string) => {
    setMobileFloatingLabel({ label, key: Date.now() });
  };

  useEffect(() => {
    if (!mobileFloatingLabel) return;
    const timer = window.setTimeout(() => setMobileFloatingLabel(null), 850);
    return () => window.clearTimeout(timer);
  }, [mobileFloatingLabel]);

  useEffect(() => {
    if (!mobilePhotoToolsOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (mobileToolsRef.current?.contains(target)) return;
      setMobilePhotoToolsOpen(false);
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [mobilePhotoToolsOpen]);

  const currentShape = photoShape;
  const currentEffect = photoEffect;
  const currentBorder = photoBorder;
  const currentOverlay = photoOverlay;
  const cycleMobileShape = () => {
    const idx = PHOTO_SHAPE_PRESETS.findIndex((p) => p.id === currentShape);
    const nextIdx = (idx + 1) % PHOTO_SHAPE_PRESETS.length;
    const nextShape = PHOTO_SHAPE_PRESETS[nextIdx];
    patch({ style: { ...styleRef.current, photoShape: nextShape.id as any } });
    showMobileLabel(nextShape.labelEn);
  };
  const cycleMobileEffect = () => {
    const idx = PHOTO_EFFECT_PRESETS.findIndex((p) => p.id === currentEffect);
    const nextIdx = (idx + 1) % PHOTO_EFFECT_PRESETS.length;
    const nextEffect = PHOTO_EFFECT_PRESETS[nextIdx];
    patch({ style: { ...styleRef.current, photoEffect: nextEffect.id as any } });
    showMobileLabel(nextEffect.labelEn);
  };
  const cycleMobileBorder = () => {
    const idx = PHOTO_BORDER_PRESETS.findIndex((p) => p.id === currentBorder);
    const nextIdx = (idx + 1) % PHOTO_BORDER_PRESETS.length;
    const nextBorder = PHOTO_BORDER_PRESETS[nextIdx];
    patch({ style: { ...styleRef.current, photoBorder: nextBorder.id as any } });
    showMobileLabel(nextBorder.labelEn);
  };
  const cycleMobileOverlay = () => {
    const idx = PHOTO_OVERLAY_PRESETS.findIndex((p) => p.id === currentOverlay);
    const nextIdx = (idx + 1) % PHOTO_OVERLAY_PRESETS.length;
    const nextOverlay = PHOTO_OVERLAY_PRESETS[nextIdx];
    patch({ style: { ...styleRef.current, photoOverlay: nextOverlay.id as any } });
    showMobileLabel(nextOverlay.labelEn);
  };
  const centerMobilePhoto = () => {
    patch({
      style: { ...styleRef.current, photoPositionX: 50, photoPositionY: 50, photoZoom: 100 },
    });
    showMobileLabel(useSecondary ? "ცენტრშია" : "Centered");
  };
  const resetMobilePhoto = () => {
    const ok = window.confirm(useSecondary ? "გაანულდეს ფოტო რედაქტირება?" : "Reset photo edits?");
    if (!ok) return;
    patch({
      style: {
        ...styleRef.current,
        photoPositionX: 50,
        photoPositionY: 50,
        photoZoom: 100,
        photoEffect: "none" as any,
        photoBorder: "none" as any,
        photoOverlay: "none" as any,
      },
    });
    showMobileLabel(useSecondary ? "ფოტო განულდა" : "Photo reset");
  };

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
      <motion.section
        variants={itemVariants}
        style={{
          borderColor: "var(--accent-secondary)",
          ...glassStyle,
          rotateX: isResponsive ? rotateX : 0,
          rotateY: isResponsive ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className={`business-card-print-hero relative border-t px-4 pb-8 pt-8 transition-all duration-500 ${isResponsive ? "md:rounded-3xl md:border hover:shadow-2xl" : ""
          }`}
      >

        <div className="relative z-10 flex w-full flex-col items-center gap-5 text-center">

          {/* ── Photo Zone with fixed toolbar anchor ───────────────────── */}
          <div
            ref={photoToolbeltWrapperRef}
            className={`relative flex min-h-[200px] w-full flex-shrink-0 justify-center ${photoShape === "wide-cinematic" ? "max-w-[520px]" : "max-w-[250px]"
              }`}
          >
            {/* ── Photo Zone ─────────────────────────────────────── */}
            <div
              ref={photoContainerRef}
              className={`group relative ${shapeClass} ${isResponsive ? "md:sticky md:top-4 md:z-20" : "z-20"
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
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
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
          {editable ? (
            <div className="w-full md:hidden">
              <div ref={mobileToolsRef} className="relative mx-auto w-full max-w-[520px]">
                <AnimatePresence>
                  {mobilePhotoToolsOpen && mobileFloatingLabel ? (
                    <motion.div
                      key={mobileFloatingLabel.key}
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: -8 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1 text-[11px] font-semibold text-black shadow"
                    >
                      {mobileFloatingLabel.label}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
                {mobilePhotoToolsOpen && state.photoDataUrl ? (
                  <div className="flex w-full flex-wrap justify-center gap-1.5 rounded-2xl border border-white/20 bg-black/75 p-2 text-white shadow-lg backdrop-blur-md">
                    <MobilePhotoToolButton icon={<Shapes className="h-3.5 w-3.5" />} label={useSecondary ? "ფორმა" : "Shape"} onClick={cycleMobileShape} />
                    <MobilePhotoToolButton icon={<Wand2 className="h-3.5 w-3.5" />} label={useSecondary ? "ფილტრი" : "Filter"} onClick={cycleMobileEffect} />
                    <MobilePhotoToolButton icon={<FrameIcon className="h-3.5 w-3.5" />} label={useSecondary ? "ჩარჩო" : "Border"} onClick={cycleMobileBorder} />
                    <MobilePhotoToolButton icon={<Layers className="h-3.5 w-3.5" />} label={useSecondary ? "ეფექტი" : "Layers"} onClick={cycleMobileOverlay} />
                    <MobilePhotoToolButton icon={<Crosshair className="h-3.5 w-3.5" />} label={useSecondary ? "ცენტრი" : "Center"} onClick={centerMobilePhoto} />
                    <MobilePhotoToolButton icon={<RefreshCw className="h-3.5 w-3.5" />} label={useSecondary ? "შეცვლა" : "Replace"} onClick={() => fileRef.current?.click()} />
                    <MobilePhotoToolButton icon={<RotateCcw className="h-3.5 w-3.5" />} label={useSecondary ? "გაანულება" : "Reset"} onClick={resetMobilePhoto} />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (!state.photoDataUrl) {
                        fileRef.current?.click();
                        return;
                      }
                      setMobilePhotoToolsOpen(true);
                    }}
                    className={`mx-auto inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/75 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white shadow-lg backdrop-blur-md ${shouldGlowEditPhoto ? "business-card-pill-attention" : ""
                      }`}
                  >
                    <Camera className="h-3.5 w-3.5" />
                    {useSecondary ? "ფოტოს რედაქტირება" : "Edit photo"}
                  </button>
                )}
              </div>
            </div>
          ) : null}

          {/* ── Identity Text ───────────────────────────────────── */}
          <div
            ref={heroActiveZoneRef}
            className={`relative z-10 w-full space-y-1 bg-transparent pt-4 text-center transition-all ${orderHighlightIssueIds?.has("name") || orderHighlightIssueIds?.has("title")
              ? "rounded-xl ring-2 ring-red-600 ring-offset-2 ring-offset-transparent"
              : ""
              }`}
          >
            <h1 className="text-2xl md:text-3xl font-bold leading-tight" style={headingStyle}>
              <InlineEditable
                value={useSecondary ? state.nameSecondary : state.name}
                onChange={(v) => patch(useSecondary ? { nameSecondary: v } : { name: v })}
                placeholder={useSecondary ? "შენი სახელი" : "Your Name"}
                editable={editable}
                className="block w-full"
                style={{ ...headingStyle, textAlign: "center" }}
              />
            </h1>

            <p className="text-lg opacity-90" style={bodyStyle}>
              <InlineEditable
                value={useSecondary ? state.titleSecondary : state.title}
                onChange={(v) => patch(useSecondary ? { titleSecondary: v } : { title: v })}
                placeholder={useSecondary ? "სამუშაოს დასახელება" : "Job title"}
                editable={editable}
                className="block w-full"
                style={{ ...bodyStyle, textAlign: "center" }}
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
                style={{ ...bodyStyle, textAlign: "center" }}
              />
            </p>

            {(editable || (useSecondary ? state.taglineSecondary : state.tagline)?.trim()) && (
              <div className="pt-2">
                <p
                  className="mx-auto max-w-[90%] text-xs italic leading-relaxed opacity-70"
                  style={bodyStyle}
                >
                  <InlineEditable
                    value={useSecondary ? state.taglineSecondary : state.tagline}
                    onChange={(v) => patch(useSecondary ? { taglineSecondary: v } : { tagline: v })}
                    placeholder={useSecondary ? "დაამატეთ პროფესიონალური სლოგანი" : "add professional tagline"}
                    editable={editable}
                    className="block w-full"
                    style={{ ...bodyStyle, textAlign: "center" }}
                  />
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.section>
  );
}

function MobilePhotoToolButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white transition hover:bg-white/20 active:scale-95"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
