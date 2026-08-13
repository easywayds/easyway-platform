import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getOrCreateActiveEnrollment, getTopicsWithProgress } from "@/lib/enrollment";

// How many questions make up one attempt. TDLR doesn't mandate an exact
// count for this classroom assessment — this is a reasonable placeholder,
// worth confirming against the real DPS-style exam format during
// compliance review.
const QUESTIONS_PER_ATTEMPT = 20;

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const enrollment = await getOrCreateActiveEnrollment(session.sub);
  const topics = await getTopicsWithProgress(enrollment.id, Boolean(enrollment.paidAt));
  const topic9 = topics.find((t) => t.number === 9);

  if (!topic9 || topic9.status !== "complete") {
    return NextResponse.json(
      { error: "Complete all 9 topics before starting the assessment." },
      { status: 403 }
    );
  }

  const pool = await prisma.examQuestion.findMany();
  if (pool.length === 0) {
    return NextResponse.json({ error: "No questions available yet." }, { status: 503 });
  }

  const selected = shuffle(pool).slice(0, Math.min(QUESTIONS_PER_ATTEMPT, pool.length));

  // Never send correctIndex to the client — grading happens server-side
  // in /api/assessment/submit using each question's real stored answer.
  const questions = selected.map((q) => ({
    id: q.id,
    questionText: q.question,
    choices: q.options,
  }));

  return NextResponse.json({ questions });
}
