import React, { FC } from "react";
import {
  Autocomplete,
  AutocompleteProps,
  TextField,
  StandardTextFieldProps,
  TextFieldProps,
} from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
});
export interface FullTextSearchProps
  extends Omit<StandardTextFieldProps, "onChange" | "variant"> {
  /**
   * Array of options.
   */
  options: string[];
  /**
   * Options type.
   */
  optionType: "record" | "search";
  /**
   * If true, change Autocomplete to loading status.
   */
  loading?: boolean;
  /**
   * Callback fired when the input value is changed.
   */
  onInputChange?: StandardTextFieldProps["onChange"];
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback.
   * @param {T|T[]} value The new value of the component.
   * @param {string} reason One of "create-option", "select-option", "remove-option", "blur" or "clear".
   */
  onChange?: AutocompleteProps<string, undefined, true, true>["onChange"];
  /**
   * The variant to use.
   */
  variant?: TextFieldProps["variant"];
}

const FullTextSearch: FC<FullTextSearchProps> = (props) => {
  const {
    style,
    options,
    onChange,
    onInputChange,
    optionType = "search",
    loading,
    ...other
  } = props;
  const classes = useStyles();

  return (
    <Autocomplete
      style={style}
      options={options}
      classes={{
        option: classes.option,
      }}
      loading={loading}
      autoHighlight
      disableClearable
      freeSolo
      renderOption={(option) => (
        <>
          <span>
            {optionType === "record" ? <AccessTimeIcon /> : <SearchIcon />}
          </span>
          {option}
        </>
      )}
      renderInput={(params) => (
        <TextField
          variant="standard"
          {...params}
          onChange={onInputChange}
          {...other}
        />
      )}
      onChange={onChange}
    />
  );
};

export default FullTextSearch;
