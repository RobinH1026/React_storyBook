import React, { FC } from "react";

import { fromJS } from "immutable";
import { Provider } from "react-redux";
import Grid from "@mui/material/Grid";
import { Field } from "redux-form/immutable";
import SwitchField from "@eGroupAI/material-form/immutable/SwitchField";
import { store } from "stories/storyUtils/immutable/configureStore";

import ReduxForm from "stories/storyUtils/immutable/ReduxForm";
import Highlight from "stories/storyUtils/Highlight";
import { Meta } from "@storybook/react";
import Switch from "@eGroupAI/material/Switch";

export default {
  title: "Deprecated/SwitchImmutable",
  component: Switch,
} as Meta;

export const WithReduxFormImmutableField: FC = () => {
  const [values, setValues] = React.useState({
    field1: "value1",
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
