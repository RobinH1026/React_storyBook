import React, { forwardRef } from "react";
import { Theme } from "@mui/material";
import { WithStyles } from "@mui/styles";
import withStyles from "@mui/styles/withStyles";
import createStyles from "@mui/styles/createStyles";
import SwitchBase, { SwitchBaseProps } from "./SwitchBase";

export type StandardSwitchProps = SwitchBaseProps;

const styles = (theme: Theme) =>
  createStyles({
    thumb: {
      border: ({ color = "primary" }: SwitchBaseProps) =>
        color !== "default" ? `1px solid ${theme.egPalette[color][1]}` : `none`,
    },
  });

const StandardSwitch = forwardRef<
  HTMLButtonElement,
  StandardSwitchProps & WithStyles<typeof styles>
>((props, ref) => <SwitchBase ref={ref} {...props} />);

export default withStyles(styles, { name: "MuiEgStandardSwitch" })(
  StandardSwitch
);
