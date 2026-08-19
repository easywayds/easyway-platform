import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";
import { getStudentDashboardData } from "@/lib/student-dashboard";
import PhoneField from "./phone-field";
import styles from "../portal.module.css";

export const dynamic = "force-dynamic";

function formatDate(d: Date): string {
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default async function ProfilePage() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;
  if (!session) redirect("/login");

  const data = await getStudentDashboardData(session.sub);
  const { student, certificate } = data;
  const fullMiddle = student.middleInitial ? ` ${student.middleInitial}.` : "";

  return (
    <div>
      <h1 className={styles.pageTitle}>Profile</h1>
      <p className={styles.pageSubtitle}>Your personal and certificate information on file with Easy Way.</p>

      <p className={styles.sectionLabel}>Personal Information</p>
      <div className={styles.card} style={{ marginBottom: 20 }}>
        <dl className={styles.recordList} style={{ margin: 0 }}>
          <div className={styles.recordItem}>
            <dt className={styles.recordLabel}>Legal Name</dt>
            <dd className={styles.recordValue}>
              {student.firstName}
              {fullMiddle} {student.lastName}
            </dd>
          </div>
          <div className={styles.recordItem}>
            <dt className={styles.recordLabel}>Date of Birth</dt>
            <dd className={styles.recordValue}>{formatDate(student.dateOfBirth)}</dd>
          </div>
          <div className={styles.recordItem}>
            <dt className={styles.recordLabel}>Sex</dt>
            <dd className={styles.recordValue}>{student.sex}</dd>
          </div>
        </dl>
        <p className={styles.lockedNote}>
          Need to correct your legal name, date of birth, or sex on file? Contact Easy Way Driving
          School — these fields feed your official certificate directly and aren't self-editable.
        </p>
      </div>

      <p className={styles.sectionLabel}>Contact Information</p>
      <div className={styles.card} style={{ marginBottom: 20 }}>
        <dl className={styles.recordList} style={{ margin: 0 }}>
          <div className={styles.recordItem}>
            <dt className={styles.recordLabel}>Email</dt>
            <dd className={styles.recordValue}>{student.email}</dd>
          </div>
          <PhoneField initialPhone={student.phone ?? ""} />
        </dl>
      </div>

      <p className={styles.sectionLabel}>Certificate Information</p>
      <div className={styles.card}>
        <p style={{ fontSize: 13.5, color: "var(--navy-soft)", marginTop: 0 }}>
          The information below is what your certificate was generated from.
        </p>
        <dl className={styles.recordList} style={{ margin: 0 }}>
          <div className={styles.recordItem}>
            <dt className={styles.recordLabel}>Name on Certificate</dt>
            <dd className={styles.recordValue}>
              {student.firstName}
              {fullMiddle} {student.lastName}
            </dd>
          </div>
          <div className={styles.recordItem}>
            <dt className={styles.recordLabel}>Certificate Status</dt>
            <dd className={styles.recordValue}>{certificate ? "Issued" : "Not yet issued"}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
