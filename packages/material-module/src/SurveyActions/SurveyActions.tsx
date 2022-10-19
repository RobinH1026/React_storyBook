import React, { forwardRef, HTMLAttributes } from "react";
import { Theme } from "@mui/material";
import { WithStyles } from "@mui/styles";
import withStyles from "@mui/styles/withStyles";
import createStyles from "@mui/styles/createStyles";
import clsx from "clsx";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
      display: "flex",
      justifyContent: "flex-end",
      "& .MuiButton-root": {
        margin: 4,
      },
    },
  });

export type SurveyActionsProps = HTMLAttributes<HTMLDivElement>;

const SurveyActions = forwardRef<
  HTMLDivElement,
  SurveyActionsProps & WithStyles<typeof styles>
>((props, ref) => {
  const { classes, className, ...other } = props;
  return <div ref={ref} className={clsx(className, classes.root)} {...other} />;
});

export default withStyles(styles)(SurveyActions);
