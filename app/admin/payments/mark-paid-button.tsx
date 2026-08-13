"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MarkPaidButton({ enrollmentId }: { enrollmentId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    if (!confirm("Mark this enrollment as paid? Only do this for a payment that happened outside Square.")) {
      return;
    }
    setLoading(true);
    setError(null);
    const res = await fetch(`/api/admin/payments/${enrollmentId}`, { method: "PATCH" });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Couldn't mark paid.");
      return;
    }
    router.refresh();
  }

  return (
    <div>
      <button
        className="admin-btn admin-btn-primary"
        style={{ ["--btn-color" as any]: "#059669", padding: "5px 12px" }}
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? "Marking…" : "Mark paid"}
      </button>
      {error && <p className="error-text" style={{ fontSize: "0.75rem", marginTop: 4 }}>{error}</p>}
    </div>
  );
}
