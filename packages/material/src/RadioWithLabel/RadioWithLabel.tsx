import React, { forwardRef, Key } from "react";
import {
  FormControlLabel,
  Radio,
  RadioProps,
  FormControlLabelProps,
} from "@mui/material";
import { styled } from "@mui/styles";

export interface RadioWithLabelProps
  extends Omit<FormControlLabelProps, "control" | "onChange"> {
  key?: Key;
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange?: RadioProps["onChange"];
  /**
   * The size of the checkbox.
   * `small` is equivalent to the dense checkbox styling.
   */
  size?: RadioProps["size"];
  /**
   * Mui `Radio` props
   */
  MuiRadioProps?: RadioProps;
}

const RadioWithLabel = forwardRef<unknown, RadioWithLabelProps>(
  (props, ref) => {
    const { MuiRadioProps, onChange, ...other } = props;

    return (
      <FormControlLabel
        ref={ref}
        control={<Radio {...MuiRadioProps} onChange={onChange} />}
        {...other}
      />
    );
  }
);

export default styled(RadioWithLabel)(() => ({
  color: "#9E9E9E",
  "&:hover > .MuiRadio-root": {
    color: "#3DA5D9",
  },
  "& .Mui-checked": {
    color: "#3DA5D9",
  },
  "& .MuiTouchRipple-root": {
    width: 0,
    height: 0,
  },
  "& .MuiRadio-root:hover": {
    color: "#3DA5D9",
    backgroundColor: "transparent",
  },
  "&:hover > .MuiRadio-root.Mui-checked": {
    "& span>:nth-child(1)": {
      filter: "drop-shadow(0px 0px 4px rgba(61, 165, 217, 0.7))",
    },
    "& span>:nth-child(2)": {
      filter: "drop-shadow(0px 0px 3px rgba(61, 165, 217, 0.7))",
    },
  },
}));
