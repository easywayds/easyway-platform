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
