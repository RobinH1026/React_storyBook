import React from "react";

import { Meta, Story } from "@storybook/react";

import FaceBookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@eGroupAI/material-icons/Google";
import LineIcon from "@eGroupAI/material-icons/Line";
import QrCodeIcon from "@eGroupAI/material-icons/QrCode";
import { Divider } from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

export default {
  title: "Icons/Customer",
} as Meta;

const useStyles = makeStyles({
  large: {
    fontSize: 48,
  },
});

export const Default: Story = () => {
  const classes = useStyles();
  return (
    <>
      <FaceBookIcon style={{ color: "#4267b2" }} />
      <GoogleIcon />
      <LineIcon />
      <QrCodeIcon />
      <Divider />
      <FaceBookIcon className={classes.large} style={{ color: "#4267b2" }} />
      <GoogleIcon className={classes.large} />
      <LineIcon className={classes.large} />
      <QrCodeIcon className={classes.large} />
    </>
  );
};
