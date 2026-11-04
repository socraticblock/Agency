import { NextResponse } from "next/server";

/**
 * A human-readable site index. This is not a Google ranking mechanism.
 * Keep it aligned with live business offerings and indexed marketing routes.
 */
const siteBase = () => (process.env.NEXT_PUBLIC_SITE_URL || "https://genezisi.com").replace(/\/$/, "");

export function GET() {
  const base = siteBase();
  const body = `# Genezisi

> Founder-led studio for bespoke websites, practical AI systems and automation. Projects are scoped individually, not sold as fixed-price website packages.

## Studio
- [Home — English](${base}/en)
- [Home — Georgian](${base}/ka)
- [Home — Dutch](${base}/nl)
- [Selected work](${base}/en/work)
- [Bespoke projects and enquiries](${base}/en/pricing)
- [ინდივიდუალური პროექტები](${base}/ka/pricing)

## Practical journal (English)
- [Genezisi Journal](${base}/en/blog)
- [Custom website vs website builder](${base}/en/blog/custom-website-vs-website-builder)
- [AI automation: where to start](${base}/en/blog/ai-automation-small-business-where-to-start)
- [Website redesign checklist](${base}/en/blog/website-redesign-checklist-before-hiring)

## Website expertise
- [Websites](${base}/en/websites)
- [Service business websites](${base}/en/service-websites)
- [Booking websites](${base}/en/booking-websites)
- [Online stores](${base}/en/online-stores)

## Existing customer service
Genezisi no longer offers new digital business cards. Previously published customer cards and mapped domains remain maintained, but are not listed in this marketing index.

## Technical index
- [Sitemap](${base}/sitemap.xml)
`;
  return new NextResponse(body, {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=0, must-revalidate" },
  });
}
