import { CollapsibleSection } from "../CollapsibleSection";
import type { PrimaryLang } from "../../lib/types";
import { type SectionProps, fieldClass, labelClass } from "./types";

export function ContentSection({
  state,
  patch,
  isOpen,
  onToggle,
}: SectionProps) {
  return (
    <CollapsibleSection
      id="content"
      title="Content"
      isOpen={isOpen}
      onToggle={onToggle}
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
          onFocus={(e) => e.target.select()}
        />
      </label>
      {state.secondaryMode === "self" ? (
        <label className={labelClass}>
          Name (GE)
          <input
            className={fieldClass}
            value={state.nameSecondary}
            onChange={(e) => patch({ nameSecondary: e.target.value })}
            onFocus={(e) => e.target.select()}
          />
        </label>
      ) : null}
      <label className={labelClass}>
        Title (EN)
        <input
          className={fieldClass}
          value={state.title}
          onChange={(e) => patch({ title: e.target.value })}
          onFocus={(e) => e.target.select()}
        />
      </label>
      {state.secondaryMode === "self" ? (
        <label className={labelClass}>
          Title (GE)
          <input
            className={fieldClass}
            value={state.titleSecondary}
            onChange={(e) => patch({ titleSecondary: e.target.value })}
            onFocus={(e) => e.target.select()}
          />
        </label>
      ) : null}

      <label className={labelClass}>
        Company Name
        <input
          className={fieldClass}
          value={state.company}
          onChange={(e) => patch({ company: e.target.value })}
          placeholder="e.g. Agency Name"
          onFocus={(e) => e.target.select()}
        />
      </label>

      <label className={labelClass}>
        Tagline (EN)
        <input
          className={fieldClass}
          value={state.tagline}
          onChange={(e) => patch({ tagline: e.target.value })}
          placeholder="e.g. Professional tagline..."
          onFocus={(e) => e.target.select()}
        />
      </label>

      {state.secondaryMode === "self" ? (
        <label className={labelClass}>
          Tagline (GE)
          <input
            className={fieldClass}
            value={state.taglineSecondary}
            onChange={(e) => patch({ taglineSecondary: e.target.value })}
            placeholder="სლოგანი"
            onFocus={(e) => e.target.select()}
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
          onFocus={(e) => e.target.select()}
        />
      </label>
      <label className={labelClass}>
        CTA — Call button label
        <input
          className={fieldClass}
          value={state.ctaTextCall}
          onChange={(e) => patch({ ctaTextCall: e.target.value })}
          placeholder="Call Me"
          onFocus={(e) => e.target.select()}
        />
      </label>
      <label className={labelClass}>
        CTA — WhatsApp button label
        <input
          className={fieldClass}
          value={state.ctaTextWhatsApp}
          onChange={(e) => patch({ ctaTextWhatsApp: e.target.value })}
          placeholder="WhatsApp Me"
          onFocus={(e) => e.target.select()}
        />
      </label>
      <label className={labelClass}>
        Email
        <input
          className={fieldClass}
          value={state.email}
          onChange={(e) => patch({ email: e.target.value })}
          type="email"
          onFocus={(e) => e.target.select()}
        />
      </label>
      <label className={labelClass}>
        Address (EN)
        <textarea
          className="start-field start-field-textarea mt-1.5 w-full"
          rows={2}
          value={state.address}
          onChange={(e) => patch({ address: e.target.value })}
          onFocus={(e) => e.target.select()}
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
            onFocus={(e) => e.target.select()}
          />
        </label>
      ) : null}
      <label className={labelClass}>
        Hours (EN)
        <input
          className={fieldClass}
          value={state.hours}
          onChange={(e) => patch({ hours: e.target.value })}
          onFocus={(e) => e.target.select()}
        />
      </label>
      {state.secondaryMode === "self" ? (
        <label className={labelClass}>
          Hours (GE)
          <input
            className={fieldClass}
            value={state.hoursSecondary}
            onChange={(e) => patch({ hoursSecondary: e.target.value })}
            onFocus={(e) => e.target.select()}
          />
        </label>
      ) : null}
      <label className={labelClass}>
        Services heading (EN)
        <input
          className={fieldClass}
          value={state.practiceHeading}
          onChange={(e) => patch({ practiceHeading: e.target.value })}
          onFocus={(e) => e.target.select()}
        />
      </label>
      <label className={labelClass}>
        Services heading (GE)
        <input
          className={fieldClass}
          value={state.practiceHeadingSecondary}
          onChange={(e) => patch({ practiceHeadingSecondary: e.target.value })}
          onFocus={(e) => e.target.select()}
        />
      </label>
    </CollapsibleSection>
  );
}
