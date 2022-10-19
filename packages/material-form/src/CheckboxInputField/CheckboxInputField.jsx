import React from "react";
import PropTypes from "prop-types";

import CheckboxInput from "@eGroupAI/material/CheckboxInput";

/**
 * A component with Input Field when it checked
 */
const CheckboxInputField = ({
  input: { value, onChange },
  meta,
  onChange: onChangeProp,
  checked: checkedProp,
  MuiInputProps,
  ...other
}) => {
  const {
    onChange: inputOnChange,
    value: inputValue,
    ...otherMuiInputProps
  } = MuiInputProps || {};

  const handleChange = (e) => {
    onChange({
      ...value,
      checked: e.target.checked,
    });
  };

  const handleInputChange = (e) => {
    onChange({
      ...value,
      text: e.target.value,
    });
  };

  const hasValue = typeof value !== "undefined";
  const hasChecked = hasValue && typeof value.checked !== "undefined";
  const hasText = hasValue && typeof value.text !== "undefined";

  return (
    <CheckboxInput
      onChange={handleChange}
      checked={hasChecked ? value.checked : false}
      MuiInputProps={{
        onChange: handleInputChange,
        value: hasText ? value.text : "",
        ...otherMuiInputProps,
      }}
      {...other}
    />
  );
};

CheckboxInputField.propTypes = {
  /**
   * redux from props
   */
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  /**
   * Mui `Input` props
   */
  MuiInputProps: PropTypes.object,
};

export default CheckboxInputField;
