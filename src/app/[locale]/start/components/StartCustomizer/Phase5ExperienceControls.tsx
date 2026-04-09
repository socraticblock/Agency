import type { CardHoverEffectId, Lane1CustomizerState } from "../../lib/types";
import { fieldClass, labelClass } from "./types";

export function Phase5ExperienceControls({
  state,
  patch,
  onStylePatch,
  useSecondary,
}: {
  state: Lane1CustomizerState;
  patch: (p: Partial<Lane1CustomizerState>) => void;
  onStylePatch: (p: Partial<Lane1CustomizerState["style"]>) => void;
  useSecondary?: boolean;
}) {
  return (
    <div className="mt-6 space-y-5 border-t border-black/10 pt-6">
      <label className={labelClass}>
        {useSecondary ? "ანიმაციის სიჩქარე" : "Animation speed"} ({state.style.animationSpeed}%)
        <input
          type="range"
          min={15}
          max={150}
          value={state.style.animationSpeed}
          onChange={(e) => onStylePatch({ animationSpeed: Number(e.target.value) })}
          className="mt-1 w-full accent-[#1A2744]"
        />
        <span className="start-caption">{useSecondary ? "დაბალი = ნელი, მაღალი = სწრაფი." : "Lower is slower; higher is snappier."}</span>
      </label>

      <fieldset>
        <legend className={`${labelClass} mb-2 block`}>{useSecondary ? "3D დახრა" : "3D tilt (desktop wide layout)"}</legend>
        <label className="mb-3 flex cursor-pointer items-center gap-3 text-sm font-medium text-[#1e293b]">
          <input
            type="checkbox"
            className="h-4 w-4"
            style={{ accentColor: "var(--accent)" }}
            checked={state.cardTiltEnabled}
            onChange={(e) => patch({ cardTiltEnabled: e.target.checked })}
          />
          {useSecondary ? "ჩართე პარალაქსის დახრა" : "Enable parallax tilt on hero"}
        </label>
        <label className={labelClass}>
          {useSecondary ? "დახრის სიძლიერე" : "Tilt strength"} ({state.cardTiltMaxDeg}°)
          <input
            type="range"
            min={3}
            max={12}
            value={state.cardTiltMaxDeg}
            onChange={(e) => patch({ cardTiltMaxDeg: Number(e.target.value) })}
            className="mt-1 w-full accent-[#1A2744]"
            disabled={!state.cardTiltEnabled}
          />
        </label>
      </fieldset>

      <label className={labelClass}>
        {useSecondary ? "ჰოვერის აქცენტი" : "Hover emphasis (pointer devices only)"}
        <select
          className={fieldClass}
          value={state.cardHoverEffectId}
          onChange={(e) => patch({ cardHoverEffectId: e.target.value as CardHoverEffectId })}
        >
          <option value="none">{useSecondary ? "არცერთი" : "None"}</option>
          <option value="lift">{useSecondary ? "აწევა" : "Lift"}</option>
          <option value="glow">{useSecondary ? "ნათება" : "Glow"}</option>
          <option value="scale">{useSecondary ? "მსუბუქი მასშტაბი" : "Gentle scale"}</option>
        </select>
      </label>
    </div>
  );
}
