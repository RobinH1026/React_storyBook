import React, { FC, useState } from "react";

import { useDispatch, Provider } from "react-redux";
import { initialize, Field } from "redux-form/immutable";
import { fromJS } from "immutable";
import makeEditableFieldUtils from "@eGroupAI/hooks/immutable/makeEditableFieldUtils";

import FormFieldGroup from "@eGroupAI/material/FormFieldGroup";
import EditableField from "@eGroupAI/material/EditableField";
import EditableFieldShowing from "@eGroupAI/material/EditableFieldShowing";
import TextLoadingField from "@eGroupAI/material-form/immutable/TextLoadingField";
import { Grid, Typography } from "@mui/material";
import { Meta } from "@storybook/react";
import { store } from "stories/storyUtils/immutable/configureStore";
import ReduxForm, { FORM } from "stories/storyUtils/immutable/ReduxForm";
import Highlight from "stories/storyUtils/Highlight";

const useEditableFieldUtils = makeEditableFieldUtils(FORM);

export default {
  title: "Deprecated/EditableFieldImmutable",
  component: EditableField,
} as Meta;

const Demo = () => {
  const { formValues, handleSave, handleClose } = useEditableFieldUtils();
  const [values, setValues] = useState(
    fromJS({
      field1: "field1",
      field2: "field2",
      field3: "field3",
    })
  );
  const dispatch = useDispatch();

  const handleChange = (values) => {
    setValues(values);
  };

  const handleSubmit = (values) => {
    dispatch(initialize(FORM, values, false));
  };

  return (
    <Grid container>
      <Grid item xs={6}>
        <ReduxForm
          onChange={handleChange}
          onSubmit={handleSubmit}
          initialValues={values}
        >
          <FormFieldGroup required label="Field 1">
            <EditableField
              onSaveClick={handleSave}
              onCloseClick={handleClose}
              disableClickAwayCloseEditing
              style={{ marginLeft: -8 }}
            >
              <EditableFieldShowing>
                <Typography variant="body1">
                  {formValues.get("field1")}
                </Typography>
              </EditableFieldShowing>
              <Field
                label="editing field"
                name="field1"
                margin="normal"
                component={TextLoadingField}
                fullWidth
              />
            </EditableField>
            <EditableField
              onSaveClick={handleSave}
              onCloseClick={handleClose}
              disableClickAwayCloseEditing
              style={{ marginLeft: -8 }}
            >
              <EditableFieldShowing>
                <Typography variant="body1">
                  {formValues.get("field2")}
                </Typography>
              </EditableFieldShowing>
              <Field
                label="editing field2"
                name="field2"
                margin="normal"
                component={TextLoadingField}
                fullWidth
              />
            </EditableField>
            <EditableField
              onSaveClick={handleSave}
              onCloseClick={handleClose}
              disableClickAwayCloseEditing
              style={{ marginLeft: -8 }}
            >
              <EditableFieldShowing>
                <Typography variant="body1">
                  {formValues.get("field3")}
                </Typography>
              </EditableFieldShowing>
              <Field
                label="editing field3"
                name="field3"
                margin="normal"
                component={TextLoadingField}
                fullWidth
              />
            </EditableField>
          </FormFieldGroup>
        </ReduxForm>
      </Grid>
      <Grid item xs={6}>
        <Highlight
          code={JSON.stringify(values.toJS(), null, 4)}
          type="language-json"
        />
      </Grid>
    </Grid>
  );
};
export const WithReduxFormImmutableField: FC = () => (
  <Provider store={store}>
    <Demo />
  </Provider>
);
