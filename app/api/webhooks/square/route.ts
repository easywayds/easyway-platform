import { NextRequest, NextResponse } from "next/server";
import { WebhooksHelper } from "square";
import { prisma } from "@/lib/prisma";
import { getSquareClient } from "@/lib/square";

export async function POST(req: NextRequest) {
  const signatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
  const notificationUrl = process.env.SQUARE_WEBHOOK_NOTIFICATION_URL;
  if (!signatureKey || !notificationUrl) {
    return NextResponse.json({ error: "Webhook not configured." }, { status: 500 });
  }

  const signatureHeader = req.headers.get("x-square-hmacsha256-signature");
  if (!signatureHeader) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  // Verification needs the exact raw request body — never parse it as
  // JSON before this point, or the signature check will fail.
  const rawBody = await req.text();

  const isValid = WebhooksHelper.verifySignature({
    requestBody: rawBody,
    signatureHeader,
    signatureKey,
    notificationUrl,
  });

  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  const event = JSON.parse(rawBody);

  if (event.type === "payment.updated" || event.type === "payment.created") {
    const payment = event.data?.object?.payment;

    if (payment?.status === "COMPLETED" && payment?.order_id) {
      try {
        const client = getSquareClient();
        const orderResponse = await client.orders.get({ orderId: payment.order_id });
        const enrollmentId = orderResponse.order?.referenceId;

        if (enrollmentId) {
          // Idempotent: if this enrollment was already marked paid (e.g.
          // Square retries the webhook), don't overwrite it.
          const enrollment = await prisma.enrollment.findUnique({ where: { id: enrollmentId } });
          if (enrollment && !enrollment.paidAt) {
            await prisma.enrollment.update({
              where: { id: enrollmentId },
              data: {
                paidAt: new Date(),
                squarePaymentLinkId: payment.order_id,
              },
            });
          }
        }
      } catch (err) {
        console.error("Failed to process Square webhook payment:", err);
        return NextResponse.json({ error: "Processing failed." }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}
