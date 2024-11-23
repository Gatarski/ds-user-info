import { Box, Card } from "@mui/material";
import styles from "./TextContent.module.scss";

interface TextContentProps {
  label: string;
  content: string;
  height?: string | "auto";
}

export const TextContent = ({ label, content, height }: TextContentProps) => {
  return (
    <div className={styles["text-content"]}>
      <Box className={styles["text-content__label"]}>{label}</Box>
      <Card
        variant="outlined"
        className={styles["text-content__card"]}
        sx={{ height }}
      >
        {content}
      </Card>
    </div>
  );
};
