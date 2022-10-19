import React, { FC, useRef, useState } from "react";

import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import useControlled from "@eGroupAI/hooks/useControlled";
import { format, toDate } from "@eGroupAI/utils/dateUtils";
import { isSameDay, addYears, startOfDay } from "date-fns";
import { TextField, TextFieldProps } from "@mui/material";
import EnhancePopover from "@eGroupAI/material/EnhancePopover";

import Menu from "./Menu";

const useStyles = makeStyles(
  () => ({
    root: {
      "& .MuiInputBase-input": {
        width: 95,
        textAlign: "center",
      },

      "& .MuiFormHelperText-root": {
        textAlign: "center",
      },
    },
  }),
  {
    name: "MuiDatePicker",
  }
);

/**
 * Picker behavior is inspire by ant design.
 * https://ant.design/components/date-picker/
 */
export interface DatePickerProps extends Omit<TextFieldProps, "onChange"> {
  value?: Date | null;
  defaultValue?: Date | null;
  minDate?: Date | string;
  maxDate?: Date | string;
  onChange?: (date: Date) => void;
  onDayClick?: (date: Date) => void;
  onCloseClick?: () => void;
}

const DatePicker: FC<DatePickerProps> = (props) => {
  const classes = useStyles(props);
  const {
    className,
    defaultValue,
    minDate: minDateProp,
    maxDate: maxDateProp,
    onChange,
    onDayClick: onDayClickProp,
    onCloseClick,
    value: valueProp,
    ...other
  } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const dateTextEl = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue || startOfDay(new Date()),
  });
  const [hoverDay, setHoverDay] = useState<Date>();
  const minDate = toDate(minDateProp, addYears(new Date(), -100));
  const maxDate = toDate(maxDateProp, addYears(new Date(), 100));

  const handlePopupOpen = () => {
    setOpen(true);
  };

  const handlePopupClose = () => {
    if (onCloseClick) {
      onCloseClick();
    }
    setOpen(false);
  };

  const focusDateText = () => {
    const { current } = dateTextEl;
    if (current) {
      setAnchorEl(current);
      current.focus();
    }
  };

  const handleClick = () => {
    focusDateText();
    handlePopupOpen();
  };

  const handleMenuDayClick = (day: Date) => {
    if (onDayClickProp) {
      onDayClickProp(day);
    }
    setValue(day);
    if (onChange) {
      onChange(day);
    }
    handlePopupClose();
  };

  const handleDayHover = (date: Date) => {
    if (!hoverDay || !isSameDay(date, hoverDay)) {
      setHoverDay(date);
    }
  };

  return (
    <>
      <TextField
        {...other}
        className={clsx(className, classes.root)}
        inputRef={dateTextEl}
        value={format(value, "yyyy-MM-dd") || ""}
        onClick={handleClick}
      />
      <EnhancePopover
        anchorEl={anchorEl}
        open={open}
        onCloseClick={handlePopupClose}
        onClickAway={handlePopupClose}
      >
        <Menu
          date={value}
          minDate={minDate}
          maxDate={maxDate}
          hoverDay={hoverDay}
          onDayClick={handleMenuDayClick}
          onDayHover={handleDayHover}
        />
      </EnhancePopover>
    </>
  );
};

export default DatePicker;
