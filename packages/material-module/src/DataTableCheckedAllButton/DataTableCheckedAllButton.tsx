import React, { FC, useContext } from "react";
import Button, { ButtonProps } from "@eGroupAI/material/Button";
import DataTableContext from "../DataTable/DataTableContext";
import { getNextEachRowState } from "../DataTable/utils";
import { TableEvent } from "../DataTable";

/**
 * @Depreciated
 * This component is integrate into DataTable UI, this component should not use anymore.
 */
const DataTableCheckedAllButton: FC<ButtonProps> = ({ onClick, ...other }) => {
  const { setTableEvent, setCheckedAllPageRows, setEachRowState } =
    useContext(DataTableContext);
  return (
    <Button
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
        if (setCheckedAllPageRows && setEachRowState && setTableEvent) {
          setTableEvent(TableEvent.CHECKED_ALL_PAGE_ROWS);
          setCheckedAllPageRows(true);
          setEachRowState((val) => getNextEachRowState(val, { checked: true }));
        }
      }}
      {...other}
    />
  );
};

export default DataTableCheckedAllButton;
