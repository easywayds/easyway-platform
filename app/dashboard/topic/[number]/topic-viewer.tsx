"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Topic = {
  number: number;
  title: string;
  minMinutes: number;
  secondsActive: number;
  status: "not_started" | "in_progress" | "complete";
};

const HEARTBEAT_INTERVAL_MS = 15000;
const HEARTBEAT_SECONDS = 15;

export default function TopicViewer({
  topic,
  nextTopicNumber,
}: {
  topic: Topic;
  nextTopicNumber: number | null;
}) {
  const router = useRouter();
  const [secondsActive, setSecondsActive] = useState(topic.secondsActive);
  const [status, setStatus] = useState(topic.status);
  const sendingRef = useRef(false);

  useEffect(() => {
    // Already done — no need to keep pinging the server.
    if (status === "complete") return;

    const interval = setInterval(async () => {
      // Only count time toward the compliance record while the student
      // actually has this tab open and focused — this is what makes the
      // seat-time record defensible instead of just "the page was left open."
      const isActive = document.visibilityState === "visible" && document.hasFocus();
      if (!isActive || sendingRef.current) return;

      sendingRef.current = true;
      try {
        const res = await fetch("/api/progress/heartbeat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topicNumber: topic.number,
            deltaSeconds: HEARTBEAT_SECONDS,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          setSecondsActive(data.secondsActive);
          setStatus(data.status);
        }
      } catch {
        // A missed heartbeat just means slightly less credited time this
        // tick — the next successful one catches back up. No need to
        // surface a network error to the student mid-lesson.
      } finally {
        sendingRef.current = false;
      }
    }, HEARTBEAT_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [status, topic.number]);

  const pct = Math.min(100, Math.round((secondsActive / (topic.minMinutes * 60)) * 100));
  const minutesLogged = Math.floor(secondsActive / 60);
  const isComplete = status === "complete";

  function handleNext() {
    if (nextTopicNumber) {
      router.push(`/dashboard/topic/${nextTopicNumber}`);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div style={{ maxWidth: 680, margin: "40px auto", padding: "0 24px" }}>
      <Link href="/dashboard" style={{ fontSize: "0.85rem", color: "#666" }}>
        ← Back to dashboard
      </Link>

      <h1 style={{ marginTop: 12 }}>
        Topic {topic.number}: {topic.title}
      </h1>

      <div className="progress-track" style={{ marginTop: 16 }}>
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <p style={{ color: "#666", fontSize: "0.9rem", marginTop: 8 }}>
        {minutesLogged} of {topic.minMinutes} minutes logged
        {isComplete && " — complete"}
      </p>

      <div className="topic-content-placeholder">
        <p>
          Lesson content for this topic will live here once it&rsquo;s migrated
          from the existing course material (Phase 5). For now, keep this tab
          open and focused to log time toward the {topic.minMinutes}-minute
          requirement.
        </p>
      </div>

      <button
        className="primary"
        style={{ marginTop: 24, width: "auto", padding: "10px 20px" }}
        disabled={!isComplete}
        onClick={handleNext}
        title={
          isComplete
            ? undefined
            : `Stay on this page until ${topic.minMinutes} minutes are logged`
        }
      >
        {nextTopicNumber ? "Next topic" : "Back to dashboard"}
      </button>
    </div>
  );
}
