import React from "react";
import PropTypes from "prop-types";

import CheckboxWithLabel from "@eGroupAI/material/CheckboxWithLabel";

const CheckboxField = ({ input: { value, ...otherInput }, meta, ...other }) => (
  <CheckboxWithLabel checked={Boolean(value)} {...otherInput} {...other} />
);

CheckboxField.propTypes = {
  /**
   * redux from props
   */
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default CheckboxField;
