import React from "react";
import PropTypes from "prop-types";

import RadioGroupWithLabel from "@eGroupAI/material/RadioGroupWithLabel";

const RadioGroupField = (props) => {
  const {
    input,
    meta: { touched, invalid, error },
    options,
    error: errorProp,
    helperText,
    MuiRadioGroupProps,
    ...other
  } = props;
  const {
    value: valueProp,
    onChange: onChangeProp,
    ...otherMuiRadioGroupProps
  } = MuiRadioGroupProps || {};
  const isError = touched && invalid;
  return (
    <RadioGroupWithLabel
      options={options}
      MuiRadioGroupProps={{
        value: input.value,
        onChange: input.onChange,
        ...otherMuiRadioGroupProps,
      }}
      error={isError}
      helperText={isError ? error : helperText}
      {...other}
    />
  );
};

RadioGroupField.propTypes = {
  /**
   * redux from props
   */
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  /**
   * Mui `RadioGroup` props
   */
  MuiRadioGroupProps: PropTypes.object,
};

export default RadioGroupField;
