import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getOrCreateActiveEnrollment, getTopicsWithProgress } from "@/lib/enrollment";
import { getRequiredBlocks, areRequiredBlocksComplete } from "@/lib/topic-blocks";

const Schema = z.object({
  topicNumber: z.number().int().min(1).max(9),
  blockId: z.string().min(1),
});

// Records that a student actually completed one interactive lesson block
// (made a decision, answered a scenario) — a durable server-side fact, not
// something inferred from elapsed time. If every required block for a
// topic is now complete and its time threshold is already met, this also
// flips the topic to "complete" — mirroring what the heartbeat route does
// when time finishes last.
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
  const { topicNumber, blockId } = parsed.data;

  const requiredBlocks = getRequiredBlocks(topicNumber);
  if (!requiredBlocks.includes(blockId)) {
    return NextResponse.json({ error: "Unknown block for this topic." }, { status: 400 });
  }

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

  const now = new Date();
  await prisma.topicBlockProgress.upsert({
    where: { enrollmentId_blockId: { enrollmentId: enrollment.id, blockId } },
    create: { enrollmentId: enrollment.id, topicNumber, blockId, completedAt: now },
    update: { completedAt: now },
  });

  // If time is already satisfied and this was the last required block,
  // promote the topic to complete right now instead of waiting for the
  // next heartbeat.
  const existingProgress = await prisma.topicProgress.findUnique({
    where: { enrollmentId_topicId: { enrollmentId: enrollment.id, topicId: topic.id } },
  });
  const thresholdSeconds = topic.minMinutes * 60;
  const timeComplete = (existingProgress?.secondsActive ?? 0) >= thresholdSeconds;
  const blocksComplete = await areRequiredBlocksComplete(enrollment.id, topicNumber);

  if (timeComplete && blocksComplete && existingProgress && existingProgress.status !== "complete") {
    await prisma.topicProgress.update({
      where: { id: existingProgress.id },
      data: { status: "complete", completedAt: existingProgress.completedAt ?? now },
    });
  }

  return NextResponse.json({ blockId, blocksComplete });
}
