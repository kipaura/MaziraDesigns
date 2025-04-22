import { priceIdLookup } from "./priceIdLookup";

/**
 * Returns the price ID for the given product name.
 */
export function getPriceId (productName: string): string {
  return priceIdLookup[productName] || "";
}