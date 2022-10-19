import React, { forwardRef } from "react";
import {
  FormControlLabel,
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormControlLabelProps,
} from "@mui/material";

export interface CheckboxWithLabelProps
  extends Omit<FormControlLabelProps, "control"> {
  /**
   * Mui `Checkbox` props
   */
  MuiCheckboxProps?: MuiCheckboxProps;
}

const CheckboxWithLabel = forwardRef<unknown, CheckboxWithLabelProps>(
  (props, ref) => {
    const { MuiCheckboxProps, ...other } = props;
    return (
      <FormControlLabel
        ref={ref}
        control={<MuiCheckbox {...MuiCheckboxProps} />}
        {...other}
      />
    );
  }
);

export default CheckboxWithLabel;
