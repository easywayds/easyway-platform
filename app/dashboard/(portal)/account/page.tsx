import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";
import { getStudentDashboardData } from "@/lib/student-dashboard";
import ChangePasswordForm from "./change-password-form";
import styles from "../portal.module.css";

export const dynamic = "force-dynamic";

function formatDateTime(d: Date | null): string {
  if (!d) return "This is your first sign-in.";
  return new Date(d).toLocaleString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

export default async function AccountPage() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;
  if (!session) redirect("/login");

  const data = await getStudentDashboardData(session.sub);
  const { student } = data;

  return (
    <div>
      <h1 className={styles.pageTitle}>Account &amp; Security</h1>
      <p className={styles.pageSubtitle}>Manage your sign-in email, password, and account details.</p>

      <div className={styles.card} style={{ marginBottom: 20 }}>
        <dl className={styles.recordList} style={{ margin: 0 }}>
          <div className={styles.recordItem}>
            <dt className={styles.recordLabel}>Sign-In Email</dt>
            <dd className={styles.recordValue}>{student.email}</dd>
          </div>
          <div className={styles.recordItem}>
            <dt className={styles.recordLabel}>Last Sign-In</dt>
            <dd className={styles.recordValue}>{formatDateTime(student.lastLoginAt)}</dd>
          </div>
          <div className={styles.recordItem}>
            <dt className={styles.recordLabel}>Account Created</dt>
            <dd className={styles.recordValue}>{formatDateTime(student.createdAt)}</dd>
          </div>
        </dl>
      </div>

      <p className={styles.sectionLabel}>Change Password</p>
      <div className={styles.card}>
        <ChangePasswordForm />
      </div>
    </div>
  );
}
