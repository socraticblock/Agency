import OnboardingPortal from "./OnboardingPortal";

type Props = { params: Promise<{ id: string }> };

export default async function OnboardingPage({ params }: Props) {
  const { id } = await params;
  return <OnboardingPortal sessionId={id} />;
}
