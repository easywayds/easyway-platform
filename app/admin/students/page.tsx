import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdminPage } from "@/lib/admin-auth";
import AdminShell from "../admin-shell";

// Live student roster — never statically prerendered.
export const dynamic = "force-dynamic";

export default async function StudentsAdminPage() {
  const session = await requireAdminPage(["master_admin", "student_admin"]);

  const students = await prisma.student.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      enrollments: {
        orderBy: { startedAt: "desc" },
        include: {
          topicProgress: true,
          certificate: true,
          assessmentAttempts: { orderBy: { attemptNumber: "desc" }, take: 1 },
        },
      },
    },
  });

  return (
    <AdminShell session={session}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 28px 40px" }}>
        <div className="admin-page-header" style={{ marginTop: 8 }}>
          <h1>Students</h1>
        </div>
        <p style={{ color: "#666" }}>{students.length} total.</p>

        <div style={{ overflowX: "auto", marginTop: 16 }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Paid</th>
                <th>Topics</th>
                <th>Assessment</th>
                <th>Certificate</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {
                const enrollment = student.enrollments[0];
                const topicsComplete =
                  enrollment?.topicProgress.filter((t) => t.status === "complete").length ?? 0;
                const lastAttempt = enrollment?.assessmentAttempts[0];
                const hasCertificate = Boolean(enrollment?.certificate);
                const isPending = Boolean(enrollment?.assessmentPassedAt) && !hasCertificate;

                return (
                  <tr key={student.id}>
                    <td>
                      {student.lastName}, {student.firstName}
                      {student.middleInitial ? ` ${student.middleInitial}` : ""}
                    </td>
                    <td>{student.email}</td>
                    <td>
                      {enrollment?.paidAt ? (
                        <span className="status-badge status-complete">Paid</span>
                      ) : (
                        <span className="status-badge status-not_started">Unpaid</span>
                      )}
                    </td>
                    <td>{topicsComplete} / 9</td>
                    <td>
                      {lastAttempt
                        ? `${lastAttempt.scorePercent}% (${lastAttempt.passed ? "passed" : "failed"})`
                        : "—"}
                    </td>
                    <td>
                      {hasCertificate ? (
                        <span className="status-badge status-complete">
                          {enrollment?.certificate?.certificateNumber}
                        </span>
                      ) : isPending ? (
                        <span className="status-badge status-in_progress">Pending number</span>
                      ) : (
                        <span className="status-badge status-not_started">—</span>
                      )}
                    </td>
                    <td>
                      <Link href={`/admin/students/${student.id}`} className="admin-btn" style={{ padding: "5px 12px" }}>
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
