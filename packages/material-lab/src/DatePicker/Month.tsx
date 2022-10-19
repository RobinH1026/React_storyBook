import React from "react";
import { Grid, Typography, alpha } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { getDate, isSameMonth, format } from "date-fns";
import {
  chunks,
  getDaysInMonth,
  isSameDayValid,
  isWithinIntervalValid,
} from "./utils";
import Header from "./Header";
import Day from "./Day";
import { NavigationAction } from "./types";

const WEEK_DAYS = ["日", "一", "二", "三", "四", "五", "六"];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-flex",
    width: 318,
  },
  weekDaysContainer: {
    marginTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    color: alpha(theme.palette.common.black, 0.6),
  },
  monthContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 15,
    marginBottom: 20,
  },
  weekContainer: {
    margin: "2px 0",
  },
}));

export interface MonthProps {
  date?: Date;
  minDate: Date;
  maxDate: Date;
  hoverDay?: Date;
  selectedDate: Date;
  selectedMonth: Date;
  marker?: symbol;
  navState: [boolean, boolean];
  setSelectedMonth: (date: Date) => void;
  onDayClick?: (date: Date) => void;
  onDayHover?: (date: Date) => void;
  onMonthNavigate?: (action: NavigationAction, marker?: symbol) => void;
}

const Month: React.FC<MonthProps> = (props) => {
  const classes = useStyles();
  const {
    selectedDate,
    selectedMonth,
    marker,
    setSelectedMonth,
    minDate,
    maxDate,
    onDayClick,
    onDayHover,
    onMonthNavigate,
  } = props;
  const [back, forward] = props.navState;

  return (
    <div className={classes.root}>
      <Grid container>
        <Header
          date={selectedMonth}
          setDate={setSelectedMonth}
          minDate={minDate}
          maxDate={maxDate}
          nextDisabled={!forward}
          prevDisabled={!back}
          onClickPrevious={() => {
            if (onMonthNavigate) {
              onMonthNavigate(NavigationAction.Previous, marker);
            }
          }}
          onClickNext={() => {
            if (onMonthNavigate) {
              onMonthNavigate(NavigationAction.Next, marker);
            }
          }}
        />

        <Grid
          item
          container
          justifyContent="space-between"
          className={classes.weekDaysContainer}
        >
          {WEEK_DAYS.map((day) => (
            <Typography variant="body2" color="inherit" key={day}>
              {day}
            </Typography>
          ))}
        </Grid>

        <Grid
          item
          container
          direction="column"
          className={classes.monthContainer}
        >
          {chunks(getDaysInMonth(selectedMonth), 7).map((week) => (
            <Grid
              key={week[0].getTime()}
              container
              justifyContent="center"
              className={classes.weekContainer}
            >
              {week.map((day) => {
                const filled = isSameDayValid(day, selectedDate);
                const disable = !isWithinIntervalValid(day, minDate, maxDate);
                return (
                  <Day
                    key={format(day, "MM-dd-yyyy")}
                    filled={filled}
                    disabled={disable}
                    invisible={!isSameMonth(selectedMonth, day)}
                    onClick={() => {
                      if (onDayClick) {
                        onDayClick(day);
                      }
                    }}
                    onHover={() => {
                      if (onDayHover) {
                        onDayHover(day);
                      }
                    }}
                    value={getDate(day)}
                  />
                );
              })}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Month;
