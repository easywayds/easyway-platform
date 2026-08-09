import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getOrCreateActiveEnrollment, getTopicsWithProgress } from "@/lib/enrollment";
import LogoutButton from "./logout-button";

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

  const enrollment = await getOrCreateActiveEnrollment(student.id);
  const topics = await getTopicsWithProgress(enrollment.id);

  const completedCount = topics.filter((t) => t.status === "complete").length;

  return (
    <div style={{ maxWidth: 680, margin: "40px auto", padding: "0 24px" }}>
      <h1>Welcome, {student.fullName}</h1>
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

      <div style={{ marginTop: 32 }}>
        <LogoutButton />
      </div>
    </div>
  );
}
