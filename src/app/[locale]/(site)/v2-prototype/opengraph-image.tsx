import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const ka = locale === "ka";

  const headline = ka
    ? "თქვენი ვებსაიტი მხოლოდ დასაწყისია."
    : "Your website is only the beginning.";
  const services = ka
    ? "ვებსაიტები · AI · ავტომატიზაცია"
    : "Websites · AI · Automation";
  const support = ka
    ? "გარედან ლამაზი. შიგნით სასარგებლო."
    : "Beautiful on the surface. Useful underneath.";

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
          padding: "70px 76px",
          fontFamily: "Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-110px",
            top: "-120px",
            width: "620px",
            height: "620px",
            borderRadius: "999px",
            background: "radial-gradient(circle, rgba(165,243,252,.2), rgba(2,6,11,0) 68%)",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
          <div style={{ fontSize: 27, fontWeight: 800, letterSpacing: "0.28em" }}>GENEZISI</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,.6)" }}>{services}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28, position: "relative", maxWidth: 980 }}>
          <div style={{ fontSize: ka ? 68 : 78, fontWeight: 900, lineHeight: 0.94, letterSpacing: "-0.055em" }}>{headline}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "rgba(255,255,255,.62)" }}>
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#a5f3fc", boxShadow: "0 0 26px rgba(165,243,252,.8)" }} />
            {support}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", fontSize: 16, color: "rgba(255,255,255,.42)" }}>
          <div>Receive → Route → Resolve</div>
          <div>genezisi.com</div>
        </div>
      </div>
    ),
    size,
  );
}
