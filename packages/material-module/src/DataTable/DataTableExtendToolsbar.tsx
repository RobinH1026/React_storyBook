/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useContext, useMemo } from "react";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import Link, { LinkProps } from "@mui/material/Link";
import DataTableContext from "./DataTableContext";
import {
  DataTableExtendToolsbarProps,
  EachRowState,
  RowState,
  TableEvent,
} from "./typing";
import { getNextEachRowState } from "./utils";

const DataTableExtendToolsbar = <Data,>(
  props: DataTableExtendToolsbarProps
) => {
  const { count, onCheckedAllClick, onCheckedAllClearClick } = props;
  const {
    eachRowState,
    checkedAllPageRows,
    setTableEvent,
    setCheckedAllPageRows,
    setEachRowState,
  } = useContext(DataTableContext);

  const [checkedNums, uncheckedNums] = useMemo(() => {
    const states = Object.values(eachRowState);
    const checkedNums = states.filter((el) => el?.checked).length;
    return [checkedNums, states.length - checkedNums];
  }, [eachRowState]);

  const handleCheckedAll = useCallback<NonNullable<LinkProps["onClick"]>>(
    (e) => {
      if (onCheckedAllClick) {
        onCheckedAllClick(e);
      }
      if (setCheckedAllPageRows && setEachRowState && setTableEvent) {
        setTableEvent(TableEvent.CHECKED_ALL_PAGE_ROWS);
        setCheckedAllPageRows(true);
        setEachRowState((val) => getNextEachRowState(val, { checked: true }));
      }
    },
    [onCheckedAllClick, setCheckedAllPageRows, setEachRowState, setTableEvent]
  );

  const handleClearCheckedAll = useCallback<NonNullable<LinkProps["onClick"]>>(
    (e) => {
      if (onCheckedAllClearClick) {
        onCheckedAllClearClick(e);
      }
      if (setEachRowState && setCheckedAllPageRows && setTableEvent) {
        setTableEvent(TableEvent.CLEAR_ALL_CHECKED_ROWS);
        setCheckedAllPageRows(false);
        setEachRowState((val) => {
          let next: EachRowState<Data> = { ...val };
          Object.keys(val).forEach((key) => {
            next = {
              ...next,
              [key]: {
                ...(next[key] as RowState<Data>),
                checked: false,
              },
            };
          });
          return next;
        });
      }
    },
    [
      onCheckedAllClearClick,
      setCheckedAllPageRows,
      setEachRowState,
      setTableEvent,
    ]
  );

  return (
    <Collapse
      in={checkedNums !== 0 || checkedAllPageRows}
      timeout="auto"
      unmountOnExit
    >
      <Alert>
        {checkedAllPageRows ? (
          <>
            {uncheckedNums === 0
              ? "已選取所有資料"
              : `已選取${count - uncheckedNums}個`}
            (
            <Link
              color="inherit"
              sx={{ cursor: "pointer" }}
              onClick={handleClearCheckedAll}
            >
              取消全選
            </Link>
            )
          </>
        ) : (
          <>
            已選取{checkedNums}個(
            <Link
              color="inherit"
              sx={{ cursor: "pointer" }}
              onClick={handleCheckedAll}
            >
              全選
            </Link>
            )
          </>
        )}
      </Alert>
    </Collapse>
  );
};

export default DataTableExtendToolsbar;
