import React, { useCallback } from "react";

import useControlled from "@eGroupAI/hooks/useControlled";
import clsx from "clsx";
import FilterDropDown, {
  Value as FilterValue,
  Option,
  optionsToValue,
} from "@eGroupAI/material-lab/FilterDropDown";
import Typography from "@eGroupAI/material/Typography";
import Button from "@eGroupAI/material/Button";
import CheckboxWithLabel from "@eGroupAI/material/CheckboxWithLabel";
import { Grid, Avatar, MenuItem } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchBar from "../SearchBar";
import { getFilterValueCount } from "./utils";
import useFilterOptions from "./useFilterOptions";
import { DataTableHeaderProps } from "./typing";
import ButtonMenu from "../ButtonMenu";

const useStyles = makeStyles(
  (theme) => ({
    root: {},
    header: {
      padding: theme.spacing(1, 1.5),
    },
    filterbar: {
      display: "flex",
      alignItems: "center",
      padding: 15,
      backgroundColor: theme.palette.background.default,
      gap: theme.spacing(1),
      overflow: "auto",
      whiteSpace: "nowrap",
    },
    toolsbar: {
      display: "flex",
      alignItems: "center",
    },
    searchBar: {
      display: "flex",
      alignItems: "center",

      "& .MuiInputBase-input": {
        minWidth: 150,
      },
    },
    searchBarInput: {
      minWidth: 200,
    },
    filterDropDown: {
      "& .MuiButton-contained:hover": {
        backgroundColor: `${theme.egPalette.info[1]} !important`,
      },
    },
    filterIcon: {
      width: 18,
      height: 18,
      fontSize: "0.625rem !important",
      color: theme.palette.common.black,
      background: theme.palette.common.white,
    },
    columnSelectBtn: {
      marginRight: theme.spacing(1),
    },
    columnSelectCheckbox: {
      width: "100%",
    },
  }),
  {
    name: "MuiEgDataTableHeader",
  }
);

