import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getOrCreateActiveEnrollment, getTopicsWithProgress } from "@/lib/enrollment";
import AssessmentRunner from "./assessment-runner";

export default async function AssessmentPage() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;
  if (!session) redirect("/login");

  const student = await prisma.student.findUnique({ where: { id: session.sub } });
  if (!student) redirect("/login");

  const enrollment = await getOrCreateActiveEnrollment(student.id);
  const topics = await getTopicsWithProgress(enrollment.id, Boolean(enrollment.paidAt));
  const topic9 = topics.find((t) => t.number === 9);

  if (!topic9 || topic9.status !== "complete") {
    redirect("/dashboard");
  }

  const currentEnrollment = await prisma.enrollment.findUnique({
    where: { id: enrollment.id },
  });

  if (currentEnrollment?.certificateId) {
    const certificate = await prisma.certificate.findUnique({
      where: { id: currentEnrollment.certificateId },
    });
    return (
      <div style={{ maxWidth: 560, margin: "60px auto", padding: "0 24px", textAlign: "center" }}>
        <h1>You've already passed 🎉</h1>
        <p style={{ color: "#666" }}>
          Certificate No. {certificate?.certificateNumber} was issued to you.
        </p>
        <a href="/api/certificate/download" className="primary" style={certLinkStyle}>
          Download your certificate
        </a>
        <div style={{ marginTop: 16 }}>
          <Link href="/dashboard" style={{ fontSize: "0.85rem", color: "#666" }}>
            ← Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (currentEnrollment?.assessmentPassedAt) {
    return (
      <div style={{ maxWidth: 560, margin: "60px auto", padding: "0 24px", textAlign: "center" }}>
        <h1>You've already passed 🎉</h1>
        <p style={{ color: "#666" }}>
          Your certificate number is being processed and will be ready soon.
        </p>
        <div style={{ marginTop: 16 }}>
          <Link href="/dashboard" style={{ fontSize: "0.85rem", color: "#666" }}>
            ← Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  const previousAttempts = await prisma.assessmentAttempt.count({
    where: { enrollmentId: enrollment.id },
  });

  return <AssessmentRunner previousAttempts={previousAttempts} />;
}

const certLinkStyle: React.CSSProperties = {
  display: "inline-block",
  marginTop: 20,
  width: "auto",
  padding: "10px 20px",
  textDecoration: "none",
};
