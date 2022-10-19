import React, { forwardRef } from "react";
import { Paper, PaperProps } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import Skeleton from "@mui/material/Skeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    boxShadow: theme.egShadows[1],
  },
}));

export type SimpleChartLoaderProps = PaperProps;

const SimpleChartLoader = forwardRef<HTMLDivElement, SimpleChartLoaderProps>(
  (props, ref) => {
    const classes = useStyles();
    const { className, ...other } = props;
    return (
      <Paper className={clsx(classes.root, className)} ref={ref} {...other}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={200}
          height={20}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height={244}
          style={{ marginTop: 5 }}
        />
      </Paper>
    );
  }
);

export default SimpleChartLoader;
