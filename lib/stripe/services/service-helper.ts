// lib/services/stripe/service-helper.ts

import { StripeProductMetadata, StripeProductMetadataRaw } from "@/lib/stripe/types/stripe-product-metadata";

// Helper to convert strings like "Feature 1" or "feature_1" to consistent keys
const normalizeKey = (key: string): string =>
  key
    .toLowerCase()
    .replace(/[\s\-]+/g, "_")
    .replace(/^nax$/, "max"); // fix Stripe typo

// Parse numbers but return undefined for invalid values
const parseMaybeNumber = (value?: string): number | undefined => {
  if (!value) return undefined;
  const num = parseFloat(value);
  return isNaN(num) ? undefined : num;
};

/**
 * Cleans and converts Stripe raw metadata into a normalized object.
 */
export function parseStripeMetadata(raw: StripeProductMetadataRaw): StripeProductMetadata {
  const metadata: Partial<StripeProductMetadata> = {};

  for (const [key, value] of Object.entries(raw)) {
    if (!value) continue;

    const normalized = normalizeKey(key);

    switch (normalized) {
      case "product_id":
      case "package_type":
      case "description":
      case "short_description":
      case "long_description":
      case "one_line_description":
      case "usage_type":
      case "aggregate_usage":
      case "unit":
        metadata[normalized] = value;
        break;

      case "feature_1":
      case "feature_2":
      case "feature_3":
      case "feature_4":
      case "feature_5":
      case "feature_6":
        metadata[normalized] = value;
        break;

      case "quantity_per_month":
      case "quantity_month":
      case "quantitypermonth":
        metadata.quantity_per_month = parseMaybeNumber(value);
        break;

      case "min":
      case "max":
      case "step":
        metadata[normalized] = parseMaybeNumber(value);
        break;
    }
  }

  return metadata as StripeProductMetadata;
}