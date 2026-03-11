import Link from "next/link";

export default function OnboardingGatePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-6 text-center">
      <div className="noise-overlay" aria-hidden />
      <div className="relative z-10 max-w-md">
        <h1 className="text-2xl font-black uppercase tracking-tight text-white">
          Sovereign Vault
        </h1>
        <p className="mt-4 font-mono text-sm text-zinc-400">
          Your personal Vault link was sent to your email. Use that link to
          complete your brand assets and access details.
        </p>
        <p className="mt-6 text-xs text-zinc-500">
          If you didn’t receive it, check spam or reply to your welcome email.
        </p>
        <Link
          href="/onboarding-brief"
          className="mt-8 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400 hover:text-emerald-300"
        >
          View your Onboarding Brief
        </Link>
      </div>
    </div>
  );
}
