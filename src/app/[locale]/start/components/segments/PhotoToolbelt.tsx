"use client";

import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Wand2, Shapes, Layout, Camera } from "lucide-react";
import { PHOTO_EFFECT_PRESETS, PHOTO_SHAPE_PRESETS } from "../../lib/presets";
import type { Lane1CustomizerState } from "../../lib/types";

interface PhotoToolbeltProps {
  state: Lane1CustomizerState;
  patch: (p: Partial<Lane1CustomizerState>) => void;
  onReplace: () => void;
}

export function PhotoToolbelt({ state, patch, onReplace }: PhotoToolbeltProps) {
  const currentEffect = state.style.photoEffect || "none";
  const currentShape = state.style.photoShape || "circle";
  const currentAlign = state.style.photoAlignment || "left";

  const cycleEffect = (e: React.MouseEvent) => {
    e.stopPropagation();
    const idx = PHOTO_EFFECT_PRESETS.findIndex((p) => p.id === currentEffect);
    const nextIdx = (idx + 1) % PHOTO_EFFECT_PRESETS.length;
    patch({
      style: { ...state.style, photoEffect: PHOTO_EFFECT_PRESETS[nextIdx].id as any },
    });
  };

  const cycleShape = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Logic: Circle -> Rounded Square -> Split (which is a mix of shape + align)
    // For simplicity, let's toggle: Circle -> Rounded Square -> Wide Cinematic
    const shapes = ["circle", "rounded-square", "wide-cinematic"];
    const idx = shapes.indexOf(currentShape);
    const nextIdx = (idx + 1) % shapes.length;
    patch({
      style: { ...state.style, photoShape: shapes[nextIdx] as any },
    });
  };

  const toggleAlign = (e: React.MouseEvent) => {
    e.stopPropagation();
    patch({
      style: {
        ...state.style,
        photoAlignment: currentAlign === "left" ? "center" : "left",
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      className="absolute -bottom-16 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/20 bg-black/80 p-1.5 shadow-2xl backdrop-blur-md md:-bottom-20"
    >
      <ToolButton icon={<Shapes className="h-4 w-4" />} label="Shape" onClick={cycleShape} />
      <ToolButton icon={<Layout className="h-4 w-4" />} label="Layout" onClick={toggleAlign} />
      <ToolButton icon={<Wand2 className="h-4 w-4" />} label="Filter" onClick={cycleEffect} />
      <div className="mx-1 h-4 w-px bg-white/20" />
      <ToolButton
        icon={<RefreshCw className="h-4 w-4" />}
        label="Replace"
        onClick={(e) => {
          e.stopPropagation();
          onReplace();
        }}
      />
    </motion.div>
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
