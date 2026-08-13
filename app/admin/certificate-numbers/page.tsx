import { requireAdminPage } from "@/lib/admin-auth";
import AdminShell from "../admin-shell";
import CertificateNumbersForm from "./certificate-numbers-form";

export default async function CertificateNumbersAdminPage() {
  const session = await requireAdminPage(["master_admin", "payment_admin"]);

  return (
    <AdminShell session={session}>
      <CertificateNumbersForm />
    </AdminShell>
  );
}
