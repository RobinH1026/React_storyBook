import React, { FC } from "react";
import clsx from "clsx";
import makeStyles from "@mui/styles/makeStyles";
import Card, { CardProps } from "@mui/material/Card";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "0.35rem",
    boxShadow: "0 .15rem 1.75rem 0 rgba(58, 59, 69, .15)!important",
    "& .MuiCardHeader-root": {
      background: "#f8f9fc",
      borderBottom: "1px solid #e3e6f0",
      padding: "0.75rem 1.25rem",
      "& .MuiTypography-root": {
        color: "#5a5c69!important",
        fontSize: "1rem",
        lineHeight: "1.2",
      },
      "& .MuiCardHeader-avatar": {
        display: "flex",
        alignItems: "center",
        marginRight: theme.spacing(1),
        "& img": {
          width: "15px",
          marginLeft: "4px",
        },
      },
      "& .MuiCardHeader-action": {
        display: "flex",
      },
    },
    "& .MuiCardContent-root": {
      color: "#858796",
      padding: "1.25rem",
      "& h5": {
        color: "#444",
        fontSize: "1.25rem",
        lineHeight: "1.2",
        marginBottom: "0.5rem",
      },
    },
  },
}));

const StyledCard: FC<CardProps> = (props) => {
  const classes = useStyles();
  const { className, ...other } = props;

  return <Card className={clsx(className, classes.root)} {...other} />;
};

export default StyledCard;
