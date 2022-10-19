import { useEffect, useState } from "react";
import { isAfter, toDate } from "@eGroupAI/utils/dateUtils";
import useControlled from "@eGroupAI/hooks/useControlled";
import { endOfWeek } from "date-fns";
import { combimeDateTime } from "./utils";
import { Time, TimePickerProps } from "../TimePicker";
import { DatePickerProps } from "../DatePicker";

export type HandleChangeArgs = {
  nextStartDate?: Date;
  nextStartTime?: Time;
  nextEndDate?: Date;
  nextEndTime?: Time;
};

export type UseDateRangeArgs = {
  startDate?: DatePickerProps["value"];
  startTime?: TimePickerProps["value"];
  endDate?: DatePickerProps["value"];
  endTime?: TimePickerProps["value"];
  defaultStartDate?: DatePickerProps["defaultValue"];
  defaultStartTime?: TimePickerProps["defaultValue"];
  defaultEndDate?: DatePickerProps["defaultValue"];
  defaultEndTime?: TimePickerProps["defaultValue"];
  onChange?: (startDateTime: Date | null, endDateTime: Date | null) => void;
  onStartDateChanege?: DatePickerProps["onChange"];
  onEndDateChanege?: DatePickerProps["onChange"];
  onStartTimeChanege?: TimePickerProps["onChange"];
  onEndTimeChanege?: TimePickerProps["onChange"];
};

export default function useDateRange({
  startDate: startDateProp,
  endDate: endDateProp,
  startTime: startTimeProp,
  endTime: endTimeProp,
  defaultStartDate = new Date(),
  defaultStartTime = ["00", "00"],
  defaultEndDate = endOfWeek(new Date()),
  defaultEndTime = ["23", "59"],
  onChange,
  onStartDateChanege,
  onEndDateChanege,
  onStartTimeChanege,
  onEndTimeChanege,
}: UseDateRangeArgs) {
  const [startDate, setStartDate] = useControlled({
    controlled: startDateProp,
    default: defaultStartDate,
  });
  const [startTime, setStartTime] = useControlled({
    controlled: startTimeProp,
    default: defaultStartTime,
  });
  const [endDate, setEndDate] = useControlled({
    controlled: endDateProp,
    default: defaultEndDate,
  });
  const [endTime, setEndTime] = useControlled({
    controlled: endTimeProp,
    default: defaultEndTime,
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    const startDateTime = combimeDateTime(startDate, startTime);
    const endDateTime = combimeDateTime(endDate, endTime);
    if (isAfter(startDateTime, endDateTime)) {
      setError(true);
    } else {
      setError(false);
    }
  }, [startDate, startTime, endDate, endTime]);

  const handleChange = ({
    nextStartDate,
    nextStartTime,
    nextEndDate,
    nextEndTime,
  }: HandleChangeArgs) => {
    if (onChange) {
      const startDateTime = combimeDateTime(
        nextStartDate || startDate,
        nextStartTime || startTime
      );
      const endDateTime = combimeDateTime(
        nextEndDate || endDate,
        nextEndTime || endTime
      );
      if (startDateTime !== undefined && endDateTime !== undefined) {
        const nextStart = startDateTime
          ? (toDate(startDateTime) as Date)
          : null;
        const nextEnd = endDateTime ? (toDate(endDateTime) as Date) : null;
        onChange(nextStart, nextEnd);
      }
    }
  };

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
    if (endDate && date.getTime() > endDate.getTime()) {
      setEndDate(date);
      if (onEndDateChanege) {
        onEndDateChanege(date);
      }
    }
    if (onStartDateChanege) {
      onStartDateChanege(date);
    }
  };

  const handleStartTimeChange = (time: Time) => {
    setStartTime(time);
    if (onStartTimeChanege) {
      onStartTimeChanege(time);
    }
  };

  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
    if (onEndDateChanege) {
      onEndDateChanege(date);
    }
  };

  const handleEndTimeChange = (time: Time) => {
    setEndTime(time);
    if (onEndTimeChanege) {
      onEndTimeChanege(time);
    }
  };

  return {
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
  };
}
