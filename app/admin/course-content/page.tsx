import { requireAdminPage } from "@/lib/admin-auth";
import AdminShell from "../admin-shell";
import CourseContentEditor from "./course-content-editor";

export default async function CourseContentAdminPage() {
  const session = await requireAdminPage(["master_admin", "curriculum_admin"]);

  return (
    <AdminShell session={session}>
      <CourseContentEditor />
    </AdminShell>
  );
}
