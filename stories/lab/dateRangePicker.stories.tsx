import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import { startOfMonth, endOfWeek, endOfMonth } from "date-fns";

import DateRangePicker, {
  DateRangePickerProps,
} from "@eGroupAI/material-lab/DateRangePicker";
import DialogContent from "@eGroupAI/material/DialogContent";
import Dialog from "@eGroupAI/material/Dialog";

export default {
  title: "Lab/DateRangePicker",
  component: DateRangePicker,
} as Meta;

export const Default: Story<DateRangePickerProps> = (args) => {
  const date = new Date();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  return (
    <>
      {JSON.stringify({
        startDate,
        endDate,
      })}
      <br />
      <DateRangePicker
        defaultStartDate={startOfMonth(date)}
        defaultEndDate={endOfWeek(date)}
        onChange={(dateRange, focused) => {
          setStartDate(dateRange[0]);
          setEndDate(dateRange[1]);
        }}
        {...args}
      />
      <br />
      <DateRangePicker
        onChange={(dateRange, focused) => {
          setStartDate(dateRange[0]);
          setEndDate(dateRange[1]);
        }}
        startDateProps={{
          label: "startDate",
        }}
        endDateProps={{
          label: "endDate",
        }}
        {...args}
      />
    </>
  );
};

export const WithMaxAndMin: Story<DateRangePickerProps> = (args) => {
  const date = new Date();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  return (
    <>
      {JSON.stringify({
        startDate,
        endDate,
      })}
      <br />
      <DateRangePicker
        defaultStartDate={date}
        defaultEndDate={endOfWeek(date)}
        minDate={startOfMonth(date)}
        maxDate={endOfMonth(date)}
        onChange={(dateRange, focused) => {
          setStartDate(dateRange[0]);
          setEndDate(dateRange[1]);
        }}
        startDateProps={{
          label: "startDate",
        }}
        endDateProps={{
          label: "endDate",
        }}
        {...args}
      />
    </>
  );
};

export const WithDialog: Story<DateRangePickerProps> = (args) => (
  <Dialog open>
    <DialogContent>
      <DateRangePicker
        startDateProps={{
          label: "startDate",
        }}
        endDateProps={{
          label: "endDate",
        }}
        {...args}
      />
    </DialogContent>
  </Dialog>
);

export const WithTime: Story<DateRangePickerProps> = (args) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  return (
    <>
      {JSON.stringify({
        startDate,
        endDate,
      })}
      <br />
      <DateRangePicker
        showTime
        defaultStartDate={new Date()}
        onChange={(dateRange, focused) => {
          setStartDate(dateRange[0]);
          setEndDate(dateRange[1]);
        }}
        startDateProps={{
          label: "startDate",
        }}
        endDateProps={{
          label: "endDate",
        }}
        {...args}
      />
      <br />
      <DateRangePicker
        showTime
        onChange={(dateRange, focused) => {
          setStartDate(dateRange[0]);
          setEndDate(dateRange[1]);
        }}
        startDateProps={{
          label: "startDate",
        }}
        endDateProps={{
          label: "endDate",
        }}
        {...args}
      />
    </>
  );
};
