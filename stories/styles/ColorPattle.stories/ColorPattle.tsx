import React, { FC, HTMLAttributes } from "react";
import { Theme } from "@mui/material";
import { WithStyles } from "@mui/styles";
import withStyles from "@mui/styles/withStyles";
import createStyles from "@mui/styles/createStyles";
import clsx from "clsx";
import { Color } from "@eGroupAI/material/types";

export interface ColorPattleProps extends HTMLAttributes<HTMLDivElement> {
  color?: Color;
  shape?: 0 | 1 | 2 | 3 | 4 | 5;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: ({ color = "text", shape = 1 }: ColorPattleProps) =>
        theme.egPalette[color][shape],
      borderRadius: theme.shape.borderRadius,
    },
  });

const ColorPattle: FC<ColorPattleProps & WithStyles<typeof styles>> = ({
  className,
  classes,
  ...other
}) => <div className={clsx(className, classes.root)} {...other} />;

export default withStyles(styles)(ColorPattle);
