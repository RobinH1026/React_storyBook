import React, { FC } from "react";
import { Provider } from "react-redux";
import Grid from "@mui/material/Grid";
import { Field } from "redux-form/immutable";
import CheckboxInputField from "@eGroupAI/material-form/immutable/CheckboxInputField";

import { fromJS } from "immutable";
import CheckboxInput from "@eGroupAI/material/CheckboxInput";
import { Meta } from "@storybook/react";
import Highlight from "stories/storyUtils/Highlight";
import ReduxForm from "stories/storyUtils/immutable/ReduxForm";
import { store } from "stories/storyUtils/immutable/configureStore";

export default {
  title: "Deprecated/CheckboxInputImmutable",
  component: CheckboxInput,
} as Meta;

export const WithReduxFormImmutableField: FC = () => {
  const [values, setValues] = React.useState({
    field1: {
      checked: true,
    },
  });
  const handleChange = (values: any) => {
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
              name="field1"
              component={CheckboxInputField}
              toggleInput
              label="with Field"
            />
            <Field
              name="field2"
              component={CheckboxInputField}
              toggleInput
              label="with Field"
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
