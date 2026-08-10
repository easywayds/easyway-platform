import Link from "next/link";
import { prisma } from "@/lib/prisma";
import "./home.css";

const TOPIC_BLURBS: Record<number, string> = {
  1: "Get oriented — what the course covers and how it works.",
  2: "Licensing rules, requirements, and what to expect.",
  3: "Who goes first at intersections, and why it matters.",
  4: "Signs, signals, and pavement markings, decoded.",
  5: "Merging, lane changes, and keeping traffic moving safely.",
  6: "The real effects of impairment behind the wheel.",
  7: "Sharing the road with cyclists, pedestrians, and more.",
  8: "Defensive driving and staying alert to real risks.",
  9: "Show what you've learned and wrap up the course.",
};

export default async function Home() {
  const [topics, schoolSettings] = await Promise.all([
    prisma.topic.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.schoolSettings.findUnique({ where: { id: "default" } }),
  ]);

  return (
    <div className="home">
      <nav className="home-nav">
        <span className="home-nav-brand">Easy Way Driving School</span>
        <div className="home-nav-actions">
          <Link href="/login" className="btn btn-outline" style={{ color: "#0b5d3a", borderColor: "#0b5d3a", padding: "9px 18px" }}>
            Log in
          </Link>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-inner">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            TDLR-Approved Course
          </div>
          <h1>Texas Adult Driver Education, done entirely online.</h1>
          <p className="lede">
            Complete the state-required 6-hour course for adults on your own
            schedule — any device, real progress tracking, and a genuine TDLR
            completion certificate when you pass.
          </p>
          <div className="hero-ctas">
            <Link href="/register" className="btn btn-primary">
              Enroll now
            </Link>
            <Link href="/login" className="btn btn-outline">
              Student login
            </Link>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="num">6 HRS</span>
              <span className="label">Required course time</span>
            </div>
            <div className="hero-stat">
              <span className="num">{topics.length || 9} TOPICS</span>
              <span className="label">Self-paced modules</span>
            </div>
            <div className="hero-stat">
              <span className="num">70%</span>
              <span className="label">To pass the assessment</span>
            </div>
          </div>
        </div>
      </header>

      <section className="features">
        <div className="feature">
          <h3>100% online</h3>
          <p>No classroom visits. Complete every requirement from home.</p>
        </div>
        <div className="feature">
          <h3>Self-paced</h3>
          <p>Stop and resume anytime — your progress is saved automatically.</p>
        </div>
        <div className="feature">
          <h3>Any device</h3>
          <p>Works on your phone, tablet, or computer.</p>
        </div>
        <div className="feature">
          <h3>Progress tracked</h3>
          <p>Real seat-time tracking, the way TDLR requires it.</p>
        </div>
        <div className="feature">
          <h3>Real certificate</h3>
          <p>A genuine TDLR completion certificate once you pass.</p>
        </div>
      </section>

      <section className="route-section">
        <div className="route-eyebrow">The course, in order</div>
        <h2>What you'll work through</h2>

        <div className="route-line">
          <div className="route-stops">
            {(topics.length > 0
              ? topics
              : Array.from({ length: 9 }, (_, i) => ({
                  id: String(i),
                  number: i + 1,
                  title: `Topic ${i + 1}`,
                  minMinutes: 0,
                }))
            ).map((topic) => (
              <div className="route-stop" key={topic.id}>
                <div className="route-marker">{topic.number}</div>
                <div className="route-stop-body">
                  <h3>{topic.title}</h3>
                  <p>{TOPIC_BLURBS[topic.number] ?? ""}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="trust">
        <div className="trust-inner">
          <h2>State-approved, start to finish.</h2>
          <div className="trust-copy">
            <p>
              This course is approved by the Texas Department of Licensing
              and Regulation (TDLR) for adults completing driver education.
              Every topic meets its required minimum instruction time, and
              your final assessment is graded the same way a real exam would
              be.
            </p>
            {schoolSettings?.schoolName && (
              <p className="mono">{schoolSettings.schoolName}</p>
            )}
            {schoolSettings?.tdlrNumber && (
              <p className="mono">TDLR Provider No. {schoolSettings.tdlrNumber}</p>
            )}
          </div>
        </div>
      </section>

      <section className="closing-cta">
        <h2>Ready to get started?</h2>
        <p>Create your account and begin Topic 1 today.</p>
        <div className="hero-ctas">
          <Link href="/register" className="btn btn-primary">
            Enroll now
          </Link>
        </div>
      </section>

      <footer className="home-footer">
        © {new Date().getFullYear()} Easy Way Driving School. TDLR 6-Hour Adult Driver
        Education Course.
      </footer>
    </div>
  );
}
