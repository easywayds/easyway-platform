import { prisma } from "@/lib/prisma";

// Issues a real certificate for an enrollment that has already passed,
// pulling the next number from the pool. If the pool is empty, the
// enrollment is left waiting (assessmentPassedAt stays set, certificateId
// stays null) so it can be picked up the next time numbers are added.
//
// Claiming the number, creating the Certificate row, and attaching it to
// the Enrollment all happen inside one transaction — if any step fails
// (including a concurrent claim of the same number), the whole thing rolls
// back instead of leaving a number marked "assigned" with no certificate
// actually attached to anyone.
export async function tryIssueCertificate(enrollmentId: string): Promise<string | null> {
  const enrollment = await prisma.enrollment.findUnique({ where: { id: enrollmentId } });
  if (!enrollment || enrollment.certificateId) return null;

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

    const certificate = await tx.certificate.create({
      data: { certificateNumber: row.number },
    });

    await tx.enrollment.update({
      where: { id: enrollmentId },
      data: {
        certificateId: certificate.id,
        status: "completed",
        completedAt: new Date(),
      },
    });

    return row.number;
  });
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
