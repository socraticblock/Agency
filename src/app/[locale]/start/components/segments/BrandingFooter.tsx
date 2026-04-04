"use client";

import Link from "next/link";

interface BrandingFooterProps {
  ownerName: string;
  hideBranding: boolean;
  homeHref: string;
}

export function BrandingFooter({
  ownerName,
  hideBranding,
  homeHref,
}: BrandingFooterProps) {
  return (
    <>
      {/* Subtle Branding Footer — Outside the Card Visual */}
      {!hideBranding && (
        <footer
          className="mt-6 pb-8 text-center text-[10px] uppercase tracking-widest opacity-40 transition-opacity hover:opacity-100"
          style={{ color: "var(--text-primary)" }}
        >
          © {new Date().getFullYear()} {ownerName || "Professional"}.
          <span className="mx-2 opacity-50">|</span>
          Powered by{" "}
          <Link
            href={homeHref}
            className="font-bold hover:underline"
            style={{ color: "var(--accent)" }}
          >
            Genezisi
          </Link>
        </footer>
      )}
    </>
  );
}
