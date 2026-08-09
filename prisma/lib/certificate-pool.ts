import { prisma } from "@/lib/prisma";

// Claims the oldest available number and marks it assigned, guarding
// against two requests claiming the same number at once. Returns null if
// the pool is empty.
async function claimNextNumber(): Promise<string | null> {
  return prisma.$transaction(async (tx) => {
    const row = await tx.certificateNumber.findFirst({
      where: { status: "available" },
      orderBy: { createdAt: "asc" },
    });
    if (!row) return null;

    const claimed = await tx.certificateNumber.updateMany({
      where: { id: row.id, status: "available" },
      data: { status: "assigned", assignedAt: new Date() },
    });
    // Someone else claimed it in between the read and the write — treat
    // as no number available rather than double-issuing.
    if (claimed.count === 0) return null;

    return row.number;
  });
}

// Issues a real certificate for an enrollment that has already passed,
// pulling the next number from the pool. If the pool is empty, the
// enrollment is left waiting (assessmentPassedAt stays set, certificateId
// stays null) so it can be picked up the next time numbers are added.
export async function tryIssueCertificate(enrollmentId: string): Promise<string | null> {
  const enrollment = await prisma.enrollment.findUnique({ where: { id: enrollmentId } });
  if (!enrollment || enrollment.certificateId) return enrollment?.certificateId ? null : null;

  const number = await claimNextNumber();
  if (!number) return null;

  const certificate = await prisma.certificate.create({
    data: { certificateNumber: number },
  });

  await prisma.enrollment.update({
    where: { id: enrollmentId },
    data: {
      certificateId: certificate.id,
      status: "completed",
      completedAt: new Date(),
    },
  });

  return number;
}

// Called after an admin adds new numbers to the pool — finds anyone who
// passed but is still waiting on a real number, oldest first, and issues
// as many certificates as there are numbers available.
export async function sweepPendingCertificates(): Promise<number> {
  const pending = await prisma.enrollment.findMany({
    where: { assessmentPassedAt: { not: null }, certificateId: null },
    orderBy: { assessmentPassedAt: "asc" },
  });

  let issuedCount = 0;
  for (const enrollment of pending) {
    const number = await tryIssueCertificate(enrollment.id);
    if (!number) break; // pool ran out
    issuedCount++;
  }
  return issuedCount;
}
