import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

// Contact/profile fields only — progress, exam attempts, and certificates
// are the actual TDLR compliance record and stay read-only from this panel.
const UpdateStudentSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  middleInitial: z.string().max(1).optional().or(z.literal("")),
  email: z.string().email().optional(),
  phone: z.string().optional().or(z.literal("")),
  dateOfBirth: z.string().refine((v) => !isNaN(Date.parse(v)), "Invalid date").optional(),
  sex: z.enum(["Male", "Female"]).optional(),
});

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin(req, ["student_admin"]);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parsed = UpdateStudentSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  if (parsed.data.email) {
    const existing = await prisma.student.findUnique({ where: { email: parsed.data.email } });
    if (existing && existing.id !== params.id) {
      return NextResponse.json({ error: "Another student already uses this email." }, { status: 409 });
    }
  }

  const data: Record<string, unknown> = {};
  if (parsed.data.firstName !== undefined) data.firstName = parsed.data.firstName;
  if (parsed.data.lastName !== undefined) data.lastName = parsed.data.lastName;
  if (parsed.data.middleInitial !== undefined) data.middleInitial = parsed.data.middleInitial || null;
  if (parsed.data.email !== undefined) data.email = parsed.data.email;
  if (parsed.data.phone !== undefined) data.phone = parsed.data.phone || null;
  if (parsed.data.dateOfBirth !== undefined) data.dateOfBirth = new Date(parsed.data.dateOfBirth);
  if (parsed.data.sex !== undefined) data.sex = parsed.data.sex;

  const student = await prisma.student.update({
    where: { id: params.id },
    data,
    select: {
      id: true, firstName: true, lastName: true, middleInitial: true,
      email: true, phone: true, dateOfBirth: true, sex: true,
    },
  });

  return NextResponse.json({ student });
}

// Permanent delete — restricted to students who never paid. Once an
// enrollment has paidAt set, everything under it (topic progress, exam
// attempts, certificate) is the real TDLR compliance record and this route
// refuses to touch it. This is for cleaning up test/duplicate signups, not
// for removing a real student's history.
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin(req, ["student_admin"]);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const student = await prisma.student.findUnique({
    where: { id: params.id },
    include: { enrollments: true },
  });
  if (!student) {
    return NextResponse.json({ error: "Student not found." }, { status: 404 });
  }

  const hasPaidEnrollment = student.enrollments.some((e) => e.paidAt);
  if (hasPaidEnrollment) {
    return NextResponse.json(
      { error: "This student has a paid enrollment, which is a compliance record and can't be deleted." },
      { status: 400 }
    );
  }

  await prisma.$transaction(async (tx) => {
    for (const enrollment of student.enrollments) {
      await tx.topicProgress.deleteMany({ where: { enrollmentId: enrollment.id } });
      await tx.assessmentAttempt.deleteMany({ where: { enrollmentId: enrollment.id } });
    }
    await tx.enrollment.deleteMany({ where: { studentId: student.id } });
    await tx.student.delete({ where: { id: student.id } });
  });

  return NextResponse.json({ ok: true });
}
