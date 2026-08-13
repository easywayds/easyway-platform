"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Question = {
  id: string;
  questionText: string;
  choices: string[];
};

type Result = {
  scorePercent: number;
  passed: boolean;
  attemptNumber: number;
  certificateNumber: string | null;
  certificatePending: boolean;
};

export default function AssessmentRunner({
  previousAttempts,
}: {
  previousAttempts: number;
}) {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    fetch("/api/assessment/questions")
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || "Could not load the assessment.");
        }
        return res.json();
      })
      .then((data) => {
        setQuestions(data.questions);
        setAttemptId(data.attemptId);
      })
      .catch((err) => setLoadError(err.message));
  }, []);

  function selectAnswer(questionId: string, index: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: index }));
  }

  async function handleSubmit() {
    if (!questions || !attemptId) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/assessment/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attemptId,
          answers: questions.map((q) => ({
            questionId: q.id,
            selectedIndex: answers[q.id] ?? -1,
          })),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
      } else {
        setLoadError(data.error || "Something went wrong submitting the assessment.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  function retake() {
    setResult(null);
    setAnswers({});
    setQuestions(null);
    setAttemptId(null);
    fetch("/api/assessment/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.questions);
        setAttemptId(data.attemptId);
      });
  }

  if (loadError && !questions) {
    return (
      <div style={{ maxWidth: 560, margin: "60px auto", padding: "0 24px" }}>
        <p className="error-text">{loadError}</p>
        <Link href="/dashboard">← Back to dashboard</Link>
      </div>
    );
  }

  if (result) {
    return (
      <div style={{ maxWidth: 560, margin: "60px auto", padding: "0 24px", textAlign: "center" }}>
        <h1>{result.passed ? "You passed! 🎉" : "Not quite yet"}</h1>
        <p style={{ fontSize: "1.1rem", margin: "12px 0" }}>
          Score: <strong>{result.scorePercent}%</strong> (70% required)
        </p>
        {result.passed ? (
          <>
            {result.certificateNumber ? (
              <>
                <p style={{ color: "#666" }}>
                  Certificate No. {result.certificateNumber} has been issued.
                </p>
                <a
                  href="/api/certificate/download"
                  className="primary"
                  style={{
                    display: "inline-block",
                    marginTop: 16,
                    width: "auto",
                    padding: "10px 20px",
                    textDecoration: "none",
                  }}
                >
                  Download your certificate
                </a>
              </>
            ) : (
              <p style={{ color: "#666" }}>
                Your certificate number is being processed and will be ready
                soon — check back on your dashboard shortly.
              </p>
            )}
          </>
        ) : (
          <>
            <p style={{ color: "#666" }}>
              Attempt {result.attemptNumber} — you can try again with a fresh set of
              questions.
            </p>
            <button
              className="primary"
              style={{ marginTop: 12, width: "auto", padding: "10px 20px" }}
              onClick={retake}
            >
              Retake assessment
            </button>
          </>
        )}
        <div style={{ marginTop: 20 }}>
          <Link href="/dashboard" style={{ fontSize: "0.85rem", color: "#666" }}>
            ← Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!questions) {
    return (
      <div style={{ maxWidth: 560, margin: "60px auto", padding: "0 24px" }}>
        <p>Loading assessment…</p>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;

  return (
    <div style={{ maxWidth: 680, margin: "40px auto", padding: "0 24px 80px" }}>
      <Link href="/dashboard" style={{ fontSize: "0.85rem", color: "#666" }}>
        ← Back to dashboard
      </Link>
      <h1 style={{ marginTop: 12 }}>Final Assessment</h1>
      <p style={{ color: "#666" }}>
        {previousAttempts > 0 && `Attempt ${previousAttempts + 1}. `}
        {answeredCount} of {questions.length} answered. 70% required to pass.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 24 }}>
        {questions.map((q, idx) => (
          <div key={q.id} className="topic-content-placeholder" style={{ borderStyle: "solid" }}>
            <p style={{ fontWeight: 600, marginTop: 0 }}>
              {idx + 1}. {q.questionText}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {q.choices.map((choice, i) => (
                <label key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input
                    type="radio"
                    name={q.id}
                    checked={answers[q.id] === i}
                    onChange={() => selectAnswer(q.id, i)}
                  />
                  {choice}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        className="primary"
        style={{ marginTop: 24, width: "auto", padding: "10px 24px" }}
        disabled={answeredCount < questions.length || submitting}
        onClick={handleSubmit}
      >
        {submitting ? "Submitting…" : "Submit assessment"}
      </button>
    </div>
  );
}
