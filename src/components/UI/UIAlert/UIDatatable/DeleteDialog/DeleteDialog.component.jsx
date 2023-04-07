import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { If, Else, Then } from "react-if";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Stack,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";
import {
  HelpOutline,
  ErrorOutline,
  CheckCircleOutline,
} from "@mui/icons-material";
import { clearAlert } from "@/features/Common";

const DeleteDialog = (props) => {
  const {
    record,
    deleteDialogOpen,
    handleDeleteDialog,
    recordIdentifier,
    paramIdentifier,
  } = props;

  const dispatch = useDispatch();

  const alertState = useSelector((state) => state.alert);
  console.log(
    "🚀 ~ file: DeleteDialog.component.jsx:35 ~ DeleteDialog ~ alertState:",
    alertState
  );

  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  console.log(
    "🚀 ~ file: DeleteDialog.component.jsx:38 ~ DeleteDialog ~ success:",
    success
  );
  const [fail, setFail] = useState(false);
  console.log(
    "🚀 ~ file: DeleteDialog.component.jsx:40 ~ DeleteDialog ~ fail:",
    fail
  );

  useEffect(() => {
    const updateOpen = () => {
      setOpen(deleteDialogOpen);
    };

    updateOpen();
  }, [deleteDialogOpen]);

  useEffect(() => {
    const handleAlert = () => {
      if (alertState?.severity === "success") {
        setSuccess(true);
      } else if (alertState?.severity === "error") {
        setFail(true);
      } else {
        setSuccess(false);
        setFail(false);
      }
    };

    handleAlert();
  }, [alertState]);

  const handleCancel = () => {
    handleDeleteDialog(false);
    setTimeout(() => {
      dispatch(clearAlert());
    }, 500);
  };

  const handleClose = () => {
    handleCancel();
  };

  const handleDelete = () => {
    dispatch(paramIdentifier?.actions?.delete(record["_id"]));
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <If condition={success || fail}>
          <Then>
            {success && (
              <DialogTitle id="alert-dialog-title">
                <CheckCircleOutline
                  color="success"
                  sx={{
                    position: "relative",
                    top: "0.25rem",
                    mr: 1,
                    display: { xs: "block", sm: "inline-block" },
                    margin: { xs: "0 0 1rem 0", sm: "0 0.6rem 0 0" },
                  }}
                />
                {`${paramIdentifier?.name} data deleted!`}
              </DialogTitle>
            )}
            {fail && (
              <DialogTitle id="alert-dialog-title">
                <ErrorOutline
                  color="error"
                  sx={{
                    position: "relative",
                    top: "0.25rem",
                    mr: 1,
                    display: { xs: "block", sm: "inline-block" },
                    margin: { xs: "0 0 1rem 0", sm: "0 0.6rem 0 0" },
                  }}
                />
                {`Error deleting ${paramIdentifier?.name.toLowerCase()} data`}
              </DialogTitle>
            )}
          </Then>
          <Else>
            {record && (
              <DialogTitle id="alert-dialog-title">
                <HelpOutline
                  color="error"
                  sx={{
                    position: "relative",
                    top: "0.25rem",
                    mr: 1,
                    display: { xs: "block", sm: "inline-block" },
                    margin: { xs: "0 0 1rem 0", sm: "0 0.6rem 0 0" },
                  }}
                />
                {`Are you sure you want to delete the ${paramIdentifier?.name}?`}
              </DialogTitle>
            )}
          </Else>
        </If>

        <DialogContent>
          {record && !success && !fail && (
            <DialogContentText id="alert-dialog-description">
              You are about to delete the {paramIdentifier?.name.toLowerCase()}{" "}
              <strong>{record[recordIdentifier]}</strong> from the database.
              <br />
              Please confirm your action.
            </DialogContentText>
          )}
          <DialogContentText>
            {paramIdentifier?.state?.loading && (
              <Box>
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  sx={{ pt: 6, pb: 2 }}
                >
                  <CircularProgress />
                </Stack>
              </Box>
            )}

            {(success || fail) && (
              <Alert severity={alertState?.severity} icon={false}>
                {alertState?.title} {alertState?.description}
              </Alert>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            {success || fail ? (
              <Button onClick={handleClose}>Close</Button>
            ) : (
              <>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button
                  onClick={handleDelete}
                  autoFocus
                  variant="contained"
                  color="error"
                >
                  Delete
                </Button>
              </>
            )}
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
