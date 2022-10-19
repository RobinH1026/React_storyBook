/**
 * Date utils is base on date-fns but can accept more variant date include string, undefined, number.
 */
import {
  format as dFormat,
  formatDistance as dFormatDistance,
  isValid as dIsValid,
  isBefore as dIsBefore,
  isAfter as dIsAfter,
  toDate as dToDate,
  parseISO,
  differenceInHours as dDifferenceInHours,
  differenceInDays as dDifferenceInDays,
  differenceInWeeks as dDifferenceInWeeks,
  differenceInYears as dDifferenceInYears,
} from "date-fns";
import getDateFnsLocale from "./getDateFnsLocale";
import getNavigatorLanguage from "../getNavigatorLanguage";

const locale = getDateFnsLocale(getNavigatorLanguage());

export type DateVariant = Date | string | number | null;

/**
 * Check if valid date.
 * @param date
 * @returns
 */
export function isValid(date?: unknown) {
  let validDate = date;
  if (typeof validDate === "string") {
    validDate = parseISO(validDate);
  }
  return dIsValid(validDate);
}

/**
 * Convert the given argument to an instance of Date.
 * @param date
 * @param defaultValue
 */
export function toDate(date: DateVariant, defaultValue: Date): Date;
export function toDate(date: DateVariant | undefined, defaultValue: Date): Date;
export function toDate(
  date?: DateVariant,
  defaultValue?: Date
): Date | undefined;
export function toDate(date?: DateVariant, defaultValue?: Date) {
  if (!date || !isValid(date)) {
    return defaultValue;
  }
  if (typeof date === "string") {
    return parseISO(date);
  }
  return dToDate(date);
}

/**
 * Return the formatted date string in the given format. The result may vary by locale.
 * @param date
 * @param format
 * @param options
 * @returns
 */
export function format(
  date?: DateVariant,
  format = "PP",
  options?: Parameters<typeof dFormat>[2]
) {
  const validDate = toDate(date);
  if (!validDate) {
    return undefined;
  }
  return dFormat(validDate, format, {
    locale,
    ...options,
  });
}

/**
 * Return the distance between the given dates in words.
 * @param date
 * @param baseDate
 * @param options
 * @returns
 */
export function formatDistance(
  date?: DateVariant,
  baseDate?: DateVariant,
  options?: Parameters<typeof dFormatDistance>[2]
) {
  const validDate = toDate(date);
  const validBaseDate = toDate(baseDate);
  if (!validDate || !validBaseDate) {
    return undefined;
  }
  return dFormatDistance(validDate, validBaseDate, {
    locale,
    ...options,
  });
}

/**
 * Is the first date after the second one?
 * @param date
 * @param dateToCompare
 * @returns
 */
export function isAfter(date?: DateVariant, dateToCompare?: DateVariant) {
  const validDate = toDate(date);
  const validCompareDate = toDate(dateToCompare);
  if (!validDate || !validCompareDate) {
    return undefined;
  }
  return dIsAfter(validDate, validCompareDate);
}

/**
 * Is the first date before the second one?
 * @param date
 * @param dateToCompare
 * @returns
 */
export function isBefore(date?: DateVariant, dateToCompare?: DateVariant) {
  const validDate = toDate(date);
  const validCompareDate = toDate(dateToCompare);
  if (!validDate || !validCompareDate) {
    return undefined;
  }
  return dIsBefore(validDate, validCompareDate);
}

/**
 * Get the number of hours between the given dates.
 * @param dateLeft
 * @param dateRight
 * @returns
 */
export function differenceInHours(
  dateLeft?: DateVariant,
  dateRight?: DateVariant
) {
  const validDateLeft = toDate(dateLeft);
  const validDateRight = toDate(dateRight);
  if (!validDateLeft || !validDateRight) {
    return undefined;
  }
  return dDifferenceInHours(validDateLeft, validDateRight);
}

/**
 * Get the number of full day periods between two dates. Fractional days are truncated towards zero.
 * @param dateLeft
 * @param dateRight
 * @returns
 */
export function differenceInDays(
  dateLeft?: DateVariant,
  dateRight?: DateVariant
) {
  const validDateLeft = toDate(dateLeft);
  const validDateRight = toDate(dateRight);
  if (!validDateLeft || !validDateRight) {
    return undefined;
  }
  return dDifferenceInDays(validDateLeft, validDateRight);
}

/**
 * Get the number of full weeks between two dates. Fractional weeks are truncated towards zero by default.
 * @param dateLeft
 * @param dateRight
 * @returns
 */
export function differenceInWeeks(
  dateLeft?: DateVariant,
  dateRight?: DateVariant
) {
  const validDateLeft = toDate(dateLeft);
  const validDateRight = toDate(dateRight);
  if (!validDateLeft || !validDateRight) {
    return undefined;
  }
  return dDifferenceInWeeks(validDateLeft, validDateRight);
}

/**
 * Get the number of full years between the given dates.
 * @param dateLeft
 * @param dateRight
 * @returns
 */
export function differenceInYears(
  dateLeft?: DateVariant,
  dateRight?: DateVariant
) {
  const validDateLeft = toDate(dateLeft);
  const validDateRight = toDate(dateRight);
  if (!validDateLeft || !validDateRight) {
    return undefined;
  }
  return dDifferenceInYears(validDateLeft, validDateRight);
}
