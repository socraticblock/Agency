"use client";

import Link from "next/link";

interface BrandingFooterProps {
  ownerName: string;
  hideBranding: boolean;
  homeHref: string;
  useSecondary: boolean;
}

export function BrandingFooter({
  ownerName,
  hideBranding,
  homeHref,
  useSecondary,
}: BrandingFooterProps) {
  const footerOwner =
    ownerName.trim().length === 0 || (useSecondary && ownerName.trim() === "Your Name")
      ? useSecondary
        ? "შენი სახელი"
        : "Your Name"
      : ownerName;

  return (
    <>
      {/* Subtle Branding Footer — Outside the Card Visual */}
      {!hideBranding && (
        <footer
          className="business-card-template-print-skip mt-6 pb-8 text-center text-[10px] uppercase tracking-widest opacity-40 transition-opacity hover:opacity-100"
          style={{ color: "var(--text-primary)" }}
        >
          © {new Date().getFullYear()} {footerOwner}.
          <span className="mx-2 opacity-50">|</span>
          Powered by{" "}
          <Link
            href="https://www.genezisi.com/en/start"
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
