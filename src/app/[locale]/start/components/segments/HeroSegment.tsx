"use client";

import { motion, type MotionValue, type SpringOptions } from "framer-motion";
import Image from "next/image";
import { Camera, UserPlus } from "lucide-react";
import type { Lane1CustomizerState } from "../../lib/types";
import { InlineEditable } from "../InlineEditable";
import { MagneticButton } from "../../../_components/MagneticButton";
import { downloadVCF } from "../../lib/vcf-utils";
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
  function telHref(phone: string): string {
    const digits = phone.replace(/\D/g, "");
    return digits ? `tel:+${digits}` : "tel:";
  }

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
      className={`px-4 pb-8 pt-8 text-left transition-shadow duration-300 ${isResponsive ? "md:rounded-3xl md:border md:p-6 hover:shadow-2xl" : ""}`}
    >
      <div className="flex flex-col items-start gap-5">
        <div
          role={editable ? "button" : undefined}
          tabIndex={editable ? 0 : undefined}
          onClick={() => {
            if (editable && !photoBusy) fileRef.current?.click();
          }}
          onKeyDown={(e) => {
            if (!editable) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileRef.current?.click();
            }
          }}
          aria-label={editable ? "Upload profile photo" : "Profile photo"}
          className={`business-card-photo group relative h-[180px] w-[180px] shrink-0 overflow-hidden rounded-full border-4 bg-slate-200 ${editable ? "cursor-pointer" : ""
            } ${photoBusy ? "opacity-70" : ""}`}
          style={{ borderColor: "var(--accent)" }}
        >
          {state.photoDataUrl ? (
            <Image
              key={state.photoDataUrl.slice(0, 64)}
              src={state.photoDataUrl}
              alt=""
              width={180}
              height={180}
              className="h-full w-full object-cover"
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-xs text-slate-500">
              <svg className="h-16 w-16 opacity-40" viewBox="0 0 64 64" fill="currentColor" aria-hidden>
                <circle cx="32" cy="26" r="12" />
                <ellipse cx="32" cy="56" rx="22" ry="14" />
              </svg>
              <span>Photo</span>
            </div>
          )}
          {editable ? (
            <span className="pointer-events-none absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/5">
              <Camera className="h-4 w-4 text-slate-700" aria-hidden />
            </span>
          ) : null}
        </div>

        <div className="w-full space-y-1">
          <h1
            className={`text-2xl font-bold leading-tight ${isResponsive ? "md:text-3xl" : ""}`}
            style={headingStyle}
          >
            <InlineEditable
              value={useSecondary ? state.nameSecondary : state.name}
              onChange={(v) => patch(useSecondary ? { nameSecondary: v } : { name: v })}
              placeholder="Name"
              editable={editable}
              className="block w-full"
              style={headingStyle}
            />
          </h1>
          
          <p className="text-lg opacity-90" style={bodyStyle}>
            <InlineEditable
              value={useSecondary ? state.titleSecondary : state.title}
              onChange={(v) => patch(useSecondary ? { titleSecondary: v } : { title: v })}
              placeholder="Title"
              editable={editable}
              className="block w-full"
              style={bodyStyle}
            />
          </p>

          <p className="text-sm font-semibold tracking-wide uppercase opacity-80" style={{ ...bodyStyle, color: "var(--accent)" }}>
            <InlineEditable
              value={state.company}
              onChange={(v) => patch({ company: v })}
              placeholder="Company Name"
              editable={editable}
              className="block w-full"
            />
          </p>

          {/* Tagline Zone */}
          <div className="pt-2">
            <p className="text-xs italic opacity-70 leading-relaxed max-w-[90%]" style={bodyStyle}>
              <InlineEditable
                value={useSecondary ? state.taglineSecondary : state.tagline}
                onChange={(v) => patch(useSecondary ? { taglineSecondary: v } : { tagline: v })}
                placeholder="Add a professional tagline..."
                editable={editable}
                className="block w-full"
                style={bodyStyle}
              />
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
