"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StudentDeleteButton({
  studentId,
  studentName,
  hasPaidEnrollment,
}: {
  studentId: string;
  studentName: string;
  hasPaidEnrollment: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    if (!confirm(`Permanently delete ${studentName}? This can't be undone.`)) return;
    setLoading(true);
    setError(null);
    const res = await fetch(`/api/admin/students/${studentId}`, { method: "DELETE" });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Couldn't delete student.");
      return;
    }
    router.push("/admin/students");
    router.refresh();
  }

  if (hasPaidEnrollment) {
    return (
      <p style={{ fontSize: "0.8rem", color: "#888", marginTop: 16 }}>
        This student has a paid enrollment, which is a compliance record — deletion is disabled.
      </p>
    );
  }

  return (
    <div style={{ marginTop: 16 }}>
      <button className="admin-btn admin-btn-danger" disabled={loading} onClick={handleDelete}>
        {loading ? "Deleting…" : "Delete student"}
      </button>
      {error && <p className="error-text" style={{ fontSize: "0.8rem", marginTop: 6 }}>{error}</p>}
    </div>
  );
}
