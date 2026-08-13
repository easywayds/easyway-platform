import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getOrCreateActiveEnrollment, getTopicsWithProgress } from "@/lib/enrollment";

const Schema = z.object({
  topicNumber: z.number().int().min(1).max(9),
});

// Records that a student reached the topic's final "complete" screen in the
// stepper — the UI only allows that screen to be reached after answering
// every quiz question on the way there, so this is a durable, server-side
// record of instructional-sequence progression, not just elapsed seat time.
export async function POST(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parsed = Schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { topicNumber } = parsed.data;

  const enrollment = await getOrCreateActiveEnrollment(session.sub);

  const topic = await prisma.topic.findUnique({ where: { number: topicNumber } });
  if (!topic) {
    return NextResponse.json({ error: "Topic not found" }, { status: 404 });
  }

  const topics = await getTopicsWithProgress(enrollment.id, Boolean(enrollment.paidAt));
  const current = topics.find((t) => t.number === topicNumber);
  if (!current?.unlocked) {
    return NextResponse.json({ error: "Topic is locked" }, { status: 403 });
  }

  const existing = await prisma.topicProgress.findUnique({
    where: { enrollmentId_topicId: { enrollmentId: enrollment.id, topicId: topic.id } },
  });

  if (existing?.quizCompletedAt) {
    return NextResponse.json({ quizCompletedAt: existing.quizCompletedAt });
  }

  const now = new Date();
  const progress = await prisma.topicProgress.upsert({
    where: { enrollmentId_topicId: { enrollmentId: enrollment.id, topicId: topic.id } },
    create: {
      enrollmentId: enrollment.id,
      topicId: topic.id,
      startedAt: now,
      quizCompletedAt: now,
    },
    update: { quizCompletedAt: now },
  });

  return NextResponse.json({ quizCompletedAt: progress.quizCompletedAt });
}
