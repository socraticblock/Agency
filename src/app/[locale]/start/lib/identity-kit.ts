import QRCode from "qrcode";
import { resolveStyleVariables } from "./presets";
import { Lane1CustomizerState } from "./types";

/**
 * Generates a branded QR Code as a Data URL.
 * It uses the client's accent color from the state.
 */
export async function generateBrandedQR(state: Lane1CustomizerState, url: string): Promise<string> {
  const vars = resolveStyleVariables(state.style) as any;
  const accentColor = vars["--accent"] || "#1A2744";

  return QRCode.toDataURL(url, {
    color: {
      dark: accentColor,
      light: "#ffffff00", // Transparent background
    },
    errorCorrectionLevel: "H",
    width: 1024,
    margin: 2,
  });
}

/**
 * Triggers a download of the QR code PNG.
 */
export async function downloadQRCode(state: Lane1CustomizerState, url: string) {
  const dataUrl = await generateBrandedQR(state, url);
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = `QR_${state.name.replace(/\s+/g, "_") || "BusinessCard"}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Generates an Apple Touch Icon (180x180) from the user's photo or a fallback.
 * Uses canvas for resizing on the client side.
 */
export async function generateAppIcon(state: Lane1CustomizerState): Promise<string | null> {
  if (!state.photoDataUrl) return null;

  return new Promise((resolve) => {
    const img = new (window as any).Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 180;
      canvas.height = 180;
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(null);

      // Simple fill or square crop
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 180, 180);

      // Maintain aspect ratio and cover
      const scale = Math.max(180 / img.width, 180 / img.height);
      const x = (180 - img.width * scale) / 2;
      const y = (180 - img.height * scale) / 2;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => resolve(null);
    img.src = state.photoDataUrl;
  });
}
