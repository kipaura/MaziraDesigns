//lib/serives/Stripe/platform-helper.ts
import { ServiceProduct } from "@/lib/stripe/types/service-types";

/**
 * Determines if a product is a free platform based on package_type.
 */
export function isFreePlatform(product: ServiceProduct): boolean {
  return (
    product.package_type === "freePlatform" ||
    product.package_type === "freePlatformShort" ||
    product.package_type === "freePlatformLong"
  );
}

/**
 * Determines if a product is a paid platform add-on.
 */
export function isPaidPlatform(product: ServiceProduct): boolean {
  return (
    product.package_type === "addPlatform" ||
    product.package_type === "addPlatformLong" ||
    product.package_type === "addPlatformShort"
  );
}

/**
 * Filters all platform-related products from the master list.
 */
export function getPlatformProducts(products: ServiceProduct[]): ServiceProduct[] {
  return products.filter(
    (p) => isFreePlatform(p) || isPaidPlatform(p)
  );
}

/**
 * Splits selected platforms into free vs paid based on how many were selected.
 * Assumes only 1 free platform per base category is allowed (social/video).
 */
export function splitPlatformSelections(
  selected: string[],
  platformProducts: ServiceProduct[]
): {
  free: ServiceProduct[];
  paid: ServiceProduct[];
} {
  const selectedPlatforms = platformProducts.filter((p) =>
    selected.includes(p.productId)
  );

  const free: ServiceProduct[] = [];
  const paid: ServiceProduct[] = [];

  for (const product of selectedPlatforms) {
    if (isFreePlatform(product)) {
      if (
        !free.find((p) => p.package_type === product.package_type)
      ) {
        free.push(product);
      } else {
        paid.push(product); // already used free slot
      }
    } else if (isPaidPlatform(product)) {
      paid.push(product);
    }
  }

  return { free, paid };
}

/**
 * Limits free platform selection to 1 per category (e.g., only 1 free for social or video).
 * Returns the platform IDs allowed as free.
 */
export function getFreePlatformAllowance(
  selected: string[],
  products: ServiceProduct[]
): string[] {
  const selectedPlatforms = products.filter((p) =>
    selected.includes(p.productId)
  );

  const allowed: string[] = [];
  const usedCategories = new Set<string>();

  for (const product of selectedPlatforms) {
    if (isFreePlatform(product) && !usedCategories.has(product.category)) {
      allowed.push(product.productId);
      usedCategories.add(product.category);
    }
  }

  return allowed;
}