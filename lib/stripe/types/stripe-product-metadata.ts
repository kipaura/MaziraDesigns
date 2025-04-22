// lib/types/stripe-product-metadata.ts

// Raw metadata straight from Stripe API (all values as strings)
export interface StripeProductMetadataRaw {
  product_id?: string;
  package_type?: string;
  description?: string;
  short_description?: string;
  long_description?: string;
  one_line_description?: string;

  feature_1?: string;
  feature_2?: string;
  feature_3?: string;
  feature_4?: string;
  feature_5?: string;
  feature_6?: string;

  Feature1?: string;
  Feature2?: string;
  Feature3?: string;
  Feature4?: string;
  Feature5?: string;
  Feature6?: string;
  ShortDescription?: string;
  OneLineDescription?: string;
  LongDescription?: string;

  quantity_per_month?: string;
  quantity_month?: string;
  QuantityPerMonth?: string;

  unit?: string;
  min?: string;
  max?: string;
  nax?: string; // typo from export?
  step?: string;

  usage_type?: string;
  aggregate_usage?: string;
}

// Parsed and normalized metadata for internal use
export interface StripeProductMetadata {
  product_id?: string;
  package_type?: string;
  description?: string;
  short_description?: string;
  long_description?: string;
  one_line_description?: string;

  feature_1?: string;
  feature_2?: string;
  feature_3?: string;
  feature_4?: string;
  feature_5?: string;
  feature_6?: string;

  quantity_per_month?: number;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;

  usage_type?: string;
  aggregate_usage?: string;
}