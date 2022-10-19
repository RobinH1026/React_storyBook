import React from "react";

import clsx from "clsx";

import { Theme } from "@mui/material";

import { WithStyles } from "@mui/styles";
import withStyles from "@mui/styles/withStyles";
import createStyles from "@mui/styles/createStyles";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      display: "flex",
      position: "fixed",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "none",
      zIndex: theme.zIndex.modal,
    },
  });

export interface FixedCenterProps extends WithStyles<typeof styles> {
  className?: string;
}

const FixedCenter: React.FC<FixedCenterProps> = ({
  classes,
  className,
  ...other
}) => <div className={clsx(classes.root, className)} {...other} />;

export default withStyles(styles, {
  name: "MuiEgFixedCenter",
})(FixedCenter);
