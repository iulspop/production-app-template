import * as typeStyles from "../styles/typography.css";
import * as styles from "./type-specimen.css";

const specimens = [
  {
    className: typeStyles.display,
    label: "Display",
    text: "The quick brown fox",
  },
  {
    className: typeStyles.displaySm,
    label: "Display Sm",
    text: "The quick brown fox",
  },
  {
    className: typeStyles.subhead,
    label: "Subhead",
    text: "The quick brown fox jumps over",
  },
  {
    className: typeStyles.body,
    label: "Body",
    text: "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.",
  },
  {
    className: typeStyles.meta,
    label: "Meta",
    text: "Jan 15, 2026 · 45 min · 3 insights",
  },
  { className: typeStyles.accent, label: "Accent", text: "Featured Session" },
] as const;

export const TypeSpecimenComponent = () => (
  <div className={styles.wrapper}>
    {specimens.map(({ className, label, text }) => (
      <div key={label}>
        <span className={styles.label}>{label}</span>
        <p className={className}>{text}</p>
        <hr className={styles.divider} />
      </div>
    ))}
  </div>
);
