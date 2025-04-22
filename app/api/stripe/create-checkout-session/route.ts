import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16", // Updated to latest version
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cart, customerData } = body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ error: "Cart is empty or invalid" }, { status: 400 });
    }

    const line_items = cart.map((item: { priceId: string; quantity: number }) => ({
      price: item.priceId,
      quantity: item.quantity,
    }));

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

    if (!baseUrl) {
      throw new Error("Missing NEXT_PUBLIC_SITE_URL env variable.");
    }

    // Create or retrieve Stripe customer
    let customer;
    if (customerData?.email) {
      const customers = await stripe.customers.list({
        email: customerData.email,
        limit: 1,
      });
      
      if (customers.data.length > 0) {
        customer = customers.data[0].id;
      } else {
        const newCustomer = await stripe.customers.create({
          email: customerData.email,
          name: `${customerData.firstName} ${customerData.lastName}`,
          metadata: {
            companyName: customerData.companyName,
            companyWebsite: customerData.companyWebsite,
          },
        });
        customer = newCustomer.id;
      }
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      automatic_payment_methods: { enabled: true }, // Replaces payment_method_types
      line_items,
      customer,
      customer_email: customer ? undefined : customerData?.email,
      success_url: `${baseUrl}/onboarding?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/build?canceled=true`,
      metadata: {
        source: "website_checkout",
        customerName: customerData?.firstName ? `${customerData.firstName} ${customerData.lastName}` : undefined,
        companyName: customerData?.companyName || "",
        companyWebsite: customerData?.companyWebsite || "",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ 
      error: "Stripe checkout session failed", 
      message: error.message 
    }, { status: 500 });
  }
}
