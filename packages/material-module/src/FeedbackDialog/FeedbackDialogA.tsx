import React, { FC, useState } from "react";

import makeStyles from "@mui/styles/makeStyles";
import Autocomplete from "@mui/material/Autocomplete";
import Link from "@eGroupAI/material/Link";
import Dialog from "@eGroupAI/material/Dialog";
import MenuItem from "@eGroupAI/material/MenuItem";
import UploadButton from "@eGroupAI/material/UploadButton";
import Button from "@eGroupAI/material/Button";
import TextField from "@eGroupAI/material/TextField";
import Box from "@eGroupAI/material/Box";
import Collapse from "@eGroupAI/material/Collapse";
import Typography from "@eGroupAI/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { FeedbackDialogProps } from "./typings";
import { defaultValues } from "./utils";
import langs from "./langs";
import useFormHandlers from "./useFormHandlers";
import countries from "./countries";
import CountryOption from "./CountryOption";

const useStyles = makeStyles((theme) => ({
  main: {
    marginBottom: 10,
    borderRadius: 10,
    padding: 20,
    "& h5": {
      fontSize: "1.25rem",
      marginRight: theme.spacing(2),
    },
  },
  contactInfo: {
    cursor: "pointer",
    width: "fit-content",
  },
  contactInfoContent: {
    "& a": {
      color: "#007bff",
      fontSize: "12px",
    },
  },
  closeChat: {
    cursor: "pointer",
  },
  submitBtn: {
    width: 200,
  },
}));

export type FeedbackDialogAProps = FeedbackDialogProps;

const FeedbackDialogA: FC<FeedbackDialogAProps> = (props) => {
  const {
    isOpen = false,
    onClose,
    onSubmit,
    loading,
    disabledSubmit,
    isUploading,
    hideCountry = false,
    hideCompany = false,
    hideImageUpload = false,
    typeOptions,
    onUploadChange,
    locale = "en-US",
    TextFieldProps,
    UploadButtonProps,
    SubmitButtonProps,
    ...other
  } = props;
  const lang = langs[locale];
  const classes = useStyles();
  const [contactInfoToggle, setContactInfoToggle] = useState(false);
  const { values, setValues, errors, handleChange, handleValidation } =
    useFormHandlers();

  return (
    <Dialog open={isOpen} maxWidth="sm" onClose={onClose} fullWidth {...other}>
      <Box className={classes.main}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="h5" fontWeight={700}>
            {lang.dialogTitle}
          </Typography>
          <CloseIcon className={classes.closeChat} onClick={onClose} />
        </Box>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (onSubmit) {
              onSubmit(values);
              setValues(defaultValues);
            }
          }}
        >
          {!hideCountry && (
            <Box mb={1}>
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
            </Box>
          )}
          {!hideCompany && (
            <Box mb={1}>
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
            </Box>
          )}
          <Box mb={1}>
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
          </Box>
          <Box mb={1}>
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
          </Box>
          <Box mb={1}>
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
          </Box>
          {typeOptions && (
            <Box mb={1}>
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
            </Box>
          )}
          <Box mb={1}>
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
          </Box>
          <Box mb={1}>
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
          </Box>
          {!hideImageUpload && (
            <Box mb={1}>
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
            </Box>
          )}
          <Box textAlign="center" my={4}>
            <Button
              disabled={Object.values(errors).includes(true) || disabledSubmit}
              loading={loading}
              className={classes.submitBtn}
              fullWidth
              rounded
              color="primary"
              variant="contained"
              type="submit"
              {...SubmitButtonProps}
            >
              {lang.submit}
            </Button>
          </Box>
        </form>
        <Box
          display="flex"
          alignItems="center"
          mb={1}
          className={classes.contactInfo}
          mt={2}
          onClick={() => setContactInfoToggle(!contactInfoToggle)}
        >
          <Typography variant="h5" fontWeight={700}>
            聯絡資訊
          </Typography>
          {contactInfoToggle ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )}
        </Box>
        <Box className={classes.contactInfoContent} pt={3}>
          <Collapse in={contactInfoToggle} timeout="auto" unmountOnExit>
            <Typography variant="body1">eGroupAI Team</Typography>
            <Typography variant="body1">
              <Link href="/">886-2-2362-2508</Link>
            </Typography>
            <Typography variant="body1">
              <Link href="/">service@egroupai.com</Link>
            </Typography>
            <Typography variant="body1">eGroupAI Inc.</Typography>
            <Typography variant="body1">台北市大安區辛亥路二段47號</Typography>
          </Collapse>
        </Box>
      </Box>
    </Dialog>
  );
};

export default FeedbackDialogA;
