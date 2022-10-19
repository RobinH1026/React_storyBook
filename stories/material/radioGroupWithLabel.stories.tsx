import React, { FC } from "react";

import { fromJS } from "immutable";
import { Meta } from "@storybook/react";

import { Provider } from "react-redux";
import Grid from "@mui/material/Grid";
import RadioGroupWithLabel from "@eGroupAI/material/RadioGroupWithLabel";
import RadioGroupField from "@eGroupAI/material-form/RadioGroupField";
import { Field } from "redux-form";
import { Field as ImmutableField } from "redux-form/immutable";
import Highlight from "stories/storyUtils/Highlight";
import { store } from "stories/storyUtils/configureStore";
import { store as immutableStore } from "stories/storyUtils/immutable/configureStore";
import ReduxForm from "stories/storyUtils/ReduxForm";
import ImmutableReduxForm from "stories/storyUtils/immutable/ReduxForm";

export default {
  title: "Components/RadioGroupWithLabel",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/OlUxH6H4u3DLEmeytXgNkV/Infocenter-UI-Kit?node-id=599%3A1731",
    },
  },
  component: RadioGroupWithLabel,
} as Meta;

export const Default: FC = () => (
  <RadioGroupWithLabel
    margin="normal"
    fullWidth
    required
    label="default"
    error
    helperText="fill in this option is required!"
    options={[
      {
        key: "label1",
        value: "1",
        label: "label1",
      },
      {
        key: "label2",
        value: "2",
        label: "label2",
      },
      {
        key: "label3",
        value: "3",
        label: "label3",
      },
    ]}
  />
);

export const WithReduxFormField: FC = () => {
  const [values, setValues] = React.useState({
    gender: "male",
    day: "Monday",
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
              component={RadioGroupField}
              margin="normal"
              fullWidth
              helperText="please choose your gender"
              required
              label="gender"
              options={[
                {
                  key: "male",
                  value: "male",
                  label: "male",
                },
                {
                  key: "female",
                  value: "female",
                  label: "female",
                },
              ]}
            />
            <Field
              name="day"
              component={RadioGroupField}
              margin="normal"
              fullWidth
              required
              label="pick one day"
              options={[
                {
                  key: "Monday",
                  value: "Monday",
                  label: "Monday",
                },
                {
                  key: "Tuesday",
                  value: "Tuesday",
                  label: "Tuesday",
                },
                {
                  key: "Wednesday",
                  value: "Wednesday",
                  label: "Wednesday",
                },
                {
                  key: "Thursday",
                  value: "Thursday",
                  label: "Thursday",
                },
                {
                  key: "Friday",
                  value: "Friday",
                  label: "Friday",
                },
                {
                  key: "Saturday",
                  value: "Saturday",
                  label: "Saturday",
                },
                {
                  key: "Sunday",
                  value: "Sunday",
                  label: "Sunday",
                },
              ]}
            />
            <Field
              name="gender2"
              component={RadioGroupField}
              margin="normal"
              fullWidth
              helperText="please choose your gender"
              required
              label="gender"
              options={[
                {
                  key: "male",
                  value: "male",
                  label: "male",
                },
                {
                  key: "female",
                  value: "female",
                  label: "female",
                },
              ]}
              /* Pass meta props cause the failed prop type and don't worry it's just for demo */
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

export const WithReduxFormImmutableField: FC = () => {
  const [values, setValues] = React.useState({
    gender: "male",
    day: "Monday",
  });
  const handleChange = (values) => {
    setValues(values.toJS());
  };
  return (
    <Provider store={immutableStore}>
      <Grid container>
        <Grid item xs={6}>
          <ImmutableReduxForm
            onChange={handleChange}
            initialValues={fromJS(values) as Partial<any>}
          >
            <ImmutableField
              name="gender"
              component={RadioGroupField}
              margin="normal"
              fullWidth
              helperText="please choose your gender"
              required
              label="gender"
              options={[
                {
                  key: "male",
                  value: "male",
                  label: "male",
                },
                {
                  key: "female",
                  value: "female",
                  label: "female",
                },
              ]}
            />
            <ImmutableField
              name="day"
              component={RadioGroupField}
              margin="normal"
              fullWidth
              required
              label="pick one day"
              options={[
                {
                  key: "Monday",
                  value: "Monday",
                  label: "Monday",
                },
                {
                  key: "Tuesday",
                  value: "Tuesday",
                  label: "Tuesday",
                },
                {
                  key: "Wednesday",
                  value: "Wednesday",
                  label: "Wednesday",
                },
                {
                  key: "Thursday",
                  value: "Thursday",
                  label: "Thursday",
                },
                {
                  key: "Friday",
                  value: "Friday",
                  label: "Friday",
                },
                {
                  key: "Saturday",
                  value: "Saturday",
                  label: "Saturday",
                },
                {
                  key: "Sunday",
                  value: "Sunday",
                  label: "Sunday",
                },
              ]}
            />
            <ImmutableField
              name="gender2"
              component={RadioGroupField}
              margin="normal"
              fullWidth
              helperText="please choose your gender"
              required
              label="gender"
              options={[
                {
                  key: "male",
                  value: "male",
                  label: "male",
                },
                {
                  key: "female",
                  value: "female",
                  label: "female",
                },
              ]}
              /* Pass meta props cause the failed prop type and don't worry it's just for demo */
              meta={{
                invalid: true,
                touched: true,
                error: "fill in this option is required!",
              }}
            />
          </ImmutableReduxForm>
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
