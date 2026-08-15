"use client";

import { useEffect } from "react";
import styles from "./course.module.css";
import RuleCard, { type RuleCardProps } from "./RuleCard";

export type LessonSection = {
  heading: string;
  body: string[];
};

export type LessonScreenProps = {
  eyebrow?: string;
  title: string;
  previewPoints: string[];
  sections: LessonSection[];
  visual?: string;
  instructorTip?: string;
  commonMistakes?: string[];
  ruleCard?: RuleCardProps;
  onComplete?: () => void;
};

// The instructional layer that now precedes every chapter's application
// activities: PREVIEW ("what you'll learn"), then LEARN (the rule, why it
// matters, what to look for, common mistakes). Reading is the interaction
// here — there's no decision to make — so completion fires once on mount
// rather than requiring an extra click, matching "do not solve this with
// more clicking."
export default function LessonScreen({
  eyebrow,
  title,
  previewPoints,
  sections,
  visual,
  instructorTip,
  commonMistakes,
  ruleCard,
  onComplete,
}: LessonScreenProps) {
  useEffect(() => {
    onComplete?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.root}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <p className={styles.lessonTitle}>{title}</p>

      {previewPoints.length > 0 && (
        <div className={styles.previewBox}>
          <p className={styles.previewLabel}>What You'll Learn</p>
          <ul className={styles.previewList}>
            {previewPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      {visual && (
        <div
          className={styles.sceneFrame}
          role="img"
          aria-label="Road scenario diagram"
          dangerouslySetInnerHTML={{ __html: visual }}
        />
      )}

      {sections.map((section) => (
        <div className={styles.learnSection} key={section.heading}>
          <p className={styles.learnSectionHeading}>{section.heading}</p>
          {section.body.map((para, i) => (
            <p className={styles.learnSectionBody} key={i}>
              {para}
            </p>
          ))}
        </div>
      ))}

      {instructorTip && (
        <div className={styles.tipBox}>
          <p className={styles.tipLabel}>Easy Way Instructor Tip</p>
          <p className={styles.tipBody}>{instructorTip}</p>
        </div>
      )}

      {commonMistakes && commonMistakes.length > 0 && (
        <div className={styles.mistakeBox}>
          <p className={styles.mistakeLabel}>Common Mistakes to Avoid</p>
          <ul>
            {commonMistakes.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      )}

      {ruleCard && <RuleCard {...ruleCard} />}
    </div>
  );
}
