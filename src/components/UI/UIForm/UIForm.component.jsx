import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  AlertTitle,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { clearAlert } from "@/features/Common";

const UIForm = (props) => {
  const { params } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alertState = useSelector((state) => state.alert);

  const [dialogTitle, setDialogTitle] = useState(null);
  const [dialogContent, setDialogContent] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const handleSuccessDialog = (msg) => {
    setDialogTitle(msg?.title);
    setDialogContent(msg?.description);
    setOpen(true);
  };

  const handleErrorAlert = (msg) => {
    setError(true);
    setTimeout(() => {
      handleErrorClose();
    }, 10000);
  };

  const handleErrorClose = () => {
    setError(false);
    dispatch(clearAlert());
  };

  const handleClose = () => {
    dispatch(clearAlert());
    setOpen(false);
    if (params?.mode === "edit") {
      navigate(-1);
    }
  };

  const paramForm = React.Children.map(props.children, (child) => {
    return React.cloneElement(child, {
      handleSuccessDialog: handleSuccessDialog,
      handleErrorAlert: handleErrorAlert,
    });
  });

  return (
    <div>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={handleErrorClose}>
          <AlertTitle>Error adding {params?.name?.single}</AlertTitle>
          {alertState?.severity === "error" && (
            <span>
              <span>{alertState?.title} </span>
              <br />
              {alertState?.description}
            </span>
          )}
        </Alert>
      )}

      {paramForm}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <CheckCircleIcon
            color="success"
            sx={{
              position: "relative",
              top: "0.25rem",
              mr: 1,
              display: { xs: "block", sm: "inline-block" },
              margin: { xs: "0 0 1rem 0", sm: "0 0.6rem 0 0" },
            }}
          />
          {dialogTitle}
        </DialogTitle>

        {dialogContent && (
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {typeof dialogContent === "string" && dialogContent}
            </DialogContentText>
          </DialogContent>
        )}

        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UIForm;
