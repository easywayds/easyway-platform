"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ContentBlockView, { type ContentBlockData } from "./content-block";
import DecisionChallenge from "@/components/course/DecisionChallenge";
import CompareScenes from "@/components/course/CompareScenes";
import DecisionSequence from "@/components/course/DecisionSequence";
import HotspotScene from "@/components/course/HotspotScene";
import StagedScenario from "@/components/course/StagedScenario";
import RecapAccordion from "@/components/course/RecapAccordion";
import LessonScreen from "@/components/course/LessonScreen";
import VideoLesson from "@/components/course/VideoLesson";
import RiskStack from "@/components/course/RiskStack";
import { TOPIC1_BLOCKS, TOPIC1_CHAPTERS, TOPIC1_PRACTICE_BLOCK_IDS, type Topic1Block } from "@/lib/topic1-blocks";
import { TOPIC3_BLOCKS, TOPIC3_CHAPTERS, TOPIC3_PRACTICE_BLOCK_IDS, type Topic3Block } from "@/lib/topic3-blocks";
import { TOPIC4_BLOCKS, TOPIC4_CHAPTERS, TOPIC4_PRACTICE_BLOCK_IDS, type Topic4Block } from "@/lib/topic4-blocks";
import { TOPIC5_BLOCKS, TOPIC5_CHAPTERS, TOPIC5_PRACTICE_BLOCK_IDS, type Topic5Block } from "@/lib/topic5-blocks";
import { TOPIC6_BLOCKS, TOPIC6_CHAPTERS, TOPIC6_PRACTICE_BLOCK_IDS, type Topic6Block } from "@/lib/topic6-blocks";
import { TOPIC7_BLOCKS, TOPIC7_CHAPTERS, TOPIC7_PRACTICE_BLOCK_IDS, type Topic7Block } from "@/lib/topic7-blocks";
import { TOPIC8_BLOCKS, TOPIC8_CHAPTERS, TOPIC8_PRACTICE_BLOCK_IDS, type Topic8Block } from "@/lib/topic8-blocks";
import courseStyles from "@/components/course/course.module.css";
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
  | { kind: "interactive"; block: Topic1Block | Topic3Block | Topic4Block | Topic5Block | Topic6Block | Topic7Block | Topic8Block }
  | { kind: "quiz"; question: QuizQuestion; index: number; total: number }
  | { kind: "quizResult" }
  | { kind: "complete" };

const HEARTBEAT_INTERVAL_MS = 15000;

// Per-topic interactive-lesson data — every topic besides 1, 3, 4, 5, 6, 7,
// and 8 is completely unaffected (these maps only resolve for those topic
// numbers; everything else falls back to the plain content-array flow).
const TOPIC_BLOCKS: Record<number, (Topic1Block | Topic3Block | Topic4Block | Topic5Block | Topic6Block | Topic7Block | Topic8Block)[]> = {
  1: TOPIC1_BLOCKS,
  3: TOPIC3_BLOCKS,
  4: TOPIC4_BLOCKS,
  5: TOPIC5_BLOCKS,
  6: TOPIC6_BLOCKS,
  7: TOPIC7_BLOCKS,
  8: TOPIC8_BLOCKS,
};
const TOPIC_CHAPTERS: Record<number, { title: string; blockIds: string[] }[]> = {
  1: TOPIC1_CHAPTERS,
  3: TOPIC3_CHAPTERS,
  4: TOPIC4_CHAPTERS,
  5: TOPIC5_CHAPTERS,
  6: TOPIC6_CHAPTERS,
  7: TOPIC7_CHAPTERS,
  8: TOPIC8_CHAPTERS,
};
const TOPIC_PRACTICE_IDS: Record<number, string[]> = {
  1: TOPIC1_PRACTICE_BLOCK_IDS,
  3: TOPIC3_PRACTICE_BLOCK_IDS,
  4: TOPIC4_PRACTICE_BLOCK_IDS,
  5: TOPIC5_PRACTICE_BLOCK_IDS,
  6: TOPIC6_PRACTICE_BLOCK_IDS,
  7: TOPIC7_PRACTICE_BLOCK_IDS,
  8: TOPIC8_PRACTICE_BLOCK_IDS,
};

