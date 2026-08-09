import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sweepPendingCertificates } from "@/lib/certificate-pool";

const AddNumbersSchema = z.object({
  secret: z.string().min(1),
  numbers: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = AddNumbersSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) {
    return NextResponse.json(
      { error: "Admin access isn't configured yet. Set ADMIN_SECRET in Vercel." },
      { status: 500 }
    );
  }
  if (parsed.data.secret !== adminSecret) {
    return NextResponse.json({ error: "Incorrect admin password." }, { status: 401 });
  }

  // Accept numbers separated by newlines, commas, or spaces — whatever
  // format they were pasted in.
  const numbers = Array.from(
    new Set(
      parsed.data.numbers
        .split(/[\n,\s]+/)
        .map((n) => n.trim())
        .filter(Boolean)
    )
  );

  if (numbers.length === 0) {
    return NextResponse.json({ error: "No certificate numbers found." }, { status: 400 });
  }

  const result = await prisma.certificateNumber.createMany({
    data: numbers.map((number) => ({ number })),
    skipDuplicates: true,
  });

  const assignedCount = await sweepPendingCertificates();

  return NextResponse.json({
    added: result.count,
    skipped: numbers.length - result.count,
    assignedToPendingStudents: assignedCount,
  });
}

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret || secret !== adminSecret) {
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
