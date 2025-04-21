type ServiceItem = {
  name: string
  tier: string
  price: number
  priceId: string
}

export async function prepareCheckoutPayload(services: ServiceItem[]) {
  try {
    const response = await fetch("/api/stripe/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart: services,
      }),
    })

    const data = await response.json()
    if (data?.url) {
      return { success: true, url: data.url }
    } else {
      return { success: false, error: "Failed to create checkout session" }
    }
  } catch (error) {
    console.error("Checkout error:", error)
    return { success: false, error: "There was an issue preparing checkout" }
  }
} 