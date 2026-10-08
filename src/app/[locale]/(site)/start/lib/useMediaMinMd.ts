"use client";

import { useEffect, useState } from "react";

const MD_UP = "(min-width: 768px)";

/** `true` when viewport is Tailwind `md` and up. Initial `true` matches SSR; updates after mount. */
export function useMediaMinMd(): boolean {
  const [mdUp, setMdUp] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia(MD_UP);
    setMdUp(mq.matches);
    const onChange = () => setMdUp(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return mdUp;
}
