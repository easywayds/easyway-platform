"use client";

import { useState } from "react";

export default function PayButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePay() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/payment/create-checkout-session", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error || "Couldn't start checkout. Please try again.");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Couldn't start checkout. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        className="primary"
        style={{ width: "auto", padding: "10px 20px" }}
        onClick={handlePay}
        disabled={loading}
      >
        {loading ? "Redirecting to checkout…" : "Pay to unlock"}
      </button>
      {error && <p className="error-text" style={{ marginTop: 8 }}>{error}</p>}
    </div>
  );
}
