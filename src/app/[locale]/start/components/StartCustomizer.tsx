"use client";

import type { Dispatch, SetStateAction } from "react";
import type { Lane1CustomizerState, SecondaryLangMode } from "../lib/types";
import {
  BACKGROUND_PRESETS,
  TEXT_COLOR_PRESETS,
  ACCENT_PRESETS,
  FONT_PRESETS,
} from "../lib/presets";
import { buildLane1WhatsAppUrl } from "../lib/whatsapp";
import { LANE1_BASE_GEL, computeLane1Total } from "../lib/lane1-pricing";
import { clearLane1State } from "../lib/customizer-store";
import { defaultLane1State } from "../lib/types";

export function StartCustomizer({
  state,
  setState,
  onBackToSectors,
}: {
  state: Lane1CustomizerState;
  setState: Dispatch<SetStateAction<Lane1CustomizerState>>;
  onBackToSectors: () => void;
}) {
  const total = computeLane1Total({
    secondaryMode: state.secondaryMode,
    addGoogleMap: state.addGoogleMap,
  });

  function patch(p: Partial<Lane1CustomizerState>) {
    setState((s) => ({ ...s, ...p }));
  }

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

  function onPhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = typeof reader.result === "string" ? reader.result : null;
      patch({ photoDataUrl: url });
    };
    reader.readAsDataURL(file);
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
    <div className="space-y-8 pb-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackToSectors}
          className="text-sm font-semibold text-amber-900/80 underline"
        >
          ← Choose sector
        </button>
        <button
          type="button"
          onClick={() => {
            clearLane1State();
            setState(defaultLane1State());
          }}
          className="text-xs font-medium text-amber-800/60 hover:text-amber-900"
        >
          Reset
        </button>
      </div>

      <section className="space-y-3 rounded-xl border border-amber-900/10 bg-white/90 p-4">
        <h3 className="text-sm font-bold text-amber-950">Second language</h3>
        <p className="text-xs text-amber-900/70">
          Optional add-on if you want a second language on your card (you can
          type in Georgian or any language in the fields above).
        </p>
        {(
          [
            ["none", "None"],
            ["self", "I translate (+50 ₾)"],
            ["pro", "Professional translation (+150 ₾)"],
          ] as const
        ).map(([id, text]) => (
          <label key={id} className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="secondaryMode"
              checked={state.secondaryMode === id}
              onChange={() => patch({ secondaryMode: id as SecondaryLangMode })}
            />
            {text}
          </label>
        ))}
      </section>

      <section className="space-y-3 rounded-xl border border-amber-900/10 bg-white/90 p-4">
        <h3 className="text-sm font-bold text-amber-950">Photo</h3>
        <input type="file" accept="image/*" onChange={onPhotoChange} className="text-sm" />
      </section>

      <section className="space-y-3 rounded-xl border border-amber-900/10 bg-white/90 p-4">
        <h3 className="text-sm font-bold text-amber-950">Text</h3>
        <label className="block text-xs font-medium text-amber-900/80">
          Name / firm
          <input
            className="touch-form-control mt-1 w-full rounded border border-amber-900/20 px-3 py-2 text-sm"
            value={state.name}
            onChange={(e) => patch({ name: e.target.value })}
          />
        </label>
        {state.secondaryMode === "self" ? (
          <label className="block text-xs font-medium text-amber-900/80">
            Name (2nd language)
            <input
              className="touch-form-control mt-1 w-full rounded border border-amber-900/20 px-3 py-2 text-sm"
              value={state.nameSecondary}
              onChange={(e) => patch({ nameSecondary: e.target.value })}
            />
          </label>
        ) : null}
        <label className="block text-xs font-medium text-amber-900/80">
          Title
          <input
            className="touch-form-control mt-1 w-full rounded border border-amber-900/20 px-3 py-2 text-sm"
            value={state.title}
            onChange={(e) => patch({ title: e.target.value })}
          />
        </label>
        {state.secondaryMode === "self" ? (
          <label className="block text-xs font-medium text-amber-900/80">
            Title (2nd language)
            <input
              className="touch-form-control mt-1 w-full rounded border border-amber-900/20 px-3 py-2 text-sm"
              value={state.titleSecondary}
              onChange={(e) => patch({ titleSecondary: e.target.value })}
            />
          </label>
        ) : null}
        <label className="block text-xs font-medium text-amber-900/80">
          Phone
          <input
            className="touch-form-control mt-1 w-full rounded border border-amber-900/20 px-3 py-2 text-sm"
            value={state.phone}
            onChange={(e) => patch({ phone: e.target.value })}
            inputMode="tel"
          />
        </label>
        <label className="block text-xs font-medium text-amber-900/80">
          Email
          <input
            className="touch-form-control mt-1 w-full rounded border border-amber-900/20 px-3 py-2 text-sm"
            value={state.email}
            onChange={(e) => patch({ email: e.target.value })}
            type="email"
          />
        </label>
      </section>

      <section className="space-y-3 rounded-xl border border-amber-900/10 bg-white/90 p-4">
        <h3 className="text-sm font-bold text-amber-950">Services</h3>
        <label className="block text-xs">
          Count (1–4)
          <input
            type="number"
            min={1}
            max={4}
            className="touch-form-control mt-1 w-24 rounded border border-amber-900/20 px-3 py-2 text-sm"
            value={state.serviceCount}
            onChange={(e) =>
              patch({ serviceCount: Math.min(4, Math.max(1, Number(e.target.value) || 1)) })
            }
          />
        </label>
        {Array.from({ length: state.serviceCount }).map((_, i) => (
          <label key={i} className="block text-xs font-medium text-amber-900/80">
            {`Service ${i + 1}`}
            <input
              className="touch-form-control mt-1 w-full rounded border border-amber-900/20 px-3 py-2 text-sm"
              value={state.serviceAreas[i]}
              onChange={(e) => setServiceArea(i, e.target.value, false)}
            />
          </label>
        ))}
        {state.secondaryMode === "self"
          ? Array.from({ length: state.serviceCount }).map((_, i) => (
              <label key={`s-${i}`} className="block text-xs font-medium text-amber-900/80">
                {`Service ${i + 1} (2nd language)`}
                <input
                  className="touch-form-control mt-1 w-full rounded border border-amber-900/20 px-3 py-2 text-sm"
                  value={state.serviceAreasSecondary[i]}
                  onChange={(e) => setServiceArea(i, e.target.value, true)}
                />
              </label>
            ))
          : null}
        <label className="block text-xs font-medium text-amber-900/80">
          Section heading
          <input
            className="touch-form-control mt-1 w-full rounded border border-amber-900/20 px-3 py-2 text-sm"
            value={state.practiceHeading}
            onChange={(e) => patch({ practiceHeading: e.target.value })}
          />
        </label>
        {state.secondaryMode === "self" ? (
          <label className="block text-xs font-medium text-amber-900/80">
            Section heading (2nd language)
            <input
              className="touch-form-control mt-1 w-full rounded border border-amber-900/20 px-3 py-2 text-sm"
              value={state.practiceHeadingSecondary}
              onChange={(e) => patch({ practiceHeadingSecondary: e.target.value })}
            />
          </label>
        ) : null}
      </section>

      <section className="space-y-3 rounded-xl border border-amber-900/10 bg-white/90 p-4">
        <h3 className="text-sm font-bold text-amber-950">Contact</h3>
        <label className="block text-xs font-medium text-amber-900/80">
          Address
          <textarea
            className="touch-form-control mt-1 w-full rounded border border-amber-900/20 px-3 py-2 text-sm"
            rows={2}
            value={state.address}
            onChange={(e) => patch({ address: e.target.value })}
          />
        </label>
        {state.secondaryMode === "self" ? (
          <label className="block text-xs font-medium text-amber-900/80">
            Address (2nd language)
            <textarea
              className="touch-form-control mt-1 w-full rounded border border-amber-900/20 px-3 py-2 text-sm"
              rows={2}
              value={state.addressSecondary}
              onChange={(e) => patch({ addressSecondary: e.target.value })}
            />
          </label>
        ) : null}
        <label className="block text-xs font-medium text-amber-900/80">
          Hours
          <input
            className="touch-form-control mt-1 w-full rounded border border-amber-900/20 px-3 py-2 text-sm"
            value={state.hours}
            onChange={(e) => patch({ hours: e.target.value })}
          />
        </label>
        {state.secondaryMode === "self" ? (
          <label className="block text-xs font-medium text-amber-900/80">
            Hours (2nd language)
            <input
              className="touch-form-control mt-1 w-full rounded border border-amber-900/20 px-3 py-2 text-sm"
              value={state.hoursSecondary}
              onChange={(e) => patch({ hoursSecondary: e.target.value })}
            />
          </label>
        ) : null}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={state.addGoogleMap}
            onChange={(e) => patch({ addGoogleMap: e.target.checked })}
          />
          Google Maps (+75 ₾)
        </label>
      </section>

      <section className="space-y-3 rounded-xl border border-amber-900/10 bg-white/90 p-4">
        <h3 className="text-sm font-bold text-amber-950">Social</h3>
        {(["facebook", "instagram", "linkedin", "tiktok", "youtube"] as const).map((k) => (
          <label key={k} className="block text-xs capitalize text-amber-900/80">
            {k}
            <input
              className="touch-form-control mt-1 w-full rounded border border-amber-900/20 px-3 py-2 text-sm"
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
              className="touch-form-control w-1/3 rounded border border-amber-900/20 px-2 py-2 text-sm"
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
              className="touch-form-control flex-1 rounded border border-amber-900/20 px-2 py-2 text-sm"
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
          className="text-sm font-semibold text-amber-800 underline"
        >
          + Link
        </button>
      </section>

      <section className="space-y-3 rounded-xl border border-amber-900/10 bg-white/90 p-4">
        <h3 className="text-sm font-bold text-amber-950">Style</h3>
        <label className="block text-xs">
          Background
          <select
            className="touch-form-control mt-1 w-full rounded border border-amber-900/20 px-3 py-2 text-sm"
            value={state.style.backgroundId}
            onChange={(e) =>
              patch({ style: { ...state.style, backgroundId: e.target.value } })
            }
          >
            {BACKGROUND_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.labelEn}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-xs">
          Text color
          <select
            className="touch-form-control mt-1 w-full rounded border border-amber-900/20 px-3 py-2 text-sm"
            value={state.style.textColorId}
            onChange={(e) =>
              patch({ style: { ...state.style, textColorId: e.target.value } })
            }
          >
            {TEXT_COLOR_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.labelEn}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-xs">
          Accent
          <select
            className="touch-form-control mt-1 w-full rounded border border-amber-900/20 px-3 py-2 text-sm"
            value={state.style.accentId}
            onChange={(e) =>
              patch({ style: { ...state.style, accentId: e.target.value } })
            }
          >
            {ACCENT_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.labelEn}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-xs">
          Font
          <select
            className="touch-form-control mt-1 w-full rounded border border-amber-900/20 px-3 py-2 text-sm"
            value={state.style.fontId}
            onChange={(e) =>
              patch({ style: { ...state.style, fontId: e.target.value } })
            }
          >
            {FONT_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.labelEn}
              </option>
            ))}
          </select>
        </label>
      </section>

      <div className="rounded-xl border border-amber-800/20 bg-amber-50/90 p-4">
        <p className="text-sm text-amber-950">
          Base: {LANE1_BASE_GEL} ₾ + add-ons = <strong>{total} ₾</strong> (one-time)
        </p>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-green-600 px-4 py-3 text-center text-sm font-bold text-white hover:bg-green-700"
        >
          Order on WhatsApp
        </a>
      </div>
    </div>
  );
}
