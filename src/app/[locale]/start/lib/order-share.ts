import type { GenezisiOrderFileV1 } from "./order-payload";

export function downloadOrderJsonFile(payload: GenezisiOrderFileV1): void {
  const json = JSON.stringify(payload, null, 2);
  const blob = new Blob([json], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `genezisi-order-${payload.orderId}.json`;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function canShareOrderFile(): boolean {
  if (typeof navigator === "undefined" || !navigator.canShare) return false;
  try {
    const test = new File(['{"a":1}'], "test.json", { type: "application/json" });
    return navigator.canShare({ files: [test] });
  } catch {
    return false;
  }
}

export async function shareOrderJsonFile(payload: GenezisiOrderFileV1): Promise<boolean> {
  const json = JSON.stringify(payload, null, 2);
  const file = new File([json], `genezisi-order-${payload.orderId}.json`, {
    type: "application/json",
  });
  if (!navigator.share || !navigator.canShare?.({ files: [file] })) {
    return false;
  }
  try {
    await navigator.share({
      files: [file],
      title: "Genezisi card order",
      text: `Order ${payload.orderId} — small spec file (no photos). Share to WhatsApp, then send your headshot next.`,
    });
    return true;
  } catch {
    return false;
  }
}
