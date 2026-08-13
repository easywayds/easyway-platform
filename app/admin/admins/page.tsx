import { requireAdminPage } from "@/lib/admin-auth";
import AdminShell from "../admin-shell";
import AdminsManager from "./admins-manager";

export const dynamic = "force-dynamic";

export default async function AdminsPage() {
  const session = await requireAdminPage(["master_admin"]);

  return (
    <AdminShell session={session}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 28px 40px" }}>
        <div className="admin-page-header" style={{ marginTop: 8 }}>
          <h1>Admins</h1>
        </div>
        <p style={{ color: "#666" }}>
          Create separate logins for the Student, Payment, and Curriculum panels. Each admin only sees
          and edits their own panel — you're the only one who sees everything.
        </p>

        <AdminsManager currentAdminId={session.sub} />
      </div>
    </AdminShell>
  );
}
