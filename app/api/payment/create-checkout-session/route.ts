import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getOrCreateActiveEnrollment } from "@/lib/enrollment";
import { getStripeClient, getCoursePriceUsd, COURSE_NAME } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const student = await prisma.student.findUnique({ where: { id: session.sub } });
  if (!student) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const enrollment = await getOrCreateActiveEnrollment(student.id);
  if (enrollment.paidAt) {
    return NextResponse.json({ error: "This enrollment is already paid." }, { status: 400 });
  }

  const origin = req.nextUrl.origin;
  const priceUsd = await getCoursePriceUsd();

  const stripe = getStripeClient();
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: student.email,
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: Math.round(priceUsd * 100),
          product_data: { name: COURSE_NAME },
        },
        quantity: 1,
      },
    ],
    metadata: {
      enrollmentId: enrollment.id,
      studentId: student.id,
    },
    success_url: `${origin}/dashboard?payment=success`,
    cancel_url: `${origin}/dashboard?payment=cancelled`,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