function chapterFor(blockId: string, topicNumber: number): { title: string; index: number } | null {
  const chapters = TOPIC_CHAPTERS[topicNumber] ?? [];
  const idx = chapters.findIndex((c) => c.blockIds.includes(blockId));
  if (idx === -1) return null;
  return { title: chapters[idx].title, index: idx };
}

// Sequence/staged blocks don't have a top-level "eyebrow" (each round or
// stage has its own instead), so the practice hub needs a per-kind label.
function practiceTitle(block: Topic1Block | Topic3Block | Topic4Block | Topic5Block | Topic6Block | Topic7Block | Topic8Block): string {
  switch (block.kind) {
    case "decision":
    case "compare":
    case "hotspot":
      return block.props.eyebrow ?? block.id;
    case "sequence":
      return block.props.rounds[0]?.eyebrow ?? block.id;
    case "staged":
      return block.props.eyebrow ?? block.props.stages[0]?.label ?? block.id;
    case "recap":
      return block.props.eyebrow ?? block.id;
    case "riskstack":
      return block.props.eyebrow ?? block.id;
    case "learn":
    case "video":
      return block.props.eyebrow ?? block.props.title;
  }
}

// Every topic's screens — interactive blocks (topics 3-4) and/or plain
// content screens (every topic) — are individually tracked server-side via
// completedBlockIds, so a returning student can resume right where they
// left off instead of re-clicking through everything from screen one.
function computeInitialScreenIndex(
  interactiveBlocks: (Topic1Block | Topic3Block | Topic4Block | Topic5Block | Topic6Block | Topic7Block | Topic8Block)[],
  content: ContentBlockData[],
  quiz: QuizQuestion[],
  completedBlockIds: string[],
  quizAlreadyCompleted: boolean
): number {
  const completed = new Set(completedBlockIds);
  const firstIncompleteInteractive = interactiveBlocks.findIndex((b) => !completed.has(b.id));
  if (firstIncompleteInteractive !== -1) return firstIncompleteInteractive;
  // Every interactive block is done (or this topic has none) — check content.
  const firstIncompleteContent = content.findIndex((c) => !completed.has(c.id));
  if (firstIncompleteContent !== -1) return interactiveBlocks.length + firstIncompleteContent;
  // Every block and content screen is done — the quiz starts right after.
  const afterAll = interactiveBlocks.length + content.length;
  if (quiz.length > 0 && !quizAlreadyCompleted) return afterAll;
  // Everything is done — land on the final "complete" screen.
  return afterAll + quiz.length + (quiz.length > 0 ? 1 : 0);
}

