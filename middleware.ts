import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["ka", "en"] as const;
const DEFAULT_LOCALE = "ka";

function getLocale(pathname: string): string | null {
  const segment = pathname.split("/")[1];
  return LOCALES.includes(segment as (typeof LOCALES)[number]) ? segment : null;
}

export function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;
    const origin = request.nextUrl.origin;

    // Bypass API routes from being rewritten/redirected
    if (pathname.startsWith("/api/")) {
      return NextResponse.next();
    }

    // Root: redirect to default locale
    if (pathname === "/" || pathname === "") {
      const url = new URL(origin);
      url.pathname = `/${DEFAULT_LOCALE}`;
      return NextResponse.redirect(url, 308);
    }

    // Unknown first segment: redirect to default locale with same path
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

export const config = {
  // Explicitly match root and all non-static paths so "/" is always handled
  matcher: ["/", "/((?!api|_next/static|_next/image|favicon.ico|og|.*\\..*).*)"],
};