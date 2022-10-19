import React, { forwardRef } from "react";
import warning from "warning";
import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
  Theme,
} from "@mui/material";
import { WithStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import withStyles from "@mui/styles/withStyles";
import clsx from "clsx";

export interface BaseTextFieldProps {
  /**
   * Set success color.
   */
  success?: boolean;
  /**
   * Set warning color.
   */
  warning?: boolean;
  /**
   * Set variant outlined rounded.
   */
  rounded?: boolean;
  /**
   * Set variant outlined shadowed.
   */
  shadowed?: boolean;
}

export type TextFieldProps = BaseTextFieldProps & MuiTextFieldProps;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      "& .MuiInputBase-root.Mui-disabled.Mui-disabled .MuiOutlinedInput-notchedOutline":
        {
          borderColor: "transparent",
        },
      "& .MuiOutlinedInput-root.Mui-focused .MuiInputBase-input": {
        caretColor: theme.egPalette.text[1],
      },
    },
    rounded: {
      "& .MuiOutlinedInput-root": {
        borderRadius: theme.egShape.borderRadius,
      },
    },
    shadowed: {
      "& .MuiOutlinedInput-root": {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
      },
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
    },
    success: {
      "& .MuiFormLabel-root": {
        color: theme.egPalette.success[1],
      },
      "& .MuiInputBase-root": {
        color: theme.egPalette.success[1],
        caretColor: theme.egPalette.success[1],
      },
      "& .Mui-disabled": {
        color: theme.egPalette.success[0],
      },
      "& .MuiInput-underline:after, & .MuiInput-underline:before": {
        borderBottomColor: theme.egPalette.success[1],
      },
      "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
        borderBottomColor: theme.egPalette.success[1],
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.egPalette.success[1],
      },
      "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.egPalette.success[1],
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.egPalette.success[1],
      },
    },
    warning: {
      "& .MuiFormLabel-root": {
        color: theme.egPalette.warning[1],
      },
      "& .MuiInputBase-root": {
        color: theme.egPalette.warning[1],
        caretColor: theme.egPalette.warning[1],
      },
      "& .Mui-disabled": {
        color: theme.egPalette.warning[0],
      },
      "& .MuiInput-underline:after, & .MuiInput-underline:before": {
        borderBottomColor: theme.egPalette.warning[1],
      },
      "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
        borderBottomColor: theme.egPalette.warning[1],
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.egPalette.warning[1],
      },
      "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.egPalette.warning[1],
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.egPalette.warning[1],
      },
    },
    error: {
      "& .MuiFormLabel-root": {
        color: theme.egPalette.error[1],
      },
      "& .MuiInputBase-root": {
        color: theme.egPalette.error[1],
        caretColor: theme.egPalette.error[1],
      },
      "& .Mui-disabled": {
        color: theme.egPalette.error[0],
      },
      "& .MuiInput-underline:after, & .MuiInput-underline:before": {
        borderBottomColor: theme.egPalette.error[1],
      },
      "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
        borderBottomColor: theme.egPalette.error[1],
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.egPalette.error[1],
      },
      "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.egPalette.error[1],
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.egPalette.error[1],
      },
    },
  });

const TextField = forwardRef<
  HTMLDivElement,
  TextFieldProps & WithStyles<typeof styles>
>((props, ref) => {
  const {
    className,
    classes: {
      success: successClasses,
      warning: warningClasses,
      error: errorClasses,
      rounded: roundedClasses,
      shadowed: shadowedClasses,
      ...classes
    },
    success,
    warning: warningProp,
    error,
    rounded = false,
    shadowed = false,
    variant,
    ...others
  } = props;

  warning(
    variant !== "outlined" ? !rounded : true,
    "TextField should not use rounded when variant is not outlined!"
  );
  warning(
    variant !== "outlined" ? !shadowed : true,
    "TextField should not use shadowed when variant is not outlined!"
  );
  return (
    <MuiTextField
      ref={ref}
      className={clsx(className, {
        [successClasses]: success,
        [warningClasses]: warningProp,
        [errorClasses]: error,
        [roundedClasses]: rounded,
        [shadowedClasses]: shadowed,
      })}
      classes={classes}
      variant={variant}
      {...others}
    />
  );
});

export default withStyles(styles, { name: "MuiEgTextField" })(TextField);
