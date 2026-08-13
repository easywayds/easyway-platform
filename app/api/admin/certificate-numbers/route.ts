import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sweepPendingCertificates } from "@/lib/certificate-pool";
import { requireAdmin } from "@/lib/admin-auth";

async function checkAdmin(req: NextRequest): Promise<boolean> {
  const session = await requireAdmin(req, ["payment_admin"]);
  return Boolean(session);
}

export async function GET(req: NextRequest) {
  if (!(await checkAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [available, assigned, pendingStudents] = await Promise.all([
    prisma.certificateNumber.count({ where: { status: "available" } }),
    prisma.certificateNumber.count({ where: { status: "assigned" } }),
    prisma.enrollment.count({
      where: { assessmentPassedAt: { not: null }, certificateId: null },
    }),
  ]);

  return NextResponse.json({ available, assigned, pendingStudents });
}

const AddNumbersSchema = z.object({
  numbers: z.string().min(1),
});

// TDLR's data specification: an Adult Driver Education certificate number
// begins with "ADEE" followed by exactly 8 digits — e.g. ADEE12345678.
const CERTIFICATE_NUMBER_FORMAT = /^ADEE\d{8}$/;

export async function POST(req: NextRequest) {
  if (!(await checkAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parsed = AddNumbersSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const allTokens = Array.from(
    new Set(
      parsed.data.numbers
        .split(/[\n,\s]+/)
        .map((n) => n.trim().toUpperCase())
        .filter(Boolean)
    )
  );

  if (allTokens.length === 0) {
    return NextResponse.json({ error: "No certificate numbers found." }, { status: 400 });
  }

  const numbers = allTokens.filter((n) => CERTIFICATE_NUMBER_FORMAT.test(n));
  const invalidNumbers = allTokens.filter((n) => !CERTIFICATE_NUMBER_FORMAT.test(n));

  if (numbers.length === 0) {
    return NextResponse.json(
      {
        error: `None of the entered numbers match the required ADEE + 8-digit format (e.g. ADEE12345678). Rejected: ${invalidNumbers.join(", ")}`,
      },
      { status: 400 }
    );
  }

  const result = await prisma.certificateNumber.createMany({
    data: numbers.map((number) => ({ number })),
    skipDuplicates: true,
  });

  const assignedCount = await sweepPendingCertificates();

  return NextResponse.json({
    added: result.count,
    skipped: numbers.length - result.count,
    rejectedInvalidFormat: invalidNumbers,
    assignedToPendingStudents: assignedCount,
  });
}
