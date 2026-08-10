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

const CreateSchema = z.object({
  topicNumber: z.number().int().min(1).max(9),
  contentType: z.enum(["text", "video", "image"]),
  body: z.string().min(1),
});

export async function POST(req: NextRequest) {
  if (!(await checkAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parsed = CreateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
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
      body: parsed.data.body,
      sortOrder: (maxSort._max.sortOrder ?? -1) + 1,
    },
  });

  return NextResponse.json(created);
}
