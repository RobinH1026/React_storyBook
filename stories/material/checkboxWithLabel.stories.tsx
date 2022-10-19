import React, { FC } from "react";
import { fromJS } from "immutable";
import { Provider } from "react-redux";
import Grid from "@eGroupAI/material/Grid";
import Button from "@eGroupAI/material/Button";
import { Field } from "redux-form";
import { Field as ImmutableField } from "redux-form/immutable";
import { Form, Formik, Field as FormikField } from "formik";
import CheckboxWithLabel from "@eGroupAI/material/CheckboxWithLabel";
import CheckboxField from "@eGroupAI/material-form/CheckboxField";
import FormikCheckboxField from "@eGroupAI/material-formik/CheckboxField";

import { Meta } from "@storybook/react";
import { store } from "stories/storyUtils/configureStore";
import { store as immutableStore } from "stories/storyUtils/immutable/configureStore";
import Highlight from "stories/storyUtils/Highlight";
import ReduxForm from "stories/storyUtils/ReduxForm";
import ImmutableReduxForm from "stories/storyUtils/immutable/ReduxForm";

export default {
  title: "Components/CheckboxWithLabel",
  component: CheckboxWithLabel,
} as Meta;

export const Default: FC = () => <CheckboxWithLabel label="default" />;

export const WithReduxFormField: FC = () => {
  const [values, setValues] = React.useState({
    field1: true,
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
              component={CheckboxField}
              label="checkbox with Field"
            />
            <Field
              name="field2"
              component={CheckboxField}
              label="checkbox with Field"
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
    field1: true,
  });
  const handleChange = (values: any) => {
    setValues(values.toJS());
  };
  return (
    <Provider store={immutableStore}>
      <Grid container>
        <Grid item xs={6}>
          <ImmutableReduxForm
            onChange={handleChange}
            initialValues={fromJS(values) as any}
          >
            <ImmutableField
              name="field1"
              component={CheckboxField}
              label="checkbox with Field"
            />
            <ImmutableField
              name="field2"
              component={CheckboxField}
              label="checkbox with Field"
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

export const WithFormikField: FC = () => {
  const [values, setValues] = React.useState({
    field1: true,
  });
  const handleChange = (values: any) => {
    setValues(values);
  };
  return (
    <Grid container>
      <Grid item xs={6}>
        <Formik onSubmit={handleChange} initialValues={values}>
          <Form>
            <FormikField
              name="field1"
              component={FormikCheckboxField}
              label="checkbox with Field"
            />
            <FormikField
              name="field2"
              component={FormikCheckboxField}
              label="checkbox with Field2"
            />
            <Button type="submit">Submit</Button>
            <Button type="reset">Reset</Button>
          </Form>
        </Formik>
      </Grid>
      <Grid item xs={6}>
        <Highlight
          code={JSON.stringify(values, null, 4)}
          type="language-json"
        />
      </Grid>
    </Grid>
  );
};
