import React, { ChangeEvent, useState } from "react";

import { Meta, Story } from "@storybook/react";
import { Provider } from "react-redux";
import { Grid, FormGroup } from "@mui/material";
import { Field } from "redux-form";
import Switch, { SwitchProps } from "@eGroupAI/material/Switch";
import SquareSwitch from "@eGroupAI/material/Switch/SquareSwitch";
import SwitchField from "@eGroupAI/material-form/SwitchField";
import { store } from "stories/storyUtils/configureStore";

import ReduxForm from "stories/storyUtils/ReduxForm";
import Highlight from "stories/storyUtils/Highlight";

export default {
  title: "Components/Switch",
  component: Switch,
  argTypes: {
    variant: {
      control: {
        type: "radio",
        options: ["standard", "square"],
      },
    },
    color: {
      control: {
        type: "radio",
        options: [
          "primary",
          "secondary",
          "default",
          "text",
          "success",
          "warning",
          "info",
          "error",
        ],
      },
    },
    disabled: { type: "boolean" },
    label: { type: "string" },
  },
} as Meta;

export const Default: Story<SwitchProps> = (args) => {
  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <Switch
        name="checkedA"
        inputProps={{ "aria-label": "secondary checkbox" }}
        {...args}
        checked={state.checkedA}
        onChange={handleChange}
      />
      <SquareSwitch {...args} />
      <Switch
        name="checkedB"
        inputProps={{ "aria-label": "primary checkbox" }}
        {...args}
        checked={state.checkedB}
        onChange={handleChange}
      />
      <Switch inputProps={{ "aria-label": "primary checkbox" }} {...args} />
      <Switch
        defaultChecked
        inputProps={{ "aria-label": "checkbox with default color" }}
        {...args}
      />
    </div>
  );
};

export const WithLabel: Story<SwitchProps> = () => {
  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormGroup row>
      <Switch
        checked={state.checkedA}
        onChange={handleChange}
        name="checkedA"
        label="Secondary"
      />
      <Switch
        checked={state.checkedB}
        onChange={handleChange}
        name="checkedB"
        color="primary"
        label="Primary"
      />
      <Switch label="Uncontrolled" />
      <Switch disabled label="Disabled" />
      <Switch disabled checked label="Disabled" />
    </FormGroup>
  );
};

export const WithReduxFormField: Story<SwitchProps> = () => {
  const [values, setValues] = useState({
    field1: "value1",
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
              name="field1"
              component={SwitchField}
              switchValue="value1"
              label="field1"
            />
            <Field name="field2" component={SwitchField} switchValue="value2" />
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
