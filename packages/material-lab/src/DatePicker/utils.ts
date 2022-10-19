import {
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  isBefore,
  addDays,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { Falsy } from "./types";

export const chunks = <T>(array: ReadonlyArray<T>, size: number): T[][] =>
  Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
    array.slice(i * size, i * size + size)
  );

export const getDaysInMonth = (date: Date) => {
  const startWeek = startOfWeek(startOfMonth(date));
  const endWeek = endOfWeek(endOfMonth(date));
  const days: Date[] = [];
  for (let curr = startWeek; isBefore(curr, endWeek); ) {
    days.push(curr);
    curr = addDays(curr, 1);
  }
  return days;
};

export const isWithinIntervalValid = (
  date: number | Date,
  startDate: Date | Falsy,
  endDate: Date | Falsy
) => {
  if (startDate && endDate && isBefore(startDate, endDate)) {
    return isWithinInterval(date, {
      start: startDate,
      end: endDate,
    });
  }
  return false;
};

export const isSameDayValid = (
  dateLeft: number | Date | Falsy,
  dateRight: number | Date | Falsy
) => {
  if (dateLeft && dateRight) {
    return isSameDay(dateLeft, dateRight);
  }
  return false;
};
