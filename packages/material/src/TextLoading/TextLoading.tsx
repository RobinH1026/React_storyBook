import React, { forwardRef, ReactNode } from "react";
import {
  StandardTextFieldProps,
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";

export interface BaseTextLoadingProps {
  /**
   * Set TextField in loading status
   */
  loading?: boolean;
  /**
   * Customized Loading Adornment
   */
  loadingAdornment?: ReactNode;
}

export type StandardTextLoadingProps = BaseTextLoadingProps &
  StandardTextFieldProps;
export type FilledTextLoadingProps = BaseTextLoadingProps &
  FilledTextFieldProps;
export type OutlinedTextLoadingProps = BaseTextLoadingProps &
  OutlinedTextFieldProps;

export type TextLoadingProps =
  | StandardTextLoadingProps
  | FilledTextLoadingProps
  | OutlinedTextLoadingProps;

const TextLoading = forwardRef<HTMLDivElement, TextLoadingProps>(
  (props, ref) => {
    const {
      loading,
      loadingAdornment: loadingAdornmentProp,
      InputProps,
      select,
      ...other
    } = props;

    const { endAdornment: endAdornmentProp, ...otherInputProps } =
      InputProps || {};
    // set default loading endAdornment
    const loadingAdornment = loadingAdornmentProp || (
      <InputAdornment position="end" style={{ marginRight: select ? 16 : 0 }}>
        <CircularProgress size={20} />
      </InputAdornment>
    );
    const endAdornment = loading ? loadingAdornment : endAdornmentProp;
    return (
      <TextField
        ref={ref}
        InputProps={{
          endAdornment,
          ...otherInputProps,
        }}
        select={select}
        {...other}
      />
    );
  }
);

export default TextLoading;
