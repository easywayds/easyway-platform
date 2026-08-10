import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getOrCreateActiveEnrollment } from "@/lib/enrollment";
import { getSquareClient, getSquareLocationId, getCoursePriceUsd, COURSE_NAME } from "@/lib/square";

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

  try {
    const client = getSquareClient();
    const response = await client.checkout.paymentLinks.create({
      idempotencyKey: randomUUID(),
      order: {
        locationId: getSquareLocationId(),
        // Ties this order back to the enrollment it's paying for — the
        // webhook reads this to know which student to unlock.
        referenceId: enrollment.id,
        lineItems: [
          {
            name: COURSE_NAME,
            quantity: "1",
            basePriceMoney: {
              amount: BigInt(Math.round(priceUsd * 100)),
              currency: "USD",
            },
          },
        ],
      },
      checkoutOptions: {
        redirectUrl: `${origin}/dashboard?payment=success`,
      },
    });

    const url = response.paymentLink?.url;
    if (!url) {
      return NextResponse.json({ error: "Couldn't create checkout link." }, { status: 500 });
    }

    return NextResponse.json({ url });
  } catch (err) {
    console.error("Square checkout creation failed:", err);
    return NextResponse.json({ error: "Couldn't start checkout. Please try again." }, { status: 500 });
  }
}
