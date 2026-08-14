"use client";

import { useRef, useState } from "react";
import styles from "./course.module.css";

export type RecapSection = {
  title: string;
  points: string[];
};

export type RecapAccordionProps = {
  eyebrow?: string;
  prompt?: string;
  sections: RecapSection[];
  onComplete?: () => void;
};

// Expandable recap sections instead of one long summary page. Completion
// fires once every section has been opened at least once — a light-touch
// interaction (this is a review, not a new decision), which is why it's
// treated as optional/reinforcement rather than a required block.
export default function RecapAccordion({ eyebrow, prompt, sections, onComplete }: RecapAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [opened, setOpened] = useState<Set<number>>(new Set([0]));
  const firedRef = useRef(false);

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i));
    if (!opened.has(i)) {
      const next = new Set(opened);
      next.add(i);
      setOpened(next);
      if (next.size === sections.length && !firedRef.current) {
        firedRef.current = true;
        onComplete?.();
      }
    }
  }

  return (
    <div className={styles.root}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      {prompt && <p className={styles.prompt}>{prompt}</p>}
      {sections.map((section, i) => {
        const isOpen = openIndex === i;
        return (
          <div className={styles.accordionItem} key={section.title}>
            <button
              type="button"
              className={`${styles.accordionHeader} ${isOpen ? styles.accordionHeaderOpen : ""}`}
              aria-expanded={isOpen}
              onClick={() => toggle(i)}
            >
              {section.title}
              <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <div className={styles.accordionBody}>
                <ul>
                  {section.points.map((p, j) => (
                    <li key={j}>{p}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
