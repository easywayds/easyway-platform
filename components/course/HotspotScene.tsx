"use client";

import { useState } from "react";
import styles from "./course.module.css";

export type Hotspot = {
  id: string;
  label: string;
  x: number; // percent, 0-100
  y: number; // percent, 0-100
  explanation: string;
  isTarget?: boolean; // "pick-one" mode: marks the correct hotspot
};

export type HotspotSceneProps = {
  eyebrow?: string;
  prompt: string;
  visual: string;
  hotspots: Hotspot[];
  mode: "identify-all" | "pick-one";
  wrongPickFeedback?: string;
  onComplete?: () => void;
};

// Tap-to-scan interaction over a road scene. "identify-all" trains
// scanning habits (find every relevant hazard before continuing);
// "pick-one" is a single-answer decision rendered as hotspots on the
// image instead of a text choice list (used for the mistake-spotter).
export default function HotspotScene({
  eyebrow,
  prompt,
  visual,
  hotspots,
  mode,
  wrongPickFeedback,
  onComplete,
}: HotspotSceneProps) {
  const [found, setFound] = useState<Set<string>>(new Set());
  const [wrongPick, setWrongPick] = useState<string | null>(null);
  const [resolved, setResolved] = useState(false);

  function tap(spot: Hotspot) {
    if (mode === "identify-all") {
      if (found.has(spot.id)) return;
      const next = new Set(found);
      next.add(spot.id);
      setFound(next);
      if (next.size === hotspots.length) {
        onComplete?.();
      }
      return;
    }

    // pick-one
    if (resolved) return;
    if (spot.isTarget) {
      setFound(new Set([spot.id]));
      setResolved(true);
      onComplete?.();
    } else {
      setWrongPick(spot.id);
    }
  }

  const target = hotspots.find((h) => h.isTarget);

  return (
    <div className={styles.root}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <p className={styles.prompt}>{prompt}</p>

      <div className={styles.hotspotWrap}>
        <div className={styles.sceneFrame} role="img" aria-label="Road scenario diagram" dangerouslySetInnerHTML={{ __html: visual }} />
        {hotspots.map((spot) => {
          const isFound = found.has(spot.id);
          const isWrong = mode === "pick-one" && wrongPick === spot.id && !isFound;
          let cls = styles.hotspotMarker;
          if (isFound) cls += " " + styles.hotspotMarkerFound;
          else if (isWrong) cls += " " + styles.hotspotMarkerWrong;
          return (
            <button
              key={spot.id}
              type="button"
              className={cls}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              aria-label={spot.label}
              onClick={() => tap(spot)}
            >
              {isFound ? "✓" : "?"}
            </button>
          );
        })}
      </div>

      {mode === "identify-all" && (
        <>
          <div className={styles.hotspotList}>
            {hotspots
              .filter((s) => found.has(s.id))
              .map((s) => (
                <div className={styles.hotspotNote} key={s.id}>
                  <strong>{s.label}:</strong> {s.explanation}
                </div>
              ))}
          </div>
          {found.size < hotspots.length && (
            <p className={styles.hotspotHint}>
              Tap all {hotspots.length} hotspots to continue ({found.size} of {hotspots.length} found).
            </p>
          )}
        </>
      )}

      {mode === "pick-one" && (
        <>
          {wrongPick && !resolved && (
            <div className={`${styles.feedback} ${styles.feedbackIncorrect}`} role="status">
              <span className={styles.feedbackLabel}>Not quite</span>
              {wrongPickFeedback ?? "That's not the vehicle about to make the dangerous decision — look again."}
            </div>
          )}
          {resolved && target && (
            <div className={`${styles.feedback} ${styles.feedbackCorrect}`} role="status">
              <span className={styles.feedbackLabel}>That's the one</span>
              {target.explanation}
            </div>
          )}
        </>
      )}
    </div>
  );
}
