import { Alert, Theme } from "@mui/material";
import { AlertProps } from "@mui/lab";
import createStyles from "@mui/styles/createStyles";
import withStyles from "@mui/styles/withStyles";

export type AlertDialogProps = AlertProps;

export default withStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: theme.shape.borderRadius,
      position: "relative",
      display: "block",
      textAlign: "center",
      borderLeft: "none",
      backgroundColor: "white",
      boxShadow: theme.egShadows[1],
      padding: theme.spacing(4),
    },
    message: {
      display: "block",
      textAlign: "center",
      paddingBottom: 0,
      "& .MuiAlertTitle-root": {
        marginRight: theme.spacing(2),
      },
    },
    icon: {
      display: "flex",
      justifyContent: "center",
      "& .MuiSvgIcon-root": {
        backgroundColor: ({ severity = "info" }: AlertDialogProps) =>
          theme.egPalette[severity][1],
        padding: theme.spacing(2),
        borderRadius: "50%",
        fontSize: "60px",
        color: "white",
      },
    },
    action: {
      position: "absolute",
      top: "10px",
      right: "20px",
      "& .MuiButton-root": {
        textTransform: "initial",
        border: ({ severity = "info" }) =>
          `1px solid ${theme.egPalette[severity][1]}`,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
    },
  })
)(Alert);
