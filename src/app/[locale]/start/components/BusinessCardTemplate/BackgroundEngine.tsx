import { memo } from "react";

export const BackgroundEngine = memo(function BackgroundEngine() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none rounded-[inherit]">
      {/* 1. Base Image Layer (with independent blur) */}
      <div 
        className="absolute inset-0 transition-all duration-700"
        style={{ 
          backgroundImage: "var(--bg-base-image)",
          filter: "blur(var(--bg-base-blur))",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "scale(1.1)", // Prevent edge bleeding when blurred
        }}
      />

      {/* 2. Composite Overlay Layer (Gradient, Mesh, or Solid Tint) */}
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
    </div>
  );
});
