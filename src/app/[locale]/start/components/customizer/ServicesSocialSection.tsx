"use client";

import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Lane1CustomizerState } from "../../lib/types";

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

interface ServicesSectionProps {
  state: Lane1CustomizerState;
  setState: Dispatch<SetStateAction<Lane1CustomizerState>>;
  patch: (p: Partial<Lane1CustomizerState>) => void;
}

export function ServicesSection({ state, setState, patch }: ServicesSectionProps) {
  function setServiceArea(i: number, v: string, secondary: boolean) {
    setState((s) => {
      if (secondary) {
        const next = [...s.serviceAreasSecondary] as [string, string, string, string];
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

  return (
    <>
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
          <input className={fieldClass} placeholder="Title (e.g. Real Estate)" value={state.serviceAreas[i]} onChange={(e) => setServiceArea(i, e.target.value, false)} />
          <textarea className={`${fieldClass} h-16 min-h-[64px] resize-none pt-2 text-xs`} placeholder="Brief description (optional)..." value={state.serviceDescriptions[i]} onChange={(e) => setServiceDescription(i, e.target.value, false)} />
        </div>
      ))}

      {state.secondaryMode === "self" && (
        <>
          <div className="my-4 border-b border-slate-100" />
          {Array.from({ length: state.serviceCount }).map((_, i) => (
            <div key={`s-${i}`} className="mb-4 space-y-1.5 last:mb-0">
              <span className={labelClass}>{`Service ${i + 1} (GE)`}</span>
              <input className={fieldClass} placeholder="სათაური" value={state.serviceAreasSecondary[i]} onChange={(e) => setServiceArea(i, e.target.value, true)} />
              <textarea className={`${fieldClass} h-16 min-h-[64px] resize-none pt-2 text-xs`} placeholder="აღწერა (დამატებითი)..." value={state.serviceDescriptionsSecondary[i]} onChange={(e) => setServiceDescription(i, e.target.value, true)} />
            </div>
          ))}
        </>
      )}
    </>
  );
}

interface SocialSectionProps {
  state: Lane1CustomizerState;
  setState: Dispatch<SetStateAction<Lane1CustomizerState>>;
}

export function SocialSection({ state, setState }: SocialSectionProps) {
  function addExtraSocial() {
    setState((s) => ({
      ...s,
      social: {
        ...s.social,
        extra: [...s.social.extra, { label: "", url: "" }],
      },
    }));
  }

  return (
    <>
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
    </>
  );
}
