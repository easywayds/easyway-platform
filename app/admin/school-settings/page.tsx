import { requireAdminPage } from "@/lib/admin-auth";
import AdminShell from "../admin-shell";
import SchoolSettingsForm from "./school-settings-form";

export default async function SchoolSettingsAdminPage() {
  const session = await requireAdminPage(["master_admin"]);

  return (
    <AdminShell session={session}>
      <SchoolSettingsForm />
    </AdminShell>
  );
}
