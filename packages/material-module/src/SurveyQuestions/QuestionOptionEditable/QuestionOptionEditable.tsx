import React, { forwardRef, useEffect, useState } from "react";

import isLength from "validator/lib/isLength";
import clsx from "clsx";
import useInputActions from "@eGroupAI/hooks/useInputActions";

import makeStyles from "@mui/styles/makeStyles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { TextFieldProps } from "@mui/material/TextField";
import Icomoon from "@eGroupAI/material/Icomoon";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { QuestionOptionType } from "../../Survey/types";
import StyledTextField from "./StyledTextField";
import QuestionOptionDecorated from "../QuestionOptionDecorated";
import DragIcon from "../DragIcon";

const useStyles = makeStyles(
  (theme) => ({
    option: {
      display: "flex",
      alignItems: "center",

      "& $dragIcon": {
        visibility: "hidden",
      },

      "&:hover": {
        "& $dragIcon": {
          visibility: "visible",
        },
      },
    },
    hideDragIcon: {
      "&:hover": {
        "& $dragIcon": {
          visibility: "hidden",
        },
      },
    },
    hide: {
      visibility: "hidden",
    },
    dragIcon: {
      paddingLeft: 4,
      color: theme.egPalette.text[2],
    },
  }),
  {
    name: "MuiEgQuestionOptionEditable",
  }
);
export interface QuestionOptionEditableProps {
  className?: string;
  type: QuestionOptionType;
  index: number;
  MuiIconButtonProps?: IconButtonProps;
  hideCloseIconButton?: boolean;
  hideDragIcon?: boolean;
  DragHandleProps?: DraggableProvidedDragHandleProps;
  MuiTextFieldProps?: TextFieldProps;
}

const MAX_OPTION = 50;

const QuestionOptionEditable = forwardRef<
  HTMLDivElement,
  QuestionOptionEditableProps
>((props, ref) => {
  const {
    className,
    type = "radio",
    index,
    hideDragIcon,
    hideCloseIconButton,
    DragHandleProps,
    MuiTextFieldProps = {},
    MuiIconButtonProps = {},
    ...other
  } = props;
  const classes = useStyles();
  const { onChange, onFocus, autoFocus, ...otherMuiTextFieldProps } =
    MuiTextFieldProps;
  const [value, setValue] = useState();
  const { inputEl, select } = useInputActions();
  const isError = !isLength(value || "", {
    min: 0,
    max: MAX_OPTION,
  });

  useEffect(() => {
    if (autoFocus) {
      select();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (
      onChange &&
      isLength(e.target.value, {
        min: 0,
        max: MAX_OPTION,
      })
    ) {
      onChange(e);
    }
  };

  return (
    <div
      className={clsx(className, classes.option, {
        [classes.hideDragIcon]: hideDragIcon,
      })}
      ref={ref}
      {...other}
    >
      <div {...DragHandleProps}>
        <DragIcon className={classes.dragIcon} fontSize="small" />
      </div>
      <QuestionOptionDecorated type={type} index={index} />
      <StyledTextField
        variant="standard"
        inputRef={inputEl}
        onChange={handleChange}
        onFocus={(e) => {
          select();
          if (onFocus) {
            onFocus(e);
          }
        }}
        value={value}
        error={isError}
        helperText={isError ? `選項請勿超過 ${MAX_OPTION} 個字元` : undefined}
        autoFocus={autoFocus}
        {...otherMuiTextFieldProps}
      />
      <IconButton
        {...MuiIconButtonProps}
        className={clsx(MuiIconButtonProps.className, {
          [classes.hide]: hideCloseIconButton,
        })}
        size="large"
      >
        <Icomoon type="delete_1" color="error" />
      </IconButton>
    </div>
  );
});

export default QuestionOptionEditable;
