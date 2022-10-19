import React, { forwardRef } from "react";

import withStyles from "@mui/styles/withStyles";

import Input, { InputProps } from "@mui/material/Input";
import useControlled from "@eGroupAI/hooks/useControlled";
import CheckboxWithLabel, {
  CheckboxWithLabelProps,
} from "../CheckboxWithLabel";

const StyledInput = withStyles({
  formControl: {
    "label + &": {
      marginTop: 0,
    },
  },
})(Input);

export interface CheckboxInputProps extends CheckboxWithLabelProps {
  /**
   * Mui `Input` Props
   */
  MuiInputProps?: InputProps;
  /**
   * Enable show/hide input if checked/unchecked.
   */
  toggleInput?: boolean;
  /**
   * @ignore
   */
  defaultChecked?: boolean;
}

const CheckboxInput = forwardRef<unknown, CheckboxInputProps>((props, ref) => {
  const {
    checked: checkedProp,
    defaultChecked,
    onChange,
    MuiInputProps,
    toggleInput,
    ...other
  } = props;
  const [checkedState, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
  });

  const handleChange: CheckboxWithLabelProps["onChange"] = (event, checked) => {
    setCheckedState(checked);

    if (onChange) {
      onChange(event, checked);
    }
  };

  if (toggleInput) {
    return (
      <>
        <CheckboxWithLabel
          ref={ref}
          checked={checkedState}
          onChange={handleChange}
          {...other}
        />
        {checkedState && <StyledInput {...MuiInputProps} />}
      </>
    );
  }

  return (
    <CheckboxWithLabel
      ref={ref}
      checked={checkedState}
      onChange={handleChange}
      {...other}
    />
  );
});

export default CheckboxInput;
