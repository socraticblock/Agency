import { memo } from "react";
import type { StylePresetSelection } from "../../lib/types";

export const BackgroundEngine = memo(function BackgroundEngine({
  style,
}: {
  style: StylePresetSelection;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      {/* Layer 1: Base Color (Foundation) */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{
          backgroundColor: "var(--bg-base-color)",
        }}
      />

      {/* Layer 2: Image Overlay */}
      {style.bgBaseId === "image" && style.bgBaseImageDataUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: `url(${style.bgBaseImageDataUrl})`,
            filter: `blur(${style.bgBaseBlur || 0}px)`,
            transform: "scale(1.1)",
          }}
        />
      )}

      {/* Layer 3: Overlay Decor (Gradient/Mesh) */}
      {style.bgOverlayId && style.bgOverlayId !== "none" && (
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background: "var(--overlay-gradient)",
            opacity: "var(--overlay-opacity)",
          }}
        />
      )}

      {/* Layer 4: Background Motion (opacity, speed, intensity from CSS vars) */}
      {style.bgEffectId !== "none" && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-700"
          style={{ opacity: "var(--bg-effect-opacity)" }}
        >
          <div className="business-card-bg-effect-strength">
            <div
              className="business-card-bg-effect-layer absolute inset-0 transition-opacity duration-700"
              data-effect={style.bgEffectId}
              aria-hidden
            />
          </div>
        </div>
      )}

      {/* Layer 5: Texture Overlay */}
      {style.textureId && style.textureId !== "none" && (
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            backgroundImage: "var(--texture-pattern)",
            backgroundSize: "var(--texture-bg-size, auto)",
            opacity: "var(--texture-opacity)",
            mixBlendMode: "var(--texture-blend-mode)" as any,
          }}
        />
      )}
    </div>
  );
});
