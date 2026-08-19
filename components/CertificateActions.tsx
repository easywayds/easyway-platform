"use client";

import { useState } from "react";
import styles from "@/app/dashboard/(portal)/portal.module.css";

type FetchResult = { blob: Blob; filename: string } | { error: "notReady" | "error" };

async function fetchCertificate(): Promise<FetchResult> {
  try {
    const res = await fetch("/api/certificate/download");
    if (!res.ok) {
      return { error: res.status === 503 ? "notReady" : "error" };
    }
    const blob = await res.blob();
    const disposition = res.headers.get("Content-Disposition") ?? "";
    const match = disposition.match(/filename="([^"]+)"/);
    return { blob, filename: match?.[1] ?? "certificate.pdf" };
  } catch {
    return { error: "error" };
  }
}

// Download / View / Share, all built on the same authenticated fetch — a
// student can only ever pull their own certificate (the route checks the
// session), and every action reproduces the same stored PDF rather than
// generating or consuming anything new.
export default function CertificateActions() {
  const [status, setStatus] = useState<"idle" | "loading" | "notReady" | "error">("idle");
  const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function" && typeof navigator.canShare === "function";

  async function withCertificate(action: (blob: Blob, filename: string) => void) {
    setStatus("loading");
    const result = await fetchCertificate();
    if ("error" in result) {
      setStatus(result.error);
      return;
    }
    action(result.blob, result.filename);
    setStatus("idle");
  }

  function handleDownload() {
    withCertificate((blob, filename) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    });
  }

  function handleView() {
    withCertificate((blob) => {
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank", "noopener,noreferrer");
      // Revoke well after the new tab has had time to load the blob.
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
    });
  }

  function handleShare() {
    withCertificate(async (blob, filename) => {
      try {
        const file = new File([blob], filename, { type: "application/pdf" });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: "My Easy Way Certificate" });
          return;
        }
      } catch {
        // Sharing cancelled or unsupported for this file — fall through to download.
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    });
  }

  if (status === "notReady") {
    return (
      <p className={styles.progressLabel} style={{ color: "var(--navy-soft)" }}>
        Your certificate number has been issued and is on file. The downloadable document isn't ready
        yet — this is a school-side setup step, not anything you need to do. Check back soon.
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className={styles.errorText}>
        We couldn't load your certificate right now.{" "}
        <button
          type="button"
          onClick={handleDownload}
          style={{ background: "none", border: "none", padding: 0, textDecoration: "underline", cursor: "pointer", color: "inherit" }}
        >
          Try again
        </button>
        .
      </p>
    );
  }

  return (
    <div className={styles.heroActions}>
      <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} disabled={status === "loading"} onClick={handleDownload}>
        {status === "loading" ? "Preparing…" : "Download Certificate"}
      </button>
      <button type="button" className={`${styles.btn} ${styles.btnGhostLight}`} disabled={status === "loading"} onClick={handleView}>
        View Certificate
      </button>
      {canShare && (
        <button type="button" className={`${styles.btn} ${styles.btnGhostLight}`} disabled={status === "loading"} onClick={handleShare}>
          Share Certificate
        </button>
      )}
    </div>
  );
}
