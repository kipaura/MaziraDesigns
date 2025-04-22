// File: /lib/stripe/types/checkout-types.ts
import { ServiceProduct } from "@/lib/stripe/types/service-types";

export interface CartItem extends ServiceProduct {
  priceId: string;
  productName: string;
  shortDescription: string;
  quantity: number;
  totalPrice: number;
}
export interface CheckoutState {
    basePackages: Record<string, CartItem | null>; // e.g. { social: ..., email: ..., blog: ..., ... }
    addons: CartItem[]; // Add-ons that are not base services
    selectedPlatforms: string[]; // all selected platform productIds
    totalPrice: number; // in cents
  }