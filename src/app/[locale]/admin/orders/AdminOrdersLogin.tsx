"use client";

type Props = {
  passwordInput: string;
  authError: boolean;
  onPasswordChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export function AdminOrdersLogin({ passwordInput, authError, onPasswordChange, onSubmit }: Props) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <h1 className="mb-1 text-xl font-bold text-slate-900">Genezisi Admin</h1>
        <p className="mb-6 text-sm text-slate-500">Enter your admin password</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => onPasswordChange(e.target.value)}
            placeholder="Admin password"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#1A2744] focus:outline-none focus:ring-1 focus:ring-[#1A2744]"
          />
          {authError && <p className="text-sm text-red-600">Incorrect password or env not configured</p>}
          <button
            type="submit"
            className="w-full rounded-lg bg-[#1A2744] py-2 text-sm font-semibold text-white hover:bg-[#243552]"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export function AdminOrdersEnvMissing() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <p className="max-w-md text-center text-sm text-slate-600">
        Set <code className="rounded bg-slate-200 px-1">ADMIN_PASSWORD</code> and matching{" "}
        <code className="rounded bg-slate-200 px-1">NEXT_PUBLIC_ADMIN_PASSWORD</code> in your environment, then
        redeploy.
      </p>
    </div>
  );
}
