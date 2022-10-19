import React, { forwardRef } from "react";
import { Paper, PaperProps } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: 300,
    padding: theme.spacing(1, 2, 5, 0),
    boxShadow: theme.egShadows[1],

    "& .recharts-legend-item-text": {
      color: `${theme.egPalette.text[2]} !important`,
      fontSize: 12,
    },

    "& .recharts-default-tooltip": {
      borderRadius: 8,
      borderColor: theme.egPalette.text[4],
    },

    "& .recharts-tooltip-label": {
      color: theme.egPalette.text[2],
      fontWeight: 700,
    },

    "& .recharts-tooltip-item": {
      color: `${theme.egPalette.text[3]} !important`,
    },

    "& .recharts-layer.recharts-active-dot": {
      color: theme.egPalette.primary[1],
    },

    "& .recharts-layer.recharts-active-dot circle": {
      fill: "currentcolor",
    },
  },
}));

export type SimpleChartPaperProps = PaperProps;

const SimpleChartPaper = forwardRef<HTMLDivElement, SimpleChartPaperProps>(
  (props, ref) => {
    const classes = useStyles();
    const { className, ...other } = props;
    return (
      <Paper className={clsx(classes.root, className)} ref={ref} {...other} />
    );
  }
);

export default SimpleChartPaper;
