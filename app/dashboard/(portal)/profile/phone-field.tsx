"use client";

import { useState } from "react";
import styles from "../portal.module.css";

export default function PhoneField({ initialPhone }: { initialPhone: string }) {
  const [editing, setEditing] = useState(false);
  const [phone, setPhone] = useState(initialPhone);
  const [saved, setSaved] = useState(initialPhone);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/student/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Couldn't save your phone number.");
        return;
      }
      setSaved(phone);
      setEditing(false);
    } catch {
      setError("Couldn't save your phone number.");
    } finally {
      setSaving(false);
    }
  }

  if (!editing) {
    return (
      <div className={styles.recordItem}>
        <dt className={styles.recordLabel}>Phone</dt>
        <dd className={styles.recordValue}>
          {saved || "Not on file"}{" "}
          <button
            type="button"
            onClick={() => setEditing(true)}
            style={{ marginLeft: 8, fontSize: 12, background: "none", border: "none", color: "var(--yellow-deep)", cursor: "pointer", fontWeight: 700 }}
          >
            Edit
          </button>
        </dd>
      </div>
    );
  }

  return (
    <div className={styles.field} style={{ gridColumn: "1 / -1", maxWidth: 320 }}>
      <label className={styles.fieldLabel} htmlFor="phone-input">
        Phone
      </label>
      <input id="phone-input" className={styles.fieldInput} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 555-5555" />
      {error && <p className={styles.errorText}>{error}</p>}
      <div style={{ display: "flex", gap: 8 }}>
        <button type="button" className={`${styles.btn} ${styles.btnGhostLight}`} style={{ padding: "8px 14px" }} disabled={saving} onClick={handleSave}>
          {saving ? "Saving…" : "Save"}
        </button>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnGhostLight}`}
          style={{ padding: "8px 14px" }}
          onClick={() => {
            setPhone(saved);
            setEditing(false);
            setError(null);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
