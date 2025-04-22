import Stripe from "stripe";
import { PackageType, ServiceProduct } from "@/lib/stripe/types/service-types";
import { parseStripeMetadata } from "@/lib/stripe/services/service-helper";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

export async function fetchServiceProductsByPriceIds(priceIds: string[]): Promise<ServiceProduct[]> {
  const results: ServiceProduct[] = [];

  for (const priceId of priceIds) {
    const price = await stripe.prices.retrieve(priceId, { expand: ["product"] });
    if (typeof price.unit_amount !== "number") continue;

    const product = price.product as Stripe.Product;
    const metadata = parseStripeMetadata(product.metadata);

    results.push({
      productId: product.id,
      priceId: price.id,
      productName: product.name,
      oneLineDescription: metadata.one_line_description ?? "",
      shortDescription: metadata.short_description ?? "",
      longDescription: metadata.long_description,
      quantityPerMonth: Number(metadata.quantity_per_month) || undefined,
      price: price.unit_amount,
      currency: price.currency,
      package_type: (metadata.package_type as PackageType) ?? "social",
      unit: metadata.unit,
      min: metadata.min ? Number(metadata.min) : undefined,
      max: metadata.max ? Number(metadata.max) : undefined,
      step: metadata.step ? Number(metadata.step) : undefined,
      metadata,
      feature1: metadata.feature_1,
      feature2: metadata.feature_2,
      feature3: metadata.feature_3,
      feature4: metadata.feature_4,
      feature5: metadata.feature_5,
      feature6: metadata.feature_6,
    });
  }

  return results;
}