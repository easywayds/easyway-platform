"use client";

import { useEffect, useState } from "react";
import AdminShell from "../admin-shell";

export default function CertificateNumbersAdminPage() {
  const [numbers, setNumbers] = useState("");
  const [status, setStatus] = useState<{
    available: number;
    assigned: number;
    pendingStudents: number;
  } | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function checkStatus() {
    setError(null);
    const res = await fetch("/api/admin/certificate-numbers");
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Couldn't check status.");
      return;
    }
    setStatus(data);
  }

  useEffect(() => {
    checkStatus();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    const res = await fetch("/api/admin/certificate-numbers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ numbers }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      return;
    }

    let msg = `Added ${data.added} new number${data.added === 1 ? "" : "s"}.`;
    if (data.skipped > 0) msg += ` Skipped ${data.skipped} already in the system.`;
    if (data.rejectedInvalidFormat?.length > 0) {
      msg += ` Rejected ${data.rejectedInvalidFormat.length} that didn't match the required ADEE + 8-digit format: ${data.rejectedInvalidFormat.join(", ")}.`;
    }
    if (data.assignedToPendingStudents > 0) {
      msg += ` Issued ${data.assignedToPendingStudents} certificate${
        data.assignedToPendingStudents === 1 ? "" : "s"
      } to students who already passed and were waiting.`;
    }
    setResult(msg);
    setNumbers("");
    checkStatus();
  }

  return (
    <AdminShell>
      <div style={{ maxWidth: 560, margin: "40px auto", padding: "0 24px" }}>
        <h1>Certificate numbers</h1>
        <p style={{ color: "#666" }}>
          Paste the certificate numbers purchased from TDLR below, one per line.
          The system hands these out to students automatically, in order, only
          when they pass the final assessment — it never makes up a number on
          its own. Each number must match TDLR's format: <strong>ADEE</strong>{" "}
          followed by exactly 8 digits (e.g. ADEE12345678).
        </p>

        <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
          <div className="field">
            <label htmlFor="numbers">Certificate numbers (one per line)</label>
            <textarea
              id="numbers"
              value={numbers}
              onChange={(e) => setNumbers(e.target.value)}
              rows={8}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #d0d0d5",
                borderRadius: 8,
                fontSize: "0.95rem",
                fontFamily: "monospace",
              }}
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}
          {result && (
            <p style={{ color: "#15803d", fontSize: "0.9rem", marginBottom: 16 }}>{result}</p>
          )}

          <button className="primary" type="submit" disabled={loading} style={{ width: "auto", padding: "10px 20px" }}>
            {loading ? "Adding…" : "Add numbers"}
          </button>
        </form>

        {status && (
          <div className="topic-content-placeholder" style={{ marginTop: 24 }}>
            <p style={{ margin: "4px 0" }}>Numbers available to assign: <strong>{status.available}</strong></p>
            <p style={{ margin: "4px 0" }}>Numbers already assigned: <strong>{status.assigned}</strong></p>
            <p style={{ margin: "4px 0" }}>
              Students waiting on a number: <strong>{status.pendingStudents}</strong>
            </p>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
