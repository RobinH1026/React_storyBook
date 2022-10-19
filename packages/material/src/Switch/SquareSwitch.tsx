import React, { forwardRef } from "react";
import { Theme } from "@mui/material";
import { WithStyles } from "@mui/styles";
import withStyles from "@mui/styles/withStyles";
import createStyles from "@mui/styles/createStyles";
import SwitchBase, { SwitchBaseProps } from "./SwitchBase";

export type SquareSwitchProps = SwitchBaseProps;

const styles = (theme: Theme) =>
  createStyles({
    thumb: {
      border: ({ color = "primary" }: SwitchBaseProps) =>
        color !== "default" ? `1px solid ${theme.egPalette[color][1]}` : `none`,
      borderRadius: 3,
    },
    track: {
      borderRadius: 3,
    },
  });

const SquareSwitch = forwardRef<
  HTMLButtonElement,
  SquareSwitchProps & WithStyles<typeof styles>
>((props, ref) => <SwitchBase ref={ref} {...props} />);

export default withStyles(styles, { name: "MuiEgSquareSwitch" })(SquareSwitch);
