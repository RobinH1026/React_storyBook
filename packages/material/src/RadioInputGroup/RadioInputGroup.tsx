import React, { forwardRef, ReactNode, useMemo, useCallback } from "react";

import warning from "warning";

import FormControl, { FormControlProps } from "@mui/material/FormControl";
import FormLabel, { FormLabelProps } from "@mui/material/FormLabel";
import FormHelperText, {
  FormHelperTextProps,
} from "@mui/material/FormHelperText";
import FormGroup, { FormGroupProps } from "@mui/material/FormGroup";
import useControlled from "@eGroupAI/hooks/useControlled";
import RadioInput, { RadioInputProps } from "../RadioInput";
import RadioInputGroupContext, {
  RadioInputGroupContextProps,
} from "./RadioInputGroupContext";

export interface RadioInputGroupProps
  extends Omit<FormControlProps, "onChange"> {
  /**
   * The content of the FormLabel.
   */
  label?: string;
  /**
   * Options to generate group items.
   */
  options: RadioInputProps[];
  /**
   * The content of the FormHelperText.
   */
  helperText?: ReactNode;
  /**
   * Value of the selected radio button. The DOM API casts this to a string.
   */
  value?: string;
  /**
   * The name used to reference the value of the control.
   */
  name?: string;
  /**
   * Callback fired when a radio button is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange?: RadioInputGroupContextProps["onChange"];
  /**
   * Mui `FormLabel` Props
   */
  MuiFormLabelProps?: FormLabelProps;
  /**
   * Mui `FormGroup` Props
   */
  MuiFormGroupProps?: FormGroupProps;
  /**
   * Mui `FormHelperText` Props
   */
  MuiFormHelperTextProps?: FormHelperTextProps;
}

const RadioInputGroup = forwardRef<HTMLDivElement, RadioInputGroupProps>(
  (props, ref) => {
    const {
      label,
      options,
      helperText,
      value: valueProp,
      name,
      onChange,
      MuiFormLabelProps,
      MuiFormGroupProps,
      MuiFormHelperTextProps,
      children,
      ...other
    } = props;

    const [value, setValue] = useControlled({
      controlled: valueProp,
      default: props.defaultValue as string,
    });

    warning(
      children === undefined,
      "RadioInputGroup should not has children please use `options` only!"
    );

    const handleChange: RadioInputGroupContextProps["onChange"] = useCallback(
      (event, checked) => {
        const newValue = (event.target as HTMLInputElement).value;
        setValue(newValue);

        if (onChange) {
          onChange(event, checked);
        }
      },
      [onChange, setValue]
    );

    const providerValue = useMemo(
      () => ({ name, onChange: handleChange, value }),
      [handleChange, name, value]
    );

    return (
      <FormControl ref={ref} {...other}>
        <FormLabel {...MuiFormLabelProps}>{label}</FormLabel>
        <RadioInputGroupContext.Provider value={providerValue}>
          <FormGroup {...MuiFormGroupProps}>
            {options.map((option) => (
              <RadioInput key={option.value as string} {...option} />
            ))}
          </FormGroup>
        </RadioInputGroupContext.Provider>
        {helperText && (
          <FormHelperText {...MuiFormHelperTextProps}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);

export default RadioInputGroup;
