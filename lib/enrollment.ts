import { prisma } from "@/lib/prisma";

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
  enrollmentId: string
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

  // Sequential unlock: topic 1 is always open; topic N unlocks once
  // topic N-1 is marked complete. This mirrors the same rule enforced
  // server-side in the heartbeat route, so the UI and the API never
  // disagree about what a student is allowed to access.
  return withProgress.map((t, idx) => ({
    ...t,
    unlocked: idx === 0 || withProgress[idx - 1].status === "complete",
  }));
}
