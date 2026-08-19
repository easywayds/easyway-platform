import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";
import { getStudentDashboardData } from "@/lib/student-dashboard";
import styles from "../portal.module.css";

export const dynamic = "force-dynamic";

function formatDate(d: Date | null): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default async function MyCoursePage() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;
  if (!session) redirect("/login");

  const data = await getStudentDashboardData(session.sub);
  const { topics, progressPercent, completedTopicCount, enrollment, latestAttempt, certificate, certificatePending } = data;

  return (
    <div>
      <h1 className={styles.pageTitle}>Texas Adult Driver Education</h1>
      <p className={styles.pageSubtitle}>
        Course Progress — {progressPercent}% · {completedTopicCount} of {topics.length} topics complete
      </p>

      <div className={styles.progressTrack} style={{ background: "var(--line)", marginBottom: 28 }}>
        <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
      </div>

      <ul className={styles.topicList}>
        {topics.map((topic) => {
          const isCurrent = topic.unlocked && topic.status !== "complete";
          return (
            <li key={topic.id} className={`${styles.topicRow} ${!topic.unlocked ? styles.topicRowLocked : ""}`}>
              <span className={`${styles.topicMark} ${topic.status === "complete" ? styles.topicMarkDone : ""}`}>
                {topic.status === "complete" ? "✓" : topic.number}
              </span>
              <div className={styles.topicMain}>
                <div className={styles.topicTitle}>{topic.title}</div>
                <div className={styles.topicMeta}>
                  {topic.minMinutes} min required · {!topic.unlocked ? "Locked" : topic.status === "complete" ? "Completed" : topic.status === "in_progress" ? "In progress" : "Not started"}
                </div>
              </div>
              <div className={styles.topicAction}>
                {topic.unlocked && (
                  <Link href={`/dashboard/topic/${topic.number}`} className={styles.topicActionLink}>
                    {isCurrent ? "Resume" : "Review"}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <p className={styles.sectionLabel}>Course Summary</p>
      <div className={styles.card}>
        <dl className={styles.recordList} style={{ margin: 0 }}>
          <div className={styles.recordItem}>
            <dt className={styles.recordLabel}>Enrollment Date</dt>
            <dd className={styles.recordValue}>{formatDate(enrollment.startedAt)}</dd>
          </div>
          <div className={styles.recordItem}>
            <dt className={styles.recordLabel}>Course Completion Date</dt>
            <dd className={styles.recordValue}>{formatDate(enrollment.completedAt)}</dd>
          </div>
          <div className={styles.recordItem}>
            <dt className={styles.recordLabel}>Final Assessment</dt>
            <dd className={styles.recordValue}>
              {latestAttempt?.passed ? "Passed" : latestAttempt ? "Not yet passed" : "Not yet taken"}
              {latestAttempt?.scorePercent != null && ` — ${Math.round(latestAttempt.scorePercent)}%`}
            </dd>
          </div>
          <div className={styles.recordItem}>
            <dt className={styles.recordLabel}>Certificate Status</dt>
            <dd className={styles.recordValue}>{certificate ? "Issued" : certificatePending ? "Processing" : "Not yet available"}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
