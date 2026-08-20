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
  1: [
    "T1-B00",
    "T1-L01", "T1-B01",
    "T1-L02", "T1-B03",
    "T1-L03", "T1-B05", "T1-B06",
    "T1-L04", "T1-B08",
    "T1-L05", "T1-B11",
    "T1-L06", "T1-B13", "T1-B14",
    "T1-L07",
    "T1-L08", "T1-B18",
  ],
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
  5: [
    "T5-L00",
    "T5-B00", "T5-L01", "T5-B01", "T5-B02", "T5-B03",
    "T5-L02", "T5-B04", "T5-B05", "T5-B06", "T5-B07",
    "T5-L03", "T5-B08", "T5-B09", "T5-B10", "T5-B11", "T5-B12", "T5-B13",
    "T5-L04", "T5-B14", "T5-B15", "T5-B16", "T5-B17",
    "T5-L05", "T5-B18", "T5-B19", "T5-B20", "T5-B21", "T5-B22",
    "T5-L06", "T5-B23", "T5-B24", "T5-B25",
  ],
  6: [
    "T6-L00",
    "T6-B00", "T6-L01", "T6-B01", "T6-B02",
    "T6-L02", "T6-B03", "T6-B04",
    "T6-L03", "T6-B05", "T6-B06", "T6-B07",
    "T6-L04", "T6-B08", "T6-L05", "T6-B09", "T6-L06", "T6-B10",
    "T6-L07", "T6-B11", "T6-B12", "T6-B13", "T6-B14",
    "T6-L08", "T6-B15", "T6-B16", "T6-B17", "T6-B18", "T6-B19", "T6-B20", "T6-B21", "T6-B22",
  ],
  7: [
    "T7-L00",
    "T7-B00", "T7-L01", "T7-B01", "T7-B02",
    "T7-L02", "T7-B03", "T7-B04", "T7-B05", "T7-B06", "T7-B07",
    "T7-L03", "T7-B08", "T7-B09", "T7-B10", "T7-B11",
    "T7-L04", "T7-B12", "T7-B13", "T7-L05", "T7-B14", "T7-B15", "T7-B16",
    "T7-L06", "T7-B17", "T7-B18", "T7-B19", "T7-L07", "T7-B20", "T7-B21", "T7-B22",
    "T7-L08", "T7-B23", "T7-B24", "T7-B25", "T7-B26", "T7-L09", "T7-B27", "T7-B28", "T7-B29",
  ],
  8: [
    "T8-L00",
    "T8-B00", "T8-L01", "T8-B01", "T8-B02",
    "T8-L02", "T8-B03", "T8-B04", "T8-B05",
    "T8-L03", "T8-B06", "T8-B07", "T8-B08", "T8-B09", "T8-B10", "T8-L04", "T8-B11",
    "T8-L05", "T8-B12", "T8-L06", "T8-B13", "T8-L07", "T8-B14",
    "T8-L08", "T8-B15", "T8-B16",
    "T8-L09", "T8-B17", "T8-B18", "T8-B19", "T8-B20", "T8-B21",
  ],
};

// Every valid block id for a topic, required or not — this is what
// /api/progress/block-complete validates incoming blockIds against. A
// block can be legitimately completable (and worth recording, so a
// refresh doesn't reset it) without being part of what gates the topic's
// overall completion — e.g. B18 (recap), which the student still steps
// through and completes, but which isn't required for Topic 4 to unlock.
export const ALL_BLOCKS: Record<number, string[]> = {
  1: [
    ...REQUIRED_BLOCKS[1],
    "T1-B02", "T1-B04", "T1-B04b", "T1-B07", "T1-B09", "T1-B10", "T1-B12", "T1-B15", "T1-B16", "T1-B17",
  ],
  3: [...REQUIRED_BLOCKS[3], "T3-B18"],
  4: [...REQUIRED_BLOCKS[4], "T4-B18"],
  5: [...REQUIRED_BLOCKS[5], "T5-B26"],
  6: [...REQUIRED_BLOCKS[6], "T6-B23"],
  7: [...REQUIRED_BLOCKS[7], "T7-B30"],
  8: [...REQUIRED_BLOCKS[8], "T8-B22"],
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
