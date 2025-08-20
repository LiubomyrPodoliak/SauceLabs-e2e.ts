export function parsePriceString(raw: string): number {
  // remove currency symbols and spaces, support comma or dot decimals
  const normalized = raw.replace(/[^\d,.-]/g, "").replace(",", ".");
  const n = Number(normalized);
  if (Number.isNaN(n)) throw new Error(`Cannot parse price from "${raw}"`);
  return n;
}
