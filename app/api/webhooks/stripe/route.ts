import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getStripeClient } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook not configured." }, { status: 500 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  // Signature verification needs the exact raw request body — never
  // parse it as JSON before this point, or verification will fail.
  const rawBody = await req.text();

  const stripe = getStripeClient();
  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const checkoutSession = event.data.object as { id: string; metadata?: Record<string, string> };
    const enrollmentId = checkoutSession.metadata?.enrollmentId;

    if (enrollmentId) {
      // Idempotent: if this session was already processed (e.g. Stripe
      // retries the webhook), don't overwrite an existing paidAt.
      const enrollment = await prisma.enrollment.findUnique({ where: { id: enrollmentId } });
      if (enrollment && !enrollment.paidAt) {
        await prisma.enrollment.update({
          where: { id: enrollmentId },
          data: {
            paidAt: new Date(),
            stripeCheckoutSessionId: checkoutSession.id,
          },
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
