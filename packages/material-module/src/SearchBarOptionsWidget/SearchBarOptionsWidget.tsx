import React, { Children, FC } from "react";
import { Paper, Theme, PaperProps } from "@mui/material";
import { WithStyles } from "@mui/styles";
import withStyles from "@mui/styles/withStyles";
import createStyles from "@mui/styles/createStyles";
import clsx from "clsx";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: 300,
      [theme.breakpoints.down("sm")]: {
        width: 200,
      },
    },
    main: {
      padding: theme.spacing(3),
    },
    footer: {
      padding: theme.spacing(0, 3, 3, 3),
      textAlign: "right",
    },
  });

const SearchBarOptionsWidget: FC<PaperProps & WithStyles<typeof styles>> = ({
  className,
  classes,
  children,
  ...other
}) => {
  const [main, footer] = Children.toArray(children);

  return (
    <Paper className={clsx(className, classes.root)} {...other}>
      <div className={classes.main}>{main}</div>
      <div className={classes.footer}>{footer}</div>
    </Paper>
  );
};

export default withStyles(styles, {
  name: "MuiEgSearchBarOptionsWidget",
})(SearchBarOptionsWidget);
