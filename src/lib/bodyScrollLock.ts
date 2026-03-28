/**
 * Ref-counted scroll lock for `document.documentElement` + `document.body`.
 * Prevents stale `overflow: hidden` when multiple overlays (navbar, dashboard, drawer) stack.
 */

export type BodyScrollLockMode = "default" | "scrollbarGutter";

let lockDepth = 0;
let gutterDepth = 0;

function scrollbarWidthPx(): number {
  if (typeof window === "undefined") return 0;
  return Math.max(0, window.innerWidth - document.documentElement.clientWidth);
}

function applyBodyStyles() {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  const { body } = document;

  if (lockDepth > 0) {
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (gutterDepth > 0) {
      const w = scrollbarWidthPx();
      body.style.paddingRight = w > 0 ? `${w}px` : "";
    } else {
      body.style.paddingRight = "";
    }
  } else {
    html.style.overflow = "";
    body.style.overflow = "";
    body.style.paddingRight = "";
  }
}

/**
 * Use inside `useEffect` only. Cleanup releases one lock.
 */
export function acquireBodyScrollLock(mode: BodyScrollLockMode = "default"): () => void {
  lockDepth += 1;
  if (mode === "scrollbarGutter") gutterDepth += 1;
  applyBodyStyles();

  return () => {
    lockDepth = Math.max(0, lockDepth - 1);
    if (mode === "scrollbarGutter") gutterDepth = Math.max(0, gutterDepth - 1);
    applyBodyStyles();
  };
}
