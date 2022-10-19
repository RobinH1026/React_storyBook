import React, { ReactNode, FC } from "react";

import makeStyles from "@mui/styles/makeStyles";
import Dialog from "@eGroupAI/material/Dialog";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@eGroupAI/material/MenuItem";
import UploadButton from "@eGroupAI/material/UploadButton";
import Button, { ButtonProps } from "@eGroupAI/material/Button";
import TextField from "@eGroupAI/material/TextField";
import Typography from "@eGroupAI/material/Typography";
import IconButton from "@eGroupAI/material/IconButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import { FeedbackDialogProps } from "./typings";
import { defaultValues } from "./utils";
import langs from "./langs";
import useFormHandlers from "./useFormHandlers";
import countries from "./countries";
import CountryOption from "./CountryOption";

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
  closeBtn: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "currentcolor",
  },
  fields: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
}));

export interface FeedbackDialogBProps extends FeedbackDialogProps {
  content?: ReactNode;
  SupportButtonProps?: ButtonProps;
}

const FeedbackDialogB: FC<FeedbackDialogBProps> = (props) => {
  const {
    isOpen = false,
    onClose,
    onSubmit,
    content,
    loading,
    disabledSubmit,
    isUploading,
    hideCountry = false,
    hideCompany = false,
    hideImageUpload = false,
    typeOptions,
    onUploadChange,
    locale = "en-US",
    SupportButtonProps,
    TextFieldProps,
    UploadButtonProps,
    SubmitButtonProps,
    ...other
  } = props;
  const lang = langs[locale];
  const classes = useStyles();
  const { values, setValues, errors, handleChange, handleValidation } =
    useFormHandlers();

  return (
    <Dialog open={isOpen} maxWidth="sm" onClose={onClose} fullWidth {...other}>
      <div className={classes.main}>
        <div className={classes.header}>
          <Typography variant="h5" fontWeight={500}>
            {lang.dialogTitle}
          </Typography>
          <IconButton onClick={onClose} edge="end" className={classes.closeBtn}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
        <Typography variant="body1" color="textSecondary">
          {content}
        </Typography>
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
            <div>
              <Button
                variant="outlined"
                color="primary"
                type="button"
                endIcon={<ArrowForwardIosIcon />}
                size="large"
                {...SupportButtonProps}
              >
                {lang.support}
              </Button>
            </div>
            {!hideCountry && (
              <Autocomplete
                options={countries}
                autoHighlight
                getOptionLabel={(option) =>
                  option.native?.common || option.common
                }
                renderOption={(props, option) => (
                  <CountryOption
                    name={option.native?.common || option.common}
                    code={option.cca2}
                    {...props}
                  />
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="outlined"
                    label={lang.country}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                    {...TextFieldProps}
                  />
                )}
                onChange={(e, value) => {
                  handleChange("country")(value?.official || "");
                }}
              />
            )}
            {!hideCompany && (
              <TextField
                fullWidth
                variant="outlined"
                label={lang.company}
                onChange={(e) => {
                  handleChange("company")(e.target.value);
                }}
                value={values.company}
                {...TextFieldProps}
              />
            )}
            <TextField
              fullWidth
              variant="outlined"
              label={lang.name}
              onChange={(e) => {
                handleChange("name")(e.target.value);
              }}
              required
              value={values.name}
              inputProps={{ maxLength: 10 }}
              {...TextFieldProps}
            />
            <TextField
              fullWidth
              variant="outlined"
              label={lang.email}
              type="email"
              onChange={(e) => {
                handleValidation("email", e.target.value);
                handleChange("email")(e.target.value);
              }}
              required
              value={values.email}
              inputProps={{ maxLength: 100 }}
              error={errors.email}
              helperText={errors.email && lang.emailError}
              {...TextFieldProps}
            />
            <TextField
              fullWidth
              variant="outlined"
              label={lang.telephone}
              onChange={(e) => {
                handleValidation("phone", e.target.value);
                handleChange("phone")(e.target.value);
              }}
              required
              value={values.phone}
              error={errors.phone}
              helperText={errors.phone && lang.telephoneError}
              {...TextFieldProps}
            />
            {typeOptions && (
              <TextField
                fullWidth
                variant="outlined"
                select
                onChange={(e) => {
                  handleChange("type")(e.target.value);
                }}
                required
                value={values.type}
                label={lang.responseType}
                {...TextFieldProps}
              >
                {typeOptions.map((el) => (
                  <MenuItem key={JSON.stringify(el.value)} value={el.value}>
                    {el.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
            <TextField
              fullWidth
              variant="outlined"
              label={lang.title}
              onChange={(e) => {
                handleChange("title")(e.target.value);
              }}
              required
              value={values.title}
              inputProps={{ maxLength: 40 }}
              {...TextFieldProps}
            />
            <TextField
              fullWidth
              variant="outlined"
              label={lang.content}
              multiline
              minRows={5}
              onChange={(e) => {
                handleChange("content")(e.target.value);
              }}
              required
              value={values.content}
              {...TextFieldProps}
            />
            {!hideImageUpload && (
              <UploadButton
                loading={isUploading}
                onChange={onUploadChange}
                variant="outlined"
                multiple
                fullWidth
                accept="image/*"
                {...UploadButtonProps}
              >
                {lang.uploadImage}
              </UploadButton>
            )}
            <Button
              disabled={Object.values(errors).includes(true) || disabledSubmit}
              loading={loading}
              fullWidth
              color="primary"
              variant="contained"
              type="submit"
              size="large"
              {...SubmitButtonProps}
            >
              {lang.submit}
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default FeedbackDialogB;
