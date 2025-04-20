// File: /app/api/stripe/create-checkout-session/route.ts

import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { cart } = body // expecting cart as [{ name, tier, price }]

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ error: "Cart is empty or invalid" }, { status: 400 })
    }

    // Build line items for Stripe
    const line_items = cart.map((item: { name: string; tier: string; price: number }) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: `${item.name} - ${item.tier}`,
        },
        unit_amount: item.price * 100, // Stripe uses cents
      },
      quantity: 1,
    }))

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/onboarding?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/build?canceled=true`,
      metadata: {
        source: "website_checkout",
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json({ error: "Stripe checkout session failed" }, { status: 500 })
  }
}
