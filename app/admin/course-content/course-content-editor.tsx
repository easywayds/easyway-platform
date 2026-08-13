"use client";

import { useEffect, useState } from "react";
import { VISUALS } from "@/lib/visuals-map";

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

type ContentType = "text" | "video" | "image" | "bullets" | "stat" | "custom_visual" | "check";

type ContentBlock = {
  id: string;
  contentType: ContentType;
  tag: string | null;
  route: boolean;
  heading: string | null;
  body: string | null;
  meta: Record<string, unknown> | null;
  sortOrder: number;
};

// The editable shape for both the "add new" form and an in-place edit —
// flattened out of meta so plain text inputs can drive it.
type Draft = {
  contentType: ContentType;
  tag: string;
  route: boolean;
  heading: string;
  body: string;
  bullets: string; // one per line -> meta.bullets
  statNumber: string; // -> meta.number
  visualKey: string; // -> meta.visualKey
  videoKey: string; // -> meta.videoKey
  caption: string; // -> meta.caption (custom_visual / video)
  answer: string; // -> meta.answer (check)
};

const EMPTY_DRAFT: Draft = {
  contentType: "text",
  tag: "",
  route: false,
  heading: "",
  body: "",
  bullets: "",
  statNumber: "",
  visualKey: "",
  videoKey: "",
  caption: "",
  answer: "",
};

function blockToDraft(block: ContentBlock): Draft {
  const meta = block.meta ?? {};
  return {
    contentType: block.contentType,
    tag: block.tag ?? "",
    route: block.route,
    heading: block.heading ?? "",
    body: block.body ?? "",
    bullets: Array.isArray(meta.bullets) ? (meta.bullets as string[]).join("\n") : "",
    statNumber: typeof meta.number === "string" ? meta.number : "",
    visualKey: typeof meta.visualKey === "string" ? meta.visualKey : "",
    videoKey: typeof meta.videoKey === "string" ? meta.videoKey : "",
    caption: typeof meta.caption === "string" ? meta.caption : "",
    answer: typeof meta.answer === "string" ? meta.answer : "",
  };
}

function draftToPayload(d: Draft) {
  let meta: Record<string, unknown> | undefined;
  if (d.contentType === "bullets") {
    meta = { bullets: d.bullets.split("\n").map((s) => s.trim()).filter(Boolean) };
  } else if (d.contentType === "stat") {
    meta = { number: d.statNumber };
  } else if (d.contentType === "custom_visual") {
    meta = { visualKey: d.visualKey, caption: d.caption || undefined };
  } else if (d.contentType === "video") {
    meta = { videoKey: d.videoKey, caption: d.caption || undefined };
  } else if (d.contentType === "check") {
    meta = { answer: d.answer };
  }

  return {
    contentType: d.contentType,
    tag: d.tag,
    route: d.route,
    heading: d.contentType === "image" ? "" : d.heading,
    body: d.body,
    meta,
  };
}

const TYPE_LABELS: Record<ContentType, string> = {
  text: "Text",
  bullets: "Bullet list",
  stat: "Big stat",
  custom_visual: "Illustration",
  video: "Video",
  check: "Check-your-understanding",
  image: "Image URL",
};

