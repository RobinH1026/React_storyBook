import React, { FC } from "react";

import { fromJS } from "immutable";

import { Provider } from "react-redux";
import Grid from "@mui/material/Grid";
import { Field } from "redux-form/immutable";
import RadioInputField from "@eGroupAI/material-form/immutable/RadioInputField";
import { store } from "stories/storyUtils/immutable/configureStore";
import Highlight from "stories/storyUtils/Highlight";
import ReduxForm from "stories/storyUtils/immutable/ReduxForm";
import { Meta } from "@storybook/react";
import RadioInput from "@eGroupAI/material/RadioInput";

export default {
  title: "Deprecated/RadioInputImmutable",
  component: RadioInput,
} as Meta;

export const WithReduxFormImmutableField: FC = () => {
  const [values, setValues] = React.useState({
    gender: {
      value: "female",
    },
  });
  const handleChange = (values) => {
    setValues(values.toJS());
  };
  return (
    <Provider store={store}>
      <Grid container>
        <Grid item xs={6}>
          <ReduxForm
            onChange={handleChange}
            initialValues={fromJS(values) as any}
          >
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
