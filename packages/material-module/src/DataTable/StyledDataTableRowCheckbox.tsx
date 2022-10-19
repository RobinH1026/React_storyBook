import React from "react";
import DataTableRowCheckbox, {
  DataTableRowCheckboxProps,
} from "./DataTableRowCheckbox";

const StyledDataTableRowCheckbox = (
  props: DataTableRowCheckboxProps<number>
) => (
  <DataTableRowCheckbox
    sx={{
      padding: "2px",
    }}
    size="small"
    {...props}
  />
);

export default StyledDataTableRowCheckbox;
