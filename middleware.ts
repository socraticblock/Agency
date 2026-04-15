import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getPublishedSlugByMappedHost } from "@/lib/db";

const LOCALES = ["en"] as const;
const DEFAULT_LOCALE = "en";

function bypassCustomHostRewrite(pathname: string): boolean {
  if (pathname.startsWith("/api/")) return true;
  if (pathname.startsWith("/_next/")) return true;
  if (pathname.startsWith("/favicon")) return true;
  if (pathname.startsWith("/og")) return true;
  const last = pathname.split("/").pop() ?? "";
  if (last.includes(".") && last.length > 1) return true;
  return false;
}

function isPrimaryAppHost(host: string): boolean {
  const h = host.split(":")[0].toLowerCase();
  if (h === "localhost" || h === "127.0.0.1") return true;
  if (h === "genezisi.com" || h === "www.genezisi.com") return true;
  if (h.endsWith(".vercel.app")) return true;
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (site) {
    try {
      const u = new URL(site);
      if (u.hostname === h) return true;
    } catch {
      /* ignore */
    }
  }
  return false;
}

export async function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;
    const origin = request.nextUrl.origin;

    if (pathname.startsWith("/api/")) {
      return NextResponse.next();
    }

    if (!bypassCustomHostRewrite(pathname)) {
      const hostHeader = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
      if (hostHeader && !isPrimaryAppHost(hostHeader)) {
        try {
          const slug = await getPublishedSlugByMappedHost(hostHeader);
          if (slug) {
            const url = request.nextUrl.clone();
            url.pathname = `/${DEFAULT_LOCALE}/c/${slug}`;
            return NextResponse.rewrite(url);
          }
        } catch {
          /* Turso env missing or DB error — fall through */
        }
      }
    }

    if (pathname.startsWith("/ka")) {
      const url = new URL(request.url);
      url.pathname = pathname.replace("/ka", "/en");
      return NextResponse.redirect(url, 308);
    }

    if (pathname === "/" || pathname === "") {
      const url = new URL(origin);
      url.pathname = `/${DEFAULT_LOCALE}`;
      return NextResponse.redirect(url, 308);
    }

    const locale = getLocale(pathname);
    if (!locale) {
      const url = new URL(origin);
      url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
      return NextResponse.redirect(url, 308);
    }

    return NextResponse.next();
  } catch {
    const url = request.nextUrl.origin + `/${DEFAULT_LOCALE}`;
    return NextResponse.redirect(url, 308);
  }
}

function getLocale(pathname: string): string | null {
  const segment = pathname.split("/")[1];
  return LOCALES.includes(segment as (typeof LOCALES)[number]) ? segment : null;
}

export const config = {
  matcher: ["/", "/((?!api|_next/static|_next/image|favicon.ico|og|.*\\..*).*)"],
};
