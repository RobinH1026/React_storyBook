import React, { FC, useState } from "react";

import makeStyles from "@mui/styles/makeStyles";
import Dialog from "@eGroupAI/material/Dialog";
import Button from "@eGroupAI/material/Button";
import TextField from "@eGroupAI/material/TextField";
import Typography from "@eGroupAI/material/Typography";
import IconButton from "@eGroupAI/material/IconButton";
import InputAdornment from "@eGroupAI/material/InputAdornment";
import Link from "@eGroupAI/material/Link";
import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FacebookButton from "./FacebookButton";
import GoogleButton from "./GoogleButton";
import { LoginDialogProps, Values } from "./typings";
import { defaultValues } from "./utils";
import langs from "./langs";

const useStyles = makeStyles((theme) => ({
  main: {
    borderRadius: 10,
    padding: theme.spacing(3, 4),
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
  },
  image: {
    maxWidth: 315,
    margin: "auto",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),

    "& img": {
      width: "100%",
    },
  },
  closeBtn: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "currentcolor",
  },
  fields: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  orWith: {
    padding: theme.spacing(3, 0),
  },
  thirdBtns: {
    display: "flex",
    gap: 8,
  },
}));

export interface LoginDialogAProps extends LoginDialogProps {
  /**
   * Set image src to display login image
   */
  imgSrc?: string;
}

const LoginDialogA: FC<LoginDialogAProps> = (props) => {
  const {
    isOpen = false,
    onClose,
    onSubmit,
    loading,
    disabledSubmit,
    imgSrc,
    onFbClick,
    onGoogleClick,
    TextFieldProps,
    AccountTextFieldProps,
    PasswordTextFieldProps,
    ForgetPasswordLinkProps,
    LoginButtonProps,
    FacebookButtonProps,
    GoogleButtonProps,
    locale = "en",
    ...other
  } = props;
  const lang = langs[locale];
  const classes = useStyles();
  const [values, setValues] = useState(defaultValues);

  const handleChange = (name: keyof Values) => (value: string) => {
    setValues((val) => ({
      ...val,
      [name]: value,
    }));
  };

  return (
    <Dialog open={isOpen} maxWidth="xs" onClose={onClose} fullWidth {...other}>
      <div className={classes.main}>
        <div className={classes.header}>
          <Typography variant="h5" fontWeight={500}>
            {lang.dialogTitle}
          </Typography>
          <IconButton onClick={onClose} edge="end" className={classes.closeBtn}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
        {imgSrc && (
          <div className={classes.image}>
            <img src={imgSrc} alt="login" />
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (onSubmit) {
              onSubmit(values);
              setValues(defaultValues);
            }
          }}
        >
          <div className={classes.fields}>
            <TextField
              fullWidth
              variant="outlined"
              label={lang.account}
              onChange={(e) => {
                handleChange("account")(e.target.value);
              }}
              value={values.account}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon />
                  </InputAdornment>
                ),
              }}
              inputProps={{
                autoComplete: "username",
                spellCheck: false,
                autoCapitalize: "none",
              }}
              {...TextFieldProps}
              {...AccountTextFieldProps}
            />
            <TextField
              fullWidth
              variant="outlined"
              label={lang.password}
              onChange={(e) => {
                handleChange("password")(e.target.value);
              }}
              type="password"
              value={values.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
              }}
              inputProps={{
                autoComplete: "current-password",
                spellCheck: false,
                autoCapitalize: "off",
              }}
              {...TextFieldProps}
              {...PasswordTextFieldProps}
            />
            <Link variant="body2" underline="none" {...ForgetPasswordLinkProps}>
              {lang.forgetPassword}
            </Link>
            <Button
              disabled={disabledSubmit}
              loading={loading}
              fullWidth
              color="primary"
              variant="contained"
              type="submit"
              size="large"
              {...LoginButtonProps}
            >
              {lang.login}
            </Button>
          </div>
        </form>
        <div className={classes.orWith}>
          <Typography variant="body2" align="center" color="textSecondary">
            {lang.orLoginWith}
          </Typography>
        </div>
        <div className={classes.thirdBtns}>
          <FacebookButton onClick={onFbClick} {...FacebookButtonProps} />
          <GoogleButton onClick={onGoogleClick} {...GoogleButtonProps} />
        </div>
      </div>
    </Dialog>
  );
};

export default LoginDialogA;
