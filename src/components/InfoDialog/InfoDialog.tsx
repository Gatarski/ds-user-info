import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Divider,
} from "@mui/material";
import styles from "./InfoDialog.module.scss";
import { useTranslation } from "react-i18next";
import { memo } from "react";

interface InfoDialogProps {
  isOpen: boolean;
  hideDialog: () => void;
  headerText: string;
  contentText: string;
}

const InfoDialog = ({
  isOpen,
  hideDialog,
  headerText,
  contentText,
}: InfoDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onClose={hideDialog}>
      <DialogTitle className={styles["info-dialog__header"]}>
        {headerText}
      </DialogTitle>
      <Divider />
      <DialogContent>
        <p>{contentText}</p>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          className={styles["info-dialog__button"]}
          onClick={hideDialog}
          color="primary"
          variant="contained"
        >
          {t("buttons.close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const MemoizedInfoDialog = memo(InfoDialog);
