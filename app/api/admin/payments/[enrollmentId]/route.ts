import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

// Manual override for a payment that happened outside Square (phone order,
// cash, comped seat, etc). The automatic path is still the Square webhook —
// this exists for the exceptions, not to replace it.
export async function PATCH(req: NextRequest, { params }: { params: { enrollmentId: string } }) {
  const session = await requireAdmin(req, ["payment_admin"]);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const enrollment = await prisma.enrollment.findUnique({ where: { id: params.enrollmentId } });
  if (!enrollment) {
    return NextResponse.json({ error: "Enrollment not found." }, { status: 404 });
  }
  if (enrollment.paidAt) {
    return NextResponse.json({ error: "Already marked paid." }, { status: 409 });
  }

  const updated = await prisma.enrollment.update({
    where: { id: params.enrollmentId },
    data: { paidAt: new Date() },
  });

  return NextResponse.json({ paidAt: updated.paidAt });
}