function DraftFields({ draft, onChange }: { draft: Draft; onChange: (d: Draft) => void }) {
  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => onChange({ ...draft, [key]: value });
  const visualKeys = Object.keys(VISUALS);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div className="field">
        <label>Block type</label>
        <select
          className="admin-select"
          style={{ width: "100%" }}
          value={draft.contentType}
          onChange={(e) => set("contentType", e.target.value as ContentType)}
        >
          {Object.entries(TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {draft.contentType !== "image" && (
        <div style={{ display: "flex", gap: 10 }}>
          <div className="field" style={{ flex: 1 }}>
            <label>Tag (small label above heading)</label>
            <input value={draft.tag} onChange={(e) => set("tag", e.target.value)} placeholder="e.g. Welcome" />
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem", marginTop: 22 }}>
            <input type="checkbox" checked={draft.route} onChange={(e) => set("route", e.target.checked)} />
            Teal accent
          </label>
        </div>
      )}

      {draft.contentType !== "image" && (
        <div className="field">
          <label>Heading</label>
          <input value={draft.heading} onChange={(e) => set("heading", e.target.value)} />
        </div>
      )}

      {(draft.contentType === "text" || draft.contentType === "check") && (
        <div className="field">
          <label>{draft.contentType === "check" ? "Question" : "Body text (blank line = new paragraph)"}</label>
          <textarea rows={6} value={draft.body} onChange={(e) => set("body", e.target.value)} />
        </div>
      )}

      {draft.contentType === "stat" && (
        <>
          <div className="field">
            <label>Big number/stat (short)</label>
            <input value={draft.statNumber} onChange={(e) => set("statNumber", e.target.value)} placeholder="e.g. 70%" />
          </div>
          <div className="field">
            <label>Caption below the stat</label>
            <textarea rows={2} value={draft.body} onChange={(e) => set("body", e.target.value)} />
          </div>
        </>
      )}

      {draft.contentType === "bullets" && (
        <div className="field">
          <label>Bullets (one per line)</label>
          <textarea rows={6} value={draft.bullets} onChange={(e) => set("bullets", e.target.value)} />
        </div>
      )}

      {draft.contentType === "custom_visual" && (
        <>
          <div className="field">
            <label>Illustration key</label>
            <input
              list="visual-keys"
              value={draft.visualKey}
              onChange={(e) => set("visualKey", e.target.value)}
              placeholder="e.g. followdist"
            />
            <datalist id="visual-keys">
              {visualKeys.map((k) => <option key={k} value={k} />)}
            </datalist>
          </div>
          <div className="field">
            <label>Caption (optional)</label>
            <input value={draft.caption} onChange={(e) => set("caption", e.target.value)} />
          </div>
        </>
      )}

      {draft.contentType === "video" && (
        <>
          <div className="field">
            <label>Video file (in /public/videos/) or full URL</label>
            <input value={draft.videoKey} onChange={(e) => set("videoKey", e.target.value)} placeholder="module1-welcome-web.mp4" />
          </div>
          <div className="field">
            <label>Caption (optional)</label>
            <input value={draft.caption} onChange={(e) => set("caption", e.target.value)} />
          </div>
        </>
      )}

      {draft.contentType === "check" && (
        <div className="field">
          <label>Answer / explanation (revealed on tap)</label>
          <textarea rows={4} value={draft.answer} onChange={(e) => set("answer", e.target.value)} />
        </div>
      )}

      {draft.contentType === "image" && (
        <div className="field">
          <label>Image URL</label>
          <input value={draft.body} onChange={(e) => set("body", e.target.value)} placeholder="https://..." />
        </div>
      )}
    </div>
  );
}

function summarize(block: ContentBlock): string {
  if (block.contentType === "bullets") {
    const n = Array.isArray(block.meta?.bullets) ? (block.meta!.bullets as string[]).length : 0;
    return `${n} bullet${n === 1 ? "" : "s"}`;
  }
  if (block.contentType === "stat") return String(block.meta?.number ?? "");
  if (block.contentType === "custom_visual") return String(block.meta?.visualKey ?? "");
  if (block.contentType === "video") return String(block.meta?.videoKey ?? "");
  if (block.contentType === "check") return (block.body ?? "").slice(0, 80);
  if (block.contentType === "image") return block.body ?? "";
  return (block.body ?? "").slice(0, 100);
}

export default function CourseContentEditor() {
  const [topicNumber, setTopicNumber] = useState(1);
  const [content, setContent] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Draft>(EMPTY_DRAFT);

  const [addingOpen, setAddingOpen] = useState(false);
  const [newDraft, setNewDraft] = useState<Draft>(EMPTY_DRAFT);
  const [saving, setSaving] = useState(false);

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
    setEditingId(null);
    setAddingOpen(false);
    loadContent(topicNumber);
  }, [topicNumber]);

  async function handleAdd() {
    setSaving(true);
    const res = await fetch("/api/admin/course-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topicNumber, ...draftToPayload(newDraft) }),
    });
    setSaving(false);
    if (res.ok) {
      setNewDraft(EMPTY_DRAFT);
      setAddingOpen(false);
      loadContent(topicNumber);
    } else {
      const data = await res.json().catch(() => ({}));
      setError(typeof data.error === "string" ? data.error : "Couldn't add block.");
    }
  }

  async function handleSaveEdit(id: string) {
    setSaving(true);
    const res = await fetch(`/api/admin/course-content/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draftToPayload(editDraft)),
    });
    setSaving(false);
    if (res.ok) {
      setEditingId(null);
      loadContent(topicNumber);
    } else {
      const data = await res.json().catch(() => ({}));
      setError(typeof data.error === "string" ? data.error : "Couldn't save changes.");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this content block? Students will no longer see it.")) return;
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
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px 80px" }}>
      <div className="admin-page-header" style={{ marginTop: 8 }}>
        <h1>Topics & Content</h1>
      </div>
      <p style={{ color: "#666" }}>
        Edits here go live for students immediately — this is the same content the course stepper
        renders, not a draft copy.
      </p>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 20 }}>
        {TOPIC_TITLES.map((title, i) => {
          const num = i + 1;
          return (
            <button
              key={num}
              onClick={() => setTopicNumber(num)}
              className="admin-btn"
              style={
                topicNumber === num
                  ? { background: "var(--admin-panel-curriculum)", color: "#fff", borderColor: "var(--admin-panel-curriculum)" }
                  : {}
              }
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
          <p style={{ color: "#999", fontSize: "0.9rem" }}>No content added yet for this topic.</p>
        )}
        {content.map((block, i) => (
          <div key={block.id} className="topic-content-placeholder" style={{ borderStyle: "solid" }}>
            {editingId === block.id ? (
              <div>
                <DraftFields draft={editDraft} onChange={setEditDraft} />
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <button
                    className="admin-btn admin-btn-primary"
                    style={{ ["--btn-color" as any]: "#7c3aed" }}
                    disabled={saving}
                    onClick={() => handleSaveEdit(block.id)}
                  >
                    {saving ? "Saving…" : "Save"}
                  </button>
                  <button className="admin-btn" onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#7c3aed", textTransform: "uppercase" }}>
                    {TYPE_LABELS[block.contentType]}
                  </span>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => handleMove(block.id, "up")} disabled={i === 0} className="admin-btn" style={smallBtn}>↑</button>
                    <button onClick={() => handleMove(block.id, "down")} disabled={i === content.length - 1} className="admin-btn" style={smallBtn}>↓</button>
                    <button
                      onClick={() => { setEditingId(block.id); setEditDraft(blockToDraft(block)); }}
                      className="admin-btn"
                      style={smallBtn}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(block.id)} className="admin-btn admin-btn-danger" style={smallBtn}>
                      Delete
                    </button>
                  </div>
                </div>
                {block.heading && <p style={{ margin: "0 0 4px", fontWeight: 600 }}>{block.heading}</p>}
                <p style={{ margin: 0, whiteSpace: "pre-wrap", fontSize: "0.9rem", color: "#555" }}>
                  {summarize(block)}
                </p>
              </>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 28 }}>
        {!addingOpen ? (
          <button
            className="admin-btn admin-btn-primary"
            style={{ ["--btn-color" as any]: "#7c3aed" }}
            onClick={() => { setNewDraft(EMPTY_DRAFT); setAddingOpen(true); }}
          >
            + Add content block
          </button>
        ) : (
          <div className="topic-content-placeholder" style={{ borderStyle: "solid" }}>
            <h3 style={{ fontSize: "0.95rem", marginTop: 0 }}>New content block</h3>
            <DraftFields draft={newDraft} onChange={setNewDraft} />
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button
                className="admin-btn admin-btn-primary"
                style={{ ["--btn-color" as any]: "#7c3aed" }}
                disabled={saving}
                onClick={handleAdd}
              >
                {saving ? "Adding…" : "Add block"}
              </button>
              <button className="admin-btn" onClick={() => setAddingOpen(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const smallBtn: React.CSSProperties = { padding: "3px 9px", fontSize: "0.75rem" };
