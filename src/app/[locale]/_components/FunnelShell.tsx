import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import type { Locale } from "@/lib/i18n";

export function FunnelShell({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <>
      <Navbar locale={locale} />
      {children}
    </>
  );
}
