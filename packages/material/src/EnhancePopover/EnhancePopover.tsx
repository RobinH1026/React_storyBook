import React, { FC } from "react";

import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";

import {
  ClickAwayListener,
  Fade,
  Hidden,
  IconButton,
  IconButtonProps,
  Popover,
  PopoverProps,
  ClickAwayListenerProps,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      zIndex: theme.zIndex.snackbar,
      [theme.breakpoints.down("lg")]: {
        minWidth: "100vw",
        minHeight: "100vh",
        overflow: "auto",
        transform: "none !important",
      },
    },
    paper: {
      [theme.breakpoints.down("lg")]: {
        maxWidth: "100%",
        maxHeight: "100%",
        top: "0 !important",
        left: "0 !important",
        right: "0 !important",
      },
    },
    container: {
      display: "flex",
      [theme.breakpoints.down("lg")]: {
        width: "100%",
        minHeight: "100vh",
      },
    },
    close: {
      position: "fixed",
      right: 5,
      top: 5,
    },
  }),
  { name: "MuiEnhancePopover" }
);

export interface EnhancePopoverProps extends PopoverProps {
  open: boolean;
  onClickAway: ClickAwayListenerProps["onClickAway"];
  onCloseClick?: IconButtonProps["onClick"];
}

const EnhancePopover: FC<EnhancePopoverProps> = (props) => {
  const classes = useStyles();
  const {
    className,
    anchorOrigin,
    transformOrigin,
    PaperProps,
    open,
    onClickAway,
    onCloseClick,
    anchorEl,
    children,
    ...other
  } = props;

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      className={clsx(className, classes.root)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
        ...anchorOrigin,
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
        ...transformOrigin,
      }}
      PaperProps={{
        elevation: 6,
        className: classes.paper,
        ...PaperProps,
      }}
      TransitionComponent={Fade}
      {...other}
    >
      <ClickAwayListener onClickAway={onClickAway}>
        <div className={classes.container}>
          <Hidden lgUp>
            <IconButton
              className={classes.close}
              onClick={onCloseClick}
              size="large"
            >
              <CloseIcon />
            </IconButton>
          </Hidden>
          {children}
        </div>
      </ClickAwayListener>
    </Popover>
  );
};

export default EnhancePopover;
