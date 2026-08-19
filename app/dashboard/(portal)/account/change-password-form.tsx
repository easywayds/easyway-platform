"use client";

import { useState } from "react";
import styles from "../portal.module.css";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("New passwords don't match.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Couldn't change your password.");
        return;
      }
      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setError("Couldn't change your password.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="current-password">
          Current Password
        </label>
        <input
          id="current-password"
          type="password"
          className={styles.fieldInput}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
      </div>
      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="new-password">
          New Password
        </label>
        <input
          id="new-password"
          type="password"
          className={styles.fieldInput}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          minLength={8}
          required
        />
        <span className={styles.fieldHint}>At least 8 characters.</span>
      </div>
      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor="confirm-password">
          Confirm New Password
        </label>
        <input
          id="confirm-password"
          type="password"
          className={styles.fieldInput}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          minLength={8}
          required
        />
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
      {success && <p className={styles.successText}>Your password has been changed.</p>}
      <button type="submit" className={`${styles.btn} ${styles.btnGhostLight}`} disabled={saving}>
        {saving ? "Saving…" : "Change Password"}
      </button>
    </form>
  );
}
