"use client";

import { useRef, useState } from "react";
import styles from "./course.module.css";

export type SceneTab = {
  label: string;
  visual?: string; // inline SVG markup
  caption: string;
};

export type CompareScenesProps = {
  eyebrow?: string;
  prompt: string;
  tabs: SceneTab[];
  onComplete?: () => void;
};

// A tap/tab comparison across a small set of related scenes. The
// meaningful interaction here is actually looking at every scene, not just
// picking one — completion fires once every tab has been opened at least
// once, whichever order the student explores them in.
export default function CompareScenes({ eyebrow, prompt, tabs, onComplete }: CompareScenesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visited, setVisited] = useState<Set<number>>(new Set([0]));
  const firedRef = useRef(false);

  function selectTab(index: number) {
    setActiveIndex(index);
    if (visited.has(index)) return;

    const next = new Set(visited);
    next.add(index);
    setVisited(next);

    // Fire after the state update is scheduled, not from inside the updater
    // itself — calling a parent's setState synchronously during another
    // component's render/update phase trips React's setState-during-render
    // warning.
    if (next.size === tabs.length && !firedRef.current) {
      firedRef.current = true;
      onComplete?.();
    }
  }

  const active = tabs[activeIndex];

  return (
    <div className={styles.root}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <p className={styles.prompt}>{prompt}</p>

      <div className={styles.tabRow} role="tablist" aria-label={prompt}>
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            className={`${styles.tabBtn} ${i === activeIndex ? styles.tabBtnActive : ""} ${
              visited.has(i) ? styles.tabBtnVisited : ""
            }`}
            onClick={() => selectTab(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {active.visual && (
        <div
          className={styles.sceneFrame}
          role="img"
          aria-label={`${active.label} diagram`}
          dangerouslySetInnerHTML={{ __html: active.visual }}
        />
      )}
      <div className={styles.feedback} style={{ background: "var(--bg)", color: "var(--navy)" }}>
        {active.caption}
      </div>
      {visited.size < tabs.length && (
        <p style={{ fontSize: 12.5, color: "var(--navy-soft)", marginTop: 10 }}>
          Tap through all {tabs.length} to continue.
        </p>
      )}
    </div>
  );
}
