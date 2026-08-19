import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";
import { getStudentDashboardData } from "@/lib/student-dashboard";
import styles from "../portal.module.css";

export const dynamic = "force-dynamic";

const TOPICS = [
  { title: "Certificate Question", body: "Questions about your certificate number, issue date, or download." },
  { title: "Account / Login Help", body: "Trouble signing in, or need your password reset." },
  { title: "Course Question", body: "Questions about a topic, the final assessment, or your progress." },
];

export default async function HelpPage() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;
  if (!session) redirect("/login");

  const data = await getStudentDashboardData(session.sub);
  const schoolName = data.schoolSettings.schoolName ?? "Easy Way Driving School";

  return (
    <div>
      <h1 className={styles.pageTitle}>Help &amp; Support</h1>
      <p className={styles.pageSubtitle}>Need help with your course or account?</p>

      <div className={styles.card}>
        <p style={{ marginTop: 0, fontSize: 14, color: "var(--navy-soft)" }}>
          For any of the following, reach out to {schoolName} directly using the contact information
          provided when you enrolled.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 16 }}>
          {TOPICS.map((t) => (
            <div key={t.title}>
              <p style={{ fontWeight: 700, fontSize: 14, margin: "0 0 2px", color: "var(--navy)" }}>{t.title}</p>
              <p style={{ fontSize: 13, color: "var(--navy-soft)", margin: 0 }}>{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
