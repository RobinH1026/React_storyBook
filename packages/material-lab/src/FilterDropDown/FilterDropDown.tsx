import React, { FC, useCallback, useEffect, useRef, useState } from "react";

import makeStyles from "@mui/styles/makeStyles";
import useControlled from "@eGroupAI/hooks/useControlled";
import clsx from "clsx";

import Typography from "@eGroupAI/material/Typography";
import CheckboxWithLabel from "@eGroupAI/material/CheckboxWithLabel";
import Button, { ButtonProps } from "@eGroupAI/material/Button";
import { Divider, TextField, Autocomplete } from "@mui/material";
import EnhancePopover from "@eGroupAI/material/EnhancePopover";
import StyledSlider from "./StyledSlider";
import StyledPopper from "./StyledPopper";
import { Item, Option, Value } from "./types";
import { optionToValueType, optionsToValue } from "./utils";
import NewDateRangePicker from "../NewDateRangePicker";

const useStyles = makeStyles((theme) => ({
  popover: {
    "& .MuiEnhancePopover-paper": {
      minWidth: 200,
      paddingBottom: 52.5,
    },
    "& .MuiEnhancePopover-container": {
      [theme.breakpoints.up("lg")]: {
        height: "100%",
        overflowY: "auto",
      },
    },
  },
  enhancePopoverFullHeight: {
    "& .MuiEnhancePopover-paper": {
      height: "100%",
    },
  },
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    minWidth: "10rem",
    maxWidth: "37rem",
    gap: theme.spacing(1),
    [theme.breakpoints.down("lg")]: {
      width: "100%",
      alignItems: "center",
    },
  },
  item: {
    width: "100%",
  },
  optionContent: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(1),
  },
  vertical: {
    flexDirection: "column",
  },
  numberRange: {
    padding: theme.spacing(0, 1),
    width: "100%",
  },
  multiText: {
    paddingTop: theme.spacing(1),
    width: "100%",
  },
  actions: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "flex-end",
    padding: 8,
    background: theme.palette.common.white,
    [theme.breakpoints.down("lg")]: {
      position: "fixed",
    },
  },
}));

export interface FilterDropDownProps
  extends Omit<
    ButtonProps,
    "onChange" | "onSubmit" | "value" | "defaultValue"
  > {
  options: Option[];
  defaultRangeNumberMinValue?: number;
  defaultRangeNumberMaxValue?: number;
  value?: Value;
  defaultValue?: Value;
  onChange?: (value: Value) => void;
  onSubmit?: (value: Value) => void;
  onClear?: (e: React.MouseEvent<HTMLButtonElement>, value: Value) => void;
}

