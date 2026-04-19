import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Genezisi";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

// Replicating the home OG template directly to ensure static generation stability
export default function Image() {
  const accent = "#10b981";
  const bgPrimary = "#030712";
  const textPrimary = "#ffffff";
  const textMuted = "#9ca3af";
  const textDarker = "#6b7280";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: bgPrimary,
          fontFamily: '"Inter", sans-serif',
          position: "relative",
          overflow: "hidden",
          padding: "80px",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            opacity: 0.05,
            backgroundImage: `linear-gradient(90deg, ${textPrimary} 1px, transparent 1px), linear-gradient(${textPrimary} 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "-200px",
            left: "-200px",
            width: "800px",
            height: "800px",
            background: `radial-gradient(circle, ${accent}20 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", flex: 1, width: "100%" }}>
          <div
            style={{
              fontSize: "80px",
              fontWeight: 800,
              color: textPrimary,
              letterSpacing: "0.3em",
              marginTop: "60px",
              marginBottom: "80px",
            }}
          >
            GENEZISI
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
            <div style={{ fontSize: "32px", fontWeight: 400, color: textPrimary, lineHeight: 1.4 }}>
              "Escape the social media trap."
            </div>
            <div style={{ fontSize: "28px", fontWeight: 400, color: textDarker }}>
              "Build a permanent digital home."
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "center", marginTop: "auto" }}>
            <div style={{ width: "400px", height: "1px", backgroundColor: accent, opacity: 0.3, marginBottom: "30px" }} />
            
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "flex-end" }}>
              <div style={{ fontSize: "18px", fontWeight: 500, color: textMuted, letterSpacing: "0.05em" }}>
                Web Design  ·  Branding  ·  E-Commerce  ·  Digital Cards
              </div>
              <div style={{ fontSize: "16px", fontWeight: 500, color: textDarker }}>
                genezisi.com
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
