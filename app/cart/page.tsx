import Link from "next/link";
import { getCoursePriceUsd, COURSE_NAME } from "@/lib/square";

export const dynamic = "force-dynamic";

export default async function CartPage() {
  const priceUsd = await getCoursePriceUsd();

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Your cart</h1>
        <p className="subtitle">Review your order before checkout</p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "16px 0",
            borderTop: "1px solid #eee",
            borderBottom: "1px solid #eee",
            margin: "20px 0",
          }}
        >
          <span>{COURSE_NAME}</span>
          <strong>${priceUsd.toFixed(2)}</strong>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: 700,
            fontSize: "1.05rem",
            marginBottom: 24,
          }}
        >
          <span>Total</span>
          <span>${priceUsd.toFixed(2)}</span>
        </div>

        <Link
          href="/checkout"
          className="primary"
          style={{
            display: "block",
            textAlign: "center",
            textDecoration: "none",
            padding: "12px",
          }}
        >
          Proceed to checkout
        </Link>

        <p className="switch-link">
          <Link href="/">← Back to course details</Link>
        </p>
      </div>
    </div>
  );
}