const DataTableHeader = <Data,>(props: DataTableHeaderProps<Data>) => {
  const classes = useStyles();
  const {
    className,
    title,
    subTitle,
    toolsbar,
    searchBar,
    filterConditionGroups,
    TitleTypographyProps,
    SubTitleTypographyProps,
    FilterDropDownProps,
    SearchBarProps,
    enableSelectColumn,
    localization,
    columns,
    onColumnChange,
    selectedColumnKeys,
    defaultFilterValues = {
      0: {},
      1: {},
      2: {},
      3: {},
    },
    filterValues: filterValuesProp,
    onFilterValuesChange,
    onFilterValuesSubmit,
    onFilterValuesClear,
    ...other
  } = props;
  const filterOptions = useFilterOptions(filterConditionGroups);
  const [filterValues, setFilterValues] = useControlled({
    controlled: filterValuesProp,
    default: defaultFilterValues,
  });

  const handleFilterDropDownChange = useCallback(
    (value: FilterValue, i: number) => {
      const next = {
        ...filterValues,
        [i]: value,
      };
      setFilterValues(next);
      if (FilterDropDownProps?.onChange) {
        FilterDropDownProps.onChange(value);
      }
      if (onFilterValuesChange) {
        onFilterValuesChange(next, i);
      }
    },
    [FilterDropDownProps, filterValues, onFilterValuesChange, setFilterValues]
  );

  const handleFilterDropDownSubmit = useCallback(
    (value: FilterValue, i: number) => {
      const next = {
        ...filterValues,
        [i]: value,
      };
      setFilterValues(next);
      if (FilterDropDownProps?.onSubmit) {
        FilterDropDownProps.onSubmit(value);
      }
      if (onFilterValuesSubmit) {
        onFilterValuesSubmit(next, i);
      }
    },
    [FilterDropDownProps, filterValues, onFilterValuesSubmit, setFilterValues]
  );

  const handleFilterDropDownClear = useCallback(
    (e, i: number, options: Option[]) => {
      e.stopPropagation();
      const next = {
        ...filterValues,
        [i]: defaultFilterValues[i],
      };
      setFilterValues(next);
      if (FilterDropDownProps?.onClear) {
        FilterDropDownProps.onClear(e, optionsToValue(options, 0, 100));
      }
      if (onFilterValuesClear) {
        onFilterValuesClear(next, i);
      }
    },
    [
      FilterDropDownProps,
      defaultFilterValues,
      filterValues,
      onFilterValuesClear,
      setFilterValues,
    ]
  );

  const renderColumnSelect = () => {
    if (enableSelectColumn) {
      return (
        <ButtonMenu
          button={
            <Button
              rounded
              variant="contained"
              disableElevation
              color="primary"
              className={classes.columnSelectBtn}
            >
              {localization?.columnSelectBtn}
            </Button>
          }
          disableClickOnClose
        >
          {columns?.map((el) => (
            <MenuItem key={el.id}>
              <CheckboxWithLabel
                label={el.name}
                className={classes.columnSelectCheckbox}
                MuiCheckboxProps={{
                  onChange: (e, checked) => {
                    if (onColumnChange) {
                      onColumnChange(el, checked);
                    }
                  },
                  checked: selectedColumnKeys?.includes(el.id),
                }}
              />
            </MenuItem>
          ))}
        </ButtonMenu>
      );
    }
    return undefined;
  };

  const renderHeader = () => {
    if (!toolsbar && !filterOptions) {
      return (
        <Grid container alignItems="center">
          <Grid item xs={12} container>
            <Grid item>
              {title && (
                <Typography variant="h6" {...TitleTypographyProps}>
                  {title}
                </Typography>
              )}
              {subTitle && (
                <Typography variant="body2" {...SubTitleTypographyProps}>
                  {subTitle}
                </Typography>
              )}
            </Grid>
            <div style={{ flexGrow: 1 }} />
            <Grid item>
              <div className={classes.searchBar}>
                {renderColumnSelect()}
                {SearchBarProps && (
                  <SearchBar size="small" {...SearchBarProps} />
                )}
                {searchBar}
              </div>
            </Grid>
          </Grid>
        </Grid>
      );
    }
    return (
      <Grid container alignItems="center">
        <Grid item xs={12} container>
          <Grid item>
            {title && (
              <Typography variant="h6" {...TitleTypographyProps}>
                {title}
              </Typography>
            )}
            {subTitle && (
              <Typography variant="body2" {...SubTitleTypographyProps}>
                {subTitle}
              </Typography>
            )}
          </Grid>
          <div style={{ flexGrow: 1 }} />
          <Grid item>
            <div className={classes.toolsbar}>{toolsbar}</div>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const renderFilterDropDown = (
    label: string,
    options: Option[],
    index: number
  ) => {
    const [filterCount, hasTriggerRange] = getFilterValueCount(
      filterValues[index]
    );
    const isActive = filterCount > 0;
    let startIcon;
    let endIcon = <ArrowDropDownIcon />;
    if (isActive) {
      startIcon = <Avatar className={classes.filterIcon}>{filterCount}</Avatar>;
    }
    if (isActive || hasTriggerRange) {
      endIcon = (
        <CancelIcon
          onClick={(e) => handleFilterDropDownClear(e, index, options)}
        />
      );
    }
    return (
      <div key={label}>
        <FilterDropDown
          rounded
          variant="contained"
          disableElevation
          color={isActive || hasTriggerRange ? "info" : "primary"}
          {...FilterDropDownProps}
          value={filterValues[index]}
          className={clsx(
            classes.filterDropDown,
            FilterDropDownProps?.className
          )}
          onChange={(value) => handleFilterDropDownChange(value, index)}
          onSubmit={(value) => handleFilterDropDownSubmit(value, index)}
          onClear={(e) => {
            handleFilterDropDownClear(e, index, options);
          }}
          options={options}
          startIcon={startIcon}
          endIcon={endIcon}
        >
          {label}
        </FilterDropDown>
      </div>
    );
  };

  const renderFilterbar = () => {
    if (filterOptions) {
      return (
        <div className={classes.filterbar}>
          {filterOptions.map((el, index) =>
            renderFilterDropDown(
              el.filterConditionGroupName,
              el.filterConditionList,
              index
            )
          )}

          <div style={{ flexGrow: 1 }} />
          <div className={classes.searchBar}>
            {renderColumnSelect()}
            {SearchBarProps && <SearchBar size="small" {...SearchBarProps} />}
            {searchBar}
          </div>
        </div>
      );
    }
    return undefined;
  };

  return (
    <div className={clsx(className, classes.root)} {...other}>
      <div className={classes.header}>{renderHeader()}</div>
      {filterOptions && renderFilterbar()}
    </div>
  );
};

export default DataTableHeader;
