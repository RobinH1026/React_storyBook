import React, { FC, HTMLAttributes } from "react";
import { WithStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import withStyles from "@mui/styles/withStyles";
import clsx from "clsx";

const styles = () =>
  createStyles({
    root: {
      display: "flex",
      width: "100%",
      padding: "24px 15px 8px 15px",
      justifyContent: "flex-end",
    },
  });

export interface MenuActionsProps
  extends HTMLAttributes<HTMLDivElement>,
    WithStyles<typeof styles> {}

const MenuActions: FC<MenuActionsProps> = ({
  className,
  classes,
  ...other
}) => <div className={clsx(className, classes.root)} {...other} />;

export default withStyles(styles, {
  name: "MuiEgMenuActions",
})(MenuActions);
