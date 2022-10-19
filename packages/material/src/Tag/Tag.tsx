import React, { HTMLAttributes, FC } from "react";

import clsx from "clsx";
import makeStyles from "@mui/styles/makeStyles";
import CancelIcon from "@mui/icons-material/Cancel";
import { SvgIconProps } from "@mui/material/SvgIcon";

const useStyles = makeStyles((theme) => ({
  root: (props: TagProps) => {
    const backgroundColor = props.color || theme.palette.common.white;
    return {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50px",
      letterSpacing: "0.5px",
      fontSize: "0.8125rem",
      padding: "0.375rem 0.75rem",
      lineHeight: 1.5,
      backgroundColor,
      border: "1px solid transparent",
      color: theme.palette.getContrastText(backgroundColor),
    };
  },
  remove: {
    opacity: 0.5,
    cursor: "pointer",
    marginLeft: 4,
    marginRight: -5,

    "&:hover": {
      opacity: 1,
    },
  },
}));

export interface TagProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The color of the tag.
   */
  color?: string;
  /**
   * Tag on delete click callback.
   */
  onDelete?: SvgIconProps["onClick"];
}

const Tag: FC<TagProps> = (props) => {
  const classes = useStyles(props);
  const { className, color, onDelete, children, ...other } = props;
  return (
    <div className={clsx(className, classes.root)} {...other}>
      {children}
      {onDelete && (
        <CancelIcon
          className={classes.remove}
          fontSize="small"
          onClick={onDelete}
        />
      )}
    </div>
  );
};

export default Tag;
