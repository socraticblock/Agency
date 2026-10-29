import { NextResponse } from "next/server";

/**
 * /llms.txt — one fetch reaches every page worth citing.
 *
 * Measured 2026-10-29, before this route existed: /llms.txt returned HTTP 200 with a
 * rendered 404 page, because any root-level `*.txt` path fell through to the catch-all
 * and rendered "not found" with a success status. A crawler reading that gets a page
 * that looks like content and says nothing.
 *
 * This is navigation, not a ranking claim: no vendor documents that an assistant reads
 * or prefers this file, and it does not affect Google Search. It exists so that a model
 * asking "what does this studio do and what can I link to" gets the answer in one
 * request instead of by crawling.
 */

function siteBase(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://genezisi.com").replace(
    /\/$/,
    ""
  );
}

export function GET() {
  const base = siteBase();

  const body = `# Genezisi

> Websites, AI and automation studio, founder-led, working with businesses in Georgia. Genezisi builds distinctive websites, practical AI systems and automation that make the business behind them work better.

Site: ${base}

## Pages

- [Home](${base}/en): what Genezisi does, and the studio's approach
- [Websites](${base}/en/websites): premium website design and development in Georgia
- [Booking websites](${base}/en/booking-websites): booking sites for studios, clinics, coaches and appointment-based businesses
- [Service business websites](${base}/en/service-websites): sites for consultants, agencies, legal services, coaches and clinics
- [Online stores](${base}/en/online-stores): custom online stores with product management, storefront UX, analytics and local payment options
- [Work](${base}/en/work): preview websites built for professional services, SaaS, wellness studios and civic projects
- [Pricing](${base}/en/pricing): website and e-commerce packages in GEL, with ownership and delivery terms
- [Pricing — Professional](${base}/en/pricing/professional)
- [Pricing — Command Center](${base}/en/pricing/command-center)
- [Pricing — E-commerce](${base}/en/pricing/e-commerce)
- [Apply for a digital audit](${base}/en/apply)
- [Start — digital business card](${base}/en/start): live customiser, priced in GEL, ordered over WhatsApp
- [Stop renting](${base}/en/stop-renting): ownership versus rented platform subscriptions

## Other languages

- [Georgian home](${base}/ka)
- [Dutch home](${base}/nl)

## Optional

- [Sitemap](${base}/sitemap.xml)
`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