const FilterDropDown: FC<FilterDropDownProps> = (props) => {
  const classes = useStyles();
  const {
    onClick,
    options,
    defaultRangeNumberMinValue = 0,
    defaultRangeNumberMaxValue = 100,
    value: valueProp,
    defaultValue,
    onChange,
    onSubmit,
    onClear,
    ...other
  } = props;
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useControlled({
    controlled: valueProp
      ? optionsToValue(
          options,
          defaultRangeNumberMinValue,
          defaultRangeNumberMaxValue,
          valueProp
        )
      : undefined,
    default: optionsToValue(
      options,
      defaultRangeNumberMinValue,
      defaultRangeNumberMaxValue,
      defaultValue
    ),
  });
  const paperEl = useRef<HTMLDivElement>(null);
  const containerEl = useRef<HTMLDivElement>(null);
  const [shouldFullHeight, setShouldFullHeight] = useState(false);

  useEffect(() => {
    if (isOpen && containerEl.current && paperEl.current) {
      setShouldFullHeight(
        containerEl.current.scrollHeight > paperEl.current.offsetHeight
      );
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const renderOptionContent = (option: Option) => {
    const { type, id, items } = option;
    const fieldValue =
      value[id] ||
      optionToValueType(
        option,
        defaultRangeNumberMinValue,
        defaultRangeNumberMaxValue
      );
    switch (type) {
      case "CHOICEMULTI":
        return items?.map((item) => (
          <CheckboxWithLabel
            key={item.value}
            label={item.label}
            value={item.value}
            checked={(fieldValue as string[]).includes(item.value)}
            MuiCheckboxProps={{
              color: "primary",
              onChange: (e, checked) => {
                const prevCheckboxValues = fieldValue as string[];
                let nextCheckboxValues: string[] = [];
                if (checked) {
                  nextCheckboxValues = [...prevCheckboxValues, e.target.value];
                } else {
                  nextCheckboxValues = prevCheckboxValues.filter(
                    (el) => el !== e.target.value
                  );
                }
                const next = {
                  ...value,
                  [id]: nextCheckboxValues,
                };
                if (onChange) {
                  onChange(next);
                }
                setValue(next);
              },
            }}
          />
        ));
      case "DATETIME_RANGE":
        return (
          <NewDateRangePicker
            withTime
            startDate={fieldValue[0] as Date}
            endDate={fieldValue[1] as Date}
            variant="standard"
            size="small"
            onChange={(startDateTime, endDateTime) => {
              const next = {
                ...value,
                [id]: [startDateTime || null, endDateTime || null],
              };
              if (onChange) {
                onChange(next);
              }
              setValue(next);
            }}
          />
        );
      case "DATE_RANGE":
        return (
          <NewDateRangePicker
            startDate={fieldValue[0] as Date}
            endDate={fieldValue[1] as Date}
            variant="standard"
            size="small"
            onStartDateChanege={(date) => {
              const next = {
                ...value,
                [id]: [date, value[id][1] as Date],
              };
              if (onChange) {
                onChange(next);
              }
              setValue(next);
            }}
            onEndDateChanege={(date) => {
              const next = {
                ...value,
                [id]: [value[id][0] as Date, date],
              };
              if (onChange) {
                onChange(next);
              }
              setValue(next);
            }}
          />
        );
      case "NUMBER_RANGE": {
        if (!items) return undefined;
        const min = Number(items[0].value);
        const max = Number(items[1].value);
        return (
          <div className={classes.numberRange}>
            <StyledSlider
              value={fieldValue as number[]}
              min={min}
              max={max}
              onChange={(_, newValue) => {
                const next = {
                  ...value,
                  [id]: newValue as number[],
                };
                if (onChange) {
                  onChange(next);
                }
                setValue(next);
              }}
              valueLabelDisplay="auto"
            />
            <TextField
              label={items[0].label}
              value={fieldValue[0]}
              variant="standard"
              inputProps={{
                min,
              }}
              onChange={(e) => {
                const from = Number(e.target.value);
                const to = fieldValue[1] as number;
                if (from >= min && to <= max) {
                  const next = {
                    ...value,
                    [id]: [from, to],
                  };
                  if (onChange) {
                    onChange(next);
                  }
                  setValue(next);
                }
              }}
              type="number"
            />
            <TextField
              label={items[1].label}
              value={fieldValue[1]}
              variant="standard"
              inputProps={{
                max,
              }}
              onChange={(e) => {
                const from = fieldValue[0] as number;
                const to = Number(e.target.value);
                if (from >= min && to <= max) {
                  const next = {
                    ...value,
                    [id]: [from, to],
                  };
                  if (onChange) {
                    onChange(next);
                  }
                  setValue(next);
                }
              }}
              type="number"
            />
          </div>
        );
      }
      case "CHOICEMULTI_TEXT": {
        if (!items) {
          return <Typography>查無選項資料</Typography>;
        }
        return (
          <div className={classes.multiText}>
            <Autocomplete
              options={items}
              multiple
              disableCloseOnSelect
              PopperComponent={StyledPopper}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              value={fieldValue as Item[]}
              getOptionLabel={(option) => option.label}
              noOptionsText="查無選項資料"
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  fullWidth
                  size="small"
                />
              )}
              onChange={(e, v) => {
                const next = {
                  ...value,
                  [id]: v,
                };
                if (onChange) {
                  onChange(next);
                }
                setValue(next);
              }}
            />
          </div>
        );
      }
      default:
        return undefined;
    }
  };

  return (
    <>
      <Button
        ref={btnRef}
        onClick={(e) => {
          if (onClick) {
            onClick(e);
          }
          setIsOpen(true);
        }}
        {...other}
      />
      <EnhancePopover
        open={isOpen}
        anchorEl={btnRef.current}
        onCloseClick={handleClose}
        onClickAway={(e) => {
          if (!btnRef.current?.contains(e.target as Node)) {
            setIsOpen(false);
          }
        }}
        PaperProps={{
          ref: paperEl,
        }}
        className={clsx(classes.popover, {
          [classes.enhancePopoverFullHeight]: shouldFullHeight,
        })}
        keepMounted
      >
        <div ref={containerEl} className={classes.container}>
          {options.map((option) => (
            <div key={option.id} className={classes.item}>
              <Typography gutterBottom fontWeight={700} variant="body2">
                {option.title}
              </Typography>
              <div
                className={clsx(
                  classes.optionContent,
                  options.length === 1 && classes.vertical
                )}
              >
                {renderOptionContent(option)}
              </div>
              <Divider />
            </div>
          ))}
        </div>
        <div className={classes.actions}>
          <Button color="primary" onClick={handleClose}>
            關閉
          </Button>
          <Button
            color="primary"
            onClick={(e) => {
              if (valueProp === undefined) {
                setValue(
                  optionsToValue(
                    options,
                    defaultRangeNumberMinValue,
                    defaultRangeNumberMaxValue,
                    defaultValue
                  )
                );
              }
              if (onClear) {
                onClear(e, value);
              }
            }}
          >
            清除
          </Button>
          {onSubmit && (
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                onSubmit(value);
                setIsOpen(false);
              }}
            >
              送出
            </Button>
          )}
        </div>
      </EnhancePopover>
    </>
  );
};

export default FilterDropDown;
