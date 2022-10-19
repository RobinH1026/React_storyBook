import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import { styled } from "@mui/material/styles";
import DateTimePicker, {
  DateTimePickerProps,
} from "@eGroupAI/material-lab/DateTimePicker";

export default {
  title: "Lab/DateTimePicker",
  component: DateTimePicker,
} as Meta;

export const Default: Story<DateTimePickerProps> = (args) => {
  const [date, setDate] = useState<Date | null>(new Date("2022-02-01"));

  return (
    <>
      {date?.toISOString()}
      <br />
      <DateTimePicker
        {...args}
        value={date}
        onChange={(date) => {
          setDate(date);
        }}
      />
    </>
  );
};

const StyledDateTimePicker = styled(DateTimePicker)(({ theme }) => ({
  background: theme.palette.grey[100],

  "& .MuiDateTimePicker-timePicker": {
    margin: 0,
    gap: 0,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
}));

export const WithStyled: Story<DateTimePickerProps> = () => (
  <StyledDateTimePicker variant="outlined" size="small" />
);
