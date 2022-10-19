import React, { FC } from "react";

import CheckboxWithLabel, {
  CheckboxWithLabelProps,
} from "@eGroupAI/material/CheckboxWithLabel";
import { FieldProps } from "formik";
import useFieldStatus from "../utils/useFieldStatus";

export interface CheckboxFieldProps
  extends Omit<CheckboxWithLabelProps, "form">,
    FieldProps {
  /**
   * ButtonHTMLAttributes form to avoid conflict with FieldProps form.
   */
  buttonForm?: string;
}

const CheckboxField: FC<CheckboxFieldProps> = ({
  field,
  buttonForm,
  form,
  disabled: disabledProp,
  ...other
}) => {
  const { disabled } = useFieldStatus(field, form, disabledProp);

  return (
    <CheckboxWithLabel
      form={buttonForm}
      checked={Boolean(field.value)}
      disabled={disabled}
      {...field}
      {...other}
    />
  );
};

export default CheckboxField;
