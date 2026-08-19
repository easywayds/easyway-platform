import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";
import { getStudentDashboardData } from "@/lib/student-dashboard";
import CertificateDownloadButton from "@/components/CertificateDownloadButton";
import PayButton from "../pay-button";
import styles from "./portal.module.css";

export const dynamic = "force-dynamic";

function formatDate(d: Date | null): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default async function DashboardHomePage() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;
  if (!session) redirect("/login");

  const data = await getStudentDashboardData(session.sub);
  const { student, enrollment, topics, courseStatus, progressPercent, completedTopicCount, currentTopic, certificate, certificatePending } = data;

  return (
    <div>
      <h1 className={styles.pageTitle}>Welcome back, {student.firstName}</h1>
      <p className={styles.pageSubtitle}>Manage your course, certificate, and Easy Way student account.</p>

      {courseStatus === "unpaid" && (
        <div className={`${styles.heroCard} ${styles.heroCardLight}`} style={{ borderColor: "#1a56db", background: "#f0f5ff" }}>
          <p className={styles.heroTitle} style={{ color: "var(--navy)" }}>
            Unlock your course
          </p>
          <p className={styles.heroMeta} style={{ color: "var(--navy-soft)" }}>
            Pay once to start Topic 1 and work through the full Texas Adult Driver Education course.
          </p>
          <PayButton />
        </div>
      )}

      {(courseStatus === "not_started" || courseStatus === "in_progress") && (
        <div className={styles.heroCard}>
          <div className={styles.chipRow}>
            <span className={styles.chip}>{courseStatus === "in_progress" ? "In Progress" : "Not Started"}</span>
          </div>
          <p className={styles.heroTitle}>Texas Adult Driver Education</p>
          <p className={styles.heroMeta}>6-Hour Online Course</p>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
          </div>
          <p className={styles.progressLabel}>
            {progressPercent}% — {completedTopicCount} of {topics.length} topics complete
            {currentTopic && ` · Next up: ${currentTopic.title}`}
          </p>
          <div className={styles.heroActions}>
            <Link href={currentTopic ? `/dashboard/topic/${currentTopic.number}` : "/dashboard/course"} className={`${styles.btn} ${styles.btnPrimary}`}>
              Continue Course
            </Link>
            <Link href="/dashboard/course" className={`${styles.btn} ${styles.btnGhost}`}>
              My Course Record
            </Link>
          </div>
        </div>
      )}

      {courseStatus === "final_assessment_pending" && (
        <div className={styles.heroCard}>
          <div className={styles.chipRow}>
            <span className={styles.chip}>Final Assessment Pending</span>
          </div>
          <p className={styles.heroTitle}>Texas Adult Driver Education</p>
          <p className={styles.heroMeta}>All 9 topics are complete — the final assessment is the last step.</p>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: "100%" }} />
          </div>
          <p className={styles.progressLabel}>100% — 9 of 9 topics complete</p>
          <div className={styles.heroActions}>
            <Link href="/dashboard/assessment" className={`${styles.btn} ${styles.btnPrimary}`}>
              Take the Final Assessment
            </Link>
          </div>
        </div>
      )}

      {courseStatus === "completed" && (
        <div className={styles.heroCard}>
          <div className={styles.chipRow}>
            <span className={styles.chip}>Course Complete</span>
            <span className={styles.chip}>Final Assessment Passed</span>
            {certificate && <span className={styles.chip}>Certificate Ready</span>}
          </div>
          <p className={styles.heroTitle}>Texas Adult Driver Education</p>
          <p className={styles.heroMeta}>
            Congratulations — completed {formatDate(enrollment.completedAt ?? enrollment.assessmentPassedAt)}.
          </p>
          <div className={styles.heroActions}>
            {certificate ? (
              <>
                <CertificateDownloadButton className={`${styles.btn} ${styles.btnPrimary}`} />
                <Link href="/dashboard/certificate" className={`${styles.btn} ${styles.btnGhost}`}>
                  View Certificate
                </Link>
              </>
            ) : (
              <Link href="/dashboard/certificate" className={`${styles.btn} ${styles.btnPrimary}`}>
                Certificate Status
              </Link>
            )}
            <Link href="/dashboard/course" className={`${styles.btn} ${styles.btnGhost}`}>
              My Course Record
            </Link>
          </div>
          {certificatePending && (
            <p className={styles.progressLabel} style={{ marginTop: 14 }}>
              Your certificate number is being processed and will be ready soon.
            </p>
          )}
        </div>
      )}

      <p className={styles.sectionLabel}>Quick Actions</p>
      <div className={styles.quickGrid}>
        <Link href="/dashboard/certificate" className={styles.quickCard}>
          <span className={styles.quickCardTitle}>Certificate</span>
          <span className={styles.quickCardHint}>View or download your official course certificate.</span>
        </Link>
        <Link href="/dashboard/course" className={styles.quickCard}>
          <span className={styles.quickCardTitle}>My Course</span>
          <span className={styles.quickCardHint}>See all your completed topics.</span>
        </Link>
        <Link href="/dashboard/profile" className={styles.quickCard}>
          <span className={styles.quickCardTitle}>Profile</span>
          <span className={styles.quickCardHint}>Review your student information.</span>
        </Link>
        <Link href="/dashboard/help" className={styles.quickCard}>
          <span className={styles.quickCardTitle}>Help</span>
          <span className={styles.quickCardHint}>Contact Easy Way if you need assistance.</span>
        </Link>
      </div>

      <p className={styles.sectionLabel}>Your Course Record</p>
      <div className={styles.card}>
        <dl className={styles.recordList} style={{ margin: 0 }}>
          <div className={styles.recordItem}>
            <dt className={styles.recordLabel}>Course</dt>
            <dd className={styles.recordValue}>Texas Adult Driver Education</dd>
          </div>
          <div className={styles.recordItem}>
            <dt className={styles.recordLabel}>Enrollment</dt>
            <dd className={styles.recordValue}>
              {courseStatus === "completed" ? "Completed" : courseStatus === "unpaid" ? "Not started" : "Active"}
            </dd>
          </div>
          <div className={styles.recordItem}>
            <dt className={styles.recordLabel}>Topics</dt>
            <dd className={styles.recordValue}>
              {completedTopicCount} / {topics.length}
            </dd>
          </div>
          <div className={styles.recordItem}>
            <dt className={styles.recordLabel}>Final Assessment</dt>
            <dd className={styles.recordValue}>{enrollment.assessmentPassedAt ? "Passed" : "Not yet taken"}</dd>
          </div>
          <div className={styles.recordItem}>
            <dt className={styles.recordLabel}>Certificate</dt>
            <dd className={styles.recordValue}>{certificate ? "Issued" : certificatePending ? "Processing" : "Not yet available"}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
