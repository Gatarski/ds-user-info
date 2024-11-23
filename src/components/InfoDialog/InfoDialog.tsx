import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Divider,
} from "@mui/material";
import styles from "./InfoDialog.module.scss";

interface InfoDialogProps {
  isOpen: boolean;
  hideDialog: () => void;
  headerText: string;
  contentText: string;
}

export const InfoDialog = ({
  isOpen,
  hideDialog,
  headerText,
  contentText,
}: InfoDialogProps) => {
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
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
