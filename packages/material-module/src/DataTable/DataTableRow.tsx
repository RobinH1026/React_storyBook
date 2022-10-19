import React, { PropsWithChildren, Children, useState, ReactNode } from "react";

import makeStyles from "@mui/styles/makeStyles";

import {
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  TableRowProps,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DataTableCell from "./DataTableCell";
import DataTableRowCheckbox, {
  DataTableRowCheckboxProps,
} from "./DataTableRowCheckbox";

const useStyles = makeStyles(
  () => ({
    firstCell: {
      whiteSpace: "nowrap",
    },
    detailCell: {
      paddingBottom: 0,
      paddingTop: 0,
    },
  }),
  {
    name: "MuiEgDataTableRow",
  }
);

export interface DataTableRowProps<Data> extends TableRowProps {
  collapse?: boolean;
  checkbox?: boolean;
  dataId?: string;
  data?: Data;
  detail?: ReactNode;
  DataTableRowCheckboxProps?: DataTableRowCheckboxProps<Data>;
}

const DataTableRow = <Data,>(
  props: PropsWithChildren<DataTableRowProps<Data>>
) => {
  const classes = useStyles();
  const {
    children,
    collapse,
    checkbox,
    dataId,
    data,
    detail,
    DataTableRowCheckboxProps,
    ...other
  } = props;
  const [open, setOpen] = useState(false);
  const colSpan = Children.toArray(children).length;
  const enableCheckbox = checkbox && typeof dataId !== "undefined";
  return (
    <>
      <TableRow {...other}>
        {(collapse || enableCheckbox) && (
          <DataTableCell
            className={classes.firstCell}
            direction="left"
            isFixed
            padding="checkbox"
            align="center"
          >
            {collapse && (
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(!open);
                }}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            )}
            {enableCheckbox && (
              <DataTableRowCheckbox
                data={data}
                dataId={dataId}
                size="small"
                {...DataTableRowCheckboxProps}
              />
            )}
          </DataTableCell>
        )}
        {children}
      </TableRow>
      {collapse && (
        <TableRow>
          <TableCell className={classes.detailCell} colSpan={colSpan + 1}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {detail}
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default DataTableRow;
