import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const cart = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cart.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.name, images: [item.imageUrl] },
          unit_amount: Math.round(Number(item.price) * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "https://thefashion.vercel.app/success",
      cancel_url: "https://thefashion.vercel.app",
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe error:", err);
    return NextResponse.json(
      { error: err.message ?? "An unknown error occurred" },
      { status: 500 }
    );
  }
}
