import React, { forwardRef, HTMLAttributes } from "react";
import clsx from "clsx";
import { Theme } from "@mui/material";

import { WithStyles } from "@mui/styles";
import withStyles from "@mui/styles/withStyles";
import createStyles from "@mui/styles/createStyles";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(),
    },
    info: {
      display: "flex",
      alignItems: "center",
      marginTop: theme.spacing(),
    },
  });

export type PdfHeaderProps = HTMLAttributes<HTMLDivElement>;

const PdfHeader = forwardRef<
  HTMLDivElement,
  PdfHeaderProps & WithStyles<typeof styles>
>((props, ref) => {
  const { className, classes, children, ...other } = props;

  return (
    <div ref={ref} className={clsx(className, classes.root)} {...other}>
      <div className={classes.info}>{children}</div>
    </div>
  );
});

export default withStyles(styles, {
  name: "MuiEgPdfHeader",
})(PdfHeader);
