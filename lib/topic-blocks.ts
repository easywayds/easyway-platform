import { prisma } from "@/lib/prisma";

// Which interactive-lesson block IDs are required for a topic to be
// markable "complete", beyond the time threshold. A topic with no entry
// (or an empty array) here has no block requirement at all — existing
// behavior for every topic besides the Topic 3 prototype is unchanged.
//
// Topic 3 currently lists only the 4 core-prototype blocks built so far
// (Phase B of the interactive redesign) — not the full 20-block spec.
// Expand this array as more blocks are built in later phases.
export const REQUIRED_BLOCKS: Record<number, string[]> = {
  3: ["T3-B00", "T3-B02", "T3-B03", "T3-B15"],
};

export function getRequiredBlocks(topicNumber: number): string[] {
  return REQUIRED_BLOCKS[topicNumber] ?? [];
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
