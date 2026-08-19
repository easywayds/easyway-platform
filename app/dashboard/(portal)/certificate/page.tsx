import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";
import { getStudentDashboardData } from "@/lib/student-dashboard";
import CertificateActions from "@/components/CertificateActions";
import styles from "../portal.module.css";

export const dynamic = "force-dynamic";

function formatDate(d: Date | null): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default async function CertificatePage() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;
  if (!session) redirect("/login");

  const data = await getStudentDashboardData(session.sub);
  const { certificate, certificatePending, enrollment, schoolSettings } = data;

  return (
    <div>
      <h1 className={styles.pageTitle}>Certificate</h1>
      <p className={styles.pageSubtitle}>Your official Texas Adult Driver Education certificate record.</p>

      {certificate && (
        <div className={styles.card}>
          <div className={styles.chipRow}>
            <span className={styles.chipLight} style={{ background: "var(--correct-bg)", color: "var(--correct)" }}>
              Issued
            </span>
          </div>
          <p className={styles.heroTitle} style={{ color: "var(--navy)" }}>
            Your Texas Adult Driver Education Certificate
          </p>

          <div className={styles.certPreview}>
            Certificate Preview
            <div className={styles.certPreviewNumber}>{certificate.certificateNumber}</div>
            Use the actions below to view or download the official PDF.
          </div>

          <dl className={styles.recordList} style={{ margin: "0 0 24px" }}>
            <div className={styles.recordItem}>
              <dt className={styles.recordLabel}>Certificate Number</dt>
              <dd className={styles.recordValue}>{certificate.certificateNumber}</dd>
            </div>
            <div className={styles.recordItem}>
              <dt className={styles.recordLabel}>Course</dt>
              <dd className={styles.recordValue}>Texas Adult Driver Education</dd>
            </div>
            <div className={styles.recordItem}>
              <dt className={styles.recordLabel}>Provider</dt>
              <dd className={styles.recordValue}>Easy Way Driving School Inc.</dd>
            </div>
            <div className={styles.recordItem}>
              <dt className={styles.recordLabel}>TDLR License</dt>
              <dd className={styles.recordValue}>{schoolSettings.tdlrNumber ?? "C3677"}</dd>
            </div>
            <div className={styles.recordItem}>
              <dt className={styles.recordLabel}>Completion Date</dt>
              <dd className={styles.recordValue}>{formatDate(enrollment.completedAt)}</dd>
            </div>
            <div className={styles.recordItem}>
              <dt className={styles.recordLabel}>Date Issued</dt>
              <dd className={styles.recordValue}>{formatDate(certificate.issuedAt)}</dd>
            </div>
          </dl>

          <CertificateActions />
        </div>
      )}

      {!certificate && certificatePending && (
        <div className={styles.card}>
          <p className={styles.heroTitle} style={{ color: "var(--navy)" }}>
            Certificate Processing
          </p>
          <p style={{ color: "var(--navy-soft)", fontSize: 14 }}>
            Your course is complete. Your certificate is not yet available — check back soon.
          </p>
        </div>
      )}

      {!certificate && !certificatePending && (
        <div className={styles.card}>
          <p className={styles.heroTitle} style={{ color: "var(--navy)" }}>
            No Certificate Yet
          </p>
          <p style={{ color: "var(--navy-soft)", fontSize: 14 }}>
            Your certificate becomes available once you've completed all 9 topics and passed the final
            assessment.
          </p>
        </div>
      )}
    </div>
  );
}
