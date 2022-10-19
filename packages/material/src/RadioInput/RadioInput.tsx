import React, { forwardRef } from "react";

import withStyles from "@mui/styles/withStyles";
import { createChainedFunction } from "@mui/material";
import Input, { InputProps } from "@mui/material/Input";
import useRadioInputGroup from "../RadioInputGroup/useRadioInputGroup";
import RadioWithLabel, { RadioWithLabelProps } from "../RadioWithLabel";

const StyledInput = withStyles({
  formControl: {
    "label + &": {
      marginTop: 0,
    },
  },
})(Input);

export interface RadioInputProps extends RadioWithLabelProps {
  /**
   * Mui `Input` Props
   */
  MuiInputProps?: InputProps;
  /**
   * Enable show/hide input if checked/unchecked.
   */
  toggleInput?: boolean;
  /**
   * If checked is not null component will be controlled external.
   */
  checked?: boolean;
  /**
   * Name attribute of the `input` element.
   */
  name?: string;
  /**
   * If not controlled, use internal state.
   */
  onChange?: RadioWithLabelProps["onChange"];
}

const RadioInput = forwardRef<unknown, RadioInputProps>((props, ref) => {
  const {
    checked: checkedProp,
    name: nameProp,
    onChange: onChangeProp,
    MuiInputProps,
    toggleInput,
    ...other
  } = props;
  const radioInputGroup = useRadioInputGroup();

  let checked = checkedProp;
  const onChange = createChainedFunction(
    onChangeProp as any,
    radioInputGroup && (radioInputGroup.onChange as any)
  );
  let name = nameProp;

  if (radioInputGroup) {
    if (typeof checked === "undefined") {
      checked = radioInputGroup.value === props.value;
    }
    if (typeof name === "undefined") {
      name = radioInputGroup.name;
    }
  }

  if (toggleInput) {
    return (
      <>
        <RadioWithLabel
          ref={ref}
          checked={checked}
          onChange={onChange}
          {...other}
        />
        {checked && <StyledInput {...MuiInputProps} />}
      </>
    );
  }

  return (
    <RadioWithLabel
      ref={ref}
      checked={checked}
      onChange={onChange}
      {...other}
    />
  );
});

export default RadioInput;
