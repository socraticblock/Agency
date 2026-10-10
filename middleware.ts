import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getPublishedSlugByMappedHost } from "@/lib/db";

const LOCALES = ["en", "ka"] as const;
const DEFAULT_LOCALE = "en";

/** The one extra homepage language. It is deliberately NOT in `LOCALES`: see below. */
const NL_HOME_LOCALE = "nl";

/**
 * Legacy route families that really exist under a locale prefix
 * (`/{locale}/<family>/...`). A Dutch request for one of these is redirected
 * (temporarily) to its English page, so a visitor never reads English behind a
 * Dutch address. Anything else under `/nl` is a 404 — never an invented page.
 */
const NL_LEGACY_ROUTE_FAMILIES = new Set([
  "apply",
  "blog",
  "booking-websites",
  "c",
  "enterprise",
  "online-stores",
  "partner",
  "pricing",
  "service-websites",
  "start",
  "stop-renting",
  "websites",
  "work",
]);

/**
 * Where an unknown Dutch path is rewritten to. It intentionally matches no
 * route, so the visitor gets the app's own 404 while the requested URL stays in
 * the address bar.
 */
const NOT_FOUND_PROBE_PATH = "_nl-unmapped";

/**
 * Public routes that intentionally live outside the locale prefix.
 * Without this bypass the middleware redirects them to `/{locale}{path}`,
 * which has no matching route and 404s.
 */
const UNLOCALIZED_PUBLIC_ROUTES = ["/onboarding", "/onboarding-brief", "/success"];

function isUnlocalizedPublicRoute(pathname: string): boolean {
  return UNLOCALIZED_PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

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

/** Request header carrying the document language for the initial server HTML. */
const DOC_LANG_HEADER = "x-doc-lang";

/**
 * The document language implied by the requested first path segment — what the
 * *initial* (pre-hydration) `<html lang>` should say. The `[locale]` layout and
 * `LangSetter` keep refining the DOM afterwards.
 */
function documentLanguage(pathname: string): string {
  const segment = pathname.split("/")[1];
  if (segment === NL_HOME_LOCALE) return "nl-BE";
  if (segment === "ka") return "ka-GE";
  return DEFAULT_LOCALE;
}

/** `NextResponse.next()` that forwards the document language to the root layout. */
function forwardWithDocLang(request: NextRequest): NextResponse {
  const headers = new Headers(request.headers);
  headers.set(DOC_LANG_HEADER, documentLanguage(request.nextUrl.pathname));
  return NextResponse.next({ request: { headers } });
}

/** `NextResponse.rewrite()` that forwards the document language as well. */
function rewriteWithDocLang(
  request: NextRequest,
  url: URL,
  lang: string = documentLanguage(request.nextUrl.pathname),
): NextResponse {
  const headers = new Headers(request.headers);
  headers.set(DOC_LANG_HEADER, lang);
  return NextResponse.rewrite(url, { request: { headers } });
}

export async function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;
    const origin = request.nextUrl.origin;

    if (pathname.startsWith("/api/")) {
      return forwardWithDocLang(request);
    }

    if (isUnlocalizedPublicRoute(pathname)) {
      return forwardWithDocLang(request);
    }

    if (!bypassCustomHostRewrite(pathname)) {
      const hostHeader = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
      if (hostHeader && !isPrimaryAppHost(hostHeader)) {
        try {
          const slug = await getPublishedSlugByMappedHost(hostHeader);
          if (slug) {
            const url = request.nextUrl.clone();
            url.pathname = `/${DEFAULT_LOCALE}/c/${slug}`;
            return rewriteWithDocLang(request, url);
          }
        } catch {
          /* Turso env missing or DB error — fall through */
        }
      }
    }

    if (pathname === "/" || pathname === "") {
      const url = new URL(origin);
      url.pathname = `/${DEFAULT_LOCALE}`;
      return NextResponse.redirect(url, 308);
    }

    /*
      Dutch is a homepage-only language. `/nl` itself is the Dutch homepage;
      `/nl/<known legacy family>` redirects to the English page; everything else
      under `/nl` is a real 404 rather than English content wearing a Dutch URL.
      This runs after the mapped-host rewrite and the root redirect, so custom
      domains and `/` behave exactly as before.
    */
    const nlPath = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

    if (nlPath === `/${NL_HOME_LOCALE}`) {
      return forwardWithDocLang(request);
    }

    if (nlPath.startsWith(`/${NL_HOME_LOCALE}/`)) {
      const rest = nlPath.slice(NL_HOME_LOCALE.length + 1);
      const family = rest.split("/")[1] ?? "";

      if (NL_LEGACY_ROUTE_FAMILIES.has(family)) {
        const url = request.nextUrl.clone();
        url.pathname = `/${DEFAULT_LOCALE}${rest}`;
        return NextResponse.redirect(url, 307);
      }

      const url = request.nextUrl.clone();
      url.pathname = `/${DEFAULT_LOCALE}/${NOT_FOUND_PROBE_PATH}`;
      // The shell it lands on is the app's English not-found page, so the
      // document language must match that content, not the requested Dutch URL.
      return rewriteWithDocLang(request, url, DEFAULT_LOCALE);
    }

    const locale = getLocale(pathname);
    if (!locale) {
      const url = new URL(origin);
      url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
      return NextResponse.redirect(url, 308);
    }

    return forwardWithDocLang(request);
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
