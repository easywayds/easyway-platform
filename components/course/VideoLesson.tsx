"use client";

import { useState } from "react";
import styles from "./course.module.css";

export type VideoLessonProps = {
  eyebrow?: string;
  title: string;
  description?: string[];
  youtubeId: string;
  durationLabel?: string;
  sourceLabel?: string;
  onComplete?: () => void;
};

// For officially-required material (the Community Safety Education Act
// video) rather than Easy Way's own scenario content — embeds the real
// video instead of summarizing it. Completion requires an explicit
// acknowledgment click, the same rigor every other block already uses;
// this project doesn't attempt frame-accurate watch-time tracking via the
// YouTube IFrame API, so seat-time (already server-authoritative) plus
// this deliberate confirmation is the completion signal, not a playback
// percentage.
export default function VideoLesson({
  eyebrow,
  title,
  description,
  youtubeId,
  durationLabel,
  sourceLabel,
  onComplete,
}: VideoLessonProps) {
  const [acknowledged, setAcknowledged] = useState(false);

  function handleAcknowledge() {
    if (acknowledged) return;
    setAcknowledged(true);
    onComplete?.();
  }

  return (
    <div className={styles.root}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <p className={styles.lessonTitle}>{title}</p>
      {durationLabel && <p className={styles.previewLabel}>{durationLabel}</p>}
      {description?.map((para, i) => (
        <p className={styles.learnSectionBody} key={i}>
          {para}
        </p>
      ))}
      <div className={styles.sceneFrame} style={{ marginTop: 12 }}>
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}`}
          style={{ width: "100%", aspectRatio: "16/9", border: 0, display: "block" }}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {sourceLabel && (
        <p style={{ marginTop: 8, fontSize: 12.5, color: "var(--navy-soft, #48597d)" }}>{sourceLabel}</p>
      )}

      <button
        type="button"
        className={styles.continueInternal}
        style={{ marginTop: 18 }}
        disabled={acknowledged}
        onClick={handleAcknowledge}
      >
        {acknowledged ? "Watched ✓" : "I've watched the required video"}
      </button>
    </div>
  );
}
