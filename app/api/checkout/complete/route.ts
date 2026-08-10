import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { getSquareClient, getSquareLocationId, getCoursePriceUsd } from "@/lib/square";

function calculateAge(dob: Date): number {
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

const CheckoutSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  lastName: z.string().min(1, "Last name is required"),
  firstName: z.string().min(1, "First name is required"),
  middleInitial: z.string().max(1).optional().or(z.literal("")),
  dateOfBirth: z.string().refine((v) => !isNaN(Date.parse(v)), "Invalid date of birth"),
  sex: z.enum(["Male", "Female"]),
  phone: z.string().optional(),
  cardToken: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = CheckoutSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 }
    );
  }

  const { email, password, lastName, firstName, middleInitial, dateOfBirth, sex, phone, cardToken } =
    parsed.data;

  const dob = new Date(dateOfBirth);
  if (calculateAge(dob) < 18) {
    return NextResponse.json(
      { error: "You must be at least 18 years old to take this course." },
      { status: 400 }
    );
  }

  const existing = await prisma.student.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "An account with this email already exists." },
      { status: 409 }
    );
  }

  const priceUsd = await getCoursePriceUsd();
  const passwordHash = await hashPassword(password);

  // Create the account first so we have an enrollment ID to reference on
  // the charge — rolled back below if the payment doesn't go through.
  const student = await prisma.student.create({
    data: {
      email,
      passwordHash,
      lastName,
      firstName,
      middleInitial: middleInitial || null,
      dateOfBirth: dob,
      sex,
      phone,
    },
  });
  const enrollment = await prisma.enrollment.create({
    data: { studentId: student.id, status: "active" },
  });

  try {
    const client = getSquareClient();
    const response = await client.payments.create({
      sourceId: cardToken,
      idempotencyKey: randomUUID(),
      amountMoney: {
        amount: BigInt(Math.round(priceUsd * 100)),
        currency: "USD",
      },
      locationId: getSquareLocationId(),
      referenceId: enrollment.id,
    });

    if (response.payment?.status !== "COMPLETED") {
      throw new Error(`Payment status: ${response.payment?.status}`);
    }

    await prisma.enrollment.update({
      where: { id: enrollment.id },
      data: {
        paidAt: new Date(),
        // Reused field — stores the Square payment reference regardless
        // of which checkout path was used (hosted link vs embedded card).
        squarePaymentLinkId: response.payment.id,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    // Don't leave an unpaid, unusable account behind after a failed charge.
    await prisma.enrollment.delete({ where: { id: enrollment.id } }).catch(() => {});
    await prisma.student.delete({ where: { id: student.id } }).catch(() => {});

    console.error("Checkout payment failed:", err);
    return NextResponse.json(
      { error: "Your card could not be charged. Please check your card details and try again." },
      { status: 402 }
    );
  }
}
