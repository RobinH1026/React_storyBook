import React, { FC } from "react";

import { useTheme, makeStyles } from "@mui/styles";
import { useMediaQuery } from "@mui/material";
import Button, { ButtonProps } from "@eGroupAI/material/Button";
import GoogleIcon from "@mui/icons-material/Google";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#BC432B !important",
    borderColor: "#BC432B !important",
    "&:hover": {
      backgroundColor: "#BC432B",
      borderColor: "#BC432B",
    },
    "&:active": {
      backgroundColor: "#BC432B",
      borderColor: "#BC432B",
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

export type GoogleButtonProps = ButtonProps;

const GoogleButton: FC<ButtonProps> = (props) => {
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
      <GoogleIcon className={classes.icon} />{" "}
      {isDownSm ? <>&nbsp;</> : "Google"}
    </Button>
  );
};

export default GoogleButton;
