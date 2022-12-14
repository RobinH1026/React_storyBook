import React, { FieldsetHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";
import { capitalize, useTheme } from "@mui/material";

import { WithStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import withStyles from "@mui/styles/withStyles";

export const styles = () =>
  createStyles({
    /* Styles applied to the root element. */
    root: {
      position: "absolute",
      bottom: 0,
      right: 0,
      top: -5,
      left: 0,
      margin: 0,
      padding: "0 8px",
      pointerEvents: "none",
      borderRadius: "inherit",
      borderStyle: "solid",
      borderWidth: 1,
      overflow: "hidden",
    },
  });

export type OutlineProps = FieldsetHTMLAttributes<HTMLFieldSetElement>;

const Outline = forwardRef<
  HTMLFieldSetElement,
  OutlineProps & WithStyles<typeof styles>
>((props, ref) => {
  const { children, classes, className, style, ...other } = props;
  const theme = useTheme();
  const align = theme.direction === "rtl" ? "right" : "left";

  return (
    <fieldset
      aria-hidden
      style={{
        [`padding${capitalize(align)}`]: 8,
        ...style,
      }}
      className={clsx(classes.root, className)}
      ref={ref}
      {...other}
    />
  );
});

export default withStyles(styles, { name: "MuiPrivateOutline" })(Outline);
