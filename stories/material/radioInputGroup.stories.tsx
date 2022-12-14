import React, { FC } from "react";
import { Provider } from "react-redux";
import Grid from "@mui/material/Grid";
import { Field } from "redux-form";
import RadioInputGroup from "@eGroupAI/material/RadioInputGroup";
import RadioInputGroupField from "@eGroupAI/material-form/RadioInputGroupField";

import { Meta } from "@storybook/react";
import { store } from "stories/storyUtils/configureStore";
import Highlight from "stories/storyUtils/Highlight";
import ReduxForm from "stories/storyUtils/ReduxForm";

export default {
  title: "Components/RadioInputGroup",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/OlUxH6H4u3DLEmeytXgNkV/Infocenter-UI-Kit?node-id=599%3A1731",
    },
  },
  component: RadioInputGroup,
  argTypes: {
    checked: { control: "boolean", defaultValue: true },
    error: { control: "boolean", defaultValue: false },
    label: { control: "text", defaultValue: "Label" },
    helperText: {
      control: "text",
      defaultValue: "fill in this option is required!",
    },
  },
} as Meta;

export const Default: FC = (args) => (
  <RadioInputGroup
    margin="normal"
    fullWidth
    required
    options={[
      {
        value: "1",
        label: "normal radio",
        color: "primary",
      },
      {
        value: "2",
        label: "checked with text input",
        color: "primary",
        toggleInput: true,
      },
      {
        value: "3",
        label: "checked with text input",
        toggleInput: true,
      },
    ]}
    {...args}
  />
);

export const WithReduxFormField: FC = () => {
  const [values, setValues] = React.useState({
    field1: {
      value: "radio2",
      text: "awesome!",
    },
    field2: {
      value: "Monday",
      text: "awesome!",
    },
  });
  const handleChange = (values: any) => {
    setValues(values);
  };
  return (
    <Provider store={store}>
      <Grid container>
        <Grid item xs={6}>
          <ReduxForm onChange={handleChange} initialValues={values}>
            <Field
              name="field1"
              label="with Field"
              component={RadioInputGroupField}
              helperText="please select items"
              fullWidth
              margin="normal"
              options={[
                {
                  label: "normal radio",
                  color: "primary",
                  value: "radio1",
                },
                {
                  label: "checked with text input",
                  color: "primary",
                  value: "radio2",
                  toggleInput: true,
                },
                {
                  label: "checked with text input",
                  value: "radio3",
                  toggleInput: true,
                },
              ]}
            />
            <Field
              name="field2"
              label="with Field"
              component={RadioInputGroupField}
              fullWidth
              margin="normal"
              options={[
                {
                  label: "Monday",
                  value: "Monday",
                },
                {
                  label: "Tuesday",
                  value: "Tuesday",
                },
                {
                  label: "Wednesday",
                  value: "Wednesday",
                },
                {
                  label: "Thursday",
                  value: "Thursday",
                },
                {
                  label: "Friday",
                  value: "Friday",
                },
                {
                  label: "Saturday",
                  value: "Saturday",
                },
                {
                  label: "Sunday",
                  value: "Sunday",
                },
              ]}
            />
            {/* Pass meta props cause the failed prop type and don't worry it's just for demo */}
            <Field
              name="field3"
              label="with Field"
              component={RadioInputGroupField}
              helperText="please select items"
              fullWidth
              margin="normal"
              options={[
                {
                  label: "normal radio",
                  value: "radio1",
                  color: "primary",
                },
                {
                  label: "checked with text input",
                  value: "radio2",
                  color: "primary",
                  toggleInput: true,
                },
                {
                  label: "checked with text input",
                  value: "radio3",
                  toggleInput: true,
                },
              ]}
              meta={{
                invalid: true,
                touched: true,
                error: "fill in this option is required!",
              }}
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
