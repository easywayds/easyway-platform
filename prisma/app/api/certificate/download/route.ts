import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getSchoolSettings } from "@/lib/enrollment";
import { generateCertificatePdf } from "@/lib/generate-certificate-pdf";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const student = await prisma.student.findUnique({ where: { id: session.sub } });
  if (!student) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const enrollment = await prisma.enrollment.findFirst({
    where: { studentId: student.id, certificateId: { not: null } },
    orderBy: { completedAt: "desc" },
  });

  if (!enrollment?.certificateId) {
    return NextResponse.json({ error: "No certificate found." }, { status: 404 });
  }

  const certificate = await prisma.certificate.findUnique({
    where: { id: enrollment.certificateId },
  });
  if (!certificate) {
    return NextResponse.json({ error: "No certificate found." }, { status: 404 });
  }

  const schoolSettings = await getSchoolSettings();

  const pdfBytes = await generateCertificatePdf({
    lastName: student.lastName,
    firstName: student.firstName,
    middleInitial: student.middleInitial,
    dateOfBirth: student.dateOfBirth,
    sex: student.sex as "Male" | "Female",
    controlNumber: certificate.certificateNumber,
    completionDate: certificate.issuedAt,
    schoolSettings,
  });

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="certificate-${certificate.certificateNumber}.pdf"`,
    },
  });
}
