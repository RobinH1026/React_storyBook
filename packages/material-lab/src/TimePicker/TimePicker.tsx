import React, { FC, HTMLAttributes, useState } from "react";

import useControlled from "@eGroupAI/hooks/useControlled";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import { isValid } from "@eGroupAI/utils/dateUtils";
import { parse } from "date-fns";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";

const hours = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
];
const minutes = [
  "00",
  "05",
  "10",
  "15",
  "20",
  "25",
  "30",
  "35",
  "40",
  "45",
  "50",
  "55",
];

const useStyles = makeStyles(
  () => ({
    root: {
      display: "inline-flex",
      gap: 8,

      "& .MuiAutocomplete-listbox": {
        scrollbarWidth: "none",
        "-ms-overflow-style": "none",
      },
      "& .MuiAutocomplete-listbox::-webkit-scrollbar": {
        width: 0,
      },
    },
    autocomplete: {
      "& .MuiAutocomplete-inputRoot": {
        minWidth: "45px",
      },
      "& .MuiAutocomplete-input": {
        textAlign: "center",
      },
      "& .MuiFormHelperText-root": {
        textAlign: "center",
      },
    },
  }),
  {
    name: "MuiTimePicker",
  }
);

export type Time = [string, string];
export interface TimePickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  hourLabel?: string;
  hourPlaceholder?: string;
  minuteLabel?: string;
  minutePlaceholder?: string;
  variant?: TextFieldProps["variant"];
  onChange?: (time: Time) => void;
  value?: Time;
  defaultValue?: Time;
  HourProps?: Omit<
    AutocompleteProps<string, undefined, true, true>,
    "options" | "renderInput"
  >;
  MinuteProps?: Omit<
    AutocompleteProps<string, undefined, true, true>,
    "options" | "renderInput"
  >;
}

const TimePicker: FC<TimePickerProps> = (props) => {
  const classes = useStyles(props);
  const {
    className,
    hourLabel,
    hourPlaceholder,
    minuteLabel,
    minutePlaceholder,
    variant,
    onChange,
    value: valueProp,
    defaultValue = ["00", "00"],
    HourProps,
    MinuteProps,
    ...other
  } = props;
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
  });
  const [isError, setIsError] = useState(false);

  const handleValidation = (name: string, time: Time) => {
    let result = false;
    setIsError(result);
    if (!isValid(parse(time.join(":"), "HH:mm", new Date()))) {
      result = true;
      setIsError(result);
    }
    return result;
  };

  const handleHourChange = (hour: string) => {
    const hours = Number(hour) < 10 ? `0${Number(hour)}` : `${Number(hour)}`;
    const nextTime: Time = [hours, value[1]];
    const isError = handleValidation("hour", nextTime);
    if (isError) return;
    setValue(nextTime);
    if (onChange) {
      onChange(nextTime);
    }
  };

  const handleMinuteChange = (minute: string) => {
    const minutes =
      Number(minute) < 10 ? `0${Number(minute)}` : `${Number(minute)}`;
    const nextTime: Time = [value[0], minutes];
    const isError = handleValidation("minute", nextTime);
    if (isError) return;
    setValue(nextTime);
    if (onChange) {
      onChange(nextTime);
    }
  };

  return (
    <div className={clsx(className, classes.root)} {...other}>
      <Autocomplete
        {...HourProps}
        className={clsx(classes.autocomplete, HourProps?.className)}
        options={hours}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={hourPlaceholder}
            label={hourLabel}
            variant={variant}
            onChange={(e) => {
              handleHourChange(e.target.value);
            }}
            error={isError}
            helperText={isError && "格式錯誤"}
          />
        )}
        disableClearable
        disablePortal
        freeSolo
        value={value[0]}
        onChange={(e, value) => {
          handleHourChange(value);
        }}
        onBlur={() => {
          if (isError) {
            setValue(value);
          }
        }}
      />
      <Autocomplete
        {...MinuteProps}
        className={clsx(classes.autocomplete, MinuteProps?.className)}
        options={minutes}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={minutePlaceholder}
            label={minuteLabel}
            variant={variant}
            onChange={(e) => {
              handleMinuteChange(e.target.value);
            }}
            error={isError}
          />
        )}
        disableClearable
        disablePortal
        freeSolo
        value={value[1]}
        onChange={(e, value) => {
          handleMinuteChange(value);
        }}
        onBlur={() => {
          if (isError) {
            setValue(value);
          }
        }}
      />
    </div>
  );
};

export default TimePicker;
