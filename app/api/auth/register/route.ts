import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  createSessionToken,
  hashPassword,
  sessionCookieOptions,
} from "@/lib/auth";

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  fullName: z.string().min(1, "Full name is required"),
  // Confirms the student is in the eligible age range without us storing
  // raw date of birth (see build-plan note on minimizing retained PII).
  isAgeEligible: z.boolean(),
  phone: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = RegisterSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { email, password, fullName, isAgeEligible, phone } = parsed.data;

  const existing = await prisma.student.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "An account with this email already exists." },
      { status: 409 }
    );
  }

  const passwordHash = await hashPassword(password);

  const student = await prisma.student.create({
    data: { email, passwordHash, fullName, isAgeEligible, phone },
  });

  const token = await createSessionToken({ sub: student.id, email: student.email });

  const res = NextResponse.json({
    id: student.id,
    email: student.email,
    fullName: student.fullName,
  });
  res.cookies.set(sessionCookieOptions.name, token, sessionCookieOptions);
  return res;
}
