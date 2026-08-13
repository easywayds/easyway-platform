import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { requireAdmin } from "@/lib/admin-auth";

const UpdateAdminSchema = z.object({
  name: z.string().min(1).optional(),
  role: z.enum(["master_admin", "student_admin", "payment_admin", "curriculum_admin"]).optional(),
  active: z.boolean().optional(),
  newPassword: z.string().min(8).optional(),
});

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin(req);
  if (!session || session.role !== "master_admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parsed = UpdateAdminSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  // Don't let a master admin lock themselves out by deactivating their own
  // account or demoting themselves away from master_admin.
  const isSelf = params.id === session.sub;
  if (isSelf && parsed.data.active === false) {
    return NextResponse.json({ error: "You can't deactivate your own account." }, { status: 400 });
  }
  if (isSelf && parsed.data.role && parsed.data.role !== "master_admin") {
    return NextResponse.json({ error: "You can't change your own role away from master admin." }, { status: 400 });
  }

  const data: Record<string, unknown> = {};
  if (parsed.data.name !== undefined) data.name = parsed.data.name;
  if (parsed.data.role !== undefined) data.role = parsed.data.role;
  if (parsed.data.active !== undefined) data.active = parsed.data.active;
  if (parsed.data.newPassword) data.passwordHash = await hashPassword(parsed.data.newPassword);

  const admin = await prisma.adminUser.update({
    where: { id: params.id },
    data,
    select: { id: true, email: true, name: true, role: true, active: true, lastLoginAt: true, createdAt: true },
  });

  return NextResponse.json({ admin });
}
