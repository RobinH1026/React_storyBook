import React, { forwardRef } from "react";
import clsx from "clsx";
import { Theme, Box, BoxProps } from "@mui/material";

import { WithStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import withStyles from "@mui/styles/withStyles";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 3),
      borderBottom: "solid 1px #dbdde3",
    },
  });

export type SegmentHeaderProps = BoxProps;

const SegmentHeader = forwardRef<
  HTMLDivElement,
  SegmentHeaderProps & WithStyles<typeof styles>
>((props, ref) => {
  const { className, classes, ...other } = props;
  // igonre type error due to this issue
  // https://github.com/mui-org/material-ui/issues/17010
  // @ts-ignore
  return <Box ref={ref} className={clsx(className, classes.root)} {...other} />;
});

export default withStyles(styles, {
  name: "MuiEgSegmentHeader",
})(SegmentHeader);
