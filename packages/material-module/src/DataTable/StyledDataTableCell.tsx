import React from "react";
import DataTableCell, { DataTableCellProps } from "./DataTableCell";

const StyledDataTableCell = (props: DataTableCellProps) => (
  <DataTableCell
    sx={{
      padding: "8px",
    }}
    {...props}
  />
);

export default StyledDataTableCell;
