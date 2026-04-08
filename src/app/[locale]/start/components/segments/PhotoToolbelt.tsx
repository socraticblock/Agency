"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Wand2, Shapes, FrameIcon, Layers, Crosshair } from "lucide-react";
import { PHOTO_EFFECT_PRESETS, PHOTO_SHAPE_PRESETS, PHOTO_OVERLAY_PRESETS, PHOTO_BORDER_PRESETS } from "../../lib/presets";
import type { Lane1CustomizerState } from "../../lib/types";

interface PhotoToolbeltProps {
  state: Lane1CustomizerState;
  patch: (p: Partial<Lane1CustomizerState>) => void;
  onReplace: () => void;
  photoContainerRef: React.RefObject<HTMLDivElement | null>;
  width?: string;
}

export function PhotoToolbelt({ state, patch, onReplace, photoContainerRef, width = "180px" }: PhotoToolbeltProps) {
  const [floatingLabel, setFloatingLabel] = useState<{ label: string; key: number } | null>(null);
  const [isNearPhoto, setIsNearPhoto] = useState(false);
  const [hoverDelayPassed, setHoverDelayPassed] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      // Calculate distance from the center of the photo container
      const centerX = rect.x + rect.width / 2;
      const centerY = rect.y + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) +
        Math.pow(e.clientY - centerY, 2)
      );
      // Detection radius: 250px outside the photo box (photo is ~180px, so 250 from center covers it plus margin)
      const nearPhoto = distance < 340;

      if (nearPhoto && !isNearPhoto) {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = setTimeout(() => {
          setIsNearPhoto(true);
          setHoverDelayPassed(true);
        }, 150);
      } else if (!nearPhoto && isNearPhoto) {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        setIsNearPhoto(false);
        setHoverDelayPassed(false);
      }
    };

    // Attach to window to detect cursor even when outside the photo container
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, [isNearPhoto]);

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

  const shouldShowToolbelt = isNearPhoto && hoverDelayPassed;

  return (
    <div className="relative" style={{ width }}>
      {/* Floating Label */}
      <AnimatePresence>
        {shouldShowToolbelt && floatingLabel && (
          <motion.div
            key={floatingLabel.key}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -16 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute left-1/2 -top-12 -translate-x-1/2 z-50 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 shadow-lg"
          >
            <span className="text-xs font-bold text-black">{floatingLabel.label}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toolbelt Bar */}
      <AnimatePresence>
        {shouldShowToolbelt && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute -bottom-14 left-1/2 -translate-x-1/2 z-40"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center gap-1 rounded-full border border-white/20 bg-black/85 px-3 py-2 shadow-2xl backdrop-blur-md">
              <ToolButton icon={<Shapes className="h-[18px] w-[18px]" />} onClick={cycleShape} />
              <ToolButton icon={<Wand2 className="h-[18px] w-[18px]" />} onClick={cycleEffect} />
              <ToolButton icon={<FrameIcon className="h-[18px] w-[18px]" />} onClick={toggleBorder} />
              <ToolButton icon={<Layers className="h-[18px] w-[18px]" />} onClick={cycleOverlay} />
              <div className="mx-1 h-4 w-px bg-white/25" />
              <ToolButton icon={<Crosshair className="h-[18px] w-[18px]" />} onClick={centerPhoto} />
              <div className="mx-1 h-4 w-px bg-white/25" />
              <ToolButton icon={<RefreshCw className="h-[18px] w-[18px]" />} onClick={handleReplace} highlight />
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
        flex items-center justify-center rounded-full p-2
        text-white/90 transition-all duration-150
        hover:bg-white/15 hover:text-white hover:scale-110
        active:scale-95 active:bg-white/20
        ${highlight ? "hover:bg-white/20" : ""}
      `}
    >
      {icon}
    </button>
  );
}
