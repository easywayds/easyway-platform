"use client";

import { useState } from "react";
import { VISUALS } from "@/lib/visuals-map";

type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  visualKey: string | null;
};

export default function TopicQuiz({ questions }: { questions: QuizQuestion[] }) {
  const [selected, setSelected] = useState<Record<string, number>>({});

  if (questions.length === 0) return null;

  return (
    <div className="quiz-section">
      <h2>Quick check — {questions.length} question{questions.length === 1 ? "" : "s"}</h2>
      <p style={{ color: "#777", fontSize: "0.85rem", marginTop: -8, marginBottom: 16 }}>
        Ungraded — just for you. The real assessment is in Topic 9.
      </p>
      {questions.map((q, idx) => {
        const picked = selected[q.id];
        const visual = q.visualKey ? VISUALS[q.visualKey] : null;
        return (
          <div key={q.id} className="quiz-question">
            <p>{idx + 1}. {q.question}</p>
            {visual && (
              <div
                className="content-visual"
                style={{ marginBottom: 10 }}
                dangerouslySetInnerHTML={{ __html: visual }}
              />
            )}
            <div>
              {q.options.map((opt, i) => {
                let cls = "quiz-option";
                if (picked !== undefined) {
                  if (i === q.correctIndex) cls += " quiz-option-correct";
                  else if (i === picked) cls += " quiz-option-incorrect";
                }
                return (
                  <button
                    key={i}
                    type="button"
                    className={cls}
                    disabled={picked !== undefined}
                    onClick={() => setSelected((prev) => ({ ...prev, [q.id]: i }))}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
