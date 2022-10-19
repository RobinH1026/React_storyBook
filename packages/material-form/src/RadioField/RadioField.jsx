import React from "react";
import PropTypes from "prop-types";

import RadioWithLabel from "@eGroupAI/material/RadioWithLabel";

const RadioField = ({
  radioValue,
  input: { value, ...otherInput },
  meta,
  ...other
}) => (
  <RadioWithLabel
    value={radioValue}
    checked={radioValue === value}
    {...otherInput}
    {...other}
  />
);

RadioField.propTypes = {
  /**
   * redux from props
   */
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default RadioField;
