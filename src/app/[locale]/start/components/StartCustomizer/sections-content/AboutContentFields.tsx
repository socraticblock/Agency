import type { Lane1CustomizerState } from "../../../lib/types";
import { fieldClass, labelClass } from "../types";

export function AboutContentFields({
  state,
  patch,
}: {
  state: Lane1CustomizerState;
  patch: (p: Partial<Lane1CustomizerState>) => void;
}) {
  return (
    <fieldset className="space-y-3 border-t border-black/10 pt-4">
      <legend className="start-label font-semibold text-[#1e293b]">About</legend>
      <label className={labelClass}>
        Bio (English)
        <textarea
          className={`${fieldClass} min-h-[88px] resize-y`}
          value={state.aboutBio}
          onChange={(e) => patch({ aboutBio: e.target.value })}
          placeholder="Short professional bio…"
          onFocus={(e) => e.target.select()}
        />
      </label>
      <label className={labelClass}>
        Bio (Georgian, optional)
        <textarea
          className={`${fieldClass} min-h-[88px] resize-y`}
          value={state.aboutBioSecondary}
          onChange={(e) => patch({ aboutBioSecondary: e.target.value })}
          placeholder="ქართული ტექსტი…"
          onFocus={(e) => e.target.select()}
        />
      </label>
    </fieldset>
  );
}
