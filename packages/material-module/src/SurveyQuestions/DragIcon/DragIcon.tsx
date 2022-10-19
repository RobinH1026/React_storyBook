import React, { FC } from "react";

import { Theme } from "@mui/material";
import { WithStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import withStyles from "@mui/styles/withStyles";
import Icomoon, { IcomoonProps } from "@eGroupAI/material/Icomoon";
import clsx from "clsx";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      outline: "none",
    },
  });

export type DragIconProps = IcomoonProps & WithStyles<typeof styles>;

const DragIcon: FC<DragIconProps> = ({
  type,
  className,
  classes,
  ...other
}) => (
  <Icomoon type="move" className={clsx(className, classes.root)} {...other} />
);

export default withStyles(styles)(DragIcon);
