import React, { FC } from "react";

import { useTheme, makeStyles } from "@mui/styles";
import { useMediaQuery } from "@mui/material";
import Button, { ButtonProps } from "@eGroupAI/material/Button";
import FacebookIcon from "@mui/icons-material/Facebook";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#3C69AB !important",
    borderColor: "#3C69AB !important",
    "&:hover": {
      backgroundColor: "#3C69AB",
      borderColor: "#3C69AB",
    },
    "&:active": {
      backgroundColor: "#3C69AB",
      borderColor: "#3C69AB",
    },
  },
  icon: {
    position: "absolute",
    left: theme.spacing(),

    [theme.breakpoints.down("sm")]: {
      left: "50%",
      transform: "translateX(-50%)",
    },
  },
}));

export type FacebookButtonProps = ButtonProps;

const FacebookButton: FC<FacebookButtonProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      className={classes.root}
      size="large"
      {...props}
    >
      <FacebookIcon className={classes.icon} />{" "}
      {isDownSm ? <>&nbsp;</> : "Facebook"}
    </Button>
  );
};

export default FacebookButton;
