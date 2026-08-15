"use client";

import { useState } from "react";
import styles from "./course.module.css";
import type { DecisionChoice } from "./DecisionChallenge";

export type SequenceRound = {
  eyebrow: string;
  prompt: string;
  visual?: string;
  choices: DecisionChoice[];
};

export type DecisionSequenceProps = {
  rounds: SequenceRound[];
  ruleCardTitle?: string;
  ruleCardLines?: string[];
  onComplete?: () => void;
};

// A short sequence of related decisions that builds toward one idea (e.g.
// arrival order → simultaneous arrival → left-turn priority). Each round
// requires a pick before an internal "Continue" advances to the next —
// separate from the stepper's own Back/Continue footer, which only
// unlocks once the whole sequence (including an optional closing rule
// card) is reached. Generalizes what was originally a one-off
// "AllWayStopLab" component so the same pattern covers every multi-round
// block in Phase C.
export default function DecisionSequence({
  rounds,
  ruleCardTitle,
  ruleCardLines,
  onComplete,
}: DecisionSequenceProps) {
  const hasRuleCard = Boolean(ruleCardTitle && ruleCardLines?.length);
  const [roundIndex, setRoundIndex] = useState(0);
  const [pickedIndex, setPickedIndex] = useState<number | null>(null);
  const isRuleCard = hasRuleCard && roundIndex === rounds.length;

  function pick(i: number) {
    if (pickedIndex !== null) return;
    setPickedIndex(i);
  }

  function advance() {
    const next = roundIndex + 1;
    const reachedEnd = next === rounds.length;
    if (reachedEnd && !hasRuleCard) {
      // Nothing left to render — index rounds.length would be out of
      // bounds. Stay on the last round (still showing its feedback) and
      // let the stepper's own Continue button move to the next screen.
      onComplete?.();
      return;
    }
    setRoundIndex(next);
    setPickedIndex(null);
    if (reachedEnd && hasRuleCard) {
      onComplete?.();
    }
  }

  if (isRuleCard) {
    return (
      <div className={styles.root}>
        <div className={styles.roundIndicator} aria-hidden="true">
          {rounds.map((_, i) => (
            <span key={i} className={`${styles.roundDot} ${styles.roundDotDone}`} />
          ))}
        </div>
        <div className={styles.ruleCard}>
          <p className={styles.ruleCardTitle}>{ruleCardTitle}</p>
          {ruleCardLines!.map((line, i) => (
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
  const isLastRound = roundIndex === rounds.length - 1;

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
            {isLastRound ? (hasRuleCard ? "See the rule" : "Continue") : "Next"}
          </button>
        </>
      )}
    </div>
  );
}
