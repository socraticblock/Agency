import type { Lane1CustomizerState, SocialIconColorMode, SocialIconSize, SocialIconStyle } from "../../lib/types";
import { fieldClass, labelClass } from "./types";

export function SocialAppearanceControls({
  state,
  patch,
}: {
  state: Lane1CustomizerState;
  patch: (p: Partial<Lane1CustomizerState>) => void;
}) {
  return (
    <fieldset className="mt-6 space-y-3 border-t border-black/10 pt-4">
      <legend className="start-label font-semibold text-[#1e293b]">Icon appearance</legend>
      <label className={labelClass}>
        Style
        <select
          className={fieldClass}
          value={state.socialIconStyle}
          onChange={(e) => patch({ socialIconStyle: e.target.value as SocialIconStyle })}
        >
          <option value="filled">Filled</option>
          <option value="outlined">Outlined</option>
          <option value="rounded">Rounded chip</option>
          <option value="minimal">Minimal</option>
        </select>
      </label>
      <label className={labelClass}>
        Size
        <select
          className={fieldClass}
          value={state.socialIconSize}
          onChange={(e) => patch({ socialIconSize: e.target.value as SocialIconSize })}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </label>
      <label className={labelClass}>
        Color
        <select
          className={fieldClass}
          value={state.socialIconColorMode}
          onChange={(e) => patch({ socialIconColorMode: e.target.value as SocialIconColorMode })}
        >
          <option value="accent">Accent</option>
          <option value="text">Body text</option>
          <option value="custom">Custom</option>
        </select>
      </label>
      {state.socialIconColorMode === "custom" ? (
        <div className="grid grid-cols-[42px_1fr] gap-2">
          <input
            type="color"
            value={state.socialIconCustomHex}
            onChange={(e) => patch({ socialIconCustomHex: e.target.value })}
            className="h-10 w-10 cursor-pointer rounded-lg border border-black/10 bg-white p-1"
            aria-label="Social icon custom color"
          />
          <input
            className={fieldClass}
            value={state.socialIconCustomHex}
            onChange={(e) => patch({ socialIconCustomHex: e.target.value })}
            placeholder="#C5A55A"
          />
        </div>
      ) : null}
      <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-[#1e293b]">
        <input
          type="checkbox"
          className="h-4 w-4"
          style={{ accentColor: "var(--accent)" }}
          checked={state.showSocialLabels}
          onChange={(e) => patch({ showSocialLabels: e.target.checked })}
        />
        Show platform labels under icons
      </label>
    </fieldset>
  );
}
