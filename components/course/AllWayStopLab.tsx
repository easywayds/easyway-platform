"use client";

import { useState } from "react";
import styles from "./course.module.css";
import type { DecisionChoice } from "./DecisionChallenge";

export type StopLabRound = {
  eyebrow: string;
  prompt: string;
  visual?: string;
  choices: DecisionChoice[];
};

export type AllWayStopLabProps = {
  rounds: StopLabRound[];
  ruleCardTitle: string;
  ruleCardLines: string[];
  onComplete?: () => void;
};

// A short sequence of related decisions (arrival order → simultaneous
// arrival → left-turn priority) that builds to one rule summary. Each
// round requires a pick before "Continue" advances to the next — this is
// an internal continue, separate from the stepper's own Back/Continue
// footer, which only unlocks once the whole sequence (including the rule
// card) is reached.
export default function AllWayStopLab({
  rounds,
  ruleCardTitle,
  ruleCardLines,
  onComplete,
}: AllWayStopLabProps) {
  const [roundIndex, setRoundIndex] = useState(0);
  const [pickedIndex, setPickedIndex] = useState<number | null>(null);
  const isRuleCard = roundIndex === rounds.length;

  function pick(i: number) {
    if (pickedIndex !== null) return;
    setPickedIndex(i);
  }

  function advance() {
    const next = roundIndex + 1;
    setRoundIndex(next);
    setPickedIndex(null);
    if (next === rounds.length) {
      onComplete?.();
    }
  }

  if (isRuleCard) {
    return (
      <div className={styles.root}>
        <div className={styles.roundIndicator}>
          {rounds.map((_, i) => (
            <span key={i} className={`${styles.roundDot} ${styles.roundDotDone}`} />
          ))}
        </div>
        <div className={styles.ruleCard}>
          <p className={styles.ruleCardTitle}>{ruleCardTitle}</p>
          {ruleCardLines.map((line, i) => (
            <p className={styles.ruleCardBody} key={i}>
              {line}
            </p>
          ))}
        </div>
      </div>
    );
  }

  const round = rounds[roundIndex];
  const picked = pickedIndex !== null ? round.choices[pickedIndex] : null;

  return (
    <div className={styles.root}>
      <div className={styles.roundIndicator} aria-hidden="true">
        {rounds.map((_, i) => (
          <span
            key={i}
            className={`${styles.roundDot} ${
              i < roundIndex ? styles.roundDotDone : i === roundIndex ? styles.roundDotActive : ""
            }`}
          />
        ))}
      </div>
      <p className={styles.eyebrow}>{round.eyebrow}</p>
      {round.visual && (
        <div
          className={styles.sceneFrame}
          role="img"
          aria-label="Road scenario diagram"
          dangerouslySetInnerHTML={{ __html: round.visual }}
        />
      )}
      <p className={styles.prompt}>{round.prompt}</p>
      <div className={styles.choices} role="group" aria-label="Choose your answer">
        {round.choices.map((choice, i) => {
          let cls = styles.choiceBtn;
          if (pickedIndex !== null) {
            cls += " " + (i === pickedIndex ? (choice.correct ? styles.choiceCorrect : styles.choiceIncorrect) : styles.choiceMuted);
          }
          return (
            <button key={i} type="button" className={cls} disabled={pickedIndex !== null} onClick={() => pick(i)}>
              {choice.text}
            </button>
          );
        })}
      </div>
      {picked && (
        <>
          <div
            className={`${styles.feedback} ${picked.correct ? styles.feedbackCorrect : styles.feedbackIncorrect}`}
            role="status"
          >
            <span className={styles.feedbackLabel}>
              {picked.correct ? "That's the safer legal choice" : "Not quite — here's the rule"}
            </span>
            {picked.feedback}
          </div>
          <button type="button" className={styles.continueInternal} onClick={advance}>
            {roundIndex === rounds.length - 1 ? "See the rule" : "Next round"}
          </button>
        </>
      )}
    </div>
  );
}
