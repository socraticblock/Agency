-- Partner applications table
CREATE TABLE IF NOT EXISTS partner_applications (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  network_sectors TEXT NOT NULL DEFAULT '[]',
  experience TEXT NOT NULL DEFAULT '',
  why_genezisi TEXT NOT NULL,
  client_plan TEXT NOT NULL,
  resume_link TEXT NOT NULL DEFAULT '',
  referral_source TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_partner_applications_status ON partner_applications(status);
CREATE INDEX IF NOT EXISTS idx_partner_applications_created_at ON partner_applications(created_at);
