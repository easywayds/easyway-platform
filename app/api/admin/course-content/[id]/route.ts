import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

async function checkAdmin(req: NextRequest): Promise<boolean> {
  const session = await requireAdmin(req, ["curriculum_admin"]);
  return Boolean(session);
}

const ContentTypeEnum = z.enum(["text", "video", "image", "bullets", "stat", "custom_visual", "check"]);

const UpdateSchema = z.object({
  contentType: ContentTypeEnum.optional(),
  tag: z.string().optional().or(z.literal("")),
  route: z.boolean().optional(),
  heading: z.string().optional().or(z.literal("")),
  body: z.string().optional().or(z.literal("")),
  meta: z.record(z.unknown()).optional(),
  sortOrder: z.number().int().optional(),
});

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await checkAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parsed = UpdateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const data: Record<string, unknown> = {};
  if (parsed.data.contentType !== undefined) data.contentType = parsed.data.contentType;
  if (parsed.data.tag !== undefined) data.tag = parsed.data.tag || null;
  if (parsed.data.route !== undefined) data.route = parsed.data.route;
  if (parsed.data.heading !== undefined) data.heading = parsed.data.heading || null;
  if (parsed.data.body !== undefined) data.body = parsed.data.body || null;
  if (parsed.data.meta !== undefined) data.meta = parsed.data.meta;
  if (parsed.data.sortOrder !== undefined) data.sortOrder = parsed.data.sortOrder;

  const updated = await prisma.topicContent.update({
    where: { id: params.id },
    data,
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await checkAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.topicContent.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
