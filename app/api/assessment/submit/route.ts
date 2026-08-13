import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getOrCreateActiveEnrollment, getTopicsWithProgress } from "@/lib/enrollment";
import { tryIssueCertificate } from "@/lib/certificate-pool";

const PASS_THRESHOLD_PERCENT = 70;

const SubmitSchema = z.object({
  attemptId: z.string(),
  answers: z
    .array(
      z.object({
        questionId: z.string(),
        selectedIndex: z.number().int().min(0).max(3),
      })
    )
    .min(1),
});

export async function POST(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parsed = SubmitSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  const enrollment = await getOrCreateActiveEnrollment(session.sub);
  const topics = await getTopicsWithProgress(enrollment.id, Boolean(enrollment.paidAt));
  const topic9 = topics.find((t) => t.number === 9);
  if (!topic9 || topic9.status !== "complete") {
    return NextResponse.json(
      { error: "Complete all 9 topics before submitting the assessment." },
      { status: 403 }
    );
  }

  // The browser never gets to decide what a valid attempt looks like — every
  // check below is against server-held state, not anything the client sent
  // about correctness, question count, or which questions were assigned.
  const attempt = await prisma.assessmentAttempt.findUnique({
    where: { id: parsed.data.attemptId },
  });

  if (!attempt || attempt.enrollmentId !== enrollment.id) {
    return NextResponse.json({ error: "Attempt not found." }, { status: 404 });
  }
  if (attempt.submittedAt) {
    return NextResponse.json({ error: "This attempt has already been submitted." }, { status: 409 });
  }

  const assignedIds = (attempt.assignedQuestionIds as string[] | null) ?? [];
  const assignedSet = new Set(assignedIds);

  const answerIds = parsed.data.answers.map((a) => a.questionId);
  const uniqueAnswerIds = new Set(answerIds);

  const hasDuplicates = uniqueAnswerIds.size !== answerIds.length;
  const wrongCount = parsed.data.answers.length !== assignedIds.length;
  const answersMatchAssigned =
    !hasDuplicates &&
    !wrongCount &&
    answerIds.every((id) => assignedSet.has(id)) &&
    assignedIds.every((id) => uniqueAnswerIds.has(id));

  if (!answersMatchAssigned) {
    return NextResponse.json(
      { error: "Submission does not match the questions assigned to this attempt." },
      { status: 400 }
    );
  }

  // Re-fetch the real questions from the database — grading is done
  // entirely against server-side data, ignoring anything about
  // correctness the client might have sent.
  const questions = await prisma.examQuestion.findMany({ where: { id: { in: assignedIds } } });
  const questionMap = new Map(questions.map((q) => [q.id, q]));

  let correctCount = 0;
  const gradedAnswers = parsed.data.answers.map((a) => {
    const q = questionMap.get(a.questionId);
    const isCorrect = q ? a.selectedIndex === q.correctIndex : false;
    if (isCorrect) correctCount++;
    return {
      questionId: a.questionId,
      questionText: q?.question ?? "(question no longer available)",
      selectedIndex: a.selectedIndex,
      correctIndex: q?.correctIndex ?? null,
      isCorrect,
    };
  });

  const total = assignedIds.length;
  const scorePercent = total > 0 ? Math.round((correctCount / total) * 10000) / 100 : 0;
  const passed = scorePercent >= PASS_THRESHOLD_PERCENT;

  await prisma.assessmentAttempt.update({
    where: { id: attempt.id },
    data: {
      scorePercent,
      passed,
      submittedAt: new Date(),
      answers: gradedAnswers,
    },
  });

  let certificateNumber: string | null = null;
  let certificatePending = false;

  if (passed) {
    const currentEnrollment = await prisma.enrollment.findUnique({
      where: { id: enrollment.id },
    });

    // Record the pass the moment it happens, regardless of whether a real
    // TDLR number is available right now — this is what lets Easy Way
    // catch up later without the student having to retake anything.
    if (!currentEnrollment?.assessmentPassedAt) {
      await prisma.enrollment.update({
        where: { id: enrollment.id },
        data: { assessmentPassedAt: new Date() },
      });
    }

    if (currentEnrollment?.certificateId) {
      const existingCert = await prisma.certificate.findUnique({
        where: { id: currentEnrollment.certificateId },
      });
      certificateNumber = existingCert?.certificateNumber ?? null;
    } else {
      certificateNumber = await tryIssueCertificate(enrollment.id);
      certificatePending = !certificateNumber;
    }
  }

  return NextResponse.json({
    scorePercent,
    passed,
    attemptNumber: attempt.attemptNumber,
    certificateNumber,
    certificatePending,
  });
}
