import type { Metadata } from "next";
import { MotionPreferences } from "@/components/providers/MotionPreferences";
import { createLocalBusinessSeo } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

const SITE_NAME = "Genezisi";
const SITE_DESCRIPTION =
  "Genezisi builds distinctive websites, AI systems and automation that make the business behind them work better.";

function normalizeLocale(locale: string | undefined): Locale {
  if (locale && (locale === "en" || locale === "ka")) return locale;
  return "en";
}

type LegacySeoOptions = Parameters<typeof createLocalBusinessSeo>[0];

/**
 * The exact metadata the `[locale]` layout used to publish for every legacy
 * page. Moved here verbatim so the V2 homepage (which sits outside this route
 * group) can own its own canonical/graph without inheriting a second one.
 */
function legacySeoOptions(locale: string | undefined): LegacySeoOptions {
  return {
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: normalizeLocale(locale),
    path: "/",
    jobTitle: "Websites, AI & Automation",
    accentColor: "#a5f3fc",
    theme: "dark",
    ogTagline: "Your website is only the beginning.",
    ogSubline:
      "Founder-led websites, AI systems and automation built around real business needs.",
    ogServices: "Websites, AI systems, automation",
    ogCta: "Start a conversation",
    ogAlt: "Genezisi — websites, AI systems and automation",
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { metadata } = createLocalBusinessSeo(legacySeoOptions(locale));

  return {
    ...metadata,
    appleWebApp: {
      title: SITE_NAME,
      statusBarStyle: "black-translucent",
      capable: true,
    },
  };
}

/**
 * Legacy route group.
 *
 * Every route in this group is a pre-V2 surface that animates with Framer Motion
 * and therefore needs `MotionConfig reducedMotion="user"` in its tree.
 *
 * The V2 homepage lives outside this group (`src/app/[locale]/page.tsx`), so it
 * does not hydrate Framer Motion at all.
 */
export default async function LegacySiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { jsonLd } = createLocalBusinessSeo(legacySeoOptions(locale));

  return (
    <MotionPreferences>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </MotionPreferences>
  );
}
