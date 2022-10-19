import React, { ReactNode, forwardRef } from "react";

import {
  Snackbar as MuiSnackbar,
  SnackbarProps as MuiSnackbarProps,
} from "@mui/material";
import Alert, { AlertProps } from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export interface SnackbarProps extends Omit<MuiSnackbarProps, "children"> {
  handleClose?: () => void;
  isOpen?: boolean;
  primary?: ReactNode;
  message?: ReactNode;
  severity?: AlertProps["severity"];
  AlertProps?: AlertProps;
  onCloseClick?: AlertProps["onClose"];
}

const Snackbar = forwardRef<unknown, SnackbarProps>((props, ref) => {
  const {
    handleClose,
    onClose,
    onCloseClick,
    isOpen = false,
    primary,
    message,
    severity,
    AlertProps,
    children,
    ...other
  } = props;
  const handleSnackbarClose: MuiSnackbarProps["onClose"] = (e, reason) => {
    if (handleClose) {
      handleClose();
    }
    if (onClose) {
      onClose(e, reason);
    }
  };

  return (
    <MuiSnackbar
      ref={ref}
      open={isOpen}
      onClose={handleSnackbarClose}
      {...other}
    >
      <Alert
        onClose={(e) => {
          if (handleClose) {
            handleClose();
          }
          if (onCloseClick) {
            onCloseClick(e);
          }
        }}
        severity={severity}
        {...AlertProps}
      >
        {primary && <AlertTitle>{primary}</AlertTitle>}
        {message}
      </Alert>
    </MuiSnackbar>
  );
});

export default Snackbar;
