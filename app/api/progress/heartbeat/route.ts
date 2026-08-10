import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getOrCreateActiveEnrollment, getTopicsWithProgress } from "@/lib/enrollment";

const HeartbeatSchema = z.object({
  topicNumber: z.number().int().min(1).max(9),
  // Capped server-side regardless of what the client sends, so a paused
  // tab, a clock change, or a tampered request can't inflate seat time.
  deltaSeconds: z.number().int().min(1).max(20),
});

export async function POST(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parsed = HeartbeatSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { topicNumber, deltaSeconds } = parsed.data;

  const enrollment = await getOrCreateActiveEnrollment(session.sub);

  const topic = await prisma.topic.findUnique({ where: { number: topicNumber } });
  if (!topic) {
    return NextResponse.json({ error: "Topic not found" }, { status: 404 });
  }

  // Server-side unlock check — mirrors the UI's rule, but this is the copy
  // that actually matters. A student can't POST directly to any topic
  // (including Topic 1) without having paid and completed earlier topics.
  const topics = await getTopicsWithProgress(enrollment.id, Boolean(enrollment.paidAt));
  const current = topics.find((t) => t.number === topicNumber);
  if (!current?.unlocked) {
    return NextResponse.json({ error: "Topic is locked" }, { status: 403 });
  }

  const existing = await prisma.topicProgress.findUnique({
    where: { enrollmentId_topicId: { enrollmentId: enrollment.id, topicId: topic.id } },
  });

  const newSecondsActive = (existing?.secondsActive ?? 0) + deltaSeconds;
  const thresholdSeconds = topic.minMinutes * 60;
  const nowComplete = newSecondsActive >= thresholdSeconds;

  const progress = await prisma.topicProgress.upsert({
    where: { enrollmentId_topicId: { enrollmentId: enrollment.id, topicId: topic.id } },
    create: {
      enrollmentId: enrollment.id,
      topicId: topic.id,
      secondsActive: deltaSeconds,
      status: nowComplete ? "complete" : "in_progress",
      startedAt: new Date(),
      completedAt: nowComplete ? new Date() : null,
    },
    update: {
      secondsActive: newSecondsActive,
      status: nowComplete ? "complete" : "in_progress",
      completedAt: nowComplete && !existing?.completedAt ? new Date() : existing?.completedAt,
    },
  });

  return NextResponse.json({
    secondsActive: progress.secondsActive,
    minMinutes: topic.minMinutes,
    status: progress.status,
  });
}
