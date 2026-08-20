"use client";

import { useRef, useState } from "react";
import styles from "./course.module.css";

export type RiskStackStep = {
  addFactor: string;
  note?: string;
};

export type RiskStackProps = {
  eyebrow?: string;
  prompt?: string;
  steps: RiskStackStep[];
  closingNote?: string;
  onComplete?: () => void;
};

// Topic 8's signature interactive — shows risk building as factors stack,
// using qualitative states (never a fake percentage) and text labels, not
// color alone, per the accessibility requirement. Reused for both the
// opening Risk Stack teaching block and the "Keep Practicing" risk-stack
// builder.
function stateFor(count: number): { label: string; tone: "low" | "mid" | "high" } {
  if (count <= 1) return { label: "Lower Exposure", tone: "low" };
  if (count <= 3) return { label: "Risk Increasing", tone: "mid" };
  return { label: "Multiple Risks Present", tone: "high" };
}

export default function RiskStack({ eyebrow, prompt, steps, closingNote, onComplete }: RiskStackProps) {
  const [index, setIndex] = useState(0);
  const factors = steps.slice(0, index + 1).map((s) => s.addFactor);
  const state = stateFor(factors.length);
  const isLast = index === steps.length - 1;
  const firedRef = useRef(false);

  function advance() {
    if (!isLast) {
      setIndex((i) => i + 1);
      return;
    }
    if (!firedRef.current) {
      firedRef.current = true;
      onComplete?.();
    }
  }

  const toneColor = state.tone === "low" ? "var(--correct)" : state.tone === "mid" ? "#8a6a00" : "#a3271e";
  const toneBg = state.tone === "low" ? "var(--correct-bg)" : state.tone === "mid" ? "#fff7e0" : "#fbeceb";

  return (
    <div className={styles.root}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      {prompt && <p className={styles.prompt}>{prompt}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
        {factors.map((f) => (
          <span
            key={f}
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              background: "var(--bg)",
              border: "1px solid var(--line)",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--navy)",
            }}
          >
            {f}
          </span>
        ))}
      </div>

      <div
        role="status"
        style={{
          padding: "10px 16px",
          borderRadius: 10,
          background: toneBg,
          color: toneColor,
          fontWeight: 700,
          fontSize: 13,
          marginBottom: 16,
          display: "inline-block",
        }}
      >
        {state.label}
      </div>

      {steps[index].note && (
        <p className={styles.learnSectionBody} style={{ marginTop: 0 }}>
          {steps[index].note}
        </p>
      )}

      {isLast && closingNote && (
        <p className={styles.learnSectionBody}>
          <strong>{closingNote}</strong>
        </p>
      )}

      <button type="button" className={styles.continueInternal} onClick={advance}>
        {isLast ? "I see how these risks stack" : `Add: + ${steps[index + 1]?.addFactor}`}
      </button>
    </div>
  );
}
