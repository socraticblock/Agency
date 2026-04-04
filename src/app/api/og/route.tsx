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
            backgroundImage: isDark
              ? `radial-gradient(circle at 20% 20%, ${accent}25 0%, transparent 40%), radial-gradient(circle at 80% 80%, ${accent}15 0%, transparent 40%), radial-gradient(circle at 50% 50%, #000 0%, #050510 100%)`
              : `radial-gradient(circle at 20% 20%, ${accent}15 0%, transparent 40%), radial-gradient(circle at 80% 80%, ${accent}10 0%, transparent 40%), radial-gradient(circle at 50% 50%, #fff 0%, #f0f4f8 100%)`,
            fontFamily: "Inter, sans-serif",
            padding: "60px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Cinematic Background Lines */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              opacity: isDark ? 0.03 : 0.05,
              backgroundImage: `linear-gradient(90deg, ${textPrimary} 1px, transparent 1px), linear-gradient(${textPrimary} 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Luxury Card Container */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              maxWidth: "1080px",
              backgroundColor: isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.01)",
              borderRadius: "64px",
              border: `1px solid ${glassBorder}`,
              padding: "80px",
              boxShadow: isDark ? "0 80px 150px -40px rgba(0, 0, 0, 0.9)" : "0 40px 100px -30px rgba(0, 0, 0, 0.1)",
              position: "relative",
            }}
          >
            {/* Top Accent Bar */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "10%",
                right: "10%",
                height: "4px",
                background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
              }}
            />

            {/* Left: Identity Photo */}
            <div
              style={{
                display: "flex",
                marginRight: "70px",
                position: "relative",
              }}
            >
              {/* Outer Glow Halo */}
              <div
                style={{
                  position: "absolute",
                  inset: "-30px",
                  borderRadius: "150px",
                  background: `${accent}20`,
                  filter: "blur(35px)",
                }}
              />
              <div
                style={{
                  width: "280px",
                  height: "280px",
                  borderRadius: "140px",
                  border: `8px solid ${accent}`,
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: isDark ? "#0f172a" : "#cbd5e1",
                  boxShadow: `0 0 40px ${accent}30`,
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
                      fontSize: "120px",
                      fontWeight: "900",
                      color: accent,
                      letterSpacing: "-0.05em",
                    }}
                  >
                    {name.charAt(0)}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Premium Typography */}
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <div
                style={{
                  fontSize: "24px",
                  color: accent,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "0.4em",
                  marginBottom: "24px",
                  opacity: 0.8,
                }}
              >
                Digital Profile
              </div>
              <div
                style={{
                  fontSize: "102px",
                  fontWeight: "900",
                  color: textPrimary,
                  marginBottom: "8px",
                  letterSpacing: "-0.06em",
                  lineHeight: 0.9,
                }}
              >
                {name}
              </div>
              <div
                style={{
                  fontSize: "42px",
                  fontWeight: "400",
                  color: textPrimary,
                  opacity: 0.7,
                  marginBottom: "40px",
                  letterSpacing: "-0.02em",
                  fontStyle: "italic",
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
                    height: "1px",
                    width: "60px",
                    backgroundColor: accent,
                    marginRight: "20px",
                  }}
                />
                <div
                  style={{
                    fontSize: "30px",
                    fontWeight: "600",
                    color: textPrimary,
                    opacity: 0.4,
                    letterSpacing: "0.05em",
                  }}
                >
                  {company === "Genezisi" ? "" : company}
                </div>
              </div>
            </div>
          </div>

          {/* Glass Overlay Shine */}
          <div
            style={{
              position: "absolute",
              top: "-50%",
              left: "-20%",
              width: "140%",
              height: "200%",
              backgroundImage: isDark
                ? "linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.03) 50%, transparent 55%)"
                : "linear-gradient(45deg, transparent 45%, rgba(0,0,0,0.02) 50%, transparent 55%)",
              transform: "rotate(30deg)",
            }}
          />
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
