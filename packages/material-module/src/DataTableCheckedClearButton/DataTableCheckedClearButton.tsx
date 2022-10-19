import React, { useContext } from "react";
import Button, { ButtonProps } from "@eGroupAI/material/Button";
import DataTableContext from "../DataTable/DataTableContext";
import { DefaultData, EachRowState, RowState, TableEvent } from "../DataTable";

/**
 * @Depreciated
 * This component is integrate into DataTable UI, this component should not use anymore.
 */
const DataTableCheckedClearButton = <Data extends DefaultData>(
  props: ButtonProps
) => {
  const { onClick, ...other } = props;
  const { setEachRowState, setTableEvent, setCheckedAllPageRows } =
    useContext(DataTableContext);
  return (
    <Button
      onClick={(e) => {
        if (onClick) {
          onClick(e);
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
      }}
      {...other}
    />
  );
};

export default DataTableCheckedClearButton;
