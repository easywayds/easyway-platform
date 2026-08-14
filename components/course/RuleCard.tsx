import styles from "./course.module.css";

export type RuleCardProps = {
  title: string;
  lines: string[];
};

// A compact, high-contrast summary card for a rule worth remembering
// verbatim (e.g. "never enter a crossing you can't clear"). Presentational
// only — used inside other blocks, not a standalone stepper screen.
export default function RuleCard({ title, lines }: RuleCardProps) {
  return (
    <div className={styles.root}>
      <div className={styles.ruleCard}>
        <p className={styles.ruleCardTitle}>{title}</p>
        {lines.map((line, i) => (
          <p className={styles.ruleCardBody} key={i}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
