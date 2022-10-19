import { Alert, Theme } from "@mui/material";
import { AlertProps } from "@mui/lab";

import createStyles from "@mui/styles/createStyles";
import withStyles from "@mui/styles/withStyles";

export type AlertBaseProps = AlertProps;

export default withStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: theme.shape.borderRadius,
      position: "relative",
      display: "flex",
      textAlign: "initial",
      borderLeft: ({ severity = "info" }: AlertBaseProps) =>
        `3px solid ${theme.egPalette[severity][1]}`,
      backgroundColor: ({ severity = "info" }) => theme.egPalette[severity][5],
    },
    message: {
      display: "flex",
      textAlign: "initial",
      paddingBottom: ({ icon }) => (icon === false ? "" : 0),
      "& .MuiAlertTitle-root": {
        marginRight: theme.spacing(2),
      },
    },
    action: {
      "& .MuiButton-root": {
        border: ({ severity = "info" }) =>
          `1px solid ${theme.egPalette[severity][1]}`,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
    },
  })
)(Alert);
