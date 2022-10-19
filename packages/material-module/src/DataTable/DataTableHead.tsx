import React, { useState } from "react";

import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import DataTableSortLabel from "./DataTableSortLabel";
import DataTableCell from "./DataTableCell";
import { ColumnArgs, DataTableHeadProps } from "./typing";
import DataTableCheckedAllCheckbox from "./DataTableCheckedAllCheckbox";

const DataTableHead = <Data,>(props: DataTableHeadProps<Data>) => {
  const {
    columns,
    eachRowState,
    renderColumns,
    onSortLabelClick,
    enableRowCollapse,
    enableRowCheckbox,
    rowsPerPage,
  } = props;
  const [activeIndex, setActiveIndex] = useState<number>();

  const renderFirstCell = () => {
    if (enableRowCollapse && !enableRowCheckbox) {
      return <DataTableCell isFixed direction="left" zIndex={4} />;
    }
    if (enableRowCheckbox) {
      return (
        <DataTableCell
          isFixed
          direction="left"
          zIndex={4}
          padding="checkbox"
          align="center"
        >
          <DataTableCheckedAllCheckbox rowsPerPage={rowsPerPage} />
        </DataTableCell>
      );
    }
    return undefined;
  };

  const renderHead = () => {
    const columnArgs: ColumnArgs = {
      activeIndex,
      eachRowState,
    };
    if (renderColumns) {
      return renderColumns(columns || [], columnArgs);
    }
    if (columns) {
      return (
        <TableRow>
          {renderFirstCell()}
          {columns.map((el, index) => {
            const {
              id,
              name,
              fixed,
              sortKey,
              dataKey,
              render,
              format,
              ...other
            } = el;
            return (
              <DataTableCell
                key={id}
                isFixed={!!fixed}
                direction={fixed}
                zIndex={4}
                {...other}
              >
                <DataTableSortLabel
                  isSort={!!sortKey}
                  active={activeIndex === index}
                  onClick={(direction) => {
                    if (sortKey) {
                      setActiveIndex(index);
                      if (onSortLabelClick) {
                        onSortLabelClick(sortKey, direction);
                      }
                    }
                  }}
                >
                  {name}
                </DataTableSortLabel>
              </DataTableCell>
            );
          })}
        </TableRow>
      );
    }
    return undefined;
  };

  return <TableHead>{renderHead()}</TableHead>;
};

export default DataTableHead;
