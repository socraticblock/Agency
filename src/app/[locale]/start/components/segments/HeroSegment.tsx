"use client";

import { motion, type MotionValue } from "framer-motion";
import Image from "next/image";
import { Camera } from "lucide-react";
import type { Lane1CustomizerState } from "../../lib/types";
import { InlineEditable } from "../InlineEditable";
import {
  PHOTO_SHAPE_PRESETS,
  PHOTO_EFFECT_PRESETS,
  PHOTO_BORDER_PRESETS,
} from "../../lib/presets";
import type { CSSProperties, RefObject } from "react";

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
    photoKenBurns = false,
  } = style as any;

  const cssGrainDataUrl = `url("data:image/svg+xml,${encodeURIComponent(
    `<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='noiseFilter'><feTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noiseFilter)'/></svg>`,
  )}")`;

  const shapeClass = ({
    circle: "rounded-full aspect-square w-[180px]",
    "rounded-square": "rounded-2xl aspect-square w-[180px]",
    "wide-cinematic": "rounded-xl aspect-video w-full",
  } as Record<string, string>)[photoShape as string] || "rounded-full aspect-square w-[180px]";

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
      outlineOffset: "-4px"
    };
    if (photoBorder === "gradient-border") return {
      border: "3px solid transparent",
      backgroundImage: `linear-gradient(var(--bg-primary), var(--bg-primary)), var(--bg-gradient)`,
      backgroundOrigin: "border-box",
      backgroundClip: "content-box, border-box"
    };
    return { border: "none" };
  };

  const borderStyle = getBorderStyle();


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
      <div className={`flex w-full flex-col gap-5 ${photoAlignment === "center" ? "items-center text-center" : "items-start text-left"
        }`}>
        {/* Photo Zone */}
        <div
          className={`group relative shrink-0 overflow-hidden bg-slate-100 transition-all duration-700 ${shapeClass} ${isResponsive ? "md:sticky md:top-4 md:z-0" : ""
            }`}
          style={borderStyle}
          onClick={() => editable && !photoBusy && fileRef.current?.click()}
        >
          {state.photoDataUrl ? (
            <div
              className={`h-full w-full overflow-hidden ${photoKenBurns ? "business-card-hero-ken" : ""}`}
            >
              <Image
                key={state.photoDataUrl?.slice(0, 64) || "empty"}
                src={state.photoDataUrl}
                alt=""
                width={300}
                height={300}
                className="h-full w-full object-cover transition-transform duration-300"
                style={{
                  filter: effectFilter,
                  transform: `scale(${photoZoom / 100}) translate(${photoPositionX - 50}%, ${photoPositionY - 50}%)`,
                  transformOrigin: "center center",
                }}
                unoptimized
              />
            </div>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-xs text-slate-500">
              <Camera className="h-10 w-10 opacity-30" />
              <span>Identity Profile</span>
            </div>
          )}

          {editable && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
              <Camera className="h-8 w-8 text-white" />
            </div>
          )}
          {/* Overlay Layers */}
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

        <div className={`w-full space-y-1 transition-all bg-transparent relative z-10 pt-4 ${photoAlignment === "center" ? "text-center" : "text-left"
          }`}>
          <h1
            className="text-2xl md:text-3xl font-bold leading-tight"
            style={headingStyle}
          >
            <InlineEditable
              value={useSecondary ? state.nameSecondary : state.name}
              onChange={(v) => patch(useSecondary ? { nameSecondary: v } : { name: v })}
              placeholder="Name"
              editable={editable}
              className="block w-full"
              style={{ ...headingStyle, textAlign: photoAlignment === "center" ? "center" : "inherit" }}
            />
          </h1>

          <p
            className="text-lg opacity-90"
            style={bodyStyle}
          >
            <InlineEditable
              value={useSecondary ? state.titleSecondary : state.title}
              onChange={(v) => patch(useSecondary ? { titleSecondary: v } : { title: v })}
              placeholder="Job title"
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
              value={state.company}
              onChange={(v) => patch({ company: v })}
              placeholder="Company Name"
              editable={editable}
              className="block w-full"
              style={{ ...bodyStyle, textAlign: photoAlignment === "center" ? "center" : "inherit" }}
            />
          </p>

          {/* Tagline Zone */}
          <div className="pt-2">
            <p
              className={`text-xs italic opacity-70 leading-relaxed max-w-[90%] ${photoAlignment === "center" ? "mx-auto" : ""}`}
              style={bodyStyle}
            >
              <InlineEditable
                value={useSecondary ? state.taglineSecondary : state.tagline}
                onChange={(v) => patch(useSecondary ? { taglineSecondary: v } : { tagline: v })}
                placeholder="Add a professional tagline..."
                editable={editable}
                className="block w-full"
                style={{ ...bodyStyle, textAlign: photoAlignment === "center" ? "center" : "inherit" }}
              />
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
