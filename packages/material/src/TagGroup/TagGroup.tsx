import React, { FC, HTMLAttributes } from "react";
import { Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: theme.spacing(1),
  },
}));

export interface TagGroupProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
}

const TagGroup: FC<TagGroupProps> = (props) => {
  const classes = useStyles();
  const { className, name, children, ...other } = props;

  return (
    <div className={clsx(className, classes.root)} {...other}>
      <Typography gutterBottom>{name}：</Typography>
      <div className={classes.tags}>{children}</div>
    </div>
  );
};

export default TagGroup;
