import React, { forwardRef } from "react";
import { AlertProps as MuiAlertProps } from "@mui/lab";
import AlertBase from "../AlertBase";
import AlertDialog from "../AlertDialog";

export interface AlertProps extends Omit<MuiAlertProps, "shape"> {
  shape?: "dialog";
}

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const { shape, ...other } = props;
  if (shape === "dialog") {
    return <AlertDialog ref={ref} {...other} />;
  }
  return <AlertBase ref={ref} {...other} />;
});

export default Alert;
