"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ContentBlockView, { type ContentBlockData } from "./content-block";
import styles from "./stepper.module.css";

type Topic = {
  number: number;
  title: string;
  minMinutes: number;
  secondsActive: number;
  status: "not_started" | "in_progress" | "complete";
};

type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  visualKey: string | null;
};

type Screen =
  | { kind: "content"; block: ContentBlockData }
  | { kind: "quiz"; question: QuizQuestion; index: number; total: number }
  | { kind: "quizResult" }
  | { kind: "complete" };

const HEARTBEAT_INTERVAL_MS = 15000;
const HEARTBEAT_SECONDS = 15;

export default function TopicViewer({
  topic,
  content,
  quiz,
  nextTopicNumber,
}: {
  topic: Topic;
  content: ContentBlockData[];
  quiz: QuizQuestion[];
  nextTopicNumber: number | null;
}) {
  const router = useRouter();
  const [secondsActive, setSecondsActive] = useState(topic.secondsActive);
  const [status, setStatus] = useState(topic.status);
  const sendingRef = useRef(false);

  const [current, setCurrent] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

  const screens: Screen[] = [
    ...content.map((block): Screen => ({ kind: "content", block })),
    ...quiz.map((question, index): Screen => ({ kind: "quiz", question, index, total: quiz.length })),
    ...(quiz.length > 0 ? [{ kind: "quizResult" } as Screen] : []),
    { kind: "complete" },
  ];

  const isComplete = status === "complete";

  useEffect(() => {
    if (isComplete) return;

    const interval = setInterval(async () => {
      // Only count time toward the compliance record while the student
      // actually has this tab open and focused — this is what makes the
      // seat-time record defensible instead of just "the page was left open."
      const isActive = document.visibilityState === "visible" && document.hasFocus();
      if (!isActive || sendingRef.current) return;

      sendingRef.current = true;
      try {
        const res = await fetch("/api/progress/heartbeat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topicNumber: topic.number,
            deltaSeconds: HEARTBEAT_SECONDS,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          setSecondsActive(data.secondsActive);
          setStatus(data.status);
        }
      } catch {
        // A missed heartbeat just means slightly less credited time this
        // tick — the next successful one catches back up.
      } finally {
        sendingRef.current = false;
      }
    }, HEARTBEAT_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isComplete, topic.number]);

  const screen = screens[current];
  const minutesLogged = Math.floor(secondsActive / 60);

  const quizCorrectCount = quiz.filter((q) => quizAnswers[q.id] === q.correctIndex).length;

  function selectQuizAnswer(questionId: string, index: number) {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: index }));
  }

  function handleBack() {
    setCurrent((c) => Math.max(0, c - 1));
    window.scrollTo(0, 0);
  }

  function handleContinue() {
    if (screen.kind === "complete") {
      if (nextTopicNumber) {
        router.push(`/dashboard/topic/${nextTopicNumber}`);
      } else if (topic.number === 9) {
        router.push("/dashboard/assessment");
      } else {
        router.push("/dashboard");
      }
      return;
    }
    setCurrent((c) => Math.min(screens.length - 1, c + 1));
    window.scrollTo(0, 0);
  }

  const onQuizScreen = screen.kind === "quiz";
  const quizAnswered = onQuizScreen && quizAnswers[screen.question.id] !== undefined;
  const nextDisabled =
    (onQuizScreen && !quizAnswered) || (screen.kind === "complete" && !isComplete);

  const pct = Math.min(100, Math.round((current / (screens.length - 1)) * 100));

  return (
    <div className={styles.root}>
      <header className={styles.bar}>
        <div className={styles.barInner}>
          <div className={styles.brandRow}>
            <div className={styles.brandMark}>E</div>
            <div className={styles.brandName}>
              Easy Way Driving School — Topic {topic.number}
            </div>
            <Link href="/dashboard" className={styles.backLink} style={{ marginLeft: "auto" }}>
              ← Dashboard
            </Link>
          </div>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${pct}%` }} />
          </div>
          <div className={styles.progressCaption}>
            {current < screens.length - 1
              ? `Screen ${current + 1} of ${screens.length - 1}`
              : "Complete"}
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.stage}>
          {screen.kind === "content" && <ContentBlockView block={screen.block} />}

          {screen.kind === "quiz" && (
            <>
              <div className={styles.tag}>
                <span className={styles.dot} />
                Question {screen.index + 1} of {screen.total}
              </div>
              <div className={styles.qCard}>
                <p className={styles.qText}>{screen.question.question}</p>
                {screen.question.options.map((opt, i) => {
                  const picked = quizAnswers[screen.question.id];
                  let cls = styles.opt;
                  if (picked !== undefined) {
                    if (i === screen.question.correctIndex) cls = `${styles.opt} ${styles.optCorrect}`;
                    else if (i === picked) cls = `${styles.opt} ${styles.optWrong}`;
                  }
                  return (
                    <button
                      key={i}
                      type="button"
                      className={cls}
                      disabled={picked !== undefined}
                      onClick={() => selectQuizAnswer(screen.question.id, i)}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {screen.kind === "quizResult" && (
            <div className={styles.resultCard}>
              <div className={styles.resultBig}>
                {quizCorrectCount} of {quiz.length} correct
              </div>
              <p>
                Ungraded — just for you. The real assessment is in Topic 9.
              </p>
            </div>
          )}

          {screen.kind === "complete" && (
            <div className={styles.completeCard}>
              <div className={styles.completeBig}>
                {isComplete ? "Topic complete" : "Almost there"}
              </div>
              <p className={styles.completeMinutes}>
                {minutesLogged} of {topic.minMinutes} minutes logged
                {!isComplete &&
                  " — stay on this page, focused, until the full time is logged."}
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className={styles.nav}>
        <div className={styles.navInner}>
          <button
            type="button"
            className={`${styles.navBtn} ${styles.navBtnBack}`}
            onClick={handleBack}
            disabled={current === 0}
          >
            Back
          </button>
          <button
            type="button"
            className={`${styles.navBtn} ${styles.navBtnNext}`}
            onClick={handleContinue}
            disabled={nextDisabled}
            title={
              screen.kind === "complete" && !isComplete
                ? `Stay on this page until ${topic.minMinutes} minutes are logged`
                : undefined
            }
          >
            {screen.kind === "complete"
              ? nextTopicNumber
                ? "Next topic"
                : topic.number === 9
                  ? "Go to assessment"
                  : "Back to dashboard"
              : "Continue"}
          </button>
        </div>
      </footer>
    </div>
  );
}
