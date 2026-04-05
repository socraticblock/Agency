import { CollapsibleSection } from "../CollapsibleSection";
import { SocialAppearanceControls } from "./SocialAppearanceControls";
import { type SectionProps, fieldClass, labelClass } from "./types";

export function SocialSection({
  state,
  setState,
  patch,
  isOpen,
  onToggle,
}: SectionProps) {
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
    <CollapsibleSection
      id="social"
      title="Social media"
      isOpen={isOpen}
      onToggle={onToggle}
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

      <SocialAppearanceControls state={state} patch={patch} />
    </CollapsibleSection>
  );
}
