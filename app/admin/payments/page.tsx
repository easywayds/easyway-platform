import { prisma } from "@/lib/prisma";
import { requireAdminPage } from "@/lib/admin-auth";
import AdminShell from "../admin-shell";
import MarkPaidButton from "./mark-paid-button";

export const dynamic = "force-dynamic";

export default async function PaymentsAdminPage() {
  const session = await requireAdminPage(["master_admin", "payment_admin"]);

  const enrollments = await prisma.enrollment.findMany({
    orderBy: { startedAt: "desc" },
    include: { student: true },
  });

  const paidCount = enrollments.filter((e) => e.paidAt).length;
  const unpaidCount = enrollments.length - paidCount;

  return (
    <AdminShell session={session}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 28px 40px" }}>
        <div className="admin-page-header" style={{ marginTop: 8 }}>
          <h1>Payments</h1>
        </div>
        <p style={{ color: "#666" }}>
          {paidCount} paid · {unpaidCount} unpaid. Payment normally happens automatically through the
          Square webhook — use "Mark paid" only for a payment that happened outside Square (phone,
          cash, comped seat).
        </p>

        <div style={{ overflowX: "auto", marginTop: 16 }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Email</th>
                <th>Started</th>
                <th>Paid</th>
                <th>Square payment link</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((e) => (
                <tr key={e.id}>
                  <td>{e.student.lastName}, {e.student.firstName}</td>
                  <td>{e.student.email}</td>
                  <td>{new Date(e.startedAt).toLocaleDateString()}</td>
                  <td>
                    {e.paidAt ? (
                      <span className="status-badge status-complete">
                        {new Date(e.paidAt).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="status-badge status-not_started">Unpaid</span>
                    )}
                  </td>
                  <td style={{ fontSize: "0.78rem", color: "#888" }}>{e.squarePaymentLinkId ?? "—"}</td>
                  <td>{!e.paidAt && <MarkPaidButton enrollmentId={e.id} />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
