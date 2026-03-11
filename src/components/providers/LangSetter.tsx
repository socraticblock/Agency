"use client";

import { useEffect } from "react";

type Props = {
  lang: string;
};

export function LangSetter({ lang }: Props) {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  return null;
}

