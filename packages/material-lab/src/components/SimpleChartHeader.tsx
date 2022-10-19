import React, { forwardRef, HTMLAttributes } from "react";
import { Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
  },
}));

export type SimpleChartHeaderProps = HTMLAttributes<HTMLDivElement>;

const SimpleChartHeader = forwardRef<HTMLDivElement, SimpleChartHeaderProps>(
  (props, ref) => {
    const classes = useStyles();
    const { className, children, ...other } = props;
    return (
      <div ref={ref} className={clsx(classes.root, className)} {...other}>
        <Typography variant="h6" gutterBottom>
          {children}
        </Typography>
      </div>
    );
  }
);

export default SimpleChartHeader;
