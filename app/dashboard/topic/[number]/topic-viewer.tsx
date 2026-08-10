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

type ContentBlock = {
  id: string;
  contentType: "text" | "video" | "image";
  body: string;
};

const HEARTBEAT_INTERVAL_MS = 15000;
const HEARTBEAT_SECONDS = 15;

function VideoEmbed({ url }: { url: string }) {
  const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
  if (isYouTube) {
    const videoId = url.includes("youtu.be")
      ? url.split("/").pop()?.split("?")[0]
      : new URL(url).searchParams.get("v");
    return (
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, marginTop: 8 }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0, borderRadius: 8 }}
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <video controls style={{ width: "100%", borderRadius: 8, marginTop: 8 }}>
      <source src={url} />
    </video>
  );
}

export default function TopicViewer({
  topic,
  content,
  nextTopicNumber,
}: {
  topic: Topic;
  content: ContentBlock[];
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
    } else if (topic.number === 9) {
      // Topic 9 is the last instructional topic — completing it unlocks
      // the actual assessment rather than another topic page.
      router.push("/dashboard/assessment");
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

      {content.length > 0 ? (
        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          {content.map((block) => (
            <div key={block.id} className="topic-content-placeholder" style={{ borderStyle: "solid" }}>
              {block.contentType === "text" && (
                <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{block.body}</p>
              )}
              {block.contentType === "image" && (
                <img src={block.body} alt="" style={{ maxWidth: "100%", borderRadius: 8 }} />
              )}
              {block.contentType === "video" && <VideoEmbed url={block.body} />}
            </div>
          ))}
        </div>
      ) : (
        <div className="topic-content-placeholder">
          <p>
            Lesson content for this topic hasn&rsquo;t been added yet. Keep this tab
            open and focused to log time toward the {topic.minMinutes}-minute
            requirement.
          </p>
        </div>
      )}

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
        {nextTopicNumber ? "Next topic" : topic.number === 9 ? "Go to assessment" : "Back to dashboard"}
      </button>
    </div>
  );
}
