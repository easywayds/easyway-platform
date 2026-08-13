import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getOrCreateActiveEnrollment, getTopicsWithProgress } from "@/lib/enrollment";

// Fixed by the current exam bank: exactly 30 questions, matching the
// 30-question graded final exam this platform was built around. Not a
// placeholder — /submit requires an exact match against whatever is
// assigned here, so this and the submit-side check must never drift apart.
const REQUIRED_QUESTION_COUNT = 30;

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

  // Reuse an already-started, not-yet-submitted attempt so refreshing the
  // page (or reopening the tab) doesn't hand the student a different 30
  // questions mid-attempt. A new attempt is only created once the previous
  // one has been submitted.
  let attempt = await prisma.assessmentAttempt.findFirst({
    where: { enrollmentId: enrollment.id, submittedAt: null },
    orderBy: { startedAt: "desc" },
  });

  let assignedIds: string[];

  if (attempt) {
    assignedIds = (attempt.assignedQuestionIds as string[] | null) ?? [];
  } else {
    const pool = await prisma.examQuestion.findMany();
    if (pool.length < REQUIRED_QUESTION_COUNT) {
      return NextResponse.json(
        {
          error: `The exam bank currently has ${pool.length} questions — at least ${REQUIRED_QUESTION_COUNT} are required to start an attempt.`,
        },
        { status: 503 }
      );
    }

    const selected = shuffle(pool).slice(0, REQUIRED_QUESTION_COUNT);
    assignedIds = selected.map((q) => q.id);

    const previousAttempts = await prisma.assessmentAttempt.count({
      where: { enrollmentId: enrollment.id },
    });

    attempt = await prisma.assessmentAttempt.create({
      data: {
        enrollmentId: enrollment.id,
        attemptNumber: previousAttempts + 1,
        assignedQuestionIds: assignedIds,
      },
    });
  }

  const questions = await prisma.examQuestion.findMany({ where: { id: { in: assignedIds } } });
  const byId = new Map(questions.map((q) => [q.id, q]));

  // Never send correctIndex to the client — grading happens server-side
  // in /api/assessment/submit using each question's real stored answer.
  // Order matches the order assigned at attempt-start time.
  const ordered = assignedIds
    .map((id) => byId.get(id))
    .filter((q): q is NonNullable<typeof q> => Boolean(q))
    .map((q) => ({
      id: q.id,
      questionText: q.question,
      choices: q.options,
    }));

  return NextResponse.json({ attemptId: attempt.id, questions: ordered });
}
