"use client";

import { useState } from "react";
import styles from "./course.module.css";
import type { DecisionChoice } from "./DecisionChallenge";

export type Stage =
  | { kind: "info"; label: string; visual?: string; text: string }
  | { kind: "decision"; label: string; visual?: string; prompt: string; choices: DecisionChoice[] };

export type StagedScenarioProps = {
  eyebrow?: string;
  stages: Stage[];
  completionTitle: string;
  completionLines: string[];
  onComplete?: () => void;
};

// A longer scenario broken into named stages — some pure narration
// ("Approach", "Enter"), some decisions ("Is there a safe gap?"). Used for
// multi-step activities (roundabout entry, the SAFE framework) where a
// single question undersells how many real decisions are involved.
export default function StagedScenario({
  eyebrow,
  stages,
  completionTitle,
  completionLines,
  onComplete,
}: StagedScenarioProps) {
  const [stageIndex, setStageIndex] = useState(0);
  const [pickedIndex, setPickedIndex] = useState<number | null>(null);
  const isDone = stageIndex === stages.length;

  function pick(i: number) {
    if (pickedIndex !== null) return;
    setPickedIndex(i);
  }

  function advance() {
    const next = stageIndex + 1;
    setStageIndex(next);
    setPickedIndex(null);
    if (next === stages.length) {
      onComplete?.();
    }
  }

  if (isDone) {
    return (
      <div className={styles.root}>
        <div className={styles.roundIndicator} aria-hidden="true">
          {stages.map((_, i) => (
            <span key={i} className={`${styles.roundDot} ${styles.roundDotDone}`} />
          ))}
        </div>
        <div className={styles.ruleCard}>
          <p className={styles.ruleCardTitle}>{completionTitle}</p>
          {completionLines.map((line, i) => (
            <p className={styles.ruleCardBody} key={i}>
              {line}
            </p>
          ))}
        </div>
      </div>
    );
  }

  const stage = stages[stageIndex];
  const picked = stage.kind === "decision" && pickedIndex !== null ? stage.choices[pickedIndex] : null;
  const isLastStage = stageIndex === stages.length - 1;

  return (
    <div className={styles.root}>
      <div className={styles.roundIndicator} aria-hidden="true">
        {stages.map((_, i) => (
          <span
            key={i}
            className={`${styles.roundDot} ${
              i < stageIndex ? styles.roundDotDone : i === stageIndex ? styles.roundDotActive : ""
            }`}
          />
        ))}
      </div>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <p className={styles.stageLabel}>{stage.label}</p>

      {stage.visual && (
        <div
          className={styles.sceneFrame}
          role="img"
          aria-label="Road scenario diagram"
          dangerouslySetInnerHTML={{ __html: stage.visual }}
        />
      )}

      {stage.kind === "info" && (
        <>
          <p className={styles.prompt}>{stage.text}</p>
          <button type="button" className={styles.continueInternal} onClick={advance}>
            {isLastStage ? "Finish" : "Continue"}
          </button>
        </>
      )}

      {stage.kind === "decision" && (
        <>
          <p className={styles.prompt}>{stage.prompt}</p>
          <div className={styles.choices} role="group" aria-label="Choose your answer">
            {stage.choices.map((choice, i) => {
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
                {isLastStage ? "Finish" : "Next"}
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
