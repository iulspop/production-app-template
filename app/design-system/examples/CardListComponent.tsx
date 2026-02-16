import * as styles from "./card-list.css";

type CardItem = {
  id: string;
  meta: string;
  title: string;
};

type CardListComponentProps = {
  heading: string;
  items: CardItem[];
};

export const CardListComponent = ({
  heading,
  items,
}: CardListComponentProps) => (
  <div className={styles.page}>
    <h2 className={styles.heading}>{heading}</h2>
    <ul className={styles.list}>
      {items.map(({ id, meta, title }) => (
        <li className={styles.card} key={id}>
          <p className={styles.cardTitle}>{title}</p>
          <span className={styles.cardMeta}>{meta}</span>
        </li>
      ))}
    </ul>
  </div>
);
