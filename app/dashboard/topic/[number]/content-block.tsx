"use client";

import { useState } from "react";
import { VISUALS } from "@/lib/visuals-map";

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
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, marginTop: 8 }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0, borderRadius: 8 }}
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <video controls style={{ width: "100%", borderRadius: 8, marginTop: 8 }}>
      <source src={url} />
    </video>
  );
}

function CheckBlock({ question, answer }: { question: string; answer: string }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="content-check">
      <p style={{ margin: 0, fontWeight: 600 }}>{question}</p>
      {!revealed ? (
        <button type="button" className="content-check-reveal" onClick={() => setRevealed(true)}>
          Reveal answer
        </button>
      ) : (
        <p className="content-check-answer">{answer}</p>
      )}
    </div>
  );
}

export default function ContentBlockView({ block }: { block: ContentBlockData }) {
  const meta = block.meta ?? {};

  return (
    <div className="content-block">
      {block.tag && (
        <span className={`content-tag${block.route ? " content-tag-route" : ""}`}>{block.tag}</span>
      )}
      {block.heading && block.contentType !== "check" && (
        <h3 className="content-heading">{block.heading}</h3>
      )}

      {block.contentType === "text" && (
        <div className="content-body">
          {(block.body ?? "").split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}

      {block.contentType === "bullets" && (
        <ul className="content-bullets">
          {((meta.bullets as string[]) ?? []).map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}

      {block.contentType === "stat" && (
        <>
          <div className="content-stat-number">{(meta.number as string) ?? ""}</div>
          {block.body && <p style={{ margin: 0 }}>{block.body}</p>}
        </>
      )}

      {block.contentType === "custom_visual" && (
        <>
          {meta.visualKey && VISUALS[meta.visualKey as string] && (
            <div
              className="content-visual"
              dangerouslySetInnerHTML={{ __html: VISUALS[meta.visualKey as string] }}
            />
          )}
          {meta.caption && <p className="content-caption">{meta.caption as string}</p>}
        </>
      )}

      {block.contentType === "video" && (
        <>
          {meta.videoKey && <VideoEmbed url={`/videos/${meta.videoKey}`} />}
          {meta.caption && <p className="content-caption">{meta.caption as string}</p>}
        </>
      )}

      {block.contentType === "check" && (
        <CheckBlock question={block.body ?? ""} answer={(meta.answer as string) ?? ""} />
      )}

      {block.contentType === "image" && block.body && (
        <img src={block.body} alt="" style={{ maxWidth: "100%", borderRadius: 8 }} />
      )}
    </div>
  );
}
