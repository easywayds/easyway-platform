import { prisma } from "@/lib/prisma";

// Which interactive-lesson block IDs are required for a topic to be
// markable "complete", beyond the time threshold. A topic with no entry
// (or an empty array) here has no block requirement at all — existing
// behavior for every topic besides the Topic 3 prototype is unchanged.
//
// Topic 3, Phase C: every core teaching block (B00-B14) plus the two
// substantive reinforcement activities (B16 mistake spotter, B17 SAFE
// challenge) are required — each is a real decision, not a read-only
// element. B15 (school bus) was already required in Phase B. B18 (recap
// accordion) is deliberately excluded: it's a review of material already
// covered, not new progression, matching "don't require decorative/
// read-only elements."
export const REQUIRED_BLOCKS: Record<number, string[]> = {
  3: [
    "T3-L00",
    "T3-B00", "T3-L01", "T3-B01", "T3-B02", "T3-B03",
    "T3-L02", "T3-B04", "T3-B05", "T3-B06", "T3-B07",
    "T3-L03", "T3-B08", "T3-B09", "T3-B10",
    "T3-L04", "T3-B11", "T3-B12",
    "T3-L05", "T3-B13", "T3-B14", "T3-B15",
    "T3-L06", "T3-B16", "T3-B17",
  ],
  4: [
    "T4-L00",
    "T4-B00", "T4-L01", "T4-B01",
    "T4-L02", "T4-B02", "T4-B03", "T4-B04",
    "T4-L03", "T4-B05", "T4-B06", "T4-B07",
    "T4-L04", "T4-B08", "T4-B09", "T4-B10",
    "T4-L05", "T4-B11", "T4-B12", "T4-B13", "T4-B14",
    "T4-L06", "T4-B15", "T4-B16", "T4-B17",
  ],
};

// Every valid block id for a topic, required or not — this is what
// /api/progress/block-complete validates incoming blockIds against. A
// block can be legitimately completable (and worth recording, so a
// refresh doesn't reset it) without being part of what gates the topic's
// overall completion — e.g. B18 (recap), which the student still steps
// through and completes, but which isn't required for Topic 4 to unlock.
export const ALL_BLOCKS: Record<number, string[]> = {
  3: [...REQUIRED_BLOCKS[3], "T3-B18"],
  4: [...REQUIRED_BLOCKS[4], "T4-B18"],
};

export function getRequiredBlocks(topicNumber: number): string[] {
  return REQUIRED_BLOCKS[topicNumber] ?? [];
}

export function getAllBlocks(topicNumber: number): string[] {
  return ALL_BLOCKS[topicNumber] ?? REQUIRED_BLOCKS[topicNumber] ?? [];
}

export async function areRequiredBlocksComplete(
  enrollmentId: string,
  topicNumber: number
): Promise<boolean> {
  const required = getRequiredBlocks(topicNumber);
  if (required.length === 0) return true;

  const completedCount = await prisma.topicBlockProgress.count({
    where: {
      enrollmentId,
      blockId: { in: required },
      completedAt: { not: null },
    },
  });
  return completedCount >= required.length;
}

// A topic with no quiz questions has nothing to require here (existing
// behavior, unchanged). A topic that does have quiz questions can't be
// marked complete until the student has actually reached the quiz's end
// screen — quizCompletedAt is set by /api/progress/quiz-complete, which
// the client can only reach after answering every quiz question along
// the way.
export async function isQuizComplete(topicId: string, quizCompletedAt: Date | null): Promise<boolean> {
  if (quizCompletedAt) return true;
  const quizCount = await prisma.topicQuizQuestion.count({ where: { topicId } });
  return quizCount === 0;
}
