import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

async function checkAdmin(req: NextRequest): Promise<boolean> {
  const session = await requireAdmin(req, ["curriculum_admin"]);
  return Boolean(session);
}

export async function GET(req: NextRequest) {
  if (!(await checkAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const topicNumberParam = req.nextUrl.searchParams.get("topicNumber");
  const topicNumber = topicNumberParam ? Number(topicNumberParam) : null;
  if (!topicNumber || topicNumber < 1 || topicNumber > 9) {
    return NextResponse.json({ error: "Invalid topic number" }, { status: 400 });
  }

  const topic = await prisma.topic.findUnique({ where: { number: topicNumber } });
  if (!topic) {
    return NextResponse.json({ error: "Topic not found" }, { status: 404 });
  }

  const content = await prisma.topicContent.findMany({
    where: { topicId: topic.id },
    orderBy: { sortOrder: "asc" },
  });

  return NextResponse.json({ topic, content });
}

const ContentTypeEnum = z.enum(["text", "video", "image", "bullets", "stat", "custom_visual", "check"]);

const CreateSchema = z.object({
  topicNumber: z.number().int().min(1).max(9),
  contentType: ContentTypeEnum,
  tag: z.string().optional().or(z.literal("")),
  route: z.boolean().optional(),
  heading: z.string().optional().or(z.literal("")),
  body: z.string().optional().or(z.literal("")),
  meta: z.record(z.unknown()).optional(),
});

export async function POST(req: NextRequest) {
  if (!(await checkAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parsed = CreateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const topic = await prisma.topic.findUnique({
    where: { number: parsed.data.topicNumber },
  });
  if (!topic) {
    return NextResponse.json({ error: "Topic not found" }, { status: 404 });
  }

  const maxSort = await prisma.topicContent.aggregate({
    where: { topicId: topic.id },
    _max: { sortOrder: true },
  });

  const created = await prisma.topicContent.create({
    data: {
      topicId: topic.id,
      contentType: parsed.data.contentType,
      tag: parsed.data.tag || null,
      route: parsed.data.route ?? false,
      heading: parsed.data.heading || null,
      body: parsed.data.body || null,
      meta: (parsed.data.meta as Prisma.InputJsonValue) ?? undefined,
      sortOrder: (maxSort._max.sortOrder ?? -1) + 1,
    },
  });

  return NextResponse.json(created);
}
