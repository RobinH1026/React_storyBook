import React, { FC, HTMLAttributes } from "react";

import { WithStyles } from "@mui/styles";
import withStyles from "@mui/styles/withStyles";
import createStyles from "@mui/styles/createStyles";
import WindowCenter from "./WindowCenter";
import NormalCenter from "./NormalCenter";

const styles = () =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  });

export interface CenterProps
  extends HTMLAttributes<HTMLDivElement>,
    WithStyles<typeof styles> {
  offsetTop?: number;
  height?: number;
}

const Center: FC<CenterProps> = ({ height, ...other }) => {
  if (height !== undefined) {
    return <NormalCenter height={height} {...other} />;
  }
  if (typeof window !== "undefined") {
    return <WindowCenter {...other} />;
  }
  return null;
};

export default withStyles(styles, {
  name: "MuiEgCenter",
})(Center);
