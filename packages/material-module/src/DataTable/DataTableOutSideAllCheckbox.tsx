import React from "react";
import DataTableCheckedAllCheckbox from "./DataTableCheckedAllCheckbox";

interface DataTableOutSideAllCheckboxProps {
  rowsPerPage: number;
}

const DataTableOutSideAllCheckbox = (
  props: DataTableOutSideAllCheckboxProps
) => (
  <div>
    <DataTableCheckedAllCheckbox rowsPerPage={props.rowsPerPage} />
  </div>
);

export default DataTableOutSideAllCheckbox;
