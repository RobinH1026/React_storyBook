import React, { FC } from "react";

import TableCell from "@mui/material/TableCell";
import DataTableFixedTableCell, {
  DataTableFixedTableCellProps,
} from "../DataTableFixedTableCell";

export interface DataTableCellProps
  extends Omit<DataTableFixedTableCellProps, "direction"> {
  isFixed?: boolean;
  direction?: "left" | "right";
}

const DataTableCell: FC<DataTableCellProps> = (props) => {
  const { isFixed, direction, zIndex, ...other } = props;
  if (isFixed && direction) {
    return (
      <DataTableFixedTableCell
        direction={direction}
        zIndex={zIndex}
        {...other}
      />
    );
  }
  return <TableCell {...other} />;
};

export default DataTableCell;
