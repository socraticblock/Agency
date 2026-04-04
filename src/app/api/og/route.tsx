import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Extract dynamic fields
    const name = searchParams.get("name") || "Genezisi Client";
    const title = searchParams.get("title") || "Professional";
    const company = searchParams.get("company") || "Genezisi";
    const accent = searchParams.get("accent") || "#fbbf24"; // Default amber-400
    const textPrimary = searchParams.get("text") || "#ffffff";
    const bgPrimary = searchParams.get("bg") || "#030712"; // Default slate-950

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: bgPrimary,
            backgroundImage: `radial-gradient(circle at 25% 25%, ${accent}22 0%, transparent 50%), radial-gradient(circle at 75% 75%, ${accent}11 0%, transparent 50%)`,
            fontFamily: "sans-serif",
            padding: "40px",
          }}
        >
          {/* Main Card Container */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: "1000px",
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              borderRadius: "40px",
              border: `1px solid ${accent}44`,
              padding: "60px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* Left Column: Identity */}
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <div
                style={{
                  fontSize: "64px",
                  fontWeight: "bold",
                  color: textPrimary,
                  marginBottom: "8px",
                  letterSpacing: "-0.02em",
                }}
              >
                {name}
              </div>
              <div
                style={{
                  fontSize: "32px",
                  color: accent,
                  marginBottom: "24px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {title}
              </div>
              <div
                style={{
                  fontSize: "24px",
                  color: textPrimary,
                  opacity: 0.6,
                }}
              >
                {company}
              </div>
            </div>

            {/* Right Column: Branding/Logo */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "120px",
                  height: "120px",
                  borderRadius: "30px",
                  backgroundColor: accent,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "48px",
                    color: bgPrimary,
                    fontWeight: "bold",
                  }}
                >
                  {name.charAt(0)}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Branding */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              right: "40px",
              display: "flex",
              alignItems: "center",
              fontSize: "20px",
              color: textPrimary,
              opacity: 0.4,
            }}
          >
            Built by <span style={{ marginLeft: "6px", fontWeight: "bold", color: accent }}>Genezisi</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
