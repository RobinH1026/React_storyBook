import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import { styled } from "@mui/material/styles";
import DatePicker, { DatePickerProps } from "@eGroupAI/material-lab/DatePicker";
import TimePicker, { Time } from "@eGroupAI/material-lab/TimePicker";
import { endOfWeek, startOfWeek } from "date-fns";
import Dialog from "@eGroupAI/material/Dialog";
import DialogContent from "@eGroupAI/material/DialogContent";
import { format } from "@eGroupAI/utils/dateUtils";
import { Button } from "@mui/material";

export default {
  title: "Lab/DatePicker",
  component: DatePicker,
} as Meta;

export const Default: Story<DatePickerProps> = (args) => {
  const [date, setDate] = useState<Date>();

  return (
    <>
      {date?.toISOString()}
      <br />
      <DatePicker
        {...args}
        onChange={(date) => {
          setDate(date);
        }}
      />
    </>
  );
};

const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  background: theme.palette.grey[100],

  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
}));

const StyledTimePicker = styled(TimePicker)(({ theme }) => ({
  "& .MuiAutocomplete-root": {
    background: theme.palette.grey[100],
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
}));

export const WithStyled: Story<DatePickerProps> = () => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<Time>(["00", "00"]);

  return (
    <>
      {format(date, "yyyy-MM-dd")} {time?.join(":")}
      <br />
      <StyledDatePicker
        defaultValue={new Date()}
        onChange={(date) => {
          setDate(date);
        }}
        variant="outlined"
        size="small"
      />
      <StyledTimePicker
        variant="outlined"
        onChange={(time) => {
          setTime(time);
        }}
        HourProps={{
          size: "small",
        }}
        MinuteProps={{
          size: "small",
        }}
      />
    </>
  );
};

export const WithDialog: Story<DatePickerProps> = (args) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <DatePicker label="date" {...args} />
        </DialogContent>
      </Dialog>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
    </>
  );
};

export const WithMaxAndMin: Story<DatePickerProps> = (args) => {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <>
      {date?.toISOString()}
      <br />
      <DatePicker
        {...args}
        minDate={startOfWeek(new Date())}
        maxDate={endOfWeek(new Date())}
        onChange={(date) => {
          setDate(date);
        }}
      />
    </>
  );
};
