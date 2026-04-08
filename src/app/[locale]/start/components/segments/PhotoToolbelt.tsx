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
  width?: string;
}

export function PhotoToolbelt({
  state,
  patch,
  onReplace,
  photoContainerRef,
  width = "320px",
}: PhotoToolbeltProps) {
  const [floatingLabel, setFloatingLabel] = useState<{ label: string; key: number } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null);
  const toolbeltRootRef = useRef<HTMLDivElement | null>(null);
  const overPhotoRef = useRef(false);
  const overToolbeltRef = useRef(false);

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
    const toolbeltRoot = toolbeltRootRef.current;
    if (!photoContainer || !toolbeltRoot) return;

    const syncVisibility = () => {
      setIsVisible(overPhotoRef.current || overToolbeltRef.current);
    };

    const handlePhotoEnter = () => {
      overPhotoRef.current = true;
      syncVisibility();
    };
    const handlePhotoLeave = () => {
      overPhotoRef.current = false;
      syncVisibility();
    };
    const handlePhotoPointerDown = () => {
      overPhotoRef.current = true;
      setIsVisible(true);
    };

    const handleToolbeltEnter = () => {
      overToolbeltRef.current = true;
      syncVisibility();
    };
    const handleToolbeltLeave = () => {
      overToolbeltRef.current = false;
      syncVisibility();
    };

    const handleGlobalPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      const insidePhoto = Boolean(target && photoContainer.contains(target));
      const insideToolbelt = Boolean(target && toolbeltRoot.contains(target));
      if (!insidePhoto && !insideToolbelt) {
        overPhotoRef.current = false;
        overToolbeltRef.current = false;
        setIsVisible(false);
        setHoveredTooltip(null);
      }
    };

    photoContainer.addEventListener("mouseenter", handlePhotoEnter);
    photoContainer.addEventListener("mouseleave", handlePhotoLeave);
    photoContainer.addEventListener("pointerdown", handlePhotoPointerDown);
    toolbeltRoot.addEventListener("mouseenter", handleToolbeltEnter);
    toolbeltRoot.addEventListener("mouseleave", handleToolbeltLeave);
    window.addEventListener("pointerdown", handleGlobalPointerDown);

    return () => {
      photoContainer.removeEventListener("mouseenter", handlePhotoEnter);
      photoContainer.removeEventListener("mouseleave", handlePhotoLeave);
      photoContainer.removeEventListener("pointerdown", handlePhotoPointerDown);
      toolbeltRoot.removeEventListener("mouseenter", handleToolbeltEnter);
      toolbeltRoot.removeEventListener("mouseleave", handleToolbeltLeave);
      window.removeEventListener("pointerdown", handleGlobalPointerDown);
    };
  }, [photoContainerRef]);

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
    <div ref={toolbeltRootRef} className="relative" style={{ width }}>
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
              <ToolButton
                icon={<Shapes className="h-[18px] w-[18px]" />}
                onClick={cycleShape}
                tooltip="Format / Shape"
                hoveredTooltip={hoveredTooltip}
                setHoveredTooltip={setHoveredTooltip}
              />
              <ToolButton
                icon={<Wand2 className="h-[18px] w-[18px]" />}
                onClick={cycleEffect}
                tooltip="Filters"
                hoveredTooltip={hoveredTooltip}
                setHoveredTooltip={setHoveredTooltip}
              />
              <ToolButton
                icon={<FrameIcon className="h-[18px] w-[18px]" />}
                onClick={toggleBorder}
                tooltip="Borders"
                hoveredTooltip={hoveredTooltip}
                setHoveredTooltip={setHoveredTooltip}
              />
              <ToolButton
                icon={<Layers className="h-[18px] w-[18px]" />}
                onClick={cycleOverlay}
                tooltip="Effect Layers"
                hoveredTooltip={hoveredTooltip}
                setHoveredTooltip={setHoveredTooltip}
              />
              <ToolButton
                icon={<Crosshair className="h-[18px] w-[18px]" />}
                onClick={centerPhoto}
                tooltip="Center Photo"
                hoveredTooltip={hoveredTooltip}
                setHoveredTooltip={setHoveredTooltip}
              />
              <ToolButton
                icon={<RefreshCw className="h-[18px] w-[18px]" />}
                onClick={handleReplace}
                tooltip="Replace Photo"
                hoveredTooltip={hoveredTooltip}
                setHoveredTooltip={setHoveredTooltip}
                highlight
              />
              <ToolButton
                icon={<RotateCcw className="h-[18px] w-[18px]" />}
                onClick={openResetConfirm}
                tooltip="Reset Photo"
                hoveredTooltip={hoveredTooltip}
                setHoveredTooltip={setHoveredTooltip}
              />
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
  tooltip,
  hoveredTooltip,
  setHoveredTooltip,
  highlight = false,
}: {
  icon: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  tooltip: string;
  hoveredTooltip: string | null;
  setHoveredTooltip: (value: string | null) => void;
  highlight?: boolean;
}) {
  const isTooltipVisible = hoveredTooltip === tooltip;
  return (
    <div className="relative flex items-center justify-center">
      <AnimatePresence>
        {isTooltipVisible && (
          <motion.span
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 3 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
            className="pointer-events-none absolute -top-8 whitespace-nowrap rounded-md bg-white px-2 py-1 text-[10px] font-semibold text-black shadow"
          >
            {tooltip}
          </motion.span>
        )}
      </AnimatePresence>
      <button
        onClick={onClick}
        onMouseEnter={() => setHoveredTooltip(tooltip)}
        onMouseLeave={() => setHoveredTooltip(null)}
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
    </div>
  );
}
