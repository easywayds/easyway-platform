import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";

async function checkAdmin(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return token ? verifyAdminSessionToken(token) : false;
}

export async function GET(req: NextRequest) {
  if (!(await checkAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = await prisma.schoolSettings.findUnique({ where: { id: "default" } });
  return NextResponse.json(
    settings ?? {
      tdlrNumber: null,
      schoolName: null,
      driverEdSchoolNumber: null,
      instructorName: null,
      instructorSignatureImage: null,
      chiefOfficialName: null,
      chiefOfficialSignatureImage: null,
    }
  );
}

const SettingsSchema = z.object({
  tdlrNumber: z.string().optional(),
  schoolName: z.string().optional(),
  driverEdSchoolNumber: z.string().optional(),
  instructorName: z.string().optional(),
  instructorSignatureImage: z.string().optional(),
  chiefOfficialName: z.string().optional(),
  chiefOfficialSignatureImage: z.string().optional(),
});

export async function POST(req: NextRequest) {
  if (!(await checkAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parsed = SettingsSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const data: Record<string, string> = {};
  for (const [key, value] of Object.entries(parsed.data)) {
    if (value !== undefined && value !== "") data[key] = value;
  }

  await prisma.schoolSettings.upsert({
    where: { id: "default" },
    create: { id: "default", ...data },
    update: data,
  });

  return NextResponse.json({ ok: true });
}
