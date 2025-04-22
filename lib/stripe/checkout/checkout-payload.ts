import { CheckoutState } from "@/lib/stripe/types/checkout-types";
import { getPriceIds } from "../services/priceidhelper";
import { storeCheckoutData } from "../storage/checkout-storage";

interface StripeLineItem {
  price: string;
  quantity: number;
}

/**
 * Converts the current checkout state into a Stripe-compatible line_items array.
 */
export function buildStripeLineItems(state: CheckoutState): StripeLineItem[] {
  const items: StripeLineItem[] = [];

  // Base packages
  for (const category in state.basePackages) {
    const item = state.basePackages[category];
    if (item) {
      items.push({
        price: item.priceId,
        quantity: item.quantity,
      });
    }
  }

  // Addons
  for (const addon of state.addons) {
    items.push({
      price: addon.priceId,
      quantity: addon.quantity,
    });
  }

  return items;
}

export async function prepareCheckoutPayload(
  selectedServices: Array<{ name: string; tier: string; price: number }>,
  customerData?: {
    firstName: string;
    lastName: string;
    email: string;
    companyName?: string;
    companyWebsite?: string;
  }
) {
  try {
    // Convert services to cart format with priceIds
    const cart = selectedServices.map(service => {
      const priceId = getPriceIds(service.tier);
      return {
        priceId,
        name: service.name,
        description: service.tier,
        price: service.price,
        quantity: 1
      };
    });
    
    // Store data for later retrieval
    if (customerData) {
      storeCheckoutData(selectedServices, customerData);
    }
    
    // Call API to create checkout session
    const response = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cart,
        customerData
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create checkout session');
    }
    
    return {
      success: true,
      url: data.url
    };
  } catch (error) {
    console.error('Error preparing checkout:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
