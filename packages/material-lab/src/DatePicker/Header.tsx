import React from "react";

import { setMonth, getMonth, setYear, getYear } from "date-fns";

import { Grid, IconButton, MenuItem } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Select from "@mui/material/Select";
import { SelectInputProps } from "@mui/material/Select/SelectInput";

const useStyles = makeStyles({
  iconContainer: {
    padding: 5,
  },
  icon: {
    padding: 10,
    "&:hover": {
      background: "none",
    },
  },
});

const MONTHS = [
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
];

const generateYears = (min: number, max: number) =>
  Array(max - min + 1)
    .fill(0)
    .map((y, i) => min + i);

export interface HeaderProps {
  date: Date;
  minDate: Date;
  maxDate: Date;
  setDate: (date: Date) => void;
  nextDisabled: boolean;
  prevDisabled: boolean;
  onClickNext: () => void;
  onClickPrevious: () => void;
}

const Header: React.FC<HeaderProps> = (props) => {
  const classes = useStyles();
  const {
    date,
    minDate,
    maxDate,
    setDate,
    nextDisabled,
    prevDisabled,
    onClickNext,
    onClickPrevious,
  } = props;

  const handleMonthChange: SelectInputProps["onChange"] = (event) => {
    setDate(setMonth(date, parseInt(event.target.value as string)));
  };

  const handleYearChange: SelectInputProps["onChange"] = (event) => {
    setDate(setYear(date, parseInt(event.target.value as string)));
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item className={classes.iconContainer}>
        <IconButton
          className={classes.icon}
          disabled={prevDisabled}
          onClick={onClickPrevious}
          size="large"
        >
          <ChevronLeft color={prevDisabled ? "disabled" : "action"} />
        </IconButton>
      </Grid>
      <Grid item>
        <Select
          value={getYear(date)}
          onChange={handleYearChange}
          MenuProps={{ disablePortal: true }}
          size="small"
        >
          {generateYears(minDate.getFullYear(), maxDate.getFullYear()).map(
            (year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            )
          )}
        </Select>
      </Grid>
      <Grid item>
        <Select
          value={getMonth(date)}
          onChange={handleMonthChange}
          MenuProps={{ disablePortal: true }}
          size="small"
        >
          {MONTHS.map((month, idx) => (
            <MenuItem key={month} value={idx}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item className={classes.iconContainer}>
        <IconButton
          className={classes.icon}
          disabled={nextDisabled}
          onClick={onClickNext}
          size="large"
        >
          <ChevronRight color={nextDisabled ? "disabled" : "action"} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Header;
