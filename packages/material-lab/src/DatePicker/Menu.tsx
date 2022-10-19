import React, { FC, useEffect, useState } from "react";

import { addMonths } from "date-fns";

import makeStyles from "@mui/styles/makeStyles";
import { NavigationAction } from "./types";
import Month from "./Month";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("lg")]: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
  item: {
    display: "flex",
  },
}));

export interface MenuProps {
  date?: Date | null;
  minDate: Date;
  maxDate: Date;
  hoverDay?: Date;
  onDayClick?: (date: Date) => void;
  onDayHover?: (date: Date) => void;
}

const Menu: FC<MenuProps> = (props) => {
  const classes = useStyles();
  const { date, hoverDay, minDate, maxDate, onDayClick, onDayHover } = props;
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

  useEffect(() => {
    if (date) {
      setSelectedDate(date);
    }
  }, [date]);

  const handleMonthNavigate = (action: NavigationAction) => {
    setSelectedMonth(addMonths(selectedMonth, action));
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.item}>
          <Month
            minDate={minDate}
            maxDate={maxDate}
            hoverDay={hoverDay}
            selectedDate={selectedDate}
            selectedMonth={selectedMonth}
            navState={[true, true]}
            setSelectedMonth={setSelectedMonth}
            onDayClick={onDayClick}
            onDayHover={onDayHover}
            onMonthNavigate={handleMonthNavigate}
          />
        </div>
      </div>
    </div>
  );
};

export default Menu;
