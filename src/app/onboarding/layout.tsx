import { MotionPreferences } from "@/components/providers/MotionPreferences";

/**
 * The onboarding portal is a legacy Framer Motion surface outside the
 * `[locale]/(site)` group, so it carries its own reduced-motion provider.
 */
export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionPreferences>{children}</MotionPreferences>;
}
