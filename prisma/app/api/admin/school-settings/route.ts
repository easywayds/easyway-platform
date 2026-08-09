import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

function checkAdmin(secret: string | null): boolean {
  const adminSecret = process.env.ADMIN_SECRET;
  return Boolean(adminSecret) && secret === adminSecret;
}

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (!checkAdmin(secret)) {
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
  secret: z.string().min(1),
  tdlrNumber: z.string().optional(),
  schoolName: z.string().optional(),
  driverEdSchoolNumber: z.string().optional(),
  instructorName: z.string().optional(),
  instructorSignatureImage: z.string().optional(),
  chiefOfficialName: z.string().optional(),
  chiefOfficialSignatureImage: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = SettingsSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (!checkAdmin(parsed.data.secret)) {
    return NextResponse.json({ error: "Incorrect admin password." }, { status: 401 });
  }

  const { secret, ...fields } = parsed.data;

  // Only overwrite fields that were actually sent, so re-saving the text
  // fields doesn't accidentally wipe a previously uploaded signature image
  // (and vice versa) if the form only submits changed values.
  const data: Record<string, string> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined && value !== "") data[key] = value;
  }

  await prisma.schoolSettings.upsert({
    where: { id: "default" },
    create: { id: "default", ...data },
    update: data,
  });

  return NextResponse.json({ ok: true });
}
