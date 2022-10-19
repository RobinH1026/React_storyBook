import React, { ChangeEvent, FC } from "react";

import { Meta } from "@storybook/react";

import { fromJS } from "immutable";
import { Provider } from "react-redux";
import { Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import RadioWithLabel from "@eGroupAI/material/RadioWithLabel";
import RadioField from "@eGroupAI/material-form/RadioField";
import { Field } from "redux-form";
import { Field as ImmutableField } from "redux-form/immutable";
import { green } from "@mui/material/colors";
import { store } from "stories/storyUtils/configureStore";
import { store as immutableStore } from "stories/storyUtils/immutable/configureStore";
import Highlight from "stories/storyUtils/Highlight";
import ReduxForm from "stories/storyUtils/ReduxForm";
import ImmutableReduxForm from "stories/storyUtils/immutable/ReduxForm";

export default {
  title: "Components/RadioWithLabel",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/OlUxH6H4u3DLEmeytXgNkV/Infocenter-UI-Kit?node-id=599%3A1731",
    },
  },
  component: RadioWithLabel,
} as Meta;

const useStyles = makeStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[900],
    },
  },
  checked: {},
});

export const Default: FC = () => {
  const [selectedValue, setSelectedValue] = React.useState("a");
  const classes = useStyles();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <RadioWithLabel
        checked={selectedValue === "a"}
        onChange={handleChange}
        label="Radio"
        name="Radio"
        value="a"
      />
      <RadioWithLabel
        checked={selectedValue === "b"}
        onChange={handleChange}
        label="Radio"
        name="Radio"
        value="b"
      />
      <RadioWithLabel
        classes={classes}
        color="default"
        checked={selectedValue === "c"}
        onChange={handleChange}
        label="Radio"
        name="Radio"
        value="c"
      />
      <RadioWithLabel
        checked={selectedValue === "d"}
        onChange={handleChange}
        label="Radio"
        name="Radio"
        value="d"
        color="default"
      />
      <RadioWithLabel
        checked={selectedValue === "e"}
        onChange={handleChange}
        label="Radio"
        name="Radio"
        value="e"
        color="default"
        size="small"
      />
    </div>
  );
};

export const WithReduxFormField: FC = () => {
  const [values, setValues] = React.useState({
    gender: "male",
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
              name="gender"
              component={RadioField}
              label="male"
              radioValue="male"
            />
            <Field
              name="gender"
              component={RadioField}
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

export const WithReduxFormImmutableField: FC = () => {
  const [values, setValues] = React.useState({
    gender: "male",
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
              name="gender"
              component={RadioField}
              label="male"
              radioValue="male"
            />
            <ImmutableField
              name="gender"
              component={RadioField}
              label="female"
              radioValue="female"
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
