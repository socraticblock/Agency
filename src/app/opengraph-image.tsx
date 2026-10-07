import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Genezisi — websites, AI systems and automation";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#02060b",
          color: "#ffffff",
          padding: "64px 72px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "520px",
            height: "520px",
            right: "-120px",
            top: "-120px",
            borderRadius: "999px",
            background: "radial-gradient(circle, rgba(165,243,252,.12), rgba(2,6,11,0) 68%)",
          }}
        />
        <div style={{ display: "flex", fontSize: "24px", fontWeight: 800, letterSpacing: ".28em" }}>
          GENEZISI
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: "900px" }}>
          <div style={{ display: "flex", fontSize: "76px", lineHeight: .9, fontWeight: 900, letterSpacing: "-.055em" }}>
            Your website is only the beginning.
          </div>
          <div style={{ display: "flex", marginTop: "30px", fontSize: "25px", lineHeight: 1.4, color: "rgba(255,255,255,.68)" }}>
            Distinctive websites, useful AI systems and practical automation for real businesses.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "18px", fontWeight: 700 }}>
            <div style={{ width: "9px", height: "9px", borderRadius: "999px", background: "#a5f3fc" }} />
            Websites · AI systems · Automation
          </div>
          <div style={{ display: "flex", fontSize: "16px", color: "rgba(255,255,255,.45)" }}>genezisi.com</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
