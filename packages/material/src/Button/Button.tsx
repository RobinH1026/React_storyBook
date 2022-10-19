import React, { forwardRef } from "react";
import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";
import { Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import { Color } from "../types";

export interface ButtonProps<D = React.ElementType>
  extends Omit<LoadingButtonProps, "color"> {
  rounded?: boolean;
  color?: Color;
  component?: D;
}

const getStyles = (theme: Theme, color: Color) => ({
  color: theme.egPalette[color][1],

  "&.Mui-disabled": {
    color: theme.egPalette[color][4],
  },
  "&.MuiButton-outlined": {
    borderColor: "currentColor",
  },
  "&.MuiButton-outlined.Mui-disabled": {
    borderColor: "currentColor",
  },
  "&.MuiButton-contained": {
    color: theme.palette.getContrastText(theme.egPalette[color][1]),
    backgroundColor: theme.egPalette[color][1],
  },
  "&.MuiButton-contained.Mui-disabled": {
    backgroundColor: theme.egPalette[color][4],
  },
});

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {},
    rounded: {
      borderRadius: theme.egShape.borderRadius,
    },
    colorGrey: getStyles(theme, "grey"),
    colorPrimary: getStyles(theme, "primary"),
    colorSecondary: getStyles(theme, "secondary"),
    colorText: getStyles(theme, "text"),
    colorWhite: {
      color: theme.palette.common.white,
      "&.Mui-disabled": {
        color: theme.palette.grey[600],
      },
      "&.MuiButton-outlined": {
        borderColor: "currentColor",
      },
      "&.MuiButton-outlined.Mui-disabled": {
        borderColor: theme.palette.grey[600],
      },
      "&.MuiButton-contained": {
        color: theme.egPalette.text[1],
        backgroundColor: theme.palette.common.white,
      },
      "&.MuiButton-contained.Mui-disabled": {
        color: theme.egPalette.text[1],
        backgroundColor: theme.palette.grey[600],
      },
    },
    colorInfo: getStyles(theme, "info"),
    colorSuccess: getStyles(theme, "success"),
    colorWarning: getStyles(theme, "warning"),
    colorError: getStyles(theme, "error"),
    colorInherit: {
      color: "inherit",

      "&.Mui-disabled": {
        color: theme.palette.grey[600],
      },
      "&.MuiButton-outlined": {
        borderColor: "currentColor",
      },
      "&.MuiButton-outlined.Mui-disabled": {
        borderColor: "currentColor",
      },
      "&.MuiButton-contained": {
        backgroundColor: theme.palette.common.white,
      },
      "&.MuiButton-contained.Mui-disabled": {
        color: theme.palette.grey[600],
        backgroundColor: theme.palette.common.white,
      },
    },
  }),
  { name: "MuiEgButton" }
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, color = "default", rounded, ...other } = props;
  const classes = useStyles(props);

  return (
    <LoadingButton
      className={clsx(
        classes.root,
        {
          [classes.rounded]: rounded,
          [classes.colorGrey]: color === "default" || color === "grey",
          [classes.colorPrimary]: color === "primary",
          [classes.colorSecondary]: color === "secondary",
          [classes.colorText]: color === "text",
          [classes.colorWhite]: color === "white",
          [classes.colorInfo]: color === "info",
          [classes.colorSuccess]: color === "success",
          [classes.colorWarning]: color === "warning",
          [classes.colorError]: color === "error",
          [classes.colorInherit]: color === "inherit",
        },
        className
      )}
      ref={ref}
      {...other}
    />
  );
});

export default Button;
