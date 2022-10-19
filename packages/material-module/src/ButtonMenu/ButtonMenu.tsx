import React, {
  Children,
  cloneElement,
  FC,
  ReactElement,
  useState,
  isValidElement,
} from "react";

import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import useControlled from "@eGroupAI/hooks/useControlled";

import {
  Popper,
  PopperProps,
  Grow,
  Paper,
  ClickAwayListener,
  ClickAwayListenerProps,
  MenuList,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.tooltip,
  },
}));

export interface ButtonMenuProps extends Omit<PopperProps, "open"> {
  /**
   * The button to open `Menu`.
   */
  button: ReactElement;
  /**
   * If `true`, the menu is visible.
   */
  open?: boolean;
  /**
   * If `true`, the menu will not close when item clicked.
   */
  disableClickOnClose?: boolean;
  /**
   * Trigger event when close
   */
  onClose?: ClickAwayListenerProps["onClickAway"];
}

const ButtonMenu: FC<ButtonMenuProps> = ({
  className,
  button,
  children,
  anchorEl: anchorElProp,
  open: openProp,
  disableClickOnClose,
  onClose,
  ...other
}) => {
  const classes = useStyles();
  const [open, setOpen] = useControlled({
    controlled: openProp,
    default: false,
  });
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = (e) => {
    setOpen(false);
    if (onClose) {
      onClose(e);
    }
  };

  const controledButton = cloneElement(button, {
    onClick: (e) => {
      setAnchorEl(e.currentTarget);
      setOpen(true);
      if (button.props.onClick) {
        button.props.onClick(e);
      }
    },
  });

  const items = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        onClick: (e) => {
          if (!disableClickOnClose) {
            handleClose(e);
          }
          if (child.props.onClick) {
            child.props.onClick(e);
          }
        },
      });
    }
    return undefined;
  });

  return (
    <>
      {controledButton}
      <Popper
        anchorEl={anchorEl}
        open={open}
        placement="bottom-start"
        transition
        className={clsx(className, classes.root)}
        {...other}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} timeout={350}>
            <div>
              <ClickAwayListener onClickAway={handleClose}>
                <Paper>
                  <MenuList>{items}</MenuList>
                </Paper>
              </ClickAwayListener>
            </div>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default ButtonMenu;
