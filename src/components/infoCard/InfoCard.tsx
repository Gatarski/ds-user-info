import styles from "./InfoCard.module.scss";

interface InfoCardProps {
  headerText: string;
  contentText: string;
}

export const InfoCard = ({ headerText, contentText }: InfoCardProps) => {
  return (
    <div className={styles["no-data"]}>
      <h1>{headerText}</h1>
      <p>{contentText}</p>
    </div>
  );
};
