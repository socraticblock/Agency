"use client";

import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, Shapes, FrameIcon, Wand2, RefreshCw, Check } from "lucide-react";
import { PHOTO_EFFECT_PRESETS, PHOTO_SHAPE_PRESETS } from "../../lib/presets";
import type { Lane1CustomizerState } from "../../lib/types";

interface PhotoEditModalProps {
  state: Lane1CustomizerState;
  patch: (p: Partial<Lane1CustomizerState>) => void;
  onClose: () => void;
  onReplace: () => void;
}

export function PhotoEditModal({ state, patch, onClose, onReplace }: PhotoEditModalProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  // Cache latest values in refs to avoid stale closures in touch handlers
  const zoomRef = useRef(state.style.photoZoom ?? 100);
  const posXRef = useRef(state.style.photoPositionX ?? 50);
  const posYRef = useRef(state.style.photoPositionY ?? 50);

  // Keep refs in sync with state
  zoomRef.current = state.style.photoZoom ?? 100;
  posXRef.current = state.style.photoPositionX ?? 50;
  posYRef.current = state.style.photoPositionY ?? 50;

  // Track active touches for pinch & pan
  const lastTouchRef = useRef<{ x: number; y: number } | null>(null);
  const lastPinchDistRef = useRef<number | null>(null);

  // Lock body scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const getDistance = (t1: Touch, t2: Touch) =>
    Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 1) {
      lastTouchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      lastPinchDistRef.current = null;
    } else if (e.touches.length === 2) {
      lastPinchDistRef.current = getDistance(e.touches[0], e.touches[1]);
      lastTouchRef.current = null;
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault();

    if (e.touches.length === 1 && lastTouchRef.current) {
      // Single-finger drag = pan
      const dx = (e.touches[0].clientX - lastTouchRef.current.x) / 2.5;
      const dy = (e.touches[0].clientY - lastTouchRef.current.y) / 2.5;
      lastTouchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

      const nextX = Math.max(-50, Math.min(150, posXRef.current + dx));
      const nextY = Math.max(-50, Math.min(150, posYRef.current + dy));
      patch({
        style: { ...state.style, photoPositionX: nextX, photoPositionY: nextY },
      });

    } else if (e.touches.length === 2 && lastPinchDistRef.current !== null) {
      // Two-finger pinch = zoom
      const newDist = getDistance(e.touches[0], e.touches[1]);
      const ratio = newDist / lastPinchDistRef.current;
      lastPinchDistRef.current = newDist;

      const nextZoom = Math.max(80, Math.min(400, zoomRef.current * ratio));
      patch({
        style: { ...state.style, photoZoom: Math.round(nextZoom) },
      });
    }
  }, [patch, state.style]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (e.touches.length === 0) {
      lastTouchRef.current = null;
      lastPinchDistRef.current = null;
    }
  }, []);

  // Attach non-passive touch listeners
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    el.addEventListener("touchstart", handleTouchStart, { passive: false });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd, { passive: false });
    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  const style = state.style;
  const photoZoom = style.photoZoom ?? 100;
  const photoPositionX = style.photoPositionX ?? 50;
  const photoPositionY = style.photoPositionY ?? 50;
  const currentEffect = style.photoEffect ?? "none";
  const currentShape = style.photoShape ?? "circle";
  const currentBorder = style.photoBorder ?? "none";

  const cycleShape = () => {
    const shapes = ["circle", "rounded-square", "wide-cinematic"] as const;
    const idx = shapes.indexOf(currentShape as any);
    patch({ style: { ...style, photoShape: shapes[(idx + 1) % shapes.length] } });
  };

  const toggleBorder = () => {
    patch({
      style: {
        ...style,
        photoBorder: currentBorder === "none" ? "glow-ring" : "none",
      },
    });
  };

  const cycleFilter = () => {
    const idx = PHOTO_EFFECT_PRESETS.findIndex((p) => p.id === currentEffect);
    const next = PHOTO_EFFECT_PRESETS[(idx + 1) % PHOTO_EFFECT_PRESETS.length];
    patch({ style: { ...style, photoEffect: next.id as any } });
  };

  const effectFilter = PHOTO_EFFECT_PRESETS.find((p) => p.id === currentEffect)?.filter ?? "none";

  const shapeStyle: React.CSSProperties =
    currentShape === "circle"
      ? { borderRadius: "50%", aspectRatio: "1" }
      : currentShape === "rounded-square"
      ? { borderRadius: "16px", aspectRatio: "1" }
      : { borderRadius: "12px", aspectRatio: "16/9", width: "100%" };

  const content = (
    <div
      className="fixed inset-0 z-[200] flex flex-col bg-black/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0">
        <span className="text-sm font-semibold text-white/70 uppercase tracking-widest">
          Edit Photo
        </span>
        <button
          onClick={onClose}
          className="rounded-full p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="flex flex-1 items-center justify-center select-none"
        style={{ touchAction: "none", userSelect: "none" }}
      >
        {state.photoDataUrl && (
          <div
            className="relative overflow-hidden"
            style={{ ...shapeStyle, width: currentShape === "wide-cinematic" ? "90vw" : "72vw", maxWidth: "400px" }}
          >
            <Image
              src={state.photoDataUrl}
              alt=""
              width={600}
              height={600}
              className="h-full w-full object-cover pointer-events-none"
              style={{
                filter: effectFilter,
                transform: `scale(${photoZoom / 100}) translate(${photoPositionX - 50}%, ${photoPositionY - 50}%)`,
                transformOrigin: "center center",
              }}
              unoptimized
            />
          </div>
        )}
        <p className="absolute bottom-20 left-0 right-0 text-center text-xs text-white/30 pointer-events-none">
          Drag to pan · Pinch to zoom
        </p>
      </div>

      {/* Bottom Action Bar */}
      <div className="shrink-0 safe-area-inset-bottom">
        <div className="flex items-center justify-around border-t border-white/10 bg-black/60 px-4 py-3 backdrop-blur-md">
          <ActionButton icon={<Shapes className="h-5 w-5" />} label="Shape" onClick={cycleShape} />
          <ActionButton
            icon={<FrameIcon className="h-5 w-5" />}
            label="Border"
            onClick={toggleBorder}
            active={currentBorder !== "none"}
          />
          <ActionButton icon={<Wand2 className="h-5 w-5" />} label="Filter" onClick={cycleFilter} />
          <ActionButton
            icon={<RefreshCw className="h-5 w-5" />}
            label="Replace"
            onClick={onReplace}
          />
          <button
            onClick={onClose}
            className="flex flex-col items-center gap-1 rounded-full bg-white px-5 py-2 text-black transition hover:bg-white/90 active:scale-95"
          >
            <Check className="h-5 w-5" />
            <span className="text-[10px] font-bold uppercase">Done</span>
          </button>
        </div>
      </div>
    </div>
  );

  if (typeof window === "undefined") return null;
  return createPortal(content, document.body);
}

function ActionButton({
  icon,
  label,
  onClick,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-white transition active:scale-95 ${
        active ? "bg-white/20" : "hover:bg-white/10"
      }`}
    >
      {icon}
      <span className="text-[10px] font-medium uppercase tracking-wider opacity-70">{label}</span>
    </button>
  );
}
