"use client";

import { useState } from "react";
import styles from "./course.module.css";

export type DecisionChoice = {
  text: string;
  correct: boolean;
  feedback: string;
};

export type DecisionChallengeProps = {
  eyebrow?: string;
  prompt: string;
  visual?: string; // inline SVG markup
  choices: DecisionChoice[];
  onComplete?: () => void;
};

// A scenario, a question, a set of choices, immediate per-choice feedback.
// Completion (onComplete) fires the moment the student makes any choice —
// this is a formative decision exercise, not a graded question, so an
// incorrect pick still counts as genuine engagement, matching the brief's
// "do not punish an incorrect answer" instruction.
export default function DecisionChallenge({
  eyebrow,
  prompt,
  visual,
  choices,
  onComplete,
}: DecisionChallengeProps) {
  const [pickedIndex, setPickedIndex] = useState<number | null>(null);

  function pick(index: number) {
    if (pickedIndex !== null) return;
    setPickedIndex(index);
    onComplete?.();
  }

  const picked = pickedIndex !== null ? choices[pickedIndex] : null;

  return (
    <div className={styles.root}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      {visual && (
        <div
          className={styles.sceneFrame}
          role="img"
          aria-label="Road scenario diagram"
          dangerouslySetInnerHTML={{ __html: visual }}
        />
      )}
      <p className={styles.prompt}>{prompt}</p>
      <div className={styles.choices} role="group" aria-label="Choose your answer">
        {choices.map((choice, i) => {
          let cls = styles.choiceBtn;
          if (pickedIndex !== null) {
            if (i === pickedIndex) {
              cls += " " + (choice.correct ? styles.choiceCorrect : styles.choiceIncorrect);
            } else {
              cls += " " + styles.choiceMuted;
            }
          }
          return (
            <button
              key={i}
              type="button"
              className={cls}
              disabled={pickedIndex !== null}
              onClick={() => pick(i)}
            >
              {choice.text}
            </button>
          );
        })}
      </div>
      {picked && (
        <div
          className={`${styles.feedback} ${picked.correct ? styles.feedbackCorrect : styles.feedbackIncorrect}`}
          role="status"
        >
          <span className={styles.feedbackLabel}>
            {picked.correct ? "That's the safer legal choice" : "Not quite — here's the rule"}
          </span>
          {picked.feedback}
        </div>
      )}
    </div>
  );
}
