import React from "react";
import { Provider } from "react-redux";

import { storiesOf } from "@storybook/react";
import { fromJS } from "immutable";

import { Field } from "redux-form";
import { Field as ImmutableField } from "redux-form/immutable";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SchemaFields from "@eGroupAI/material-form/SchemaFields";
import ImmutableSchemaFields from "@eGroupAI/material-form/immutable/SchemaFields";
import { store as immutableStore } from "stories/storyUtils/immutable/configureStore";
import { store } from "stories/storyUtils/configureStore";
import ReduxForm from "stories/storyUtils/ReduxForm";
import ImmutableReduxForm from "stories/storyUtils/immutable/ReduxForm";
import Highlight from "stories/storyUtils/Highlight";

const defaultSchema = {
  title: "Material Ui Schema Fields",
  description: "A simple example",
  type: "object",
  required: ["field1", "field2", "field3", "field5", "field6"],
  properties: {
    field1: {
      label: "field1",
      name: "field1",
      type: "textarea",
      options: [
        {
          value: "option1",
          label: "option1",
        },
      ],
    },
    field2: {
      label: "field2",
      name: "field2",
      type: "radioGroup",
      options: [
        {
          value: "option1",
          label: "option1",
        },
        {
          value: "option2",
          label: "option2",
        },
      ],
    },
    field3: {
      label: "field3",
      name: "field3",
      type: "checkboxGroup",
      options: [
        {
          name: "option1",
          label: "option1",
          toggleInput: true,
        },
        {
          name: "option2",
          label: "option2",
        },
      ],
    },
    field4: {
      label: "field4",
      name: "field4",
      type: "text",
    },
    field5: {
      label: "field5",
      name: "field5",
      type: "boolean",
    },
    field6: {
      MuiTextFieldProps: {
        label: "Single Select",
        fullWidth: true,
      },
      name: "field6",
      type: "select",
      options: [
        {
          value: "option1",
          label: "option1",
        },
        {
          value: "option2",
          label: "option2",
        },
      ],
    },
    field7: {
      label: "field7",
      name: "field7",
      type: "test error",
    },
  },
};

storiesOf("Deprecated/SchemaFields", module)
  .addDecorator((story) => <Provider store={store}>{story()}</Provider>)
  .add("with Field", () => {
    const Form = () => {
      const [values, setValues] = React.useState({});
      const schema = React.useMemo(() => defaultSchema, []);
      const handleFieldError = React.useCallback(
        (value, allValues, formProps, name, properties) =>
          `「${
            properties[name].label || properties[name].MuiTextFieldProps.label
          }」是必填欄位`,
        []
      );
      const handleChange = (values) => {
        setValues(values);
      };
      const handleSubmit = (values) => {
        setValues(values);
      };
      return (
        <Grid container>
          <Grid item xs={6}>
            <ReduxForm
              onSubmit={handleSubmit}
              onChange={handleChange}
              initialValues={values}
            >
              <Typography variant="h6">Group 1</Typography>
              <SchemaFields schema={schema} />
              <Typography variant="h6">Group 2</Typography>
              <SchemaFields
                schema={schema}
                isRequiredError={handleFieldError}
                atLeastOneIsRequiredError={handleFieldError}
                renderField={(
                  fieldProps,
                  { schema, key, index, fieldType }
                ) => (
                  <div key={key}>
                    # {index}
                    <br />
                    fieldType={fieldType}
                    <Field margin="normal" {...fieldProps} />
                  </div>
                )}
              />
              <button type="submit">Submit</button>
            </ReduxForm>
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
    return <Form />;
  });

storiesOf("Deprecated/SchemaFields", module)
  .addDecorator((story) => (
    <Provider store={immutableStore}>{story()}</Provider>
  ))
  .add("with immutable Field", () => {
    const Form = () => {
      const [values, setValues] = React.useState({});
      const schema = React.useMemo(() => defaultSchema, []);
      const handleFieldError = React.useCallback(
        (value, allValues, formProps, name, properties) =>
          `「${
            properties[name].label || properties[name].MuiTextFieldProps.label
          }」是必填欄位`,
        []
      );
      const handleChange = (values) => {
        setValues(values.toJS());
      };
      const handleSubmit = (values) => {
        setValues(values.toJS());
      };
      return (
        <Grid container>
          <Grid item xs={6}>
            <ImmutableReduxForm
              onSubmit={handleSubmit}
              onChange={handleChange}
              initialValues={fromJS(values)}
            >
              <Typography variant="h6">Group 1</Typography>
              <ImmutableSchemaFields schema={schema} />
              <Typography variant="h6">Group 2</Typography>
              <ImmutableSchemaFields
                schema={schema}
                isRequiredError={handleFieldError}
                atLeastOneIsRequiredError={handleFieldError}
                renderField={(
                  fieldProps,
                  { schema, key, index, fieldType }
                ) => (
                  <div key={key}>
                    # {index}
                    <br />
                    fieldType={fieldType}
                    <ImmutableField margin="normal" {...fieldProps} />
                  </div>
                )}
              />
              <button type="submit">Submit</button>
            </ImmutableReduxForm>
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
    return <Form />;
  });
