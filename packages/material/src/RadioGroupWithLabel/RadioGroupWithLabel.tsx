import React, { forwardRef } from "react";
import warning from "warning";

import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormHelperText,
  FormControlProps,
  FormLabelProps,
  RadioGroupProps,
  FormHelperTextProps,
} from "@mui/material";
import RadioWithLabel, { RadioWithLabelProps } from "../RadioWithLabel";

export interface RadioGroupWithLabelProps extends FormControlProps {
  /**
   * The content of the FormLabel.
   */
  label?: string;
  /**
   * Options to generate group items.
   */
  options: RadioWithLabelProps[];
  /**
   * The content of the FormHelperText.
   */
  helperText?: string;
  /**
   * Mui `FormLabel` Props
   */
  MuiFormLabelProps?: FormLabelProps;
  /**
   * Mui `RadioGroup` Props
   */
  MuiRadioGroupProps?: RadioGroupProps;
  /**
   * Mui `FormHelperText` Props
   */
  MuiFormHelperTextProps?: FormHelperTextProps;
}

const RadioGroupWithLabel = forwardRef<
  HTMLDivElement,
  RadioGroupWithLabelProps
>((props, ref) => {
  const {
    label,
    options,
    helperText,
    MuiFormLabelProps,
    MuiRadioGroupProps,
    MuiFormHelperTextProps,
    children,
    ...other
  } = props;

  warning(
    children === undefined,
    "RadioGroupWithLabel should not has children please use `options` only!"
  );

  return (
    <FormControl ref={ref} {...other}>
      <FormLabel {...MuiFormLabelProps}>{label}</FormLabel>
      <RadioGroup {...MuiRadioGroupProps}>
        {options.map((option) => (
          <RadioWithLabel {...option} />
        ))}
      </RadioGroup>
      {helperText && (
        <FormHelperText {...MuiFormHelperTextProps}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
});

export default RadioGroupWithLabel;
