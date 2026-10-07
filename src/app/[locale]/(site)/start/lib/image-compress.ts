/**
 * Client-side photo compression for localStorage (~200KB target, brief §10.1).
 * Warn when original exceeds 2MB (caller shows message).
 */

const MAX_STORE_BYTES = 200 * 1024;
const WARN_ORIGINAL_BYTES = 2 * 1024 * 1024;
const MAX_DIMENSION = 1200;

function dataUrlByteLength(dataUrl: string): number {
  const idx = dataUrl.indexOf(",");
  if (idx === -1) return 0;
  const base64 = dataUrl.slice(idx + 1);
  const padding = base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0;
  return Math.floor((base64.length * 3) / 4) - padding;
}

export interface CompressImageResult {
  dataUrl: string;
  /** True if original file was over 2MB */
  warnLargeOriginal: boolean;
  originalBytes: number;
}

/**
 * Resize (if needed) and re-encode as JPEG; reduce quality until under maxBytes.
 */
export async function compressImageForLane1Storage(
  file: File,
  maxBytes: number = MAX_STORE_BYTES,
): Promise<CompressImageResult> {
  const originalBytes = file.size;
  const warnLargeOriginal = originalBytes > WARN_ORIGINAL_BYTES;

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return fallbackReadAsDataUrl(file, warnLargeOriginal, originalBytes);
  }

  let width = bitmap.width;
  let height = bitmap.height;
  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);
  }

  const canvas = document.createElement("canvas");
  const canvasCtx = canvas.getContext("2d");
  if (!canvasCtx) {
    bitmap.close();
    return fallbackReadAsDataUrl(file, warnLargeOriginal, originalBytes);
  }

  function drawCurrentSize(bctx: CanvasRenderingContext2D) {
    canvas.width = width;
    canvas.height = height;
    bctx.drawImage(bitmap, 0, 0, width, height);
  }

  drawCurrentSize(canvasCtx);

  let quality = 0.9;
  let dataUrl = canvas.toDataURL("image/jpeg", quality);

  while (dataUrlByteLength(dataUrl) > maxBytes && quality > 0.45) {
    quality -= 0.07;
    dataUrl = canvas.toDataURL("image/jpeg", quality);
  }

  while (dataUrlByteLength(dataUrl) > maxBytes && width > 360 && height > 360) {
    width = Math.round(width * 0.88);
    height = Math.round(height * 0.88);
    drawCurrentSize(canvasCtx);
    dataUrl = canvas.toDataURL("image/jpeg", 0.82);
  }

  bitmap.close();

  return { dataUrl, warnLargeOriginal, originalBytes };
}

function fallbackReadAsDataUrl(
  file: File,
  warnLargeOriginal: boolean,
  originalBytes: number,
): Promise<CompressImageResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const url = typeof reader.result === "string" ? reader.result : "";
      resolve({ dataUrl: url, warnLargeOriginal, originalBytes });
    };
    reader.onerror = () => reject(new Error("read failed"));
    reader.readAsDataURL(file);
  });
}
