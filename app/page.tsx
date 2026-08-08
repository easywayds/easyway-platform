import Link from "next/link";

export default function Home() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Easy Way Driving School</h1>
        <p className="subtitle">TDLR 6-Hour Adult Driver Education Course</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Link href="/login">
            <button className="primary">Log in</button>
          </Link>
          <Link href="/register">
            <button
              className="primary"
              style={{ background: "#fff", color: "#1a56db", border: "1px solid #1a56db" }}
            >
              Create an account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
