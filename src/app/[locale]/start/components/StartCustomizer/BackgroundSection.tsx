import { CollapsibleSection } from "../CollapsibleSection";
import { BackgroundBaseControls, BackgroundOverlayControls } from "../StylePresetGrids";
import { TextureEffectControls } from "./TextureEffectControls";
import { BackgroundMotionControls } from "../segments/BackgroundMotionControls";
import { type SectionProps } from "./types";

export function BackgroundSection({ state, onPatch, isOpen, onToggle }: SectionProps & { onPatch: any }) {
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

    </CollapsibleSection>
  );
}
