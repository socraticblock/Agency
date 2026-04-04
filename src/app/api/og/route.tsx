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
    const accent = searchParams.get("accent") || "#fbbf24";
    const photo = searchParams.get("photo");
    const theme = searchParams.get("theme") || "dark";
    
    const isDark = theme === "dark";
    const bgPrimary = isDark ? "#030712" : "#f8fafc";
    const textPrimary = isDark ? "#ffffff" : "#0f172a";
    const glassBg = isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)";
    const glassBorder = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";

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
            backgroundImage: `radial-gradient(circle at 15% 15%, ${accent}18 0%, transparent 35%), radial-gradient(circle at 85% 85%, ${accent}12 0%, transparent 35%), radial-gradient(circle at 50% 50%, ${accent}05 0%, transparent 50%)`,
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
              width: "100%",
              maxWidth: "1050px",
              backgroundColor: glassBg,
              borderRadius: "56px",
              border: `1px solid ${glassBorder}`,
              padding: "70px",
              boxShadow: "0 50px 100px -30px rgba(0, 0, 0, 0.6)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Accent Glow Line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "15%",
                right: "15%",
                height: "3px",
                background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
              }}
            />

            {/* Left: Photo / Avatar */}
            <div
              style={{
                display: "flex",
                marginRight: "60px",
                position: "relative",
              }}
            >
              {/* Subtle Outer Glow for Photo */}
              <div
                style={{
                  position: "absolute",
                  inset: "-20px",
                  borderRadius: "140px",
                  background: `${accent}11`,
                  filter: "blur(20px)",
                }}
              />
              <div
                style={{
                  width: "240px",
                  height: "240px",
                  borderRadius: "120px",
                  border: `6px solid ${accent}`,
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: isDark ? "#1e293b" : "#e2e8f0",
                }}
              >
                {photo ? (
                  <img
                    src={photo}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      fontSize: "96px",
                      fontWeight: "900",
                      color: accent,
                    }}
                  >
                    {name.charAt(0)}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Info */}
            <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
              <div
                style={{
                  fontSize: "22px",
                  color: accent,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "0.25em",
                  marginBottom: "16px",
                }}
              >
                Exclusive Digital Card
              </div>
              <div
                style={{
                  fontSize: "88px",
                  fontWeight: "900",
                  color: textPrimary,
                  marginBottom: "4px",
                  letterSpacing: "-0.051em",
                  lineHeight: 1.05,
                }}
              >
                {name}
              </div>
              <div
                style={{
                  fontSize: "38px",
                  fontWeight: "500",
                  color: textPrimary,
                  opacity: 0.9,
                  marginBottom: "28px",
                  letterSpacing: "-0.02em",
                }}
              >
                {title}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    height: "2px",
                    width: "50px",
                    backgroundColor: accent,
                    marginRight: "16px",
                  }}
                />
                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: "600",
                    color: textPrimary,
                    opacity: 0.45,
                    letterSpacing: "0.02em",
                  }}
                >
                  {company}
                </div>
              </div>
            </div>
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
