import { CollapsibleSection } from "../CollapsibleSection";
import { type SectionProps } from "./types";

export function AddonsSection({ state, patch, isOpen, onToggle }: SectionProps) {
  return (
    <CollapsibleSection
      id="addons"
      title="Add-ons"
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <h4 className="start-subsection-title mb-2">Language & translation</h4>
      <p className="start-caption mb-3">
        Set this in the on-card <strong>Profile setup</strong> pill. Pricing updates automatically there.
      </p>
      <p className="mb-4 rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-2 text-xs text-slate-600">
        Current mode:{" "}
        {state.profileLanguageMode === "both"
          ? state.translationMethod === "professional"
            ? "Both languages + Professional translation (+150 ₾)"
            : "Both languages + Self translation (+50 ₾)"
          : state.profileLanguageMode === "ka_only"
            ? "Only Georgian"
            : "Only English"}
      </p>

      <div className="mt-6 border-t border-slate-200/80 pt-4">
        <label className="start-ios-toggle-row flex min-h-[52px] cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-200/60 bg-white/50 px-3 py-2">
            <span className="text-sm font-medium text-[#1e293b]">Google Maps (free)</span>
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
        {state.addGoogleMap && (
          <>
          <label className="start-ios-toggle-row mt-2 flex min-h-[52px] cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-200/60 bg-white/50 px-3 py-2">
            <span className="text-sm font-medium text-[#1e293b]">Show map preview</span>
            <button
              type="button"
              role="switch"
              aria-checked={state.showMapPreview}
              onClick={() => patch({ showMapPreview: !state.showMapPreview })}
              className={`start-ios-toggle relative h-[31px] w-[51px] shrink-0 rounded-full transition-colors duration-200 ${
                state.showMapPreview ? "bg-[#1A2744]" : "bg-[#CBD5E1]"
              }`}
            >
              <span
                className={`absolute top-[2px] left-[2px] h-[27px] w-[27px] rounded-full bg-white shadow transition-transform duration-200 ${
                  state.showMapPreview ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </label>
          <label className="start-ios-toggle-row mt-2 flex min-h-[52px] cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-200/60 bg-white/50 px-3 py-2">
            <span className="text-sm font-medium text-[#1e293b]">Show "Get Directions" button</span>
            <button
              type="button"
              role="switch"
              aria-checked={state.showGetDirectionsButton}
              onClick={() => patch({ showGetDirectionsButton: !state.showGetDirectionsButton })}
              className={`start-ios-toggle relative h-[31px] w-[51px] shrink-0 rounded-full transition-colors duration-200 ${
                state.showGetDirectionsButton ? "bg-[#1A2744]" : "bg-[#CBD5E1]"
              }`}
            >
              <span
                className={`absolute top-[2px] left-[2px] h-[27px] w-[27px] rounded-full bg-white shadow transition-transform duration-200 ${
                  state.showGetDirectionsButton ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </label>
          </>
        )}
      </div>
    </CollapsibleSection>
  );
}
