import React, { FC } from "react";
import Select, {
  Props,
  OptionTypeBase,
  MenuPlacement,
  MenuPosition,
} from "react-select";
import CreatableSelect from "react-select/creatable";
import { emphasize, useTheme, TextFieldProps } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import muiComponents from "./components";

export interface OptionType extends OptionTypeBase {
  value: string;
  label: string;
}
export interface ReactSelectProps extends Props<OptionType, boolean> {
  /**
   * Mui `TextField` props.
   */
  MuiTextFieldProps?: TextFieldProps;
  /**
   * The variant to use.
   */
  variant?: "normal" | "creatable";
}

export const useStyles = makeStyles(
  (theme) => ({
    input: {
      display: "flex",
    },
    single: {},
    multi: {},
    multiStandard: {},
    multiFilled: {},
    multiOutlined: {},
    valueContainer: {
      display: "flex",
      flex: 1,
      alignItems: "center",
      flexWrap: "wrap",
      "& > div": {
        padding: 0,
      },
    },
    chip: {
      margin: "0 3px",
    },
    chipFocused: {
      backgroundColor: emphasize(
        theme.palette.mode === "light"
          ? theme.palette.grey[300]
          : theme.palette.grey[700],
        0.08
      ),
    },
    noOptionsMessage: {
      padding: `${theme.spacing()} ${theme.spacing(2)}`,
    },
    singleValue: {},
    indicator: {
      cursor: "pointer",
    },
    separator: {
      alignSelf: "center",
      backgroundColor: "hsl(0,0%,80%)",
      width: 1,
      height: theme.spacing(2),
    },
  }),
  {
    name: "MuiEgReactSelect",
  }
);

const ReactSelect: FC<ReactSelectProps> = (props) => {
  const { components, variant = "normal", ...other } = props;
  const classes = useStyles(props);
  const theme = useTheme();

  // To fixed input text color in type=dark
  const selectStyles = {
    input: (provided: any) => ({
      ...provided,
      color: theme.palette.text.primary,
      "& input": {
        font: "inherit",
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      transition: theme.transitions.create("box-shadow"),
      boxShadow: theme.shadows[1],
      borderRadius: theme.shape.borderRadius,
      border: `1px solid ${theme.palette.divider}`,
    }),
    menuPortal: (provided: any) => ({
      ...provided,
      zIndex: theme.zIndex.modal,
    }),
  };

  const selectProps = {
    classes,
    styles: selectStyles,
    components: {
      ...muiComponents,
      ...components,
    },
    menuPortalTarget: document.body,
    menuPlacement: "auto" as MenuPlacement,
    menuPosition: "fixed" as MenuPosition,
    ...other,
  };

  if (variant === "creatable") {
    return <CreatableSelect {...selectProps} />;
  }

  return <Select {...selectProps} />;
};

export default ReactSelect;
