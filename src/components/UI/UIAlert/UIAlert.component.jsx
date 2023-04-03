import React from "react";
import { IconButton, Collapse, Alert, AlertTitle, Fade } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import styles from "./UIAlert.module.scss";

const UIAlert = (props) => {
  const { alert, showErrorMessage, setShowErrorMessage } = props;

  return (
    <>
      <Collapse in={alert?.severity && showErrorMessage}>
        <Alert
          severity={`${alert?.severity ? alert?.severity : "info"}`}
          className={`login-alert login-alert-${alert?.severity}`}
          sx={{ mt: 3, mb: -1 }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setShowErrorMessage(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <Fade
            in={alert?.severity && showErrorMessage}
            {...(alert?.severity && showErrorMessage ? { timeout: 500 } : {})}
          >
            <AlertTitle
              className="alert-title"
              sx={{
                fontSize: "0.825rem",
                display: "block",
                lineHeight: "normal",
                fontWeight: 500,
              }}
            >
              {alert?.title}
            </AlertTitle>
          </Fade>

          <Fade
            in={alert?.severity && showErrorMessage}
            {...(alert?.severity && showErrorMessage ? { timeout: 1500 } : {})}
          >
            <small className={styles.description}>{alert?.description}</small>
          </Fade>
        </Alert>
      </Collapse>
    </>
  );
};

export default UIAlert;
