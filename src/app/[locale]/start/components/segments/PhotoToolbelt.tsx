"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Wand2, Shapes, FrameIcon, Layers } from "lucide-react";
import { PHOTO_EFFECT_PRESETS, PHOTO_SHAPE_PRESETS, PHOTO_OVERLAY_PRESETS, PHOTO_BORDER_PRESETS } from "../../lib/presets";
import type { Lane1CustomizerState } from "../../lib/types";

interface PhotoToolbeltProps {
  state: Lane1CustomizerState;
  patch: (p: Partial<Lane1CustomizerState>) => void;
  onReplace: () => void;
}

export function PhotoToolbelt({ state, patch, onReplace }: PhotoToolbeltProps) {
  const [floatingLabel, setFloatingLabel] = useState<{ label: string; key: number } | null>(null);
  const currentEffect = state.style.photoEffect || "none";
  const currentShape = state.style.photoShape || "circle";
  const currentBorder = state.style.photoBorder || "none";
  const currentOverlay = state.style.photoOverlay || "none";

  const showFloatingLabel = (label: string) => {
    setFloatingLabel({ label, key: Date.now() });
    setTimeout(() => setFloatingLabel(null), 800);
  };

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
    // Logic: Circle -> Rounded Square -> Split (which is a mix of shape + align)
    // For simplicity, let's toggle: Circle -> Rounded Square -> Wide Cinematic
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
    // Toggle between: none -> glow-ring -> thin-ring -> thick-ring -> none
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
    // Cycle through overlay presets
    const idx = PHOTO_OVERLAY_PRESETS.findIndex((p) => p.id === currentOverlay);
    const nextIdx = (idx + 1) % PHOTO_OVERLAY_PRESETS.length;
    const nextOverlay = PHOTO_OVERLAY_PRESETS[nextIdx];
    patch({
      style: { ...state.style, photoOverlay: nextOverlay.id as any },
    });
    showFloatingLabel(nextOverlay.labelEn);
  };


  return (
    <div className="relative">
      <AnimatePresence>
        {floatingLabel && (
          <motion.div
            key={floatingLabel.key}
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{ opacity: 1, y: -12, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 -top-10 -translate-x-1/2 z-50 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 shadow-lg"
          >
            <span className="text-xs font-bold text-black">{floatingLabel.label}</span>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-black/80 px-4 py-2 shadow-2xl backdrop-blur-md"
      >
        <ToolButton icon={<Shapes className="h-4 w-4" />} label="Shape" onClick={cycleShape} />
        <ToolButton icon={<Wand2 className="h-4 w-4" />} label="Filter" onClick={cycleEffect} />
        <ToolButton icon={<FrameIcon className="h-4 w-4" />} label="Border" onClick={toggleBorder} />
        <ToolButton icon={<Layers className="h-4 w-4" />} label="Overlay" onClick={cycleOverlay} />
        <div className="mx-2 h-4 w-px bg-white/20" />
        <ToolButton
          icon={<RefreshCw className="h-4 w-4" />}
          label="Replace"
          onClick={(e) => {
            e.stopPropagation();
            onReplace();
          }}
        />
      </motion.div>
    </div>
  );
}

function ToolButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-center gap-1 rounded-full px-3 py-1.5 text-white transition-all hover:bg-white/10"
    >
      {icon}
      <span className="absolute -top-10 scale-0 rounded bg-black px-2 py-1 text-[10px] font-bold uppercase tracking-tighter transition-all group-hover:scale-100">
        {label}
      </span>
    </button>
  );
}
