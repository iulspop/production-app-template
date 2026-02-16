import * as styles from "./session-card.css";

type SessionCardComponentProps = {
  date: string;
  duration: string;
  tags: Array<{ label: string; variant: "warm" | "cool" | "natural" }>;
  title: string;
};

const tagStyles = {
  cool: styles.tagCool,
  natural: styles.tagNatural,
  warm: styles.tagWarm,
} as const;

export const SessionCardComponent = ({
  date,
  duration,
  tags,
  title,
}: SessionCardComponentProps) => (
  <div className={styles.wrapper}>
    <article className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.meta}>
        {date} &middot; {duration}
      </p>
      <div className={styles.tagList}>
        {tags.map(({ label, variant }) => (
          <span className={tagStyles[variant]} key={label}>
            {label}
          </span>
        ))}
      </div>
      <div className={styles.footer}>
        <span>3 insights</span>
        <button className={styles.action} type="button">
          View details
        </button>
      </div>
    </article>
  </div>
);
