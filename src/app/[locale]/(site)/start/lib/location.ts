export function hasValidAddress(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length < 6) return false;
  return /[a-zA-Z\u10A0-\u10FF]/.test(trimmed);
}

export const MAP_ADDRESS_HELPER_TEXT = "Please add valid address to see map preview";
