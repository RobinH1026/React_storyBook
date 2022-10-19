import React, { FC, HTMLAttributes } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { endOfDay } from "date-fns";
import clsx from "clsx";
import FormHelperText from "@mui/material/FormHelperText";
import TimePicker from "../TimePicker";
import DatePicker from "../DatePicker";
import useDateRange, { UseDateRangeArgs } from "./useDateRange";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: (props: NewDateRangePickerProps) =>
        props.fullWidth && props.direction === "column"
          ? "flex"
          : "inline-flex",
      flexDirection: "column",
    },
    blocks: {
      display: "flex",
      flexDirection: (props: NewDateRangePickerProps) => props.direction,
      gap: theme.spacing(1),
    },
    block: {
      display: "flex",
      alignItems: "flex-end",
      gap: theme.spacing(1),
    },
    date: {},
    autocomplete: {},
  }),
  {
    name: "MuiNewDateRangePicker",
  }
);

export interface NewDateRangePickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange">,
    UseDateRangeArgs {
  withTime?: boolean;
  variant?: "standard" | "filled" | "outlined";
  direction?: "row" | "column";
  required?: boolean;
  /**
   * Fullwidth is only work when direction is column.
   */
  fullWidth?: boolean;
  size?: "small" | "medium";
}

const NewDateRangePicker: FC<NewDateRangePickerProps> = (props) => {
  const classes = useStyles(props);
  const {
    className,
    withTime,
    direction,
    variant,
    startDate: startDateProp,
    endDate: endDateProp,
    startTime: startTimeProp,
    endTime: endTimeProp,
    defaultStartDate,
    defaultStartTime,
    defaultEndDate,
    defaultEndTime,
    onChange,
    onStartDateChanege,
    onEndDateChanege,
    onStartTimeChanege,
    onEndTimeChanege,
    required,
    fullWidth,
    size,
    ...other
  } = props;
  const {
    error,
    startDate,
    startTime,
    endDate,
    endTime,
    handleChange,
    handleStartDateChange,
    handleStartTimeChange,
    handleEndDateChange,
    handleEndTimeChange,
  } = useDateRange({
    startDate: startDateProp,
    endDate: endDateProp,
    startTime: startTimeProp,
    endTime: endTimeProp,
    defaultStartDate,
    defaultStartTime,
    defaultEndDate,
    defaultEndTime,
    onChange,
    onStartDateChanege,
    onEndDateChanege,
    onStartTimeChanege,
    onEndTimeChanege,
  });

  return (
    <div className={clsx(className, classes.root)} {...other}>
      <div className={classes.blocks}>
        <div className={classes.block}>
          <DatePicker
            label="起始時間"
            className={classes.date}
            value={startDate}
            onChange={(date) => {
              handleStartDateChange(date);
              handleChange({
                nextStartDate: date,
              });
            }}
            fullWidth={fullWidth}
            variant={variant}
            error={error}
            size={size}
            required={required}
          />
          {withTime && (
            <TimePicker
              variant={variant}
              value={startTime}
              onChange={(time) => {
                handleStartTimeChange(time);
                handleChange({
                  nextStartTime: time,
                });
              }}
              HourProps={{
                className: classes.autocomplete,
                size,
              }}
              MinuteProps={{
                className: classes.autocomplete,
                size,
              }}
            />
          )}
        </div>
        <div className={classes.block}>
          <DatePicker
            label="結束時間"
            className={classes.date}
            value={endDate}
            onChange={(date) => {
              handleEndDateChange(endOfDay(date));
              handleChange({
                nextEndDate: endOfDay(date),
              });
            }}
            fullWidth={fullWidth}
            variant={variant}
            size={size}
            required={required}
          />
          {withTime && (
            <TimePicker
              variant={variant}
              value={endTime}
              onChange={(time) => {
                handleEndTimeChange(time);
                handleChange({
                  nextEndTime: time,
                });
              }}
              HourProps={{
                className: classes.autocomplete,
                size,
              }}
              MinuteProps={{
                className: classes.autocomplete,
                size,
              }}
            />
          )}
        </div>
      </div>
      {error && <FormHelperText error>開始時間應小於結束時間</FormHelperText>}
    </div>
  );
};

export default NewDateRangePicker;
