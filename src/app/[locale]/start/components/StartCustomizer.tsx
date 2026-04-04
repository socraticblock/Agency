"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import type { Lane1CustomizerState, PrimaryLang, SecondaryLangMode } from "../lib/types";
import { compressImageForLane1Storage } from "../lib/image-compress";
import {
  ACCENT_PRESETS,
  BACKGROUND_GRADIENT_PRESETS,
  BACKGROUND_SOLID_PRESETS,
  FONT_PRESETS,
  isBackgroundLockingTextColor,
  TEXT_COLOR_PRESETS,
  VIBE_PRESETS,
  ANIMATION_PRESETS,
} from "../lib/presets";
import { buildLane1WhatsAppUrl } from "../lib/whatsapp";
import { LANE1_BASE_GEL, computeLane1Total } from "../lib/lane1-pricing";
import { clearLane1State } from "../lib/customizer-store";
import { defaultLane1State } from "../lib/types";
import {
  AccentPresetGrid,
  BackgroundGradientPresetGrid,
  BackgroundSolidPresetGrid,
  FontPresetGrid,
  TextColorPresetGrid,
  VibePresetGrid,
  AnimationPresetGrid,
} from "./StylePresetGrids";
import { CollapsibleSection } from "./CollapsibleSection";
import { MessageCircle, Eye, QrCode, Printer } from "lucide-react";
import { downloadQRCode, generateBrandedQR } from "../lib/identity-kit";

const fieldClass = "start-field mt-1.5 w-full";
const labelClass = "start-label mb-1.5";

function ServiceCountStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  const [pulse, setPulse] = useState(false);
  function bump(delta: number) {
    const n = Math.min(4, Math.max(1, value + delta));
    if (n !== value) {
      onChange(n);
      setPulse(true);
      window.setTimeout(() => setPulse(false), 150);
    }
  }
  return (
    <div className="flex items-center justify-center gap-4 py-1">
      <button
        type="button"
        disabled={value <= 1}
        onClick={() => bump(-1)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-[#F3F4F6] text-lg font-semibold text-[#111827] transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Decrease service count"
      >
        −
      </button>
      <span
        className={`min-w-[2rem] text-center text-xl font-semibold tabular-nums transition-transform duration-150 ${
          pulse ? "scale-125" : "scale-100"
        }`}
      >
        {value}
      </span>
      <button
        type="button"
        disabled={value >= 4}
        onClick={() => bump(1)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-[#F3F4F6] text-lg font-semibold text-[#111827] transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Increase service count"
      >
        +
      </button>
    </div>
  );
}

export function StartCustomizer({
  state,
  setState,
  onBackToSectors,
  showOrderFooter = true,
}: {
  state: Lane1CustomizerState;
  setState: Dispatch<SetStateAction<Lane1CustomizerState>>;
  onBackToSectors: () => void;
  /** Set false when the mobile sheet renders a sticky footer outside. */
  showOrderFooter?: boolean;
}) {
  const params = useParams();
  const total = computeLane1Total({
    secondaryMode: state.secondaryMode,
    addGoogleMap: state.addGoogleMap,
  });

  const [photoBusy, setPhotoBusy] = useState(false);
  const [photoHint, setPhotoHint] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>("content"); // Default to first section open

  const textLocked = isBackgroundLockingTextColor(state.style.backgroundId);

  function patch(p: Partial<Lane1CustomizerState>) {
    setState((s) => ({ ...s, ...p }));
  }

  function toggleSection(sectionId: string) {
    setOpenSection((current) => (current === sectionId ? null : sectionId));
  }

  const onBackgroundChange = useCallback(
    (backgroundId: string) => {
      setState((s) => ({
        ...s,
        style: { ...s.style, backgroundId },
      }));
    },
    [setState],
  );

  const onTextColorChange = useCallback(
    (textColorId: string) => {
      setState((s) => ({
        ...s,
        style: { ...s.style, textColorId },
      }));
    },
    [setState],
  );

  const onAccentChange = useCallback(
    (accentId: string) => {
      setState((s) => ({
        ...s,
        style: { ...s.style, accentId },
      }));
    },
    [setState],
  );

  const onFontChange = useCallback(
    (fontId: string) => {
      setState((s) => ({
        ...s,
        style: { ...s.style, fontId },
      }));
    },
    [setState],
  );

  const onVibeChange = useCallback(
    (vibeId: string) => {
      setState((s) => ({
        ...s,
        style: { ...s.style, vibeId },
      }));
    },
    [setState],
  );

  const onAnimationChange = useCallback(
    (animationId: string) => {
      setState((s) => ({
        ...s,
        style: { ...s.style, animationId },
      }));
    },
    [setState],
  );

  function setServiceArea(i: number, v: string, secondary: boolean) {
    setState((s) => {
      if (secondary) {
        const next = [...s.serviceAreasSecondary] as [
          string,
          string,
          string,
          string,
        ];
        next[i] = v;
        return { ...s, serviceAreasSecondary: next };
      }
      const next = [...s.serviceAreas] as [string, string, string, string];
      next[i] = v;
      return { ...s, serviceAreas: next };
    });
  }

  function setServiceDescription(i: number, v: string, secondary: boolean) {
    setState((s) => {
      if (secondary) {
        const next = [...s.serviceDescriptionsSecondary] as [string, string, string, string];
        next[i] = v;
        return { ...s, serviceDescriptionsSecondary: next };
      }
      const next = [...s.serviceDescriptions] as [string, string, string, string];
      next[i] = v;
      return { ...s, serviceDescriptions: next };
    });
  }

  async function onPhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setPhotoHint(null);
    setPhotoBusy(true);
    try {
      const { dataUrl, warnLargeOriginal } = await compressImageForLane1Storage(file);
      patch({ photoDataUrl: dataUrl });
      setPhotoHint(
        warnLargeOriginal
          ? "Original file was over 2 MB — we compressed it for storage."
          : null,
      );
    } catch {
      setPhotoHint("Could not process this image. Try JPG or PNG.");
    } finally {
      setPhotoBusy(false);
    }
  }

  function addExtraSocial() {
    setState((s) => ({
      ...s,
      social: {
        ...s.social,
        extra: [...s.social.extra, { label: "", url: "" }],
      },
    }));
  }

  const waUrl = buildLane1WhatsAppUrl(state);

  return (
    <div className="space-y-4 pb-4 md:space-y-6 md:pb-8">
      <div className="flex flex-wrap items-center justify-between gap-3 px-0.5">
        <button
          type="button"
          onClick={onBackToSectors}
          className="min-h-[44px] text-sm font-semibold underline underline-offset-4 transition hover:opacity-80 md:min-h-0"
          style={{ color: "var(--accent)", textDecorationColor: "color-mix(in srgb, var(--accent) 30%, transparent)" }}
        >
          ← Choose sector
        </button>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => {
              sessionStorage.setItem("businessCardPreview", JSON.stringify(state));
              window.open(`/${params.locale}/start/preview`, "_blank");
            }}
            className="flex items-center gap-2 text-sm font-semibold underline underline-offset-4 transition hover:opacity-80"
            style={{ color: "var(--accent)", textDecorationColor: "color-mix(in srgb, var(--accent) 30%, transparent)" }}
          >
            <Eye className="h-4 w-4" />
            Preview my site
          </button>
          <button
            type="button"
            onClick={() => {
              clearLane1State();
              setState(defaultLane1State());
            }}
            className="text-xs font-medium opacity-60 transition hover:opacity-100"
            style={{ color: "var(--text-primary)" }}
          >
            Reset
          </button>
        </div>
      </div>

      <CollapsibleSection
        id="content"
        title="Content"
        isOpen={openSection === "content"}
        onToggle={() => toggleSection("content")}
      >
        <p className="start-caption">
          English is the default. Edit inline in the preview or here — both stay in sync.
        </p>
        <fieldset>
          <legend className="start-label mb-2 block">Primary language (site default)</legend>
          <div className="flex flex-col gap-2 text-sm text-[#1e293b]">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="radio"
                name="primaryLang"
                className="mt-0.5 h-4 w-4"
                style={{ accentColor: "var(--accent)" }}
                checked={state.primaryLang === "en"}
                onChange={() => patch({ primaryLang: "en" as PrimaryLang })}
              />
              English (recommended)
            </label>
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="radio"
                name="primaryLang"
                className="mt-0.5 h-4 w-4 accent-[#1A2744]"
                checked={state.primaryLang === "ka"}
                onChange={() => patch({ primaryLang: "ka" as PrimaryLang })}
              />
              Georgian (WhatsApp order will be in Georgian)
            </label>
          </div>
        </fieldset>
        <label className={labelClass}>
          Name / firm (EN)
          <input
            className={fieldClass}
            value={state.name}
            onChange={(e) => patch({ name: e.target.value })}
          />
        </label>
        {state.secondaryMode === "self" ? (
          <label className={labelClass}>
            Name (GE)
            <input
              className={fieldClass}
              value={state.nameSecondary}
              onChange={(e) => patch({ nameSecondary: e.target.value })}
            />
          </label>
        ) : null}
        <label className={labelClass}>
          Title (EN)
          <input
            className={fieldClass}
            value={state.title}
            onChange={(e) => patch({ title: e.target.value })}
          />
        </label>
        {state.secondaryMode === "self" ? (
          <label className={labelClass}>
            Title (GE)
            <input
              className={fieldClass}
              value={state.titleSecondary}
              onChange={(e) => patch({ titleSecondary: e.target.value })}
            />
          </label>
        ) : null}
        <label className={labelClass}>
          Phone
          <input
            className={fieldClass}
            value={state.phone}
            onChange={(e) => patch({ phone: e.target.value })}
            inputMode="tel"
          />
        </label>
        <label className={labelClass}>
          Email
          <input
            className={fieldClass}
            value={state.email}
            onChange={(e) => patch({ email: e.target.value })}
            type="email"
          />
        </label>
        <label className={labelClass}>
          Address (EN)
          <textarea
            className="start-field start-field-textarea mt-1.5 w-full"
            rows={2}
            value={state.address}
            onChange={(e) => patch({ address: e.target.value })}
          />
        </label>
        {state.secondaryMode === "self" ? (
          <label className={labelClass}>
            Address (GE)
            <textarea
              className="start-field start-field-textarea mt-1.5 w-full"
              rows={2}
              value={state.addressSecondary}
              onChange={(e) => patch({ addressSecondary: e.target.value })}
            />
          </label>
        ) : null}
        <label className={labelClass}>
          Hours (EN)
          <input
            className={fieldClass}
            value={state.hours}
            onChange={(e) => patch({ hours: e.target.value })}
          />
        </label>
        {state.secondaryMode === "self" ? (
          <label className={labelClass}>
            Hours (GE)
            <input
              className={fieldClass}
              value={state.hoursSecondary}
              onChange={(e) => patch({ hoursSecondary: e.target.value })}
            />
          </label>
        ) : null}
        <label className={labelClass}>
          Services heading (EN)
          <input
            className={fieldClass}
            value={state.practiceHeading}
            onChange={(e) => patch({ practiceHeading: e.target.value })}
          />
        </label>
        <label className={labelClass}>
          Services heading (GE)
          <input
            className={fieldClass}
            value={state.practiceHeadingSecondary}
            onChange={(e) => patch({ practiceHeadingSecondary: e.target.value })}
          />
        </label>
      </CollapsibleSection>

      <CollapsibleSection
        id="photo"
        title="Photo"
        isOpen={openSection === "photo"}
        onToggle={() => toggleSection("photo")}
      >
        <p className="start-caption">
          JPG or PNG, max 5 MB. We compress to ~200 KB for browser storage. Tap the circle in the
          preview to upload.
        </p>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={photoBusy}
          onChange={onPhotoChange}
          className={`${fieldClass} cursor-pointer py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-[#1e293b] disabled:cursor-wait disabled:opacity-60`}
        />
        {photoHint ? (
          <p className="text-xs font-medium text-amber-800">{photoHint}</p>
        ) : null}
      </CollapsibleSection>

      <CollapsibleSection
        id="services"
        title="Service areas"
        isOpen={openSection === "services"}
        onToggle={() => toggleSection("services")}
      >
        <label className={`${labelClass} text-center`}>
          How many services (1–4)
          <ServiceCountStepper
            value={state.serviceCount}
            onChange={(n) => patch({ serviceCount: n })}
          />
        </label>
        {Array.from({ length: state.serviceCount }).map((_, i) => (
          <div key={i} className="mb-4 space-y-1.5 last:mb-0">
            <span className={labelClass}>{`Service ${i + 1} (EN)`}</span>
            <input
              className={fieldClass}
              placeholder="Title (e.g. Real Estate)"
              value={state.serviceAreas[i]}
              onChange={(e) => setServiceArea(i, e.target.value, false)}
            />
            <textarea
              className={`${fieldClass} h-16 min-h-[64px] resize-none pt-2 text-xs`}
              placeholder="Brief description (optional)..."
              value={state.serviceDescriptions[i]}
              onChange={(e) => setServiceDescription(i, e.target.value, false)}
            />
          </div>
        ))}

        {state.secondaryMode === "self" && (
          <>
            <div className="my-4 border-b border-slate-100" />
            {Array.from({ length: state.serviceCount }).map((_, i) => (
              <div key={`s-${i}`} className="mb-4 space-y-1.5 last:mb-0">
                <span className={labelClass}>{`Service ${i + 1} (GE)`}</span>
                <input
                  className={fieldClass}
                  placeholder="სათაური"
                  value={state.serviceAreasSecondary[i]}
                  onChange={(e) => setServiceArea(i, e.target.value, true)}
                />
                <textarea
                  className={`${fieldClass} h-16 min-h-[64px] resize-none pt-2 text-xs`}
                  placeholder="აღწერა (დამატებითი)..."
                  value={state.serviceDescriptionsSecondary[i]}
                  onChange={(e) => setServiceDescription(i, e.target.value, true)}
                />
              </div>
            ))}
          </>
        )}
      </CollapsibleSection>

      <CollapsibleSection
        id="social"
        title="Social media"
        isOpen={openSection === "social"}
        onToggle={() => toggleSection("social")}
      >
        {(["facebook", "instagram", "linkedin", "tiktok", "youtube"] as const).map((k) => (
          <label key={k} className={`${labelClass} capitalize`}>
            {k}
            <input
              className={fieldClass}
              value={state.social[k]}
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  social: { ...s.social, [k]: e.target.value },
                }))
              }
            />
          </label>
        ))}
        {state.social.extra.map((row, i) => (
          <div key={i} className="flex gap-2">
            <input
              placeholder="Label"
              className={`${fieldClass} w-1/3 shrink-0`}
              value={row.label}
              onChange={(e) =>
                setState((s) => {
                  const extra = [...s.social.extra];
                  extra[i] = { ...extra[i], label: e.target.value };
                  return { ...s, social: { ...s.social, extra } };
                })
              }
            />
            <input
              placeholder="URL"
              className={`${fieldClass} min-w-0 flex-1`}
              value={row.url}
              onChange={(e) =>
                setState((s) => {
                  const extra = [...s.social.extra];
                  extra[i] = { ...extra[i], url: e.target.value };
                  return { ...s, social: { ...s.social, extra } };
                })
              }
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addExtraSocial}
          className="text-sm font-semibold text-[#1A2744] underline decoration-[#1A2744]/30 underline-offset-4 transition hover:decoration-[#1A2744]"
        >
          + Add link
        </button>
      </CollapsibleSection>

      <CollapsibleSection
        id="background"
        title="Background"
        isOpen={openSection === "background"}
        onToggle={() => toggleSection("background")}
      >
        <p className="start-caption">§8.1–8.2 — solids and subtle gradients.</p>
        <BackgroundSolidPresetGrid
          options={BACKGROUND_SOLID_PRESETS}
          value={state.style.backgroundId}
          onChange={onBackgroundChange}
        />
        <BackgroundGradientPresetGrid
          options={BACKGROUND_GRADIENT_PRESETS}
          value={state.style.backgroundId}
          onChange={onBackgroundChange}
        />
        {!textLocked ? (
          <TextColorPresetGrid
            options={TEXT_COLOR_PRESETS}
            value={state.style.textColorId}
            onChange={onTextColorChange}
          />
        ) : (
          <p className="start-caption">
            Text color is set automatically for this background (dark or gradient preset).
          </p>
        )}
      </CollapsibleSection>

      <CollapsibleSection
        id="accent"
        title="Accent color"
        isOpen={openSection === "accent"}
        onToggle={() => toggleSection("accent")}
      >
        <AccentPresetGrid
          options={ACCENT_PRESETS}
          value={state.style.accentId}
          onChange={onAccentChange}
        />
      </CollapsibleSection>

      <CollapsibleSection
        id="font"
        title="Font style"
        isOpen={openSection === "font"}
        onToggle={() => toggleSection("font")}
      >
        <FontPresetGrid
          options={FONT_PRESETS}
          value={state.style.fontId}
          onChange={onFontChange}
        />
      </CollapsibleSection>

      <CollapsibleSection
        id="experience"
        title="Experience"
        isOpen={openSection === "experience"}
        onToggle={() => toggleSection("experience")}
      >
        <p className="start-caption">
          Elevate the feeling of your site with luxury effects.
        </p>
        <VibePresetGrid 
          options={VIBE_PRESETS}
          value={state.style.vibeId}
          onChange={onVibeChange}
        />
        <AnimationPresetGrid 
          options={ANIMATION_PRESETS}
          value={state.style.animationId}
          onChange={onAnimationChange}
        />
      </CollapsibleSection>

      <CollapsibleSection
        id="addons"
        title="Add-ons"
        isOpen={openSection === "addons"}
        onToggle={() => toggleSection("addons")}
      >
        <h4 className="start-subsection-title mb-2">Second language</h4>
        <p className="start-caption mb-3">
          Georgian as a second language on the card (bilingual toggle in the preview header).
        </p>
        {(
          [
            ["none", "None"],
            ["self", "I translate (+50 ₾)"],
            ["pro", "Professional translation (+150 ₾)"],
          ] as const
        ).map(([id, text]) => (
          <label key={id} className="mb-2 flex cursor-pointer items-start gap-3 text-sm text-[#1e293b]">
            <input
              type="radio"
              name="secondaryMode"
              className="mt-0.5 h-4 w-4 shrink-0 accent-[#1A2744]"
              checked={state.secondaryMode === id}
              onChange={() => patch({ secondaryMode: id as SecondaryLangMode })}
            />
            {text}
          </label>
        ))}
        {state.secondaryMode === "pro" ? (
          <label className="mt-3 flex cursor-pointer items-start gap-3 text-sm text-[#1e293b]">
            <input
              type="checkbox"
              className="mt-0.5 h-5 w-5 shrink-0 rounded border-slate-300 accent-[#1A2744]"
              checked={state.proTranslationAcknowledged}
              onChange={(e) => patch({ proTranslationAcknowledged: e.target.checked })}
            />
            A professional translator will translate your content. This is not Google Translate.
          </label>
        ) : null}

        <div className="mt-6 border-t border-slate-200/80 pt-4">
          <label className="start-ios-toggle-row flex min-h-[52px] cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-200/60 bg-white/50 px-3 py-2">
            <span className="text-sm font-medium text-[#1e293b]">Google Maps (+75 ₾)</span>
            <button
              type="button"
              role="switch"
              aria-checked={state.addGoogleMap}
              onClick={() => patch({ addGoogleMap: !state.addGoogleMap })}
              className={`start-ios-toggle relative h-[31px] w-[51px] shrink-0 rounded-full transition-colors duration-200 ${
                state.addGoogleMap ? "bg-[#1A2744]" : "bg-[#CBD5E1]"
              }`}
            >
              <span
                className={`absolute top-[2px] left-[2px] h-[27px] w-[27px] rounded-full bg-white shadow transition-transform duration-200 ${
                  state.addGoogleMap ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </label>
        </div>
      </CollapsibleSection>

      <CollapsibleSection
        id="identity"
        title="Identity Kit"
        isOpen={openSection === "identity"}
        onToggle={() => toggleSection("identity")}
      >
        <p className="start-caption mb-4">
          Professional assets for your physical business cards and phone home-screen.
        </p>
        
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Branded QR Code</h4>
            <QRPreview state={state} />
            <button
              onClick={() => {
                const nameSlug = state.name.toLowerCase().replace(/\s+/g, "-") || "business-card";
                const url = `https://genezisi.com/c/${nameSlug}`;
                downloadQRCode(state, url);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold shadow-sm ring-1 ring-black/5 hover:bg-slate-50 active:scale-95 transition-all"
            >
              <QrCode className="h-4 w-4" />
              Download QR PNG
            </button>
            <p className="text-[10px] text-center text-slate-500 leading-tight">
              High-resolution PNG for printing on physical cards, office signage, or invoices.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Print Kit</h4>
            <button
              onClick={() => window.print()}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold shadow-sm ring-1 ring-black/5 hover:bg-slate-50 active:scale-95 transition-all text-[#1A2744]"
            >
              <Printer className="h-4 w-4" />
              Download Print PDF
            </button>
            <p className="text-[10px] text-center text-slate-500 leading-tight">
              Generates a clean, print-ready view of your name and QR code.
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
             <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 text-center text-slate-500">App-Like Experience</h4>
             <div className="flex items-center gap-3">
                <div className="h-12 w-12 shrink-0 rounded-xl bg-slate-200 overflow-hidden shadow-sm ring-1 ring-black/5">
                   {state.photoDataUrl ? (
                      <img src={state.photoDataUrl} alt="App Icon" className="h-full w-full object-cover" />
                   ) : (
                      <div className="flex h-full w-full items-center justify-center bg-slate-100">
                         <span className="text-[10px] font-bold text-slate-400">Logo</span>
                      </div>
                   )}
                </div>
                <div className="flex-1 min-w-0">
                   <p className="text-xs font-bold text-slate-700 truncate">{state.name || "Your Name"}</p>
                   <p className="text-[10px] text-slate-500 leading-tight">
                      When users "Add to Home Screen" on iPhone/Android, they'll see your branded icon.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </CollapsibleSection>

      {showOrderFooter ? (
        <div className="start-glass-heavy space-y-4 p-4 md:p-6">
          <p className="start-body">
            Total:{" "}
            <span className="start-cta-price">
              {total} ₾
            </span>{" "}
            <span className="text-[#64748b]">(one-time, base {LANE1_BASE_GEL} ₾ + add-ons)</span>
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="start-wa-cta mt-2 inline-flex items-center justify-center gap-2"
          >
            <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
            Order on WhatsApp
          </a>
        </div>
      ) : null}
    </div>
  );
}

function QRPreview({ state }: { state: Lane1CustomizerState }) {
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    const nameSlug = state.name.toLowerCase().replace(/\s+/g, "-") || "business-card";
    const url = `https://genezisi.com/c/${nameSlug}`;
    generateBrandedQR(state, url).then(setDataUrl);
  }, [state.style.accentId, state.name]);

  return (
    <div className="flex h-32 w-32 items-center justify-center rounded-lg bg-white p-2 shadow-sm ring-1 ring-black/5">
      {dataUrl ? (
        <img src={dataUrl} alt="QR Preview" className="h-full w-full" />
      ) : (
        <div className="h-full w-full animate-pulse bg-slate-100 rounded" />
      )}
    </div>
  );
}
