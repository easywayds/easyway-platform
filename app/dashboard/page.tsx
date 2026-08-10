import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getOrCreateActiveEnrollment, getTopicsWithProgress } from "@/lib/enrollment";
import { getCoursePriceUsd } from "@/lib/stripe";
import LogoutButton from "./logout-button";
import PayButton from "./pay-button";
import type { Enrollment } from "@prisma/client";

// Always live, per-student data — never statically prerendered.
export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  not_started: "Not started",
  in_progress: "In progress",
  complete: "Complete",
};

export default async function DashboardPage() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;
  if (!session) redirect("/login");

  const student = await prisma.student.findUnique({ where: { id: session.sub } });
  if (!student) redirect("/login");

  const enrollment: Enrollment = await getOrCreateActiveEnrollment(student.id);
  const isPaid = Boolean(enrollment.paidAt);
  const topics = await getTopicsWithProgress(enrollment.id, isPaid);
  const coursePriceUsd = await getCoursePriceUsd();

  const completedCount = topics.filter((t) => t.status === "complete").length;
  const topic9 = topics.find((t) => t.number === 9);
  const allTopicsComplete = topic9?.status === "complete";
  const hasCertificate = Boolean(enrollment.certificateId);
  const certificatePending = Boolean(enrollment.assessmentPassedAt) && !hasCertificate;

  return (
    <div style={{ maxWidth: 680, margin: "40px auto", padding: "0 24px" }}>
      <h1>Welcome, {student.firstName}</h1>

      {!isPaid && (
        <div
          className="topic-content-placeholder"
          style={{ borderStyle: "solid", borderColor: "#1a56db", background: "#f0f5ff" }}
        >
          <p style={{ fontWeight: 600, marginTop: 0 }}>
            Unlock your course — ${coursePriceUsd.toFixed(2)}
          </p>
          <p>Pay once to start Topic 1 and work through the full course.</p>
          <PayButton />
        </div>
      )}

      <p style={{ color: "#666" }}>
        {completedCount} of {topics.length} topics complete. Work through them in
        order — each one unlocks the next once its required time is logged.
      </p>

      <ol className="topic-list">
        {topics.map((topic) => {
          const pct = Math.min(
            100,
            Math.round((topic.secondsActive / (topic.minMinutes * 60)) * 100)
          );
          const content = (
            <div className={`topic-row ${topic.unlocked ? "" : "topic-row-locked"}`}>
              <div className="topic-row-main">
                <span className="topic-number">{topic.number}</span>
                <div>
                  <div className="topic-title">{topic.title}</div>
                  <div className="topic-meta">
                    {topic.minMinutes} min minimum ·{" "}
                    <span className={`status-badge status-${topic.status}`}>
                      {topic.unlocked ? STATUS_LABEL[topic.status] : "Locked"}
                    </span>
                  </div>
                </div>
              </div>
              {topic.unlocked && (
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${pct}%` }} />
                </div>
              )}
            </div>
          );

          return (
            <li key={topic.id}>
              {topic.unlocked ? (
                <Link href={`/dashboard/topic/${topic.number}`} className="topic-link">
                  {content}
                </Link>
              ) : (
                content
              )}
            </li>
          );
        })}
      </ol>

      {hasCertificate && (
        <div className="topic-content-placeholder" style={{ marginTop: 24, borderStyle: "solid" }}>
          <p style={{ fontWeight: 600, marginTop: 0 }}>Course complete 🎉</p>
          <p>Your certificate has been issued.</p>
          <a
            href="/api/certificate/download"
            className="primary"
            style={{
              display: "inline-block",
              width: "auto",
              padding: "8px 16px",
              textDecoration: "none",
            }}
          >
            Download certificate
          </a>
        </div>
      )}

      {certificatePending && (
        <div className="topic-content-placeholder" style={{ marginTop: 24, borderStyle: "solid" }}>
          <p style={{ fontWeight: 600, marginTop: 0 }}>You passed! 🎉</p>
          <p>Your certificate number is being processed and will be ready soon.</p>
        </div>
      )}

      {!hasCertificate && !certificatePending && allTopicsComplete && (
        <div className="topic-content-placeholder" style={{ marginTop: 24, borderStyle: "solid" }}>
          <p style={{ fontWeight: 600, marginTop: 0 }}>All 9 topics complete</p>
          <p>Ready for the final assessment.</p>
          <Link
            href="/dashboard/assessment"
            className="primary"
            style={{
              display: "inline-block",
              width: "auto",
              padding: "8px 16px",
              textDecoration: "none",
            }}
          >
            Take the assessment
          </Link>
        </div>
      )}

      <div style={{ marginTop: 32 }}>
        <LogoutButton />
      </div>
    </div>
  );
}
