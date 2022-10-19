import React, { useContext, useMemo } from "react";
import Checkbox from "@mui/material/Checkbox";
import DataTableContext from "./DataTableContext";
import { TableEvent } from "./typing";
import { checkedDisplayRowState } from "./utils";

export interface DataTableCheckedAllCheckboxProps {
  rowsPerPage: number;
}

const DataTableCheckedAllCheckbox = <Data,>(
  props: DataTableCheckedAllCheckboxProps
) => {
  const { rowsPerPage } = props;
  const { setTableEvent, eachRowState, setEachRowState } =
    useContext(DataTableContext);
  const checkedNums = useMemo(
    () =>
      Object.values(eachRowState).filter((el) => el?.checked && el.display)
        .length,
    [eachRowState]
  );
  const isAllChecked = useMemo(
    () => Object.keys(eachRowState).length > 0 && checkedNums === rowsPerPage,
    [checkedNums, eachRowState, rowsPerPage]
  );
  const indeterminate = useMemo(
    () => !isAllChecked && checkedNums > 0,
    [checkedNums, isAllChecked]
  );

  return (
    <Checkbox
      size="small"
      checked={isAllChecked}
      onChange={(_, checked) => {
        if (!setTableEvent || !setEachRowState) return;
        setTableEvent(TableEvent.CHNAGE_ALL_CHECKED_ROWS);
        setEachRowState((val) => checkedDisplayRowState<Data>(val, checked));
      }}
      indeterminate={indeterminate}
    />
  );
};

export default DataTableCheckedAllCheckbox;
