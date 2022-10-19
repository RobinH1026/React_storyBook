import React, { forwardRef, HTMLAttributes } from "react";

import clsx from "clsx";
import { Theme } from "@mui/material";

import { WithStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import withStyles from "@mui/styles/withStyles";

export interface EditableFieldShowingProps
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * If true, flex wrap will set to nowrap.
   */
  noWrap?: boolean;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(1),
      flexWrap: (props: EditableFieldShowingProps) =>
        props.noWrap ? "nowrap" : "wrap",
    },
  });

const EditableFieldShowing = forwardRef<
  HTMLDivElement,
  EditableFieldShowingProps & WithStyles<typeof styles>
>((props, ref) => {
  const { className, classes, ...other } = props;

  return <div ref={ref} className={clsx(classes.root, className)} {...other} />;
});

export default withStyles(styles, {
  name: "MuiEgEditableFieldShowing",
})(EditableFieldShowing);
