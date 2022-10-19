import React, { forwardRef, HTMLAttributes } from "react";
import { Theme } from "@mui/material";
import { WithStyles } from "@mui/styles";
import withStyles from "@mui/styles/withStyles";
import createStyles from "@mui/styles/createStyles";
import clsx from "clsx";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 3),
    },
  });

export type SurveyBobyProps = HTMLAttributes<HTMLDivElement>;

const SurveyBoby = forwardRef<
  HTMLDivElement,
  SurveyBobyProps & WithStyles<typeof styles>
>((props, ref) => {
  const { classes, className, ...other } = props;
  return <div ref={ref} className={clsx(className, classes.root)} {...other} />;
});

export default withStyles(styles)(SurveyBoby);
