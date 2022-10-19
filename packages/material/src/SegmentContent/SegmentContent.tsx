import React, { forwardRef } from "react";
import clsx from "clsx";
import { Theme, BoxProps, Box } from "@mui/material";

import { WithStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import withStyles from "@mui/styles/withStyles";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 3),

      "& ul": {
        listStyle: "none",
      },
      "& ul li::before": {
        content: "'\\2022'",
        color: theme.egPalette.primary[1],
        fontWeight: "bold",
        display: "inline-block",
        width: "1em",
        marginLeft: "-1em",
      },
    },
  });

export type SegmentContentProps = BoxProps;

const SegmentContent = forwardRef<
  HTMLDivElement,
  SegmentContentProps & WithStyles<typeof styles>
>((props, ref) => {
  const { className, classes, ...other } = props;
  // igonre type error due to this issue
  // https://github.com/mui-org/material-ui/issues/17010
  // @ts-ignore
  return <Box ref={ref} className={clsx(className, classes.root)} {...other} />;
});

export default withStyles(styles, {
  name: "MuiEgSegmentContent",
})(SegmentContent);
