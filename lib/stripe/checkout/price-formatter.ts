//lib/stripe/checkout/price-formatter.t
/**
 * Formats a number to a USD currency string, e.g. 1499 -> "$14.99"
 */
export function formatUSD(amountInCents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amountInCents / 100);
}

/**
 * Rounds a number to two decimal places.
 */
export function roundToTwoDecimals(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Parses a price from string or number (e.g. from metadata) into cents.
 */
export function parsePriceToCents(value: string | number | undefined): number {
  if (!value) return 0;
  const num = typeof value === "string" ? parseFloat(value) : value;
  return Math.round((isNaN(num) ? 0 : num) * 100);
}