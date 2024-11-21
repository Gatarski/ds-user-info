import { ReactElement } from "react";
import styles from "./Card.module.scss";

interface CardProps {
  children: ReactElement;
}

export const Card = ({ children }: CardProps) => {
  return <div className={styles.card}>{children}</div>;
};
