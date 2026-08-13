"use client";

import { useState } from "react";
import { VISUALS } from "@/lib/visuals-map";
import styles from "./stepper.module.css";

export type ContentBlockData = {
  id: string;
  contentType: "text" | "video" | "image" | "bullets" | "stat" | "custom_visual" | "check";
  tag: string | null;
  route: boolean;
  heading: string | null;
  body: string | null;
  meta: Record<string, unknown> | null;
};

function VideoEmbed({ url }: { url: string }) {
  const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
  if (isYouTube) {
    const videoId = url.includes("youtu.be")
      ? url.split("/").pop()?.split("?")[0]
      : new URL(url).searchParams.get("v");
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        style={{ width: "100%", aspectRatio: "16/9", border: 0 }}
        allowFullScreen
      />
    );
  }
  return (
    <video controls preload="metadata">
      <source src={url} />
    </video>
  );
}

function CheckBlock({ question, answer }: { question: string; answer: string }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className={styles.checkCard}>
      <p>{question}</p>
      {!revealed ? (
        <div className={styles.btnRow}>
          <button type="button" className={styles.btn} onClick={() => setRevealed(true)}>
            Reveal answer
          </button>
        </div>
      ) : (
        <div className={styles.feedback}>{answer}</div>
      )}
    </div>
  );
}

export default function ContentBlockView({ block }: { block: ContentBlockData }) {
  const meta = block.meta ?? {};

  return (
    <div>
      {block.tag && (
        <div className={`${styles.tag} ${block.route ? styles.tagRoute : ""}`}>
          <span className={styles.dot} />
          {block.tag}
        </div>
      )}

      {block.contentType === "text" && (
        <>
          {block.heading && <h2 className={styles.heading}>{block.heading}</h2>}
          {(block.body ?? "").split("\n\n").map((para, i) => (
            <p className={styles.lead} key={i}>
              {para}
            </p>
          ))}
        </>
      )}

      {block.contentType === "bullets" && (
        <>
          {block.heading && <h2 className={styles.heading}>{block.heading}</h2>}
          <ul className={styles.bites}>
            {((meta.bullets as string[]) ?? []).map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </>
      )}

      {block.contentType === "stat" && (
        <>
          {block.heading && <h2 className={styles.heading}>{block.heading}</h2>}
          <div className={styles.statHero}>
            <div className={styles.statNum}>{(meta.number as string) ?? ""}</div>
            {block.body && <div className={styles.statCap}>{block.body}</div>}
          </div>
        </>
      )}

      {block.contentType === "custom_visual" && (
        <>
          {block.heading && <h2 className={styles.heading}>{block.heading}</h2>}
          {meta.visualKey && VISUALS[meta.visualKey as string] && (
            <div
              className={`${styles.mediaFrame} ${styles.mediaFrameLight}`}
              dangerouslySetInnerHTML={{ __html: VISUALS[meta.visualKey as string] }}
            />
          )}
          {meta.caption && <p className={styles.caption}>{meta.caption as string}</p>}
        </>
      )}

      {block.contentType === "video" && (
        <>
          {block.heading && <h2 className={styles.heading}>{block.heading}</h2>}
          {meta.videoKey && (
            <div className={styles.mediaFrame}>
              <VideoEmbed url={`/videos/${meta.videoKey}`} />
            </div>
          )}
          {meta.caption && <p className={styles.caption}>{meta.caption as string}</p>}
        </>
      )}

      {block.contentType === "check" && (
        <CheckBlock question={block.body ?? ""} answer={(meta.answer as string) ?? ""} />
      )}

      {block.contentType === "image" && block.body && (
        <div className={styles.mediaFrame}>
          <img src={block.body} alt="" />
        </div>
      )}
    </div>
  );
}
