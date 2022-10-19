import React, { FC, useMemo } from "react";
import clsx from "clsx";
import useControlled from "@eGroupAI/hooks/useControlled";
import makeStyles from "@mui/styles/makeStyles";
import { format, toDate } from "@eGroupAI/utils/dateUtils";
import { startOfDay } from "date-fns";
import DatePicker, { DatePickerProps } from "../DatePicker";
import { combimeDateTime } from "../NewDateRangePicker/utils";
import TimePicker, { Time } from "../TimePicker";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: "inline-flex",
      width: (props: DateTimePickerProps) =>
        props.fullWidth ? "100%" : undefined,
    },
    timePicker: {
      marginLeft: theme.spacing(),
    },
  }),
  {
    name: "MuiDateTimePicker",
  }
);

export type HandleChangeArgs = {
  nextDate?: Date;
  nextTime?: Time;
};

export interface DateTimePickerProps extends Omit<DatePickerProps, "onChange"> {
  onChange?: (dateTime: Date | null) => void;
}

const DateTimePicker: FC<DateTimePickerProps> = (props) => {
  const classes = useStyles(props);
  const {
    className,
    onChange,
    value,
    defaultValue,
    variant,
    size,
    style,
    ...other
  } = props;
  const [date, setDate] = useControlled({
    controlled: value,
    default: defaultValue || startOfDay(new Date()),
  });

  const time: Time = useMemo(
    () => [format(date, "HH") || "00", format(date, "mm") || "00"],
    [date]
  );

  const handleChange = ({ nextDate, nextTime }: HandleChangeArgs) => {
    if (onChange) {
      const dateTime = combimeDateTime(nextDate || date, nextTime || time);
      if (dateTime !== undefined) {
        const next = dateTime ? toDate(dateTime) : null;
        if (next !== undefined) {
          setDate(next);
          onChange(next);
        }
      }
    }
  };

  return (
    <div className={clsx(className, classes.root)} style={style}>
      <DatePicker
        onChange={(date) => {
          handleChange({
            nextDate: date,
          });
        }}
        value={date}
        variant={variant}
        size={size}
        {...other}
      />
      <TimePicker
        className={classes.timePicker}
        onChange={(time) => {
          handleChange({
            nextTime: time,
          });
        }}
        variant={variant}
        value={time}
        HourProps={{
          size,
        }}
        MinuteProps={{
          size,
        }}
      />
    </div>
  );
};

export default DateTimePicker;