export default function TopicViewer({
  topic,
  content,
  quiz,
  nextTopicNumber,
  completedBlockIds: initialCompletedBlockIds = [],
  quizAlreadyCompleted = false,
}: {
  topic: Topic;
  content: ContentBlockData[];
  quiz: QuizQuestion[];
  nextTopicNumber: number | null;
  completedBlockIds?: string[];
  quizAlreadyCompleted?: boolean;
}) {
  const router = useRouter();
  const [secondsActive, setSecondsActive] = useState(topic.secondsActive);
  const [status, setStatus] = useState(topic.status);
  const sendingRef = useRef(false);

  const [current, setCurrent] = useState(() =>
    computeInitialScreenIndex(
      TOPIC_BLOCKS[topic.number] ?? [],
      content,
      quiz,
      initialCompletedBlockIds,
      quizAlreadyCompleted
    )
  );
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  // Seeded from the server so a mid-topic refresh doesn't force the student
  // to redo an interactive block that's already recorded as complete.
  const [completedBlockIds, setCompletedBlockIds] = useState<Set<string>>(
    () => new Set(initialCompletedBlockIds)
  );
  // When set, we're viewing a block in "practice mode" from the Keep
  // Practicing screen — a dedicated link returns here instead of the
  // normal Continue flow advancing through the rest of the sequence.
  const [practiceReturnIndex, setPracticeReturnIndex] = useState<number | null>(null);

  // Topics 3 and 4 use the Easy Way Interactive Lesson Standard v1.0 —
  // their curriculum data (lib/topic3-blocks.ts, lib/topic4-blocks.ts) is
  // static, not per-student, so it's imported directly here rather than
  // threaded through as a prop. Every other topic is completely
  // unaffected. Topics 3 and 4's `content` rows are empty in the
  // database — all their instructional content flows through the
  // interactive blocks instead.
  const interactiveBlocks = TOPIC_BLOCKS[topic.number] ?? [];
  const practiceIds = TOPIC_PRACTICE_IDS[topic.number] ?? [];

  const screens: Screen[] = [
    ...interactiveBlocks.map((block): Screen => ({ kind: "interactive", block })),
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
          body: JSON.stringify({ topicNumber: topic.number }),
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

  // Reaching the "complete" screen is only possible after answering every
  // quiz question along the way (Continue is disabled on an unanswered quiz
  // screen) — recording it server-side turns that client-side gate into a
  // durable proof of instructional-sequence progression.
  useEffect(() => {
    if (quiz.length === 0 || screen.kind !== "complete") return;
    fetch("/api/progress/quiz-complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topicNumber: topic.number }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .catch(() => null)
      .then(() => {
        // Quiz may have been the last required piece — refresh status in
        // case it just flipped to complete server-side.
        return fetch("/api/progress/heartbeat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topicNumber: topic.number }),
        });
      })
      .then((res) => (res && res.ok ? res.json() : null))
      .then((hb) => {
        if (hb) {
          setSecondsActive(hb.secondsActive);
          setStatus(hb.status);
        }
      })
      .catch(() => {
        // Best-effort — a missed call here doesn't block progress; it just
        // means this particular visit isn't recorded as having reached the end.
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen.kind, quiz.length, topic.number]);

  function selectQuizAnswer(questionId: string, index: number) {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: index }));
  }

  // Fires the moment a student genuinely completes an interactive block
  // (makes a decision, finishes a comparison) — recorded server-side so
  // topic completion can require it, not just elapsed time.
  function handleBlockComplete(blockId: string) {
    setCompletedBlockIds((prev) => {
      if (prev.has(blockId)) return prev;
      const next = new Set(prev);
      next.add(blockId);
      return next;
    });
    fetch("/api/progress/block-complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topicNumber: topic.number, blockId }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.blocksComplete) {
          // All required blocks done — re-poll status in case time was
          // already satisfied before this last block finished.
          fetch("/api/progress/heartbeat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topicNumber: topic.number }),
          })
            .then((r) => (r.ok ? r.json() : null))
            .then((hb) => {
              if (hb) {
                setSecondsActive(hb.secondsActive);
                setStatus(hb.status);
              }
            })
            .catch(() => {});
        }
      })
      .catch(() => {
        // Best-effort — if this fails, the block just isn't marked complete
        // yet server-side; the student can still finish it again to retry.
      });
  }

  function handleBack() {
    if (practiceReturnIndex !== null) {
      setCurrent(practiceReturnIndex);
      setPracticeReturnIndex(null);
      window.scrollTo(0, 0);
      return;
    }
    setCurrent((c) => Math.max(0, c - 1));
    window.scrollTo(0, 0);
  }

  function handleContinue() {
    if (practiceReturnIndex !== null) {
      returnFromPractice();
      return;
    }
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
    // Record plain content screens as a resume marker too — same
    // mechanism as interactive blocks, just not required for completion
    // (areRequiredBlocksComplete only gates on topics with a real block
    // catalog, so this never blocks anything for topics 1, 2, 5-8).
    if (screen.kind === "content" && !completedBlockIds.has(screen.block.id)) {
      handleBlockComplete(screen.block.id);
    }
    setCurrent((c) => Math.min(screens.length - 1, c + 1));
    window.scrollTo(0, 0);
  }

  function startPractice(blockId: string) {
    const idx = screens.findIndex((s) => s.kind === "interactive" && s.block.id === blockId);
    if (idx === -1) return;
    setPracticeReturnIndex(current);
    setCurrent(idx);
    window.scrollTo(0, 0);
  }

  function returnFromPractice() {
    if (practiceReturnIndex === null) return;
    setCurrent(practiceReturnIndex);
    setPracticeReturnIndex(null);
    window.scrollTo(0, 0);
  }

  const onQuizScreen = screen.kind === "quiz";
  const quizAnswered = onQuizScreen && quizAnswers[screen.question.id] !== undefined;
  const onInteractiveScreen = screen.kind === "interactive";
  const interactiveDone = onInteractiveScreen && completedBlockIds.has(screen.block.id);
  const nextDisabled =
    (onQuizScreen && !quizAnswered) ||
    (onInteractiveScreen && !interactiveDone) ||
    (screen.kind === "complete" && !isComplete);

  const pct = Math.min(100, Math.round((current / (screens.length - 1)) * 100));
  const chapters = TOPIC_CHAPTERS[topic.number] ?? [];
  const chapter = onInteractiveScreen ? chapterFor(screen.block.id, topic.number) : null;

  // Reaching the final screen already implies every required block and the
  // quiz are done (each step along the way gates Continue on that) — so
  // for an interactive-lesson topic, "not complete yet" here can only mean
  // time. Show the practice hub instead of a plain wait message.
  const showPracticeHub = practiceIds.length > 0 && screen.kind === "complete" && !isComplete;

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
            {chapter
              ? `Chapter ${chapter.index + 1} of ${chapters.length} — ${chapter.title}`
              : current < screens.length - 1
                ? `Screen ${current + 1} of ${screens.length - 1}`
                : "Complete"}
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.stage}>
          {practiceReturnIndex !== null && screen.kind === "interactive" && (
            <button
              type="button"
              onClick={returnFromPractice}
              style={{
                background: "none",
                border: "none",
                color: "var(--navy-soft, #48597d)",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                padding: 0,
                marginBottom: 14,
              }}
            >
              ← Back to practice
            </button>
          )}

          {screen.kind === "content" && <ContentBlockView block={screen.block} />}

          {screen.kind === "interactive" && (
            <div className={`${courseStyles.root} ${courseStyles.card}`}>
              {screen.block.kind === "decision" && (
                <DecisionChallenge key={screen.block.id} {...screen.block.props} onComplete={() => handleBlockComplete(screen.block.id)} />
              )}
              {screen.block.kind === "compare" && (
                <CompareScenes key={screen.block.id} {...screen.block.props} onComplete={() => handleBlockComplete(screen.block.id)} />
              )}
              {screen.block.kind === "sequence" && (
                <DecisionSequence key={screen.block.id} {...screen.block.props} onComplete={() => handleBlockComplete(screen.block.id)} />
              )}
              {screen.block.kind === "hotspot" && (
                <HotspotScene key={screen.block.id} {...screen.block.props} onComplete={() => handleBlockComplete(screen.block.id)} />
              )}
              {screen.block.kind === "staged" && (
                <StagedScenario key={screen.block.id} {...screen.block.props} onComplete={() => handleBlockComplete(screen.block.id)} />
              )}
              {screen.block.kind === "recap" && (
                <RecapAccordion key={screen.block.id} {...screen.block.props} onComplete={() => handleBlockComplete(screen.block.id)} />
              )}
              {screen.block.kind === "learn" && (
                <LessonScreen key={screen.block.id} {...screen.block.props} onComplete={() => handleBlockComplete(screen.block.id)} />
              )}
              {screen.block.kind === "video" && (
                <VideoLesson key={screen.block.id} {...screen.block.props} onComplete={() => handleBlockComplete(screen.block.id)} />
              )}
              {screen.block.kind === "riskstack" && (
                <RiskStack key={screen.block.id} {...screen.block.props} onComplete={() => handleBlockComplete(screen.block.id)} />
              )}
            </div>
          )}

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

          {screen.kind === "complete" && !showPracticeHub && (
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

          {screen.kind === "complete" && showPracticeHub && (
            <div className={`${courseStyles.root} ${courseStyles.card}`}>
              <p className={courseStyles.eyebrow}>Keep Practicing — You're Almost There</p>
              <p className={courseStyles.prompt} style={{ fontWeight: 500 }}>
                You've completed the core activities for this topic. Use the practice challenges below
                to reinforce what you've learned while completing the required instructional
                time — {minutesLogged} of {topic.minMinutes} minutes logged so far.
              </p>
              <div className={courseStyles.practiceGrid}>
                {practiceIds.map((blockId) => {
                  const block = interactiveBlocks.find((b) => b.id === blockId);
                  if (!block) return null;
                  return (
                    <button
                      key={blockId}
                      type="button"
                      className={courseStyles.practiceCard}
                      onClick={() => startPractice(blockId)}
                    >
                      <p className={courseStyles.practiceCardTitle}>{practiceTitle(block)}</p>
                      <p className={courseStyles.practiceCardHint}>Tap to revisit this activity</p>
                    </button>
                  );
                })}
              </div>
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
            disabled={current === 0 && practiceReturnIndex === null}
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
            {practiceReturnIndex !== null
              ? "Back to practice"
              : screen.kind === "complete"
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
