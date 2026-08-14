import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getOrCreateActiveEnrollment, getTopicsWithProgress } from "@/lib/enrollment";
import { areRequiredBlocksComplete, isQuizComplete } from "@/lib/topic-blocks";

// Matches the client's ~15s heartbeat interval, plus slack for network
// latency and timer drift. This is a ceiling on credit per heartbeat, not
// something the client can request more of — see below.
const MAX_CREDIT_SECONDS = 20;

const HeartbeatSchema = z.object({
  topicNumber: z.number().int().min(1).max(9),
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
  const { topicNumber } = parsed.data;

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

  const now = new Date();

  // The client only ever says "I'm active right now" — it never gets to say
  // how many seconds that's worth. Credit is the server's own clock diffed
  // against the last heartbeat it accepted, capped at MAX_CREDIT_SECONDS so
  // a gap (tab closed, laptop asleep, first heartbeat ever) can't dump a
  // large block of time in one request. A student calling this endpoint
  // faster than every ~15s gains nothing extra — credit is bounded by how
  // much real wall-clock time has actually passed since the last accepted
  // heartbeat, not by however many requests were sent.
  const previousBeat = existing?.lastHeartbeatAt ?? existing?.startedAt ?? null;
  const rawElapsedSeconds = previousBeat ? (now.getTime() - previousBeat.getTime()) / 1000 : 0;
  const creditSeconds = Math.max(0, Math.min(MAX_CREDIT_SECONDS, Math.round(rawElapsedSeconds)));

  const newSecondsActive = (existing?.secondsActive ?? 0) + creditSeconds;
  const thresholdSeconds = topic.minMinutes * 60;
  // Time alone is enough for most topics. A topic that defines required
  // interactive blocks (see lib/topic-blocks.ts) additionally needs every
  // one of them completed — time run out with unfinished blocks leaves the
  // topic "in_progress", not "complete".
  const timeComplete = newSecondsActive >= thresholdSeconds;
  const blocksComplete = await areRequiredBlocksComplete(enrollment.id, topicNumber);
  const quizComplete = await isQuizComplete(topic.id, existing?.quizCompletedAt ?? null);
  const nowComplete = timeComplete && blocksComplete && quizComplete;

  const progress = await prisma.topicProgress.upsert({
    where: { enrollmentId_topicId: { enrollmentId: enrollment.id, topicId: topic.id } },
    create: {
      enrollmentId: enrollment.id,
      topicId: topic.id,
      secondsActive: 0,
      lastHeartbeatAt: now,
      status: "in_progress",
      startedAt: now,
      completedAt: null,
    },
    update: {
      secondsActive: newSecondsActive,
      lastHeartbeatAt: now,
      status: nowComplete ? "complete" : "in_progress",
      completedAt: nowComplete && !existing?.completedAt ? now : existing?.completedAt,
    },
  });

  return NextResponse.json({
    secondsActive: progress.secondsActive,
    minMinutes: topic.minMinutes,
    status: progress.status,
  });
}
