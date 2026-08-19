import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { getOrCreateActiveEnrollment, getTopicsWithProgress, getSchoolSettings, type TopicWithProgress } from "@/lib/enrollment";

export type CourseStatus = "unpaid" | "not_started" | "in_progress" | "final_assessment_pending" | "completed";

export type StudentDashboardData = {
  student: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    middleInitial: string | null;
    dateOfBirth: Date;
    sex: string;
    phone: string | null;
    createdAt: Date;
    lastLoginAt: Date | null;
  };
  enrollment: {
    id: string;
    status: string;
    startedAt: Date;
    completedAt: Date | null;
    assessmentPassedAt: Date | null;
    paidAt: Date | null;
  };
  topics: TopicWithProgress[];
  isPaid: boolean;
  allTopicsComplete: boolean;
  completedTopicCount: number;
  progressPercent: number;
  courseStatus: CourseStatus;
  currentTopic: TopicWithProgress | null;
  latestAttempt: {
    scorePercent: number | null;
    passed: boolean | null;
    submittedAt: Date | null;
  } | null;
  certificate: {
    certificateNumber: string;
    issuedAt: Date;
  } | null;
  certificatePending: boolean;
  schoolSettings: {
    tdlrNumber: string | null;
    schoolName: string | null;
  };
};

// One server-side summary query, shared by the portal layout and every
// portal page — avoids each page independently re-deriving course/
// certificate/assessment status from separate round trips. Wrapped in
// React's cache() so the layout and the page it wraps, which both need
// this in the same request, only actually hit the database once.
export const getStudentDashboardData = cache(async (studentId: string): Promise<StudentDashboardData> => {
  const student = await prisma.student.findUniqueOrThrow({ where: { id: studentId } });
  const enrollment = await getOrCreateActiveEnrollment(studentId);
  const isPaid = Boolean(enrollment.paidAt);
  const topics = await getTopicsWithProgress(enrollment.id, isPaid);
  const schoolSettings = await getSchoolSettings();

  const topic9 = topics.find((t) => t.number === 9);
  const allTopicsComplete = topic9?.status === "complete";
  const completedTopicCount = topics.filter((t) => t.status === "complete").length;
  const progressPercent = topics.length > 0 ? Math.round((completedTopicCount / topics.length) * 100) : 0;
  const currentTopic = topics.find((t) => t.unlocked && t.status !== "complete") ?? null;

  const hasCertificate = Boolean(enrollment.certificateId);
  const certificatePending = Boolean(enrollment.assessmentPassedAt) && !hasCertificate;

  let courseStatus: CourseStatus;
  if (!isPaid) {
    courseStatus = "unpaid";
  } else if (allTopicsComplete && enrollment.assessmentPassedAt) {
    courseStatus = "completed";
  } else if (allTopicsComplete) {
    courseStatus = "final_assessment_pending";
  } else if (completedTopicCount > 0 || (currentTopic && currentTopic.secondsActive > 0)) {
    courseStatus = "in_progress";
  } else {
    courseStatus = "not_started";
  }

  const latestAttempt = await prisma.assessmentAttempt.findFirst({
    where: { enrollmentId: enrollment.id, submittedAt: { not: null } },
    orderBy: { submittedAt: "desc" },
    select: { scorePercent: true, passed: true, submittedAt: true },
  });

  const certificate = enrollment.certificateId
    ? await prisma.certificate.findUnique({
        where: { id: enrollment.certificateId },
        select: { certificateNumber: true, issuedAt: true },
      })
    : null;

  return {
    student: {
      id: student.id,
      email: student.email,
      firstName: student.firstName,
      lastName: student.lastName,
      middleInitial: student.middleInitial,
      dateOfBirth: student.dateOfBirth,
      sex: student.sex,
      phone: student.phone,
      createdAt: student.createdAt,
      lastLoginAt: student.lastLoginAt,
    },
    enrollment: {
      id: enrollment.id,
      status: enrollment.status,
      startedAt: enrollment.startedAt,
      completedAt: enrollment.completedAt,
      assessmentPassedAt: enrollment.assessmentPassedAt,
      paidAt: enrollment.paidAt,
    },
    topics,
    isPaid,
    allTopicsComplete,
    completedTopicCount,
    progressPercent,
    courseStatus,
    currentTopic,
    latestAttempt,
    certificate,
    certificatePending,
    schoolSettings: {
      tdlrNumber: schoolSettings.tdlrNumber,
      schoolName: schoolSettings.schoolName,
    },
  };
});
