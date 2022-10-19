import React, { FC } from "react";

import { fromJS } from "immutable";

import { Provider } from "react-redux";
import Grid from "@mui/material/Grid";
import { Field } from "redux-form/immutable";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import TextLoadingField from "@eGroupAI/material-form/immutable/TextLoadingField";
import TextLoading from "@eGroupAI/material/TextLoading";
import { Meta } from "@storybook/react";
import Highlight from "stories/storyUtils/Highlight";
import ReduxForm from "stories/storyUtils/immutable/ReduxForm";
import { store } from "stories/storyUtils/immutable/configureStore";

export default {
  title: "Deprecated/TextLoadingImmutable",
  component: TextLoading,
} as Meta;

export const WithReduxFormImmutableField: FC = () => {
  const [values, setValues] = React.useState({
    field1: "admin@gmail.com",
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
              label="default"
              name="field1"
              margin="normal"
              component={TextLoadingField}
              fullWidth
            />
            {/* Pass meta props cause the failed prop type and don't worry it's just for demo */}
            <Field
              label="loading"
              name="field2"
              margin="normal"
              component={TextLoadingField}
              fullWidth
              meta={{ asyncValidating: true }}
            />
            {/* Pass meta props cause the failed prop type and don't worry it's just for demo */}
            <Field
              label="error"
              name="field3"
              margin="normal"
              required
              component={TextLoadingField}
              fullWidth
              meta={{
                invalid: true,
                touched: true,
                error: "error message",
              }}
            />
            <Field
              label="select"
              name="field4"
              fullWidth
              loading
              component={TextLoadingField}
              select
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Kg</InputAdornment>
                ),
              }}
              required
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value="option1">option1</MenuItem>
              <MenuItem value="option2">option2</MenuItem>
            </Field>
            <Field
              label="multiple select"
              name="field5"
              SelectProps={{
                multiple: true,
              }}
              fullWidth
              loading
              component={TextLoadingField}
              select
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Kg</InputAdornment>
                ),
              }}
              required
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value="option1">option1</MenuItem>
              <MenuItem value="option2">option2</MenuItem>
            </Field>
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
