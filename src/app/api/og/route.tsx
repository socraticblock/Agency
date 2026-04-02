import { ImageResponse } from "next/og";

export const runtime = "edge";

const W = 1200;
const H = 630;

function siteHostname(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) return "genezisi.digital";
  try {
    return new URL(raw).hostname.replace(/^www\./, "") || "genezisi.digital";
  } catch {
    return "genezisi.digital";
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawTitle = searchParams.get("title")?.trim() || "Genezisi";
  const title = rawTitle.slice(0, 72);
  const tagline =
    "Permanent digital infrastructure — not rented social reach.";
  const hostLabel = siteHostname();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "linear-gradient(145deg, #030717 0%, #0f172a 42%, #064e3b 100%)",
          fontFamily:
            'ui-sans-serif, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#34d399",
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#10b981",
              boxShadow: "0 0 24px rgba(16,185,129,0.9)",
            }}
          />
          GENEZISI
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.05,
              color: "#f8fafc",
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.35,
              color: "#94a3b8",
              maxWidth: 900,
            }}
          >
            {tagline}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 20,
            color: "#64748b",
          }}
        >
          <span>Tbilisi · Georgia</span>
          <span style={{ color: "#10b981", fontWeight: 600 }}>{hostLabel}</span>
        </div>
      </div>
    ),
    { width: W, height: H }
  );
}
