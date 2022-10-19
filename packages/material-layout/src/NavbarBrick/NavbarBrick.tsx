import React, { FC, HTMLAttributes } from "react";
import { Theme } from "@mui/material";
import { WithStyles } from "@mui/styles";
import withStyles from "@mui/styles/withStyles";
import clsx from "clsx";

const styles = (theme: Theme) => ({
  root: {
    ...theme.mixins.toolbar,
  },
  dense: {
    minHeight: theme.spacing(6),
  },
});

export interface NavbarBrickProps extends HTMLAttributes<HTMLDivElement> {
  dense?: boolean;
}

const NavbarBrick: FC<NavbarBrickProps & WithStyles<typeof styles>> = (
  props
) => {
  const { classes, className, dense, ...other } = props;

  return (
    <div
      className={clsx(classes.root, dense && classes.dense, className)}
      {...other}
    />
  );
};

export default withStyles(styles, {
  name: "MuiEgNavbarBrick",
})(NavbarBrick);
