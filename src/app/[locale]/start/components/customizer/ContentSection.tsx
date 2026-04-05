"use client";

import type { Dispatch, SetStateAction } from "react";
import type { Lane1CustomizerState, PrimaryLang } from "../../lib/types";

const fieldClass = "start-field mt-1.5 w-full";
const labelClass = "start-label mb-1.5";

interface ContentSectionProps {
  state: Lane1CustomizerState;
  setState: Dispatch<SetStateAction<Lane1CustomizerState>>;
  patch: (p: Partial<Lane1CustomizerState>) => void;
}

export function ContentSection({ state, setState, patch }: ContentSectionProps) {
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
        <input className={fieldClass} value={state.name} onChange={(e) => patch({ name: e.target.value })} />
      </label>
      {state.secondaryMode === "self" ? (
        <label className={labelClass}>
          Name (GE)
          <input className={fieldClass} value={state.nameSecondary} onChange={(e) => patch({ nameSecondary: e.target.value })} />
        </label>
      ) : null}
      <label className={labelClass}>
        Title (EN)
        <input className={fieldClass} value={state.title} onChange={(e) => patch({ title: e.target.value })} />
      </label>
      {state.secondaryMode === "self" ? (
        <label className={labelClass}>
          Title (GE)
          <input className={fieldClass} value={state.titleSecondary} onChange={(e) => patch({ titleSecondary: e.target.value })} />
        </label>
      ) : null}
      <label className={labelClass}>
        Company Name
        <input className={fieldClass} value={state.company} onChange={(e) => patch({ company: e.target.value })} placeholder="e.g. Agency Name" />
      </label>
      <label className={labelClass}>
        Tagline (EN)
        <input className={fieldClass} value={state.tagline} onChange={(e) => patch({ tagline: e.target.value })} placeholder="e.g. Professional tagline..." />
      </label>
      {state.secondaryMode === "self" ? (
        <label className={labelClass}>
          Tagline (GE)
          <input className={fieldClass} value={state.taglineSecondary} onChange={(e) => patch({ taglineSecondary: e.target.value })} placeholder="სლოგანი" />
        </label>
      ) : null}
      <label className={labelClass}>
        Phone
        <input className={fieldClass} value={state.phone} onChange={(e) => patch({ phone: e.target.value })} inputMode="tel" />
      </label>
      <label className={labelClass}>
        Email
        <input className={fieldClass} value={state.email} onChange={(e) => patch({ email: e.target.value })} type="email" />
      </label>
      <label className={labelClass}>
        Address (EN)
        <textarea className="start-field start-field-textarea mt-1.5 w-full" rows={2} value={state.address} onChange={(e) => patch({ address: e.target.value })} />
      </label>
      {state.secondaryMode === "self" ? (
        <label className={labelClass}>
          Address (GE)
          <textarea className="start-field start-field-textarea mt-1.5 w-full" rows={2} value={state.addressSecondary} onChange={(e) => patch({ addressSecondary: e.target.value })} />
        </label>
      ) : null}
      <label className={labelClass}>
        Hours (EN)
        <input className={fieldClass} value={state.hours} onChange={(e) => patch({ hours: e.target.value })} />
      </label>
      {state.secondaryMode === "self" ? (
        <label className={labelClass}>
          Hours (GE)
          <input className={fieldClass} value={state.hoursSecondary} onChange={(e) => patch({ hoursSecondary: e.target.value })} />
        </label>
      ) : null}
      <label className={labelClass}>
        Services heading (EN)
        <input className={fieldClass} value={state.practiceHeading} onChange={(e) => patch({ practiceHeading: e.target.value })} />
      </label>
      <label className={labelClass}>
        Services heading (GE)
        <input className={fieldClass} value={state.practiceHeadingSecondary} onChange={(e) => patch({ practiceHeadingSecondary: e.target.value })} />
      </label>
    </>
  );
}
