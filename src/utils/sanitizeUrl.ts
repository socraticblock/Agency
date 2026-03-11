const GENESIS_VALUES = ["none", "no", "n/a", "n/a.", "-", ""] as const;

function normalizeForGenesisCheck(input: string): string {
  return input.trim().toLowerCase();
}

export function isGenesisInput(input: string): boolean {
  const normalized = normalizeForGenesisCheck(input);
  if (GENESIS_VALUES.includes(normalized as (typeof GENESIS_VALUES)[number]))
    return true;
  if (!normalized) return true;
  if (!normalized.includes(".")) return true;
  return false;
}

export function sanitizeURL(input: string): string {
  let url = input.trim().toLowerCase();
  if (!url.startsWith("http")) {
    url = `https://${url}`;
  }
  return url;
}

export type ParseUrlResult = { url: string; isGenesis: boolean };

export function parseUrlOrGenesis(input: string): ParseUrlResult {
  const trimmed = input.trim();
  const isGenesis = isGenesisInput(trimmed);
  return {
    url: isGenesis ? trimmed : sanitizeURL(trimmed),
    isGenesis,
  };
}
