/**
 * Display currency.
 *
 * Retreat weeks are quoted in euros even though the house is in Morocco —
 * that is what guests book in. Centralised here so switching to MAD, or to a
 * per-guest currency, touches one file.
 */
export const DISPLAY_CURRENCY = "EUR";

const formatter = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: DISPLAY_CURRENCY,
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number): string {
  return formatter.format(amount);
}
