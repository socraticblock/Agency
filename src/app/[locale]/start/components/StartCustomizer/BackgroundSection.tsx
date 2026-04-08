import { CollapsibleSection } from "../CollapsibleSection";
import { BackgroundBaseControls, BackgroundOverlayControls, TextColorPresetGrid } from "../StylePresetGrids";
import { TEXT_COLOR_PRESETS, isBackgroundLockingTextColor } from "../../lib/presets";
import { TextureEffectControls } from "./TextureEffectControls";
import { BackgroundMotionControls } from "../segments/BackgroundMotionControls";
import { type SectionProps } from "./types";

export function BackgroundSection({ state, onPatch, isOpen, onToggle }: SectionProps & { onPatch: any }) {
  const textLocked = isBackgroundLockingTextColor(state.style.backgroundId);

  return (
    <CollapsibleSection
      id="background"
      title="Background"
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <p className="start-caption">Layer your background with high-end effects.</p>
      
      <BackgroundBaseControls 
        state={state}
        onPatch={onPatch}
      />

      <BackgroundOverlayControls 
        state={state}
        onPatch={onPatch}
      />

      <div className="mt-6 space-y-6 border-t border-black/10 pt-6">
        <TextureEffectControls state={state} onPatch={onPatch} />
        <BackgroundMotionControls state={state} onPatch={onPatch} />
      </div>

      {!textLocked ? (
        <TextColorPresetGrid
          options={TEXT_COLOR_PRESETS}
          value={state.style.textColorId}
          onChange={(id: string) => onPatch({ textColorId: id })}
        />
      ) : (
        <p className="start-caption">
          Text color is set automatically for this background (dark or gradient preset).
        </p>
      )}
    </CollapsibleSection>
  );
}
