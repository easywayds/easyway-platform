import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdminPage } from "@/lib/admin-auth";
import AdminShell from "../../admin-shell";
import StudentEditForm from "./student-edit-form";
import StudentDeleteButton from "./student-delete-button";

export const dynamic = "force-dynamic";

export default async function StudentDetailPage({ params }: { params: { id: string } }) {
  const session = await requireAdminPage(["master_admin", "student_admin"]);

  const student = await prisma.student.findUnique({
    where: { id: params.id },
    include: {
      enrollments: {
        orderBy: { startedAt: "desc" },
        include: {
          topicProgress: { include: { topic: true }, orderBy: { topic: { number: "asc" } } },
          certificate: true,
          assessmentAttempts: { orderBy: { attemptNumber: "desc" } },
        },
      },
    },
  });

  if (!student) notFound();

  const enrollment = student.enrollments[0];
  const hasPaidEnrollment = student.enrollments.some((e) => e.paidAt);

  return (
    <AdminShell session={session}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 28px 40px" }}>
        <Link href="/admin/students" style={{ fontSize: "0.85rem", color: "#666" }}>
          ← All students
        </Link>
        <div className="admin-page-header" style={{ marginTop: 8 }}>
          <h1>{student.lastName}, {student.firstName}</h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 24 }}>
          <div>
            <h3 style={{ fontSize: "0.95rem", color: "#444" }}>Contact & profile</h3>
            <p style={{ fontSize: "0.8rem", color: "#888", marginTop: -8 }}>
              Editable here. Course progress, exam attempts, and the certificate below are the
              compliance record and are read-only.
            </p>
            <StudentEditForm student={student} />
            <StudentDeleteButton
              studentId={student.id}
              studentName={`${student.firstName} ${student.lastName}`}
              hasPaidEnrollment={hasPaidEnrollment}
            />
          </div>

          <div>
            <h3 style={{ fontSize: "0.95rem", color: "#444" }}>Course record (read-only)</h3>
            {!enrollment ? (
              <p style={{ color: "#888", fontSize: "0.9rem" }}>No enrollment yet.</p>
            ) : (
              <div className="topic-content-placeholder" style={{ borderStyle: "solid" }}>
                <p style={{ margin: "4px 0" }}>
                  <strong>Paid:</strong> {enrollment.paidAt ? new Date(enrollment.paidAt).toLocaleString() : "Not paid"}
                </p>
                <p style={{ margin: "4px 0" }}>
                  <strong>Status:</strong> {enrollment.status}
                </p>
                <p style={{ margin: "12px 0 4px", fontWeight: 600 }}>Topics</p>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: "0.85rem" }}>
                  {enrollment.topicProgress.map((p) => (
                    <li key={p.id}>
                      Topic {p.topic.number} — {p.status} ({Math.floor(p.secondsActive / 60)} / {p.topic.minMinutes} min)
                    </li>
                  ))}
                </ul>
                <p style={{ margin: "12px 0 4px", fontWeight: 600 }}>Exam attempts</p>
                {enrollment.assessmentAttempts.length === 0 ? (
                  <p style={{ fontSize: "0.85rem", color: "#888" }}>None yet.</p>
                ) : (
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: "0.85rem" }}>
                    {enrollment.assessmentAttempts.map((a) => (
                      <li key={a.id}>
                        Attempt {a.attemptNumber}: {a.scorePercent ?? "—"}%{" "}
                        {a.passed === null ? "(in progress)" : a.passed ? "(passed)" : "(failed)"}
                      </li>
                    ))}
                  </ul>
                )}
                <p style={{ margin: "12px 0 4px", fontWeight: 600 }}>Certificate</p>
                <p style={{ fontSize: "0.85rem" }}>
                  {enrollment.certificate
                    ? `${enrollment.certificate.certificateNumber} — issued ${new Date(enrollment.certificate.issuedAt).toLocaleDateString()}`
                    : "Not issued"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
