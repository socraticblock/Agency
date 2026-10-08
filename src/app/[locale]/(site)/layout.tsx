import { MotionPreferences } from "@/components/providers/MotionPreferences";

/**
 * Legacy route group.
 *
 * Every route in this group is a pre-V2 surface that animates with Framer Motion
 * and therefore needs `MotionConfig reducedMotion="user"` in its tree.
 *
 * The V2 homepage lives outside this group (`src/app/[locale]/page.tsx`), so it
 * does not hydrate Framer Motion at all.
 */
export default function LegacySiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionPreferences>{children}</MotionPreferences>;
}
