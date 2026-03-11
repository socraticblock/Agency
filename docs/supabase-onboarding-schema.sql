-- Run this in the Supabase SQL editor to create the onboarding submissions table.
-- Links form data to Stripe session ID (or any session id you pass in the /onboarding/[id] URL).
--
-- Env vars (add to .env.local and Vercel):
--   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
--   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

create table if not exists public.onboarding_submissions (
  session_id text primary key,
  form_data jsonb not null default '{}',
  step integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- API uses SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS. No policy required.
