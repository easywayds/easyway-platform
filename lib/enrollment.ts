import { prisma } from "@/lib/prisma";

export async function getSchoolSettings() {
  const settings = await prisma.schoolSettings.findUnique({ where: { id: "default" } });
  return {
    tdlrNumber: settings?.tdlrNumber ?? null,
    schoolName: settings?.schoolName ?? null,
    driverEdSchoolNumber: settings?.driverEdSchoolNumber ?? null,
    instructorName: settings?.instructorName ?? null,
    instructorSignatureImage: settings?.instructorSignatureImage ?? null,
    chiefOfficialName: settings?.chiefOfficialName ?? null,
    chiefOfficialSignatureImage: settings?.chiefOfficialSignatureImage ?? null,
  };
}

export async function getOrCreateActiveEnrollment(studentId: string) {
  let enrollment = await prisma.enrollment.findFirst({
    where: { studentId, status: "active" },
  });

  if (!enrollment) {
    enrollment = await prisma.enrollment.create({
      data: { studentId, status: "active" },
    });
  }

  return enrollment;
}

export type TopicWithProgress = {
  id: string;
  number: number;
  title: string;
  minMinutes: number;
  secondsActive: number;
  status: "not_started" | "in_progress" | "complete";
  unlocked: boolean;
};

export async function getTopicsWithProgress(
  enrollmentId: string,
  paid: boolean
): Promise<TopicWithProgress[]> {
  const topics = await prisma.topic.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      progress: { where: { enrollmentId } },
    },
  });

  const withProgress = topics.map((t) => {
    const p = t.progress[0];
    return {
      id: t.id,
      number: t.number,
      title: t.title,
      minMinutes: t.minMinutes,
      secondsActive: p?.secondsActive ?? 0,
      status: (p?.status ?? "not_started") as TopicWithProgress["status"],
    };
  });

  // Sequential unlock: topic 1 opens once the course is paid for; topic N
  // unlocks once topic N-1 is complete. Nothing unlocks at all — not even
  // Topic 1 — until payment is confirmed. This mirrors the same rule
  // enforced server-side in the heartbeat route, so the UI and the API
  // never disagree about what a student is allowed to access.
  return withProgress.map((t, idx) => ({
    ...t,
    unlocked: paid && (idx === 0 || withProgress[idx - 1].status === "complete"),
  }));
}
