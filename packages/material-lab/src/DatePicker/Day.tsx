import React from "react";

import clsx from "clsx";

import { IconButton, Theme, alpha } from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme: Theme) => ({
  buttonContainer: {
    display: "flex",
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "transparent",
  },
  button: {
    height: 36,
    width: 36,
    color: alpha(theme.palette.common.black, 0.87),
    fontSize: theme.typography.body2.fontSize,
  },
  outlined: {
    border: `1px solid ${theme.palette.primary.dark}`,
  },
  filled: {
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    backgroundColor: theme.palette.primary.dark,
  },
  contrast: {
    color: theme.palette.primary.contrastText,
  },
  invisible: {
    visibility: "hidden",
  },
}));

export interface DayProps {
  filled: boolean;
  outlined?: boolean;
  disabled: boolean;
  invisible: boolean;
  onClick?: () => void;
  onHover?: () => void;
  value: number | string;
}

const Day: React.FC<DayProps> = (props) => {
  const classes = useStyles();
  const { disabled, onClick, onHover, value, outlined, invisible, filled } =
    props;
  return (
    <div
      className={clsx(classes.buttonContainer, invisible && classes.invisible)}
    >
      <IconButton
        className={clsx(
          classes.button,
          !disabled && outlined && classes.outlined,
          !disabled && filled && classes.filled,
          !disabled && filled && classes.contrast
        )}
        disabled={disabled}
        onClick={onClick}
        onMouseOver={onHover}
        size="large"
      >
        {value}
      </IconButton>
    </div>
  );
};

export default Day;
