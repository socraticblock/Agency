"use client";

import { Check } from "lucide-react";
import type {
  AccentPreset,
  BackgroundPreset,
  FontPreset,
  TextColorPreset,
} from "../lib/presets";

const chipBase =
  "relative flex flex-col items-center gap-1.5 rounded-xl border p-2 text-center transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A2744]";

function chipSelected(on: boolean) {
  return on
    ? "border-[#1A2744] bg-white shadow-[var(--start-shadow-sm)] ring-2 ring-[#1A2744]/25"
    : "border-slate-200/90 bg-white/80 hover:border-slate-300 hover:bg-white";
}

function SwatchCheck({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#1A2744] text-white shadow-sm">
      <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
    </span>
  );
}

export function BackgroundSolidPresetGrid({
  options,
  value,
  onChange,
}: {
  options: BackgroundPreset[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="start-label mb-1 block">Solid backgrounds</legend>
      <div
        className="grid grid-cols-2 gap-2 sm:grid-cols-4"
        role="radiogroup"
        aria-label="Solid backgrounds"
      >
        {options.map((p) => {
          const onSel = value === p.id;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={onSel}
              aria-label={p.labelEn}
              onClick={() => onChange(p.id)}
              className={`${chipBase} ${chipSelected(onSel)} min-h-[72px] touch-manipulation`}
            >
              <SwatchCheck show={onSel} />
              <div
                className="h-11 w-full min-h-[44px] rounded-md border border-black/[0.06] shadow-inner sm:h-9"
                style={{ background: p.cssValue }}
              />
              <span className="text-[0.65rem] font-medium leading-tight text-[#475569]">
                {p.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function BackgroundGradientPresetGrid({
  options,
  value,
  onChange,
}: {
  options: BackgroundPreset[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="start-label mb-1 block">Gradients</legend>
      <div
        className="grid grid-cols-2 gap-2 sm:grid-cols-4"
        role="radiogroup"
        aria-label="Gradient backgrounds"
      >
        {options.map((p) => {
          const onSel = value === p.id;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={onSel}
              aria-label={p.labelEn}
              onClick={() => onChange(p.id)}
              className={`${chipBase} ${chipSelected(onSel)} min-h-[88px] touch-manipulation`}
            >
              <SwatchCheck show={onSel} />
              <div
                className="h-14 w-full min-h-[56px] rounded-md border border-black/[0.06] shadow-inner sm:h-12"
                style={{ background: p.cssValue }}
              />
              <span className="text-[0.65rem] font-medium leading-tight text-[#475569]">
                {p.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function TextColorPresetGrid({
  options,
  value,
  onChange,
}: {
  options: TextColorPreset[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="start-label mb-1 block">Text color</legend>
      <p className="start-caption -mt-1 mb-1">
        Only for light backgrounds. Dark solids and gradients set text automatically.
      </p>
      <div
        className="grid grid-cols-3 gap-2 sm:grid-cols-3"
        role="radiogroup"
        aria-label="Text color"
      >
        {options.map((p) => {
          const onSel = value === p.id;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={onSel}
              aria-label={p.labelEn}
              onClick={() => onChange(p.id)}
              className={`${chipBase} ${chipSelected(onSel)} min-h-[72px] touch-manipulation`}
            >
              <SwatchCheck show={onSel} />
              <div
                className="h-11 w-11 min-h-[44px] min-w-[44px] rounded-full border border-black/10 shadow-inner sm:h-9 sm:w-9"
                style={{ backgroundColor: p.color }}
              />
              <span className="text-[0.65rem] font-medium leading-tight text-[#475569]">
                {p.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/** §8.3 — filled accent circles */
export function AccentPresetGrid({
  options,
  value,
  onChange,
}: {
  options: AccentPreset[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="start-label mb-1 block">Accent</legend>
      <div
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        role="radiogroup"
        aria-label="Accent color"
      >
        {options.map((p) => {
          const onSel = value === p.id;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={onSel}
              aria-label={p.labelEn}
              onClick={() => onChange(p.id)}
              className={`${chipBase} ${chipSelected(onSel)} min-h-[88px] touch-manipulation`}
            >
              <SwatchCheck show={onSel} />
              <div
                className="h-8 w-8 min-h-[32px] min-w-[32px] rounded-full border-2 border-white shadow-md sm:h-7 sm:w-7"
                style={{
                  background: p.accent,
                  boxShadow: onSel ? `0 0 0 2px #1A2744` : undefined,
                }}
              />
              <span className="text-[0.65rem] font-medium leading-tight text-[#475569]">
                {p.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function FontPresetGrid({
  options,
  value,
  onChange,
}: {
  options: FontPreset[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="start-label mb-1 block">Font</legend>
      <div
        className="grid grid-cols-2 gap-2 sm:grid-cols-3"
        role="radiogroup"
        aria-label="Font"
      >
        {options.map((p) => {
          const onSel = value === p.id;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={onSel}
              aria-label={p.labelEn}
              onClick={() => onChange(p.id)}
              className={`${chipBase} ${chipSelected(onSel)} min-h-[88px] touch-manipulation`}
            >
              <SwatchCheck show={onSel} />
              <span
                className="flex h-12 w-full min-h-[48px] items-center justify-center rounded-md border border-slate-200/80 bg-slate-50/80 text-2xl text-[#1e293b]"
                style={{
                  fontFamily: p.fontHeading,
                  fontWeight: p.headingWeight,
                }}
              >
                Aa
              </span>
              <span className="text-[0.65rem] font-medium leading-tight text-[#475569]">
                {p.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
