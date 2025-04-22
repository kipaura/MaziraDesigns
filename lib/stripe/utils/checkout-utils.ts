// File: /lib/checkout-utils.ts*/

import { getPriceId } from "@/lib/stripe/priceidhelper";
export type ServiceItem = {
  name: string;
  description: string;
  price: number;
  priceId: string;
}


export async function prepareCheckoutPayload(services: ServiceItem[]) {
  // Ensure every service has its priceId from the lookup
  const cart = services.map(service => ({
    ...service,
    description: service.description || service.name,
    priceId: service.priceId || getPriceId(service.name)
  }));

  try {
    const response = await fetch("/api/stripe/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    });

    const data = await response.json();
    if (data?.url) {
      return { success: true, url: data.url };
    } else {
      return { success: false, error: "Failed to create checkout session" };
    }
  } catch (error) {
    console.error("Checkout error:", error);
    return { success: false, error: "There was an issue preparing checkout" };
  }
}