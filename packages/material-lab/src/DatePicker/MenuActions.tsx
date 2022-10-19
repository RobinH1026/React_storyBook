import React, { FC, HTMLAttributes } from "react";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    width: "100%",
    padding: "24px 15px 8px 15px",
    justifyContent: "flex-end",
  },
}));

export type MenuActionsProps = HTMLAttributes<HTMLDivElement>;

const MenuActions: FC<MenuActionsProps> = (props) => {
  const { className, ...other } = props;
  const classes = useStyles();
  return <div className={clsx(className, classes.root)} {...other} />;
};

export default MenuActions;
