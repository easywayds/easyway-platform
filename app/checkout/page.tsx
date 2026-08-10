"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

declare global {
  interface Window {
    Square?: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const cardInstanceRef = useRef<any>(null);

  const [priceUsd, setPriceUsd] = useState<number | null>(null);
  const [courseName, setCourseName] = useState("");
  const [sdkStatus, setSdkStatus] = useState<"loading" | "ready" | "error">("loading");

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleInitial, setMiddleInitial] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [sex, setSex] = useState<"Male" | "Female" | "">("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/course-price")
      .then((res) => res.json())
      .then((data) => {
        setPriceUsd(data.priceUsd);
        setCourseName(data.courseName);
      });
  }, []);

  useEffect(() => {
    const env = process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT === "production"
      ? "web.squarecdn.com"
      : "sandbox.web.squarecdn.com";

    const script = document.createElement("script");
    script.src = `https://${env}/v1/square.js`;
    script.async = true;
    script.onload = async () => {
      try {
        const appId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID;
        const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;
        if (!window.Square || !appId || !locationId) {
          setSdkStatus("error");
          return;
        }
        const payments = window.Square.payments(appId, locationId);
        const card = await payments.card();
        if (cardContainerRef.current) {
          await card.attach(cardContainerRef.current);
        }
        cardInstanceRef.current = card;
        setSdkStatus("ready");
      } catch {
        setSdkStatus("error");
      }
    };
    script.onerror = () => setSdkStatus("error");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!cardInstanceRef.current) return;

    setError(null);
    setSubmitting(true);

    try {
      const tokenResult = await cardInstanceRef.current.tokenize();
      if (tokenResult.status !== "OK") {
        setError("Please check your card details and try again.");
        setSubmitting(false);
        return;
      }

      const res = await fetch("/api/checkout/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lastName,
          firstName,
          middleInitial,
          dateOfBirth,
          sex,
          email,
          phone,
          password,
          cardToken: tokenResult.token,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      router.push("/login?enrolled=success");
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: 480 }}>
        <h1>Checkout</h1>
        {priceUsd !== null && (
          <p className="subtitle">
            {courseName} — ${priceUsd.toFixed(2)}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <h3 style={{ fontSize: "0.9rem", margin: "16px 0 8px" }}>Your information</h3>

          <div style={{ display: "flex", gap: 10 }}>
            <div className="field" style={{ flex: 2 }}>
              <label htmlFor="lastName">Last name</label>
              <input id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>
            <div className="field" style={{ flex: 2 }}>
              <label htmlFor="firstName">First name</label>
              <input id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div className="field" style={{ flex: 1 }}>
              <label htmlFor="middleInitial">MI</label>
              <input id="middleInitial" type="text" maxLength={1} value={middleInitial} onChange={(e) => setMiddleInitial(e.target.value)} />
            </div>
          </div>

          <div className="field">
            <label htmlFor="dateOfBirth">Date of birth</label>
            <input id="dateOfBirth" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
          </div>

          <div className="field">
            <label>Sex</label>
            <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 400 }}>
                <input type="radio" name="sex" checked={sex === "Male"} onChange={() => setSex("Male")} required />
                Male
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 400 }}>
                <input type="radio" name="sex" checked={sex === "Female"} onChange={() => setSex("Female")} />
                Female
              </label>
            </div>
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="field">
            <label htmlFor="phone">Phone (optional)</label>
            <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div className="field">
            <label htmlFor="password">Create a password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} required />
          </div>

          <h3 style={{ fontSize: "0.9rem", margin: "20px 0 8px" }}>Payment</h3>

          <div
            ref={cardContainerRef}
            style={{
              minHeight: 90,
              padding: sdkStatus === "ready" ? 0 : 12,
              border: sdkStatus === "ready" ? "none" : "1px solid #d0d0d5",
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            {sdkStatus === "loading" && (
              <p style={{ fontSize: "0.85rem", color: "#666", margin: 0 }}>Loading payment form…</p>
            )}
            {sdkStatus === "error" && (
              <p className="error-text" style={{ margin: 0 }}>
                Couldn&rsquo;t load the payment form. Please refresh and try again.
              </p>
            )}
          </div>

          {error && <p className="error-text">{error}</p>}

          <button
            className="primary"
            type="submit"
            disabled={sdkStatus !== "ready" || submitting || priceUsd === null}
          >
            {submitting ? "Processing…" : priceUsd !== null ? `Pay $${priceUsd.toFixed(2)}` : "Pay"}
          </button>
        </form>

        <p className="switch-link">
          <Link href="/cart">← Back to cart</Link>
        </p>
      </div>
    </div>
  );
}
