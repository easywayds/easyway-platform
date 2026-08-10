"use client";

import { useEffect, useState } from "react";
import AdminShell from "../admin-shell";

const TOPIC_TITLES = [
  "Course Introduction",
  "Your License to Drive",
  "Right-of-Way",
  "Traffic Control Devices",
  "Controlling Traffic Flow",
  "Alcohol and Other Drugs",
  "Cooperating with Other Roadway Users",
  "Managing Risk (incl. human trafficking awareness)",
  "Classroom Progress Assessment (DPS exam)",
];

type ContentBlock = {
  id: string;
  contentType: "text" | "video" | "image";
  body: string;
  sortOrder: number;
};

export default function CourseContentAdminPage() {
  const [topicNumber, setTopicNumber] = useState(1);
  const [content, setContent] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newType, setNewType] = useState<"text" | "video" | "image">("text");
  const [newBody, setNewBody] = useState("");
  const [adding, setAdding] = useState(false);

  async function loadContent(topic: number) {
    setLoading(true);
    setError(null);
    const res = await fetch(`/api/admin/course-content?topicNumber=${topic}`);
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Couldn't load content.");
      return;
    }
    setContent(data.content);
  }

  useEffect(() => {
    loadContent(topicNumber);
  }, [topicNumber]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setAdding(true);
    const res = await fetch("/api/admin/course-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topicNumber, contentType: newType, body: newBody }),
    });
    setAdding(false);
    if (res.ok) {
      setNewBody("");
      loadContent(topicNumber);
    }
  }

  async function handleDelete(id: string) {
    await fetch(`/api/admin/course-content/${id}`, { method: "DELETE" });
    loadContent(topicNumber);
  }

  async function handleMove(id: string, direction: "up" | "down") {
    const idx = content.findIndex((c) => c.id === id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= content.length) return;

    const a = content[idx];
    const b = content[swapIdx];
    await Promise.all([
      fetch(`/api/admin/course-content/${a.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sortOrder: b.sortOrder }),
      }),
      fetch(`/api/admin/course-content/${b.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sortOrder: a.sortOrder }),
      }),
    ]);
    loadContent(topicNumber);
  }

  return (
    <AdminShell>
      <div style={{ maxWidth: 760, margin: "40px auto", padding: "0 24px 80px" }}>
        <h1>Course content</h1>
        <p style={{ color: "#666" }}>
          Add lesson text, video links, or images for each topic. Students see these in
          the order shown below while their timer runs.
        </p>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 20 }}>
          {TOPIC_TITLES.map((title, i) => {
            const num = i + 1;
            return (
              <button
                key={num}
                onClick={() => setTopicNumber(num)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 999,
                  border: "1px solid",
                  borderColor: topicNumber === num ? "#1a56db" : "#d0d0d5",
                  background: topicNumber === num ? "#1a56db" : "#fff",
                  color: topicNumber === num ? "#fff" : "#444",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                {num}. {title}
              </button>
            );
          })}
        </div>

        {error && <p className="error-text" style={{ marginTop: 16 }}>{error}</p>}

        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
          {loading && <p style={{ color: "#666" }}>Loading…</p>}
          {!loading && content.length === 0 && (
            <p style={{ color: "#999", fontSize: "0.9rem" }}>
              No content added yet for this topic.
            </p>
          )}
          {content.map((block, i) => (
            <div key={block.id} className="topic-content-placeholder" style={{ borderStyle: "solid" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#888", textTransform: "uppercase" }}>
                  {block.contentType}
                </span>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => handleMove(block.id, "up")} disabled={i === 0} style={smallBtnStyle}>
                    ↑
                  </button>
                  <button
                    onClick={() => handleMove(block.id, "down")}
                    disabled={i === content.length - 1}
                    style={smallBtnStyle}
                  >
                    ↓
                  </button>
                  <button onClick={() => handleDelete(block.id)} style={{ ...smallBtnStyle, color: "#c81e1e" }}>
                    Delete
                  </button>
                </div>
              </div>
              {block.contentType === "image" ? (
                <img src={block.body} alt="" style={{ maxWidth: "100%", borderRadius: 6 }} />
              ) : (
                <p style={{ margin: 0, whiteSpace: "pre-wrap", fontSize: "0.9rem" }}>{block.body}</p>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleAdd} style={{ marginTop: 28 }}>
          <h3 style={{ fontSize: "0.95rem" }}>Add content block</h3>
          <div className="field">
            <label htmlFor="type">Type</label>
            <select
              id="type"
              value={newType}
              onChange={(e) => setNewType(e.target.value as any)}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #d0d0d5",
                borderRadius: 8,
                fontSize: "0.95rem",
              }}
            >
              <option value="text">Text</option>
              <option value="video">Video URL</option>
              <option value="image">Image URL</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="body">
              {newType === "text" ? "Lesson text" : newType === "video" ? "Video URL" : "Image URL"}
            </label>
            {newType === "text" ? (
              <textarea
                id="body"
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
                rows={6}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #d0d0d5",
                  borderRadius: 8,
                  fontSize: "0.95rem",
                }}
                required
              />
            ) : (
              <input
                id="body"
                type="url"
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
                placeholder={newType === "video" ? "https://youtube.com/watch?v=..." : "https://..."}
                required
              />
            )}
          </div>
          <button className="primary" type="submit" disabled={adding} style={{ width: "auto", padding: "10px 20px" }}>
            {adding ? "Adding…" : "Add block"}
          </button>
        </form>
      </div>
    </AdminShell>
  );
}

const smallBtnStyle: React.CSSProperties = {
  background: "none",
  border: "1px solid #d0d0d5",
  borderRadius: 4,
  padding: "2px 8px",
  fontSize: "0.75rem",
  cursor: "pointer",
  color: "#555",
};
