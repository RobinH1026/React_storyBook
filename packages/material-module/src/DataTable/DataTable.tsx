import React, {
  useEffect,
  useState,
  useMemo,
  ReactNode,
  useCallback,
} from "react";

import makeStyles from "@mui/styles/makeStyles";
import findDeepValue from "@eGroupAI/utils/findDeepValue";
import warning from "warning";

import {
  TablePagination,
  TablePaginationProps,
  CircularProgress,
  Table,
  TableBody,
  TableContainer as MuiTableContainer,
  TableRow,
  Theme,
} from "@mui/material";
import clsx from "clsx";
import useControlled from "@eGroupAI/hooks/useControlled";
import DataTableContext from "./DataTableContext";
import DefaultTableContainer from "./DefaultTableContainer";
import DataTableRow from "./DataTableRow";
import DataTableCell from "./DataTableCell";
import { Direction } from "./DataTableSortLabel";
import DataTableHeader from "./DataTableHeader";
import { Column, DataTableProps, TableEvent, DefaultData } from "./typing";
import { asc, desc, getSelectedColumnIds } from "./utils";
import DataTableHead from "./DataTableHead";
import DataTableExtendToolsbar from "./DataTableExtendToolsbar";
import DataTableToolBar from "./DataTableToolBar";

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      position: "relative",
      maxHeight: (props) => props.maxHeight,
    },
    table: {
      minWidth: (props: DataTableProps<any>) => {
        if (props.minWidth === false) return undefined;
        if (typeof props.minWidth === "number") return props.minWidth;
        return 800;
      },
      "& .MuiTableCell-root": {
        borderBottom: (props) =>
          props.disableBorder ? "none" : `1px solid ${theme.palette.divider}`,
      },
      "& .MuiTableCell-stickyHeader": {
        backgroundColor: theme.palette.common.white,
      },
    },
    loader: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      display: "none",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(255,255,255,0.6)",
      zIndex: 1,
    },
    showLoader: {
      display: "flex",
    },
  }),
  {
    name: "MuiEgDataTable",
  }
);

