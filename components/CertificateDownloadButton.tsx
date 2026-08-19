"use client";

import { useState } from "react";

// A certificate NUMBER can be assigned before the downloadable PDF is
// actually generatable (e.g. the school hasn't uploaded signature images
// yet) — /api/certificate/download intentionally refuses to generate a PDF
// in that case. A plain <a href> download link has no way to surface that
// distinction, so a student just lands on a raw JSON error with no
// explanation. This button instead fetches the file itself and shows a
// clear, student-facing message when it isn't ready yet.
export default function CertificateDownloadButton({ className }: { className?: string }) {
  const [state, setState] = useState<"idle" | "loading" | "notReady" | "error">("idle");

  async function handleDownload() {
    setState("loading");
    try {
      const res = await fetch("/api/certificate/download");
      if (!res.ok) {
        setState(res.status === 503 ? "notReady" : "error");
        return;
      }
      const blob = await res.blob();
      const disposition = res.headers.get("Content-Disposition") ?? "";
      const match = disposition.match(/filename="([^"]+)"/);
      const filename = match?.[1] ?? "certificate.pdf";

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setState("idle");
    } catch {
      setState("error");
    }
  }

  if (state === "notReady") {
    return (
      <p style={{ color: "#666", fontSize: "0.9rem", marginTop: 8 }}>
        Your certificate number has been issued and is on file. The downloadable certificate
        document isn't ready yet — this is a school-side setup step, not anything you need to do.
        Check back soon.
      </p>
    );
  }

  if (state === "error") {
    return (
      <p style={{ color: "#666", fontSize: "0.9rem", marginTop: 8 }}>
        Something went wrong preparing your certificate.{" "}
        <button
          type="button"
          onClick={handleDownload}
          style={{ background: "none", border: "none", padding: 0, textDecoration: "underline", cursor: "pointer" }}
        >
          Try again
        </button>
        .
      </p>
    );
  }

  return (
    <button
      type="button"
      className={className}
      style={{ width: "auto", padding: "8px 16px" }}
      disabled={state === "loading"}
      onClick={handleDownload}
    >
      {state === "loading" ? "Preparing…" : "Download certificate"}
    </button>
  );
}
