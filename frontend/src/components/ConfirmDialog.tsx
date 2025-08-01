import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { grey } from "@mui/material/colors";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
  confirmText: string;
  cancelText: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  message,
  loading = false,
  onClose,
  onConfirm,
  confirmText,
  cancelText,
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="confirm-dialog-title"
    aria-describedby="confirm-dialog-description"
    sx={{
      "& .MuiDialog-paper": {
        backgroundColor: grey[50],
        borderRadius: "16px",
      },
    }}
  >
    <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="confirm-dialog-description">
        {message}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} disabled={loading}>
        {cancelText}
      </Button>
      <Button
        sx={{
          backgroundColor: grey[800],
          borderRadius: "16px",
          py: 1.5,
          "&:hover": { backgroundColor: grey[900] },
        }}
        onClick={onConfirm}
        variant="contained"
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : confirmText}
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDialog;
