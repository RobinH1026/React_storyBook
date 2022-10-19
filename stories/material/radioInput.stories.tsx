import React, { FC, useState } from "react";

import { Meta } from "@storybook/react";

import { Provider } from "react-redux";
import Grid from "@mui/material/Grid";
import RadioInput, { RadioInputProps } from "@eGroupAI/material/RadioInput";
import RadioInputField from "@eGroupAI/material-form/RadioInputField";
import { Field } from "redux-form";
import { WithStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import withStyles from "@mui/styles/withStyles";
import { green } from "@mui/material/colors";
import { store } from "stories/storyUtils/configureStore";
import Highlight from "stories/storyUtils/Highlight";
import ReduxForm from "stories/storyUtils/ReduxForm";

export default {
  title: "Components/RadioInput",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/OlUxH6H4u3DLEmeytXgNkV/Infocenter-UI-Kit?node-id=599%3A1731",
    },
  },
  component: RadioInput,
  argTypes: {
    checked: { control: "boolean" },
    toggleInput: { control: "boolean" },
    label: { control: "text", defaultValue: "Label" },
    color: { control: [] },
  },
} as Meta;

export const Default: FC = (args) => (
  <RadioInput label="RadioInput" value="a" {...args} />
);

const styles = createStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
});

const GreenRadioInputComponent: FC<
  RadioInputProps & WithStyles<typeof styles>
> = ({ classes, ...other }) => (
  <RadioInput classes={classes} color="default" {...other} />
);

const GreenRadioInput = withStyles(styles)(GreenRadioInputComponent);

export const WithCustomized: FC = (args) => (
  <GreenRadioInput label="RadioInput" value="a" {...args} />
);

export const WithReduxFormField: FC = () => {
  const [values, setValues] = useState({
    gender: {
      value: "female",
    },
  });
  const handleChange = (values) => {
    setValues(values);
  };
  return (
    <Provider store={store}>
      <Grid container>
        <Grid item xs={6}>
          <ReduxForm onChange={handleChange} initialValues={values}>
            <Field
              name="gender"
              component={RadioInputField}
              toggleInput
              label="male"
              radioValue="male"
            />
            <Field
              name="gender"
              component={RadioInputField}
              toggleInput
              label="female"
              radioValue="female"
            />
          </ReduxForm>
        </Grid>
        <Grid item xs={6}>
          <Highlight
            code={JSON.stringify(values, null, 4)}
            type="language-json"
          />
        </Grid>
      </Grid>
    </Provider>
  );
};
