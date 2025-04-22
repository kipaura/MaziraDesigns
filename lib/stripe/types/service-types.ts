// lib/types/service-types.ts
import { StripeProductMetadata } from "@/lib/stripe/types/stripe-product-metadata";

export type PackageType =
  | 'addPlatform'
  | 'freePlatform'
  | 'carousel'
  | 'stories'
  | 'backlink'
  | 'shortFormVideo'
  | 'longformVideo'
  | 'email'
  | 'socialposts'
  | 'blog'
  | 'freePlatformShort'
  | 'freePlatformLong'
  | 'addPlatformLong'
  | 'addPlatformShort';

export interface FeatureList {
  feature1?: string;
  feature2?: string;
  feature3?: string;
  feature4?: string;
  feature5?: string;
  feature6?: string;
}

export interface ServiceProduct extends FeatureList {
  productId: string;
  priceId: string;
  productName: string;
  oneLineDescription: string;
  longDescription?: string;
  shortDescription?: string;
  quantityPerMonth?: number;
  price: number;
  currency: string;
  package_type: PackageType;
  unit?: string;
  min?: number | null;
  max?: number | null;
  step?: number | null;
  label?: string;
  metadata: StripeProductMetadata;
}