"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Wand2, Shapes, FrameIcon, Layers, Crosshair, RotateCcw } from "lucide-react";
import { PHOTO_EFFECT_PRESETS, PHOTO_SHAPE_PRESETS, PHOTO_OVERLAY_PRESETS, PHOTO_BORDER_PRESETS } from "../../lib/presets";
import type { Lane1CustomizerState } from "../../lib/types";

interface PhotoToolbeltProps {
  state: Lane1CustomizerState;
  patch: (p: Partial<Lane1CustomizerState>) => void;
  onReplace: () => void;
  photoContainerRef: React.RefObject<HTMLDivElement | null>;
  heroActiveZoneRef?: React.RefObject<HTMLDivElement | null>;
  width?: string;
}

export function PhotoToolbelt({
  state,
  patch,
  onReplace,
  photoContainerRef,
  heroActiveZoneRef,
  width = "320px",
}: PhotoToolbeltProps) {
  const [floatingLabel, setFloatingLabel] = useState<{ label: string; key: number } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentEffect = state.style.photoEffect || "none";
  const currentShape = state.style.photoShape || "circle";
  const currentBorder = state.style.photoBorder || "none";
  const currentOverlay = state.style.photoOverlay || "none";

  const showFloatingLabel = useCallback((label: string) => {
    setFloatingLabel({ label, key: Date.now() });
  }, []);

  useEffect(() => {
    if (!floatingLabel) return;
    const timer = setTimeout(() => setFloatingLabel(null), 800);
    return () => clearTimeout(timer);
  }, [floatingLabel]);

  useEffect(() => {
    const photoContainer = photoContainerRef.current;
    if (!photoContainer) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = photoContainer.getBoundingClientRect();
      const centerX = rect.x + rect.width / 2;
      const centerY = rect.y + rect.height / 2;
      const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      const inPhotoZone = distance <= Math.max(rect.width, rect.height) / 2 + 250;
      const activeZoneEl = heroActiveZoneRef?.current;
      const inHeroTextZone = Boolean(
        activeZoneEl &&
        e.clientX >= activeZoneEl.getBoundingClientRect().left &&
        e.clientX <= activeZoneEl.getBoundingClientRect().right &&
        e.clientY >= activeZoneEl.getBoundingClientRect().top &&
        e.clientY <= activeZoneEl.getBoundingClientRect().bottom,
      );
      const shouldShow = inPhotoZone || inHeroTextZone;

      if (shouldShow) {
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        if (!isVisible) {
          if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
          openTimeoutRef.current = setTimeout(() => setIsVisible(true), 120);
        }
      } else {
        if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
        if (isVisible) {
          if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
          closeTimeoutRef.current = setTimeout(() => setIsVisible(false), 200);
        }
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, [heroActiveZoneRef, isVisible, photoContainerRef]);

  const cycleEffect = (e: React.MouseEvent) => {
    e.stopPropagation();
    const idx = PHOTO_EFFECT_PRESETS.findIndex((p) => p.id === currentEffect);
    const nextIdx = (idx + 1) % PHOTO_EFFECT_PRESETS.length;
    const nextEffect = PHOTO_EFFECT_PRESETS[nextIdx];
    patch({
      style: { ...state.style, photoEffect: nextEffect.id as any },
    });
    showFloatingLabel(nextEffect.labelEn);
  };

  const cycleShape = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shapes = ["circle", "rounded-square", "wide-cinematic"];
    const idx = shapes.indexOf(currentShape);
    const nextIdx = (idx + 1) % shapes.length;
    const nextShapeId = shapes[nextIdx];
    patch({
      style: { ...state.style, photoShape: nextShapeId as any },
    });
    const shapePreset = PHOTO_SHAPE_PRESETS.find(p => p.id === nextShapeId);
    if (shapePreset) showFloatingLabel(shapePreset.labelEn);
  };

  const toggleBorder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const borders = ["none", "glow-ring", "thin-ring", "thick-ring"];
    const idx = borders.indexOf(currentBorder);
    const nextIdx = (idx + 1) % borders.length;
    const nextBorderId = borders[nextIdx];
    patch({
      style: { ...state.style, photoBorder: nextBorderId as any },
    });
    const borderPreset = PHOTO_BORDER_PRESETS.find(p => p.id === nextBorderId);
    if (borderPreset) showFloatingLabel(borderPreset.labelEn);
  };

  const cycleOverlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const idx = PHOTO_OVERLAY_PRESETS.findIndex((p) => p.id === currentOverlay);
    const nextIdx = (idx + 1) % PHOTO_OVERLAY_PRESETS.length;
    const nextOverlay = PHOTO_OVERLAY_PRESETS[nextIdx];
    patch({
      style: { ...state.style, photoOverlay: nextOverlay.id as any },
    });
    showFloatingLabel(nextOverlay.labelEn);
  };

  const centerPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    patch({
      style: { ...state.style, photoPositionX: 50, photoPositionY: 50, photoZoom: 100 },
    });
    showFloatingLabel("Centered");
  };

  const handleReplace = (e: React.MouseEvent) => {
    e.stopPropagation();
    onReplace();
  };

  const openResetConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    setResetConfirmOpen(true);
  };

  const resetEverything = () => {
    patch({
      style: {
        ...state.style,
        photoPositionX: 50,
        photoPositionY: 50,
        photoZoom: 100,
        photoEffect: "none" as any,
        photoBorder: "none" as any,
        photoOverlay: "none" as any,
      },
    });
    showFloatingLabel("Photo reset");
    setResetConfirmOpen(false);
  };

  return (
    <div className="relative" style={{ width }}>
      <AnimatePresence>
        {resetConfirmOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[220] flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
            onClick={() => setResetConfirmOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h4 className="text-base font-semibold text-slate-900">Reset Photo Styling?</h4>
              <p className="mt-2 text-sm text-slate-600">
                This will center your photo and remove all active filters, borders, and overlays.
              </p>
              <div className="mt-5 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setResetConfirmOpen(false)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={resetEverything}
                  className="rounded-lg bg-black px-3 py-2 text-sm font-semibold text-white transition hover:bg-black/90"
                >
                  Reset Everything
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isVisible && floatingLabel && (
          <motion.div
            key={floatingLabel.key}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -10 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute left-1/2 -top-12 -translate-x-1/2 z-50 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 shadow-lg"
          >
            <span className="text-xs font-bold text-black">{floatingLabel.label}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative z-40"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center gap-1.5 rounded-2xl border border-white/20 bg-black/85 p-2 shadow-2xl backdrop-blur-md">
              <ToolButton icon={<Shapes className="h-[18px] w-[18px]" />} onClick={cycleShape} />
              <ToolButton icon={<Wand2 className="h-[18px] w-[18px]" />} onClick={cycleEffect} />
              <ToolButton icon={<FrameIcon className="h-[18px] w-[18px]" />} onClick={toggleBorder} />
              <ToolButton icon={<Layers className="h-[18px] w-[18px]" />} onClick={cycleOverlay} />
              <ToolButton icon={<Crosshair className="h-[18px] w-[18px]" />} onClick={centerPhoto} />
              <ToolButton icon={<RefreshCw className="h-[18px] w-[18px]" />} onClick={handleReplace} highlight />
              <ToolButton icon={<RotateCcw className="h-[18px] w-[18px]" />} onClick={openResetConfirm} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ToolButton({
  icon,
  onClick,
  highlight = false,
}: {
  icon: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  highlight?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex h-9 w-9 items-center justify-center rounded-xl
        text-white/90 transition-all duration-150
        hover:bg-white/15 hover:text-white hover:scale-105
        active:scale-95 active:bg-white/20
        ${highlight ? "hover:bg-white/20" : ""}
      `}
    >
      {icon}
    </button>
  );
}
