import type { Metadata } from "next";
import Link from "next/link";

/** No client onboarding sessions are being issued; do not suggest otherwise. */
export const metadata: Metadata = {
  title: "Client onboarding unavailable | Genezisi",
  robots: { index: false, follow: false, noarchive: true },
  alternates: { canonical: null },
};

export default function OnboardingGatePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-6 text-center">
      <div className="relative z-10 max-w-md">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Client onboarding is not currently available.
        </h1>
        <p className="mt-5 text-base leading-7 text-zinc-400">
          Genezisi is not issuing onboarding invitations at this time.
          Please contact us directly to discuss a project.
        </p>
        <Link
          href="/en/pricing"
          className="mt-8 inline-flex min-h-12 items-center rounded-full border border-emerald-400/50 px-6 text-sm font-bold text-emerald-300 hover:border-emerald-200"
        >
          Discuss a project
        </Link>
      </div>
    </main>
  );
}
