import React, { forwardRef, HTMLAttributes } from "react";

import { Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";

const useStyles = makeStyles<Theme, StickyProps>(() => ({
  root: {
    top: (props) => props.top ?? 0,
    position: "sticky",
  },
}));

export interface StickyProps extends HTMLAttributes<HTMLDivElement> {
  top?: number;
}

const Sticky = forwardRef<HTMLDivElement, StickyProps>((props, ref) => {
  const { className, ...other } = props;
  const classes = useStyles(props);

  return <div ref={ref} className={clsx(classes.root, className)} {...other} />;
});

export default Sticky;
