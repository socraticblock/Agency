import { memo } from "react";
import type { BackgroundEffectId } from "../../lib/types";

export const BackgroundEngine = memo(function BackgroundEngine({
  bgEffectId,
}: {
  bgEffectId: BackgroundEffectId;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          backgroundImage: "var(--bg-base-image)",
          filter: "blur(var(--bg-base-blur))",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "scale(1.1)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "var(--bg-image-overlay)",
          backgroundColor: "var(--bg-overlay-color)",
          opacity: "var(--bg-overlay-opacity)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "var(--texture-bg)",
          backgroundSize: "var(--texture-bg-size, auto)",
          backgroundRepeat: "repeat",
          opacity: "var(--texture-opacity, 0)",
          mixBlendMode: "soft-light",
        }}
      />

      {bgEffectId !== "none" ? (
        <div className="business-card-bg-effect-layer" data-effect={bgEffectId} aria-hidden />
      ) : null}
    </div>
  );
});
