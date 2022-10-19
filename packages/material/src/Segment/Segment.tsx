import React, { forwardRef } from "react";
import { Paper, PaperProps, Theme } from "@mui/material";

import { WithStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import withStyles from "@mui/styles/withStyles";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      boxShadow: (props: SegmentProps) => theme.egShadows[props.elevation ?? 1],
    },
  });

export type SegmentProps = PaperProps;

const Segment = forwardRef<
  HTMLDivElement,
  SegmentProps & WithStyles<typeof styles>
>((props, ref) => {
  const { elevation, ...other } = props;
  return <Paper ref={ref} elevation={0} {...other} />;
});

export default withStyles(styles, {
  name: "MuiEgSegment",
})(Segment);
