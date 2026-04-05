import { memo } from "react";
import type { StylePresetSelection } from "../../lib/types";

export const BackgroundEngine = memo(function BackgroundEngine({
  style,
}: {
  style: StylePresetSelection;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
      {/* Layer 1: Base Color */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{
          backgroundColor: "var(--bg-base-color)",
          zIndex: 1,
        }}
      />

      {/* Layer 2: Image Overlay */}
      {style.bgBaseId === "image" && style.bgBaseImageDataUrl && (
        <div
          className="absolute inset-0 transition-all duration-700 bg-cover bg-center"
          style={{
            backgroundImage: `url(${style.bgBaseImageDataUrl})`,
            filter: `blur(${style.bgBaseBlur || 0}px)`,
            zIndex: 2,
            transform: "scale(1.1)",
          }}
        />
      )}

      {/* Layer 3: Overlay Decor */}
      {style.bgOverlayId && style.bgOverlayId !== "none" && (
        <div
          className="absolute inset-0"
          style={{
            background: "var(--overlay-gradient)",
            opacity: "var(--overlay-opacity)",
            zIndex: 3,
          }}
        />
      )}

      {/* Layer 4: Background Motion */}
      {style.bgEffectId !== "none" && (
        <div 
          className="business-card-bg-effect-layer absolute inset-0" 
          data-effect={style.bgEffectId} 
          style={{ zIndex: 4 }}
          aria-hidden 
        />
      )}

      {/* Layer 5: Texture Overlay */}
      {style.textureId && style.textureId !== "none" && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "var(--texture-pattern)",
            backgroundSize: "var(--texture-bg-size, auto)",
            opacity: "var(--texture-opacity)",
            mixBlendMode: "var(--texture-blend-mode)" as any,
            zIndex: 5,
          }}
        />
      )}
    </div>
  );
});
