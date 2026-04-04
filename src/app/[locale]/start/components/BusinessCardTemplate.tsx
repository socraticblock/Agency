"use client";

import { useEffect, useRef, useState, memo, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scale,
  Briefcase,
  Building2,
  Sparkles,
  Phone,
  Mail,
  MessageCircle,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Camera,
  UserPlus,
  ChevronDown,
} from "lucide-react";
import type { Lane1CustomizerState } from "../lib/types";
import { resolveStyleVariables } from "../lib/presets";
import { compressImageForLane1Storage } from "../lib/image-compress";
import { InlineEditable } from "./InlineEditable";
import { MagneticButton } from "../../_components/MagneticButton";
import { downloadVCF } from "../lib/vcf-utils";
import "./business-card-template.css";

const ICONS = [Scale, Briefcase, Building2, Sparkles];

function telHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits ? `tel:+${digits}` : "tel:";
}

function waHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "#";
  return `https://wa.me/${digits}`;
}

export const BusinessCardTemplate = memo(function BusinessCardTemplate({
  state,
  previewLang,
  homeHref,
  ownerName,
  onPatch,
  onPreviewLangChange,
  hideBranding = false,
  layoutMode = "mobile",
}: {
  state: Lane1CustomizerState;
  previewLang: "primary" | "secondary";
  homeHref: string;
  ownerName: string;
  /** When set, preview fields are inline-editable and sync with customizer state. */
  onPatch?: (p: Partial<Lane1CustomizerState>) => void;
  /** Bilingual preview: EN / GE in header (§2.2). */
  onPreviewLangChange?: (lang: "primary" | "secondary") => void;
  hideBranding?: boolean;
  /** Responsive unlocks Bento grid on desktop. Mobile forces narrow card view. */
  layoutMode?: "mobile" | "responsive";
}) {
  const editable = Boolean(onPatch);
  const isResponsive = layoutMode === "responsive";
  const vars = resolveStyleVariables(state.style) as any;
  const useSecondary =
    previewLang === "secondary" &&
    state.secondaryMode === "self";

  const isGlass = state.style.vibeId === "glass";
  const isNeon = state.style.vibeId === "neon";

  const [expandedService, setExpandedService] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: Number(vars["--stagger-delay" as any] || 0.1),
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: Number(vars["--entrance-y" as any] || 20) 
    },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: Number(vars["--spring-damping" as any] || 20),
        stiffness: 100,
      }
    },
  };

  const glassStyle: CSSProperties = isGlass ? {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(var(--glass-blur))",
    border: "1px solid rgba(255, 255, 255, var(--border-opacity))",
    boxShadow: "var(--card-shadow)",
  } : isNeon ? {
    boxShadow: "var(--card-shadow)",
    border: "1px solid var(--accent)",
  } : {};

  const showLangToggle =
    Boolean(onPreviewLangChange) &&
    state.secondaryMode === "self";

  const address = useSecondary ? state.addressSecondary || state.address : state.address;

  const showSocial = (url: string) => url.trim().length > 0;

  /** Brief §4.2: opacity fade when font preset changes (fonts cannot interpolate). */
  const [fontFade, setFontFade] = useState(1);
  const fontIdRef = useRef(state.style.fontId);

  useEffect(() => {
    if (fontIdRef.current === state.style.fontId) return;
    fontIdRef.current = state.style.fontId;
    setFontFade(0);
    const t = window.setTimeout(() => setFontFade(1), 45);
    return () => window.clearTimeout(t);
  }, [state.style.fontId]);

  // Phase 2: Dynamic PWA Metadata Injection
  useEffect(() => {
    if (typeof document === "undefined") return;

    // 1. Apple Touch Icon (Home Screen Logo)
    let appleIcon = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement;
    if (!appleIcon) {
      appleIcon = document.createElement("link");
      appleIcon.rel = "apple-touch-icon";
      document.head.appendChild(appleIcon);
    }
    appleIcon.href = state.photoDataUrl || "/favicon.ico";

    // 2. Theme Color (Mobile UI browser bars)
    let themeColor = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
    if (!themeColor) {
      themeColor = document.createElement("meta");
      themeColor.name = "theme-color";
      document.head.appendChild(themeColor);
    }
    const accent = (vars as any)["--accent"] || "#1A2744";
    themeColor.content = accent;

    return () => {
      // Optional: Cleanup if needed, but usually fine to leave for the session
    };
  }, [state.photoDataUrl, state.style.accentId, vars]);

  function patch(p: Partial<Lane1CustomizerState>) {
    onPatch?.(p);
  }

  function setServiceLine(i: number, v: string) {
    if (!onPatch) return;
    if (useSecondary) {
      const next = [...state.serviceAreasSecondary] as [
        string,
        string,
        string,
        string,
      ];
      next[i] = v;
      return onPatch({ serviceAreasSecondary: next });
    }
    const next = [...state.serviceAreas] as [string, string, string, string];
    next[i] = v;
    onPatch({ serviceAreas: next });
  }

  function setServiceDescriptionLine(i: number, v: string) {
    if (!onPatch) return;
    if (useSecondary) {
      const next = [...state.serviceDescriptionsSecondary] as [
        string,
        string,
        string,
        string,
      ];
      next[i] = v;
      return onPatch({ serviceDescriptionsSecondary: next });
    }
    const next = [...state.serviceDescriptions] as [string, string, string, string];
    next[i] = v;
    onPatch({ serviceDescriptions: next });
  }

  const headingStyle: CSSProperties = {
    fontFamily: "var(--font-heading)",
    fontWeight: "var(--font-heading-weight)" as CSSProperties["fontWeight"],
  };
  const bodyStyle: CSSProperties = {
    fontFamily: "var(--font-body)",
    fontWeight: "var(--font-body-weight)" as CSSProperties["fontWeight"],
  };

  const fileRef = useRef<HTMLInputElement>(null);
  const [photoBusy, setPhotoBusy] = useState(false);

  async function onPhotoPicked(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !onPatch) return;
    setPhotoBusy(true);
    try {
      const { dataUrl } = await compressImageForLane1Storage(file);
      onPatch({ photoDataUrl: dataUrl });
    } catch {
      /* ignore */
    } finally {
      setPhotoBusy(false);
    }
  }

  return (
    <div
      className={`business-card-template mx-auto w-full text-[var(--text-primary)] ${
        isResponsive ? "max-w-6xl md:rounded-3xl md:overflow-hidden" : "max-w-[640px]"
      }`}
      style={{
        ...vars,
        fontFamily: "var(--font-body)",
        fontWeight: "var(--font-body-weight)" as CSSProperties["fontWeight"],
        background: "var(--bg-primary)",
      }}
    >
      {isNeon && (
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,var(--accent),transparent_70%)] opacity-[0.03]" />
      )}
      {state.secondaryMode === "pro" ? (
        <div
          className="border-b px-4 py-2.5 text-center text-xs leading-snug text-slate-600"
          style={{
            borderColor: "var(--accent-secondary)",
            background: "color-mix(in srgb, var(--accent) 7%, transparent)",
          }}
        >
          Georgian translation will be added after your order is confirmed.
        </div>
      ) : null}
      <motion.div
        className={`business-card-template-font-layer pb-12 ${isResponsive ? "md:grid md:grid-cols-12 md:gap-8 md:p-8" : ""}`}
        style={{ opacity: fontFade }}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={onPhotoPicked}
          aria-hidden
        />
        {/* LEFT COLUMN: Identity & Core Details */}
        <div className={isResponsive ? "md:col-span-5 lg:col-span-4 md:sticky md:top-8 md:flex md:flex-col md:gap-6" : ""}>
          {/* Section 1 — sticky header */}
          <motion.header
            variants={itemVariants}
            className={`sticky top-0 z-20 flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3 ${isResponsive ? "md:relative md:border-none md:px-0 md:py-0" : ""}`}
          style={{
            borderColor: "var(--accent)",
            background: "var(--bg-primary)",
          }}
        >
          <div className={`max-w-[min(55%,18rem)] min-w-0 truncate text-sm font-bold leading-tight ${isResponsive ? "md:text-base" : ""}`}>
            <InlineEditable
              value={useSecondary ? state.nameSecondary : state.name}
              onChange={(v) =>
                patch(useSecondary ? { nameSecondary: v } : { name: v })
              }
              fallbackIfEmpty={useSecondary ? state.name : ""}
              showFallbackIndicator={useSecondary}
              placeholder="Your name"
              editable={editable}
              className="block w-full truncate"
              style={headingStyle}
            />
          </div>
          <div className="flex min-w-0 flex-wrap items-center justify-end gap-x-3 gap-y-1">
            {showLangToggle ? (
              <nav
                className="flex shrink-0 items-center gap-2 text-xs font-semibold"
                style={{ color: "var(--text-primary)" }}
                aria-label="Preview language"
              >
                <button
                  type="button"
                  className={`min-h-[44px] min-w-[40px] rounded-md px-2 transition-opacity touch-manipulation ${
                    previewLang === "primary" ? "opacity-100 underline decoration-2 underline-offset-4" : "opacity-55"
                  }`}
                  style={{ color: "var(--accent)" }}
                  onClick={() => onPreviewLangChange?.("primary")}
                >
                  EN
                </button>
                <span className="opacity-35" aria-hidden>
                  |
                </span>
                <button
                  type="button"
                  className={`min-h-[44px] min-w-[40px] rounded-md px-2 transition-opacity touch-manipulation ${
                    previewLang === "secondary" ? "opacity-100 underline decoration-2 underline-offset-4" : "opacity-55"
                  }`}
                  style={{ color: "var(--accent)" }}
                  onClick={() => onPreviewLangChange?.("secondary")}
                >
                  GE
                </button>
              </nav>
            ) : null}
            <InlineEditable
              value={state.phone}
              onChange={(v) => patch({ phone: v })}
              placeholder="+995…"
              editable={editable}
              inputMode="tel"
              className="shrink-0 text-sm font-semibold underline decoration-2 underline-offset-2"
              style={{ color: "var(--accent)", ...headingStyle }}
            />
          </div>
          </motion.header>

          {/* Section 2 — hero */}
          <motion.section 
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`px-4 pb-8 pt-8 text-left ${isResponsive ? "md:rounded-3xl md:border md:p-6" : ""}`} 
            style={{ 
              borderColor: "var(--accent-secondary)",
              ...glassStyle 
            }}
          >
          <div className="flex flex-col items-start gap-4">
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
              className={`business-card-photo group relative h-[180px] w-[180px] shrink-0 overflow-hidden rounded-full border-4 bg-slate-200 ${
                editable ? "cursor-pointer" : ""
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
                  <svg
                    className="h-16 w-16 opacity-40"
                    viewBox="0 0 64 64"
                    fill="currentColor"
                    aria-hidden
                  >
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
            <div>
              <h1
                className={`text-2xl font-bold leading-tight ${isResponsive ? "md:text-3xl" : ""}`}
                style={headingStyle}
              >
                <InlineEditable
                  value={useSecondary ? state.nameSecondary : state.name}
                  onChange={(v) =>
                    patch(useSecondary ? { nameSecondary: v } : { name: v })
                  }
                  fallbackIfEmpty={useSecondary ? state.name : ""}
                  showFallbackIndicator={useSecondary}
                  placeholder="Name"
                  editable={editable}
                  className="block w-full"
                  style={headingStyle}
                />
              </h1>
              <p className="mt-2 text-base opacity-90" style={bodyStyle}>
                <InlineEditable
                  value={useSecondary ? state.titleSecondary : state.title}
                  onChange={(v) =>
                    patch(useSecondary ? { titleSecondary: v } : { title: v })
                  }
                  fallbackIfEmpty={useSecondary ? state.title : ""}
                  showFallbackIndicator={useSecondary}
                  placeholder="Title"
                  editable={editable}
                  className="block w-full"
                  style={bodyStyle}
                />
              </p>
            </div>
            <div
              className={`grid w-full gap-2 ${
                state.serviceCount >= 3 ? "grid-cols-2" : "grid-cols-1"
              }`}
            >
              {Array.from({ length: state.serviceCount }).map((_, i) => {
                const en = state.serviceAreas[i] ?? "";
                const ge = state.serviceAreasSecondary[i] ?? "";
                if (useSecondary) {
                  if (!en.trim() && !ge.trim() && !editable) return null;
                } else if (!en.trim() && !editable) {
                  return null;
                }
                return (
                  <div
                    key={i}
                    className="rounded border border-black/5 px-3 py-2 text-sm"
                    style={{ borderColor: "var(--accent-secondary)" }}
                  >
                    <InlineEditable
                      value={useSecondary ? ge : en}
                      onChange={(v) => setServiceLine(i, v)}
                      fallbackIfEmpty={useSecondary ? en : ""}
                      showFallbackIndicator={useSecondary}
                      placeholder={`Service ${i + 1}`}
                      editable={editable}
                      className="block w-full"
                      style={bodyStyle}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-3 w-full">
              <MagneticButton
                as="a"
                href={telHref(state.phone)}
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
                style={{ background: "var(--accent)" }}
              >
                Contact Me
              </MagneticButton>
              <MagneticButton
                onClick={() => downloadVCF(state, previewLang)}
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg border px-6 py-3 text-sm font-bold transition-all hover:bg-black/5 active:scale-[0.98]"
                style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Save Contact
              </MagneticButton>
            </div>
          </div>
         </motion.section>
        </div> {/* END LEFT COLUMN */}

        {/* RIGHT COLUMN: Content & Add-ons */}
        <div className={isResponsive ? "md:col-span-7 lg:col-span-8 md:flex md:flex-col md:gap-6" : ""}>
          {/* Section 3 — practice areas with icons */}
          <motion.section
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`border-t px-4 py-8 ${isResponsive ? "md:rounded-3xl md:border md:p-8" : ""}`}
            style={{ 
              borderColor: "var(--accent-secondary)",
              ...glassStyle
            }}
          >
          <h2
            className="mb-4 text-lg font-bold"
            style={headingStyle}
          >
            <InlineEditable
              value={
                useSecondary
                  ? state.practiceHeadingSecondary
                  : state.practiceHeading
              }
              onChange={(v) =>
                patch(
                  useSecondary
                    ? { practiceHeadingSecondary: v }
                    : { practiceHeading: v },
                )
              }
              fallbackIfEmpty={useSecondary ? state.practiceHeading : ""}
              showFallbackIndicator={useSecondary}
              placeholder="Practice areas"
              editable={editable}
              className="block w-full"
              style={headingStyle}
            />
          </h2>
          <ul className="flex flex-col gap-3">
            {Array.from({ length: state.serviceCount }).map((_, i) => {
              const enTitle = state.serviceAreas[i] ?? "";
              const geTitle = state.serviceAreasSecondary[i] ?? "";
              const enDesc = state.serviceDescriptions[i] ?? "";
              const geDesc = state.serviceDescriptionsSecondary[i] ?? "";

              const title = useSecondary ? geTitle : enTitle;
              const desc = useSecondary ? geDesc : enDesc;

              if (useSecondary) {
                if (!enTitle.trim() && !geTitle.trim() && !editable) return null;
              } else if (!enTitle.trim() && !editable) {
                return null;
              }

              const isExpanded = expandedService === i;
              const Icon = ICONS[i % ICONS.length];

              return (
                <li
                  key={i}
                  className="overflow-hidden rounded-xl border transition-all"
                  style={{
                    borderColor: isExpanded ? "var(--accent)" : "rgba(0,0,0,0.05)",
                    background: isExpanded ? "rgba(0,0,0,0.02)" : "transparent",
                    ...glassStyle
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedService(isExpanded ? null : i)}
                    className="flex w-full items-start gap-3 p-3 text-left"
                  >
                    <Icon
                      className="mt-0.5 h-5 w-5 shrink-0"
                      style={{ color: "var(--accent)" }}
                      aria-hidden
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold leading-snug">
                          <InlineEditable
                            value={title}
                            onChange={(v) => setServiceLine(i, v)}
                            fallbackIfEmpty={useSecondary ? enTitle : ""}
                            showFallbackIndicator={useSecondary}
                            placeholder={`Service ${i + 1}`}
                            editable={editable}
                            className="block w-full"
                          />
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                          style={{ color: "var(--accent)" }}
                        />
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="border-t border-black/5 p-3 pt-0 text-sm leading-relaxed text-slate-600">
                          <InlineEditable
                            value={desc}
                            onChange={(v) => setServiceDescriptionLine(i, v)}
                            fallbackIfEmpty={useSecondary ? enDesc : ""}
                            showFallbackIndicator={useSecondary}
                            placeholder="Add a detailed description of your expertise in this area..."
                            editable={editable}
                            className="block w-full"
                            style={bodyStyle}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </motion.section>

        {/* Section 4 — contact + footer */}
        <motion.section
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className={`border-t px-4 py-8 ${isResponsive ? "md:rounded-3xl md:border md:p-8" : ""}`}
          style={{ 
            borderColor: "var(--accent-secondary)",
            ...glassStyle
          }}
        >
          <div className={`space-y-3 text-sm ${isResponsive ? "md:text-base" : ""}`}>
            <div className="flex items-center gap-2 font-semibold">
              <Phone className="h-4 w-4 shrink-0" aria-hidden />
              <InlineEditable
                value={state.phone}
                onChange={(v) => patch({ phone: v })}
                placeholder="Phone"
                editable={editable}
                inputMode="tel"
                className="min-w-0 flex-1"
                style={{ color: "var(--accent)", ...bodyStyle }}
              />
            </div>
            <div className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <span className="min-w-0 flex-1 underline">
                <InlineEditable
                  value={state.email}
                  onChange={(v) => patch({ email: v })}
                  placeholder="Email"
                  editable={editable}
                  inputMode="email"
                  className="block w-full"
                  style={bodyStyle}
                />
              </span>
            </div>
            <a
              href={waHref(state.phone)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-semibold"
              style={{ color: "var(--accent)" }}
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              WhatsApp
            </a>
            <div className="flex flex-wrap gap-3 pt-2">
              {showSocial(state.social.facebook) && (
                <MagneticButton
                  as="a"
                  href={state.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)]"
                  aria-label="Facebook"
                  magneticStrength={10}
                >
                  <Facebook className="h-6 w-6" />
                </MagneticButton>
              )}
              {showSocial(state.social.instagram) && (
                <MagneticButton
                  as="a"
                  href={state.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)]"
                  aria-label="Instagram"
                  magneticStrength={10}
                >
                  <Instagram className="h-6 w-6" />
                </MagneticButton>
              )}
              {showSocial(state.social.linkedin) && (
                <MagneticButton
                  as="a"
                  href={state.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)]"
                  aria-label="LinkedIn"
                  magneticStrength={10}
                >
                  <Linkedin className="h-6 w-6" />
                </MagneticButton>
              )}
              {showSocial(state.social.tiktok) && (
                <a
                  href={state.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)]"
                  aria-label="TikTok"
                >
                  <span className="text-xs font-bold">TT</span>
                </a>
              )}
              {showSocial(state.social.youtube) && (
                <MagneticButton
                  as="a"
                  href={state.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)]"
                  aria-label="YouTube"
                  magneticStrength={10}
                >
                  <Youtube className="h-6 w-6" />
                </MagneticButton>
              )}
              {state.social.extra.map((e, i) =>
                e.url.trim() ? (
                  <a
                    key={i}
                    href={e.url.trim()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold underline"
                    style={{ color: "var(--accent)" }}
                  >
                    {e.label || "Link"}
                  </a>
                ) : null
              )}
            </div>
            <div className="pt-2">
              {state.addGoogleMap && address.trim() ? (
                <div
                  className="mb-2 text-[var(--text-primary)] underline"
                  style={bodyStyle}
                >
                  <InlineEditable
                    value={useSecondary ? state.addressSecondary : state.address}
                    onChange={(v) =>
                      patch(
                        useSecondary ? { addressSecondary: v } : { address: v },
                      )
                    }
                    fallbackIfEmpty={useSecondary ? state.address : ""}
                    showFallbackIndicator={useSecondary}
                    placeholder="Address"
                    multiline
                    editable={editable}
                    className="block w-full"
                    style={bodyStyle}
                  />
                </div>
              ) : (
                <div className="text-[var(--text-primary)]" style={bodyStyle}>
                  <InlineEditable
                    value={useSecondary ? state.addressSecondary : state.address}
                    onChange={(v) =>
                      patch(
                        useSecondary ? { addressSecondary: v } : { address: v },
                      )
                    }
                    fallbackIfEmpty={useSecondary ? state.address : ""}
                    showFallbackIndicator={useSecondary}
                    placeholder="Address"
                    multiline
                    editable={editable}
                    className="block w-full"
                    style={bodyStyle}
                  />
                </div>
              )}
            </div>
            <div>
              <InlineEditable
                value={useSecondary ? state.hoursSecondary : state.hours}
                onChange={(v) =>
                  patch(useSecondary ? { hoursSecondary: v } : { hours: v })
                }
                fallbackIfEmpty={useSecondary ? state.hours : ""}
                showFallbackIndicator={useSecondary}
                placeholder="Hours"
                editable={editable}
                className="block w-full"
                style={bodyStyle}
              />
            </div>
            {state.addGoogleMap && address.trim() ? (
              <div className="mt-4 aspect-video w-full overflow-hidden rounded-lg bg-slate-200">
                <iframe
                  title="Map"
                  className="h-full w-full border-0"
                  loading="lazy"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
                />
              </div>
            ) : null}
          </div>

          <footer
            className="mt-10 border-t pt-6 text-center text-xs opacity-80"
            style={{ borderColor: "var(--accent-secondary)" }}
          >
            <p>
              © {new Date().getFullYear()} {ownerName || "—"}.
              {!hideBranding && (
                <>
                  {" "}Built by{" "}
                  <Link
                    href={homeHref}
                    className="font-semibold underline"
                    style={{ color: "var(--accent)" }}
                  >
                    Genezisi
                  </Link>
                </>
              )}
            </p>
            </footer>
          </motion.section>
        </div> {/* END RIGHT COLUMN */}
      </motion.div>
    </div>
  );
});
