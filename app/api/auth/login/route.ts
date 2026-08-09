import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  createSessionToken,
  sessionCookieOptions,
  verifyPassword,
} from "@/lib/auth";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Generic message on failure so we don't reveal whether the email exists.
const INVALID_CREDENTIALS = "Invalid email or password.";

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = LoginSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: INVALID_CREDENTIALS }, { status: 400 });
  }

  const { email, password } = parsed.data;

  const student = await prisma.student.findUnique({ where: { email } });
  if (!student) {
    return NextResponse.json({ error: INVALID_CREDENTIALS }, { status: 401 });
  }

  const valid = await verifyPassword(password, student.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: INVALID_CREDENTIALS }, { status: 401 });
  }

  const token = await createSessionToken({ sub: student.id, email: student.email });

  const res = NextResponse.json({
    id: student.id,
    email: student.email,
    firstName: student.firstName,
    lastName: student.lastName,
  });
  res.cookies.set(sessionCookieOptions.name, token, sessionCookieOptions);
  return res;
}
