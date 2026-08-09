import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getOrCreateActiveEnrollment, getTopicsWithProgress } from "@/lib/enrollment";
import { tryIssueCertificate } from "@/lib/certificate-pool";

const PASS_THRESHOLD_PERCENT = 70;

const SubmitSchema = z.object({
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
  const topics = await getTopicsWithProgress(enrollment.id);
  const topic9 = topics.find((t) => t.number === 9);
  if (!topic9 || topic9.status !== "complete") {
    return NextResponse.json(
      { error: "Complete all 9 topics before submitting the assessment." },
      { status: 403 }
    );
  }

  // Re-fetch the real questions from the database — grading is done
  // entirely against server-side data, ignoring anything about
  // correctness the client might have sent.
  const questionIds = parsed.data.answers.map((a) => a.questionId);
  const questions = await prisma.question.findMany({ where: { id: { in: questionIds } } });
  const questionMap = new Map(questions.map((q) => [q.id, q]));

  let correctCount = 0;
  const gradedAnswers = parsed.data.answers.map((a) => {
    const q = questionMap.get(a.questionId);
    const isCorrect = q ? a.selectedIndex === q.correctIndex : false;
    if (isCorrect) correctCount++;
    return {
      questionId: a.questionId,
      questionText: q?.questionText ?? "(question no longer available)",
      selectedIndex: a.selectedIndex,
      correctIndex: q?.correctIndex ?? null,
      isCorrect,
    };
  });

  const total = parsed.data.answers.length;
  const scorePercent = total > 0 ? Math.round((correctCount / total) * 10000) / 100 : 0;
  const passed = scorePercent >= PASS_THRESHOLD_PERCENT;

  const previousAttempts = await prisma.assessmentAttempt.count({
    where: { enrollmentId: enrollment.id },
  });

  const attempt = await prisma.assessmentAttempt.create({
    data: {
      enrollmentId: enrollment.id,
      attemptNumber: previousAttempts + 1,
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
