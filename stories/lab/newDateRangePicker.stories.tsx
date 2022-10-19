import React, { useState } from "react";

import makeStyles from "@mui/styles/makeStyles";
import { Meta, Story } from "@storybook/react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NewDateRangePicker, {
  NewDateRangePickerProps,
} from "@eGroupAI/material-lab/NewDateRangePicker";
import { Time } from "@eGroupAI/material-lab/TimePicker";
import { format } from "@eGroupAI/utils/dateUtils";
import { endOfWeek } from "date-fns";
import { alpha } from "@mui/material";

export default {
  title: "Lab/NewDateRangePicker",
  component: NewDateRangePicker,
} as Meta;

export const Default: Story<NewDateRangePickerProps> = (args) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  return (
    <>
      {format(startDate, "yyyy-MM-dd HH:mm")} ~{" "}
      {format(endDate, "yyyy-MM-dd HH:mm")}
      <br />
      <NewDateRangePicker
        {...args}
        onStartDateChanege={(date) => {
          setStartDate(date);
        }}
        onEndDateChanege={(date) => {
          setEndDate(date);
        }}
      />
    </>
  );
};

export const WithTime: Story<NewDateRangePickerProps> = (args) => {
  const [startDateTime, setStartDateTime] = useState<Date | null>();
  const [endDateTime, setEndDateTime] = useState<Date | null>();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<Time>(["00", "00"]);
  const [endDate, setEndDate] = useState<Date>(endOfWeek(new Date()));
  const [endTime, setEndTime] = useState<Time>(["23", "59"]);

  return (
    <>
      {format(startDateTime, "yyyy-MM-dd HH:mm")}
      <br />
      {format(endDateTime, "yyyy-MM-dd HH:mm")}
      <br />
      {format(startDate, "yyyy-MM-dd")} {startTime?.join(":")} ~ <br />
      {format(endDate, "yyyy-MM-dd")} {endTime?.join(":")}
      <Box mt={2} />
      <NewDateRangePicker
        withTime
        direction="column"
        fullWidth
        variant="outlined"
        {...args}
        onChange={(startDateTime, endDateTime) => {
          setStartDateTime(startDateTime);
          setEndDateTime(endDateTime);
        }}
        onStartDateChanege={(date) => {
          setStartDate(date);
        }}
        onStartTimeChanege={(time) => {
          setStartTime(time);
        }}
        onEndDateChanege={(date) => {
          setEndDate(date);
        }}
        onEndTimeChanege={(time) => {
          setEndTime(time);
        }}
      />
    </>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiNewDateRangePicker-date": {
      "label + &": {
        marginTop: 24,
      },
      "& .MuiInputBase-input": {
        borderRadius: 4,
        position: "relative",
        backgroundColor: "#fcfcfb",
        fontSize: 16,
        width: "auto",
        padding: "10px 12px",

        // Use the system font instead of the default Roboto font.
        fontFamily: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(","),
        "&:focus": {
          boxShadow: `${alpha("#1976d2", 0.25)} 0 0 0 0.2rem`,
          borderColor: "#1976d2",
        },
      },
    },
    "& .MuiNewDateRangePicker-autocomplete": {
      "& .MuiOutlinedInput-root": {
        padding: 0,
      },
      "& .MuiInputBase-input": {
        backgroundColor: "#fcfcfb",
        padding: "10px 12px !important",

        "&:focus": {
          boxShadow: `${alpha("#1976d2", 0.25)} 0 0 0 0.2rem`,
          borderColor: "#1976d2",
        },
      },
    },
  },
}));

export const WithStyle: Story<NewDateRangePickerProps> = (args) => {
  const classes = useStyles();
  return (
    <>
      <Typography gutterBottom>Date Only</Typography>
      <NewDateRangePicker className={classes.root} {...args} />
      <Typography gutterBottom>With time</Typography>
      <NewDateRangePicker className={classes.root} withTime {...args} />
    </>
  );
};
