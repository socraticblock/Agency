import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Universal
    const type = searchParams.get("type") || "home";
    const theme = searchParams.get("theme") || "dark";
    const accent = searchParams.get("accent") || "#10b981";
    
    // Type: home
    const tagline = searchParams.get("tagline") || "Escape the social media trap.";
    const subline = searchParams.get("subline") || "Build a permanent digital home.";
    const services = searchParams.get("services") || "Web Design  ·  Branding  ·  E-Commerce  ·  Digital Cards";

    // Type: pricing
    const tier = searchParams.get("tier") || "Professional";
    const price = searchParams.get("price") || "999 ₾";
    const features = searchParams.get("features") || "6 sections · CMS dashboard · 45-day warranty";
    const cta = searchParams.get("cta") || "Want more? → Command Center  ·  E-Commerce HQ";

    // Type: blog
    const category = searchParams.get("category") || "Web Design";
    const title = searchParams.get("title") || "How to Choose a Website Developer in Tbilisi";
    const readTime = searchParams.get("readTime") || "5 min read";

    // Type: card
    const name = searchParams.get("name") || "Genezisi Client";
    const jobTitle = searchParams.get("title") || "Professional";
    const company = searchParams.get("company") || "Genezisi";
    const photo = searchParams.get("photo");

    const isDark = theme === "dark";
    const bgPrimary = isDark ? "#030712" : "#f8fafc";
    const textPrimary = isDark ? "#ffffff" : "#0f172a";
    const textMuted = isDark ? "#9ca3af" : "#64748b";
    const textDarker = isDark ? "#6b7280" : "#94a3b8";
    const glassBorder = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";

    // Fallback URL based on type
    let urlAnchor = "genezisi.com";
    if (type === "blog") urlAnchor = "genezisi.com/blog";
    if (type === "card") urlAnchor = `genezisi.com/c/${name.split(" ")[0].toLowerCase()}`;

    // Dynamic font sizing for Blog Title
    const titleLength = title.length;
    let titleFontSize = 52;
    if (titleLength > 40) titleFontSize = 44;
    if (titleLength > 60) titleFontSize = 36;
    if (titleLength > 80) titleFontSize = 32;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: bgPrimary,
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            position: "relative",
            overflow: "hidden",
            padding: type === "card" ? "60px" : "80px",
            justifyContent: type === "card" ? "center" : "flex-start",
            alignItems: type === "card" ? "center" : "flex-start",
          }}
        >
          {/* Faint Grid Overlay (Editorial texture) */}
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

          {/* Subtle Radial Glow (top-left) */}
          {type !== "card" && (
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
          )}

          {/* Card Type Background */}
          {type === "card" && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: isDark
                  ? `radial-gradient(circle at 20% 20%, ${accent}25 0%, transparent 40%), radial-gradient(circle at 80% 80%, ${accent}15 0%, transparent 40%), radial-gradient(circle at 50% 50%, #000 0%, #050510 100%)`
                  : `radial-gradient(circle at 20% 20%, ${accent}15 0%, transparent 40%), radial-gradient(circle at 80% 80%, ${accent}10 0%, transparent 40%), radial-gradient(circle at 50% 50%, #fff 0%, #f0f4f8 100%)`,
              }}
            />
          )}

          {/* =========================================
              LAYOUT: HOME
          ========================================= */}
          {type === "home" && (
            <div style={{ display: "flex", flexDirection: "column", flex: 1, width: "100%" }}>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: 800,
                  color: textPrimary,
                  letterSpacing: "0.3em",
                  marginBottom: "auto",
                }}
              >
                GENEZISI
              </div>

              <div style={{ display: "flex", flexDirection: "column", marginBottom: "40px", marginTop: "auto", maxWidth: "95%" }}>
                <div style={{ fontSize: "32px", fontWeight: 400, color: textPrimary, lineHeight: 1.4 }}>
                  {tagline}
                </div>
                <div style={{ fontSize: "28px", fontWeight: 400, color: textDarker, marginTop: "10px" }}>
                  {subline}
                </div>
                <div style={{ fontSize: "18px", fontWeight: 500, color: textMuted, letterSpacing: "0.05em", marginTop: "24px" }}>
                  {services}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", width: "100%", marginTop: "10px" }}>
                <div style={{ fontSize: "16px", fontWeight: 500, color: textDarker }}>
                  {urlAnchor}
                </div>
              </div>
            </div>
          )}

          {/* =========================================
              LAYOUT: PRICING
          ========================================= */}
          {type === "pricing" && (
            <div style={{ display: "flex", flexDirection: "column", flex: 1, width: "100%" }}>
              <div
                style={{
                  fontSize: "40px",
                  fontWeight: 800,
                  color: textPrimary,
                  letterSpacing: "0.3em",
                  marginBottom: "40px",
                }}
              >
                GENEZISI
              </div>

              <div style={{ fontSize: "14px", fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "20px" }}>
                {tier}
              </div>

              <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ fontSize: "120px", fontWeight: 800, color: textPrimary, lineHeight: 1 }}>
                  {price}
                </div>
                
                <div style={{ fontSize: "22px", fontWeight: 400, color: textMuted, marginTop: "20px" }}>
                  {features}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <div style={{ width: "100%", height: "1px", backgroundColor: glassBorder, marginBottom: "30px" }} />
                
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                  <div style={{ fontSize: "18px", fontWeight: 500, color: textDarker }}>
                    {cta}
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: 500, color: textDarker }}>
                    {urlAnchor}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================
              LAYOUT: BLOG
          ========================================= */}
          {type === "blog" && (
            <div style={{ display: "flex", flexDirection: "column", flex: 1, width: "100%" }}>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: 800,
                  color: textPrimary,
                  letterSpacing: "0.3em",
                  marginBottom: "auto",
                }}
              >
                GENEZISI
              </div>

              <div style={{ display: "flex", flexDirection: "column", marginBottom: "40px", marginTop: "auto", maxWidth: "95%" }}>
                <div style={{ fontSize: "14px", fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "20px" }}>
                  {category}
                </div>
                <div style={{ fontSize: `${titleFontSize}px`, fontWeight: 700, color: textPrimary, lineHeight: 1.1 }}>
                  {title}
                </div>
                <div style={{ fontSize: "18px", fontWeight: 500, color: textMuted, marginTop: "30px" }}>
                  {readTime}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", width: "100%", marginTop: "10px" }}>
                <div style={{ fontSize: "16px", fontWeight: 500, color: textDarker }}>
                  {urlAnchor}
                </div>
              </div>
            </div>
          )}

          {/* =========================================
              LAYOUT: DIGITAL CARD (Legacy)
          ========================================= */}
          {type === "card" && (
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
              <div style={{ display: "flex", marginRight: "70px", position: "relative" }}>
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
                    <img src={photo} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ fontSize: "120px", fontWeight: "900", color: accent, letterSpacing: "-0.05em" }}>
                      {name.charAt(0)}
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Typography */}
              <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ fontSize: "24px", color: accent, fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.4em", marginBottom: "24px", opacity: 0.8 }}>
                  Digital Profile
                </div>
                <div style={{ fontSize: "102px", fontWeight: 900, color: textPrimary, marginBottom: "8px", letterSpacing: "-0.06em", lineHeight: 0.9 }}>
                   {name}
                </div>
                <div style={{ fontSize: "42px", fontWeight: 400, color: textPrimary, opacity: 0.7, marginBottom: "40px", letterSpacing: "-0.02em", fontStyle: "italic" }}>
                  {jobTitle}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ height: "1px", width: "60px", backgroundColor: accent, marginRight: "20px" }} />
                  <div style={{ fontSize: "30px", fontWeight: 600, color: textPrimary, opacity: 0.4, letterSpacing: "0.05em" }}>
                    {company === "Genezisi" ? "" : company}
                  </div>
                </div>
              </div>
              
              {/* URL anchor for card bottom-right inside container */}
              <div style={{ position: "absolute", bottom: "30px", right: "40px", fontSize: "16px", color: textDarker, fontWeight: 500 }}>
                {urlAnchor}
              </div>
            </div>
          )}

          {/* Glass Overlay Shine (Only for Card) */}
          {type === "card" && (
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
          )}
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
