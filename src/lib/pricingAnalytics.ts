/**
 * Lightweight analytics for the pricing funnel. Works with gtag if present;
 * always pushes to `dataLayer` for GTM-style containers.
 */
export function trackPricingEvent(
  name: string,
  payload?: Record<string, string | number | boolean | undefined>
): void {
  if (typeof window === "undefined") return;
  try {
    const data: Record<string, unknown> = { event: name, ...payload };
    type GtagFn = (command: string, target: string, config?: Record<string, unknown>) => void;
    const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
    if (typeof gtag === "function") {
      gtag("event", name, payload as Record<string, unknown>);
    }
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer ?? [];
    w.dataLayer.push(data);
  } catch {
    /* no-op */
  }
}
