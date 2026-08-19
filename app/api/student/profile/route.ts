import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

const Schema = z.object({
  phone: z.string().trim().max(30),
});

// Phone is the only self-editable field on the student portal. Legal
// name, date of birth, and sex feed the certificate directly and stay
// admin-only (same as the existing admin student-edit panel) — a student
// can never silently rewrite the identity fields an already-issued
// regulatory certificate was generated from.
export async function PATCH(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parsed = Schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const student = await prisma.student.update({
    where: { id: session.sub },
    data: { phone: parsed.data.phone || null },
    select: { phone: true },
  });

  return NextResponse.json({ phone: student.phone });
}