const DataTable = <Data extends DefaultData>(props: DataTableProps<Data>) => {
  const classes = useStyles(props);
  const {
    className,
    serverSide,
    loading,
    isEmpty,
    disableBorder,
    disableTableContainer,
    columns: columnsProp,
    data: dataProp,
    rowKey,
    defaultData = [],
    filterConditionGroups,
    renderColumns,
    renderDataRow: renderDataRowProp,
    renderDataRowDetail,
    renderEmpty,
    to,
    defaultPage = 0,
    defaultRowsPerPage = 10,
    defaultColumnIds,
    columnsShow = 6,
    MuiTablePaginationProps: {
      page: pageProp,
      rowsPerPage: rowsPerPageProp,
      onPageChange,
      onRowsPerPageChange,
      ...otherTablePaginationProps
    },
    localization = {
      emptyMessage: "No records to display",
      columnSelectBtn: "Filter Column",
    },
    title,
    TitleTypographyProps,
    subTitle,
    SubTitleTypographyProps,
    toolsbar,
    searchBar,
    SearchBarProps,
    FilterDropDownProps,
    enableSelectColumn,
    enableRowCollapse,
    enableRowCheckbox,
    minWidth,
    maxHeight,
    eachRowState: eachRowStateProp,
    defaultEachRowState = {},
    defaultFilterValues,
    filterValues,
    onFilterValuesChange,
    onFilterValuesSubmit,
    onFilterValuesClear,
    checkedAllPageRows: checkedAllPageRowsProp,
    defaultCheckedAllPageRows = false,
    onEachRowStateChange,
    onSortLabelClick,
    onColumnsChange,
    onCheckedAllClick,
    onCheckedAllClearClick,
    outSideAllCheckbox,
    enablePlusButton,
    enableUploadButton,
    renderPaginationBar,
    ...other
  } = props;

  const [selfPage, setSelfPage] = useState(defaultPage);
  const [selfRowsPerPage, setSelfRowsPerPage] = useState(defaultRowsPerPage);
  const [data, setData] = useControlled({
    controlled: dataProp,
    default: defaultData,
  });
  const [tableEvent, setTableEvent] = useState<TableEvent>();
  const [eachRowState, setEachRowState] = useControlled({
    controlled: eachRowStateProp,
    default: defaultEachRowState,
  });
  const [checkedAllPageRows, setCheckedAllPageRows] = useControlled({
    controlled: checkedAllPageRowsProp,
    default: defaultCheckedAllPageRows,
  });
  const [selectedColumnIds, setSelectedColumnIds] = useState<
    string[] | undefined
  >(defaultColumnIds);
  // Define if user need control `page` and `rowsPerPage` attribute.
  const isPageControlled = pageProp !== undefined;
  const isRowsPerPageControlled = rowsPerPageProp !== undefined;
  const page = pageProp !== undefined ? pageProp : selfPage;
  const rowsPerPage =
    rowsPerPageProp !== undefined ? rowsPerPageProp : selfRowsPerPage;

  const TableContainer = !disableTableContainer
    ? MuiTableContainer
    : DefaultTableContainer;

  const selectedColumns = useMemo(
    () =>
      enableSelectColumn
        ? columnsProp?.filter((el) => selectedColumnIds?.includes(el.id))
        : columnsProp,
    [enableSelectColumn, columnsProp, selectedColumnIds]
  );

  warning(
    !(loading && !serverSide),
    "[@eGroupAI/material-module]: DataTable loading status is only work whit serverSide=`true`."
  );

  useEffect(() => {
    if (!selectedColumnIds && columnsProp) {
      setSelectedColumnIds(
        getSelectedColumnIds<Data>(columnsShow, columnsProp)
      );
    }
  }, [columnsProp, columnsShow, selectedColumnIds]);

  useEffect(() => {
    if (!isPageControlled && typeof to === "number" && to >= 0) {
      setSelfPage(to);
    }
  }, [isPageControlled, to]);

  useEffect(() => {
    if (onEachRowStateChange) {
      onEachRowStateChange(eachRowState, tableEvent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eachRowState, tableEvent]);

  const handleChangePage: TablePaginationProps["onPageChange"] = useCallback(
    (event, newPage) => {
      setTableEvent(TableEvent.CHANGE_PAGE);
      if (!isPageControlled) {
        setSelfPage(newPage);
      }
      if (onPageChange) {
        onPageChange(event, {
          page: newPage,
          rowsPerPage,
        });
      }
    },
    [isPageControlled, onPageChange, rowsPerPage]
  );

  const handleRowsPerPageChange: TablePaginationProps["onRowsPerPageChange"] =
    useCallback(
      (event) => {
        setTableEvent(TableEvent.CHANGE_ROWS_PER_PAGE);
        if (!isRowsPerPageControlled) {
          setSelfRowsPerPage(Number(event.target.value));
        }
        if (onRowsPerPageChange) {
          onRowsPerPageChange(event, {
            page,
            rowsPerPage: Number(event.target.value),
          });
        }
      },
      [isRowsPerPageControlled, onRowsPerPageChange, page]
    );

  const handleColumnChange = useCallback(
    (column: Column<Data>, checked: boolean) => {
      let next = selectedColumnIds;
      if (!next) return;
      if (checked) {
        next = [...next, column.id];
      } else {
        next = next.filter((el) => el !== column.id);
      }
      setSelectedColumnIds(next);
      if (onColumnsChange) {
        onColumnsChange(next);
      }
    },
    [onColumnsChange, selectedColumnIds]
  );

  const handleSort = useCallback(
    (sortKey: string, direction: Direction) => {
      if (direction === "desc") {
        setData(desc(data, sortKey));
      } else {
        setData(asc(data, sortKey));
      }
      if (onSortLabelClick) {
        onSortLabelClick(sortKey, direction);
      }
    },
    [data, onSortLabelClick, setData]
  );

  const renderEmptyText = () => {
    if (renderEmpty) return renderEmpty();
    const colSpan = selectedColumns ? selectedColumns.length : 1;
    return (
      <TableRow style={{ height: 245 }}>
        <DataTableCell colSpan={colSpan} style={{ textAlign: "center" }}>
          {localization.emptyMessage}
        </DataTableCell>
      </TableRow>
    );
  };

  const renderDataRow = (rowData: Data, index: number) => {
    if (renderDataRowProp) {
      return renderDataRowProp(rowData, index);
    }
    if (selectedColumns) {
      const dataid = findDeepValue<string>(rowData, rowKey);
      return (
        <DataTableRow
          {...rowData.TableRowProps}
          key={dataid}
          dataId={dataid}
          data={rowData}
          collapse={enableRowCollapse}
          checkbox={enableRowCheckbox}
          detail={
            renderDataRowDetail
              ? renderDataRowDetail(rowData, index)
              : undefined
          }
          selected={
            typeof dataid !== "undefined"
              ? eachRowState[dataid]?.checked
              : undefined
          }
        >
          {selectedColumns.map((col) => {
            if (col.render) {
              return col.render(rowData);
            }
            if (col.dataKey) {
              const value = findDeepValue<ReactNode>(rowData, col.dataKey);
              return (
                <DataTableCell
                  key={col.id}
                  isFixed={!!col.fixed}
                  direction={col.fixed}
                >
                  {col.format ? col.format(value) : value}
                </DataTableCell>
              );
            }
            return undefined;
          })}
        </DataTableRow>
      );
    }
    return undefined;
  };

  const renderBody = () => {
    if (isEmpty) {
      return renderEmptyText();
    }
    if (serverSide) {
      return data.map(renderDataRow);
    }
    return data
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map(renderDataRow);
  };

  const value = useMemo(
    () => ({
      tableEvent,
      setTableEvent,
      eachRowState,
      setEachRowState,
      checkedAllPageRows,
      setCheckedAllPageRows,
    }),
    [
      checkedAllPageRows,
      eachRowState,
      setCheckedAllPageRows,
      setEachRowState,
      tableEvent,
    ]
  );

  return (
    <DataTableContext.Provider value={value}>
      <div className={className}>
        <DataTableHeader
          title={title}
          TitleTypographyProps={TitleTypographyProps}
          subTitle={subTitle}
          SubTitleTypographyProps={SubTitleTypographyProps}
          toolsbar={toolsbar}
          searchBar={searchBar}
          SearchBarProps={SearchBarProps}
          filterConditionGroups={filterConditionGroups}
          defaultFilterValues={defaultFilterValues}
          filterValues={filterValues}
          onFilterValuesChange={onFilterValuesChange}
          onFilterValuesSubmit={onFilterValuesSubmit}
          onFilterValuesClear={onFilterValuesClear}
          FilterDropDownProps={FilterDropDownProps}
          enableSelectColumn={enableSelectColumn}
          columns={columnsProp}
          selectedColumnKeys={selectedColumnIds}
          localization={localization}
          onColumnChange={handleColumnChange}
        />
        <DataTableExtendToolsbar
          onCheckedAllClick={onCheckedAllClick}
          onCheckedAllClearClick={onCheckedAllClearClick}
          count={otherTablePaginationProps.count}
        />
        <TableContainer className={classes.container}>
          <div
            className={clsx(
              classes.loader,
              serverSide && loading && classes.showLoader
            )}
          >
            <CircularProgress />
          </div>
          <DataTableToolBar
            rowsPerPage={rowsPerPage}
            outSideAllCheckbox={outSideAllCheckbox}
            enablePlusButton={enablePlusButton}
            enableUploadButton={enableUploadButton}
          />
          <Table className={classes.table} {...other}>
            <DataTableHead
              columns={selectedColumns}
              renderColumns={renderColumns}
              onSortLabelClick={handleSort}
              eachRowState={eachRowState}
              enableRowCollapse={enableRowCollapse}
              enableRowCheckbox={enableRowCheckbox}
              rowsPerPage={rowsPerPage}
            />
            <TableBody>{renderBody()}</TableBody>
          </Table>
        </TableContainer>
        {renderPaginationBar ? (
          <>
            {renderPaginationBar(
              page,
              rowsPerPage,
              otherTablePaginationProps.count,
              handleChangePage,
              handleRowsPerPageChange
            )}
          </>
        ) : (
          <TablePagination
            component="div"
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleRowsPerPageChange}
            {...otherTablePaginationProps}
          />
        )}
      </div>
    </DataTableContext.Provider>
  );
};

export default DataTable;
