import {
  MouseEvent,
  ChangeEvent,
  ReactNode,
  HTMLAttributes,
  SetStateAction,
} from "react";
import { TablePaginationProps, TableProps, TableRowProps } from "@mui/material";
import { LinkProps } from "@mui/material/Link";
import { TypographyProps } from "@eGroupAI/material/Typography";
import {
  Value as FilterValue,
  FilterDropDownProps,
} from "@eGroupAI/material-lab/FilterDropDown";
import { FilterCondition, FilterConditionGroup } from "@eGroupAI/typings/apis";
import { DataTableCellProps } from "./DataTableCell";
import { SearchBarProps } from "../SearchBar";
import { Direction } from "./DataTableSortLabel";

export type LocalizationArgs = {
  emptyMessage: string;
  columnSelectBtn: string;
};

export type RowState<Data> = {
  checked: boolean;
  display: boolean;
  data?: Data;
};

export type EachRowState<Data> = {
  [dataId in string]?: RowState<Data>;
};

export enum TableEvent {
  CHANGE_PAGE = "CHANGE_PAGE",
  CHANGE_ROWS_PER_PAGE = "CHANGE_ROWS_PER_PAGE",
  CHNAGE_ALL_CHECKED_ROWS = "CHNAGE_ALL_CHECKED_ROWS",
  CHNAGE_CHECKED_ROW = "CHNAGE_CHECKED_ROW",
  CLEAR_ALL_CHECKED_ROWS = "CLEAR_ALL_CHECKED_ROWS",
  CHECKED_ALL_PAGE_ROWS = "CHECKED_ALL_PAGE_ROWS",
}

export interface DataTableContextProps {
  /**
   * Current table event.
   */
  tableEvent?: TableEvent;
  /**
   * Set table event.
   */
  setTableEvent?: (tableEvent: SetStateAction<TableEvent | undefined>) => void;
  /**
   * Each row state.
   */
  eachRowState: EachRowState<any>;
  /**
   * Set each row state.
   */
  setEachRowState?: (rowState: SetStateAction<EachRowState<any>>) => void;
  /**
   * CheckedAllPageRows state.
   */
  checkedAllPageRows: boolean;
  /**
   * Set checkedAllPageRows state.
   */
  setCheckedAllPageRows?: (rowState: SetStateAction<boolean>) => void;
}

type Values = {
  page: number;
  rowsPerPage: number;
};

export interface MuiTablePaginationProps
  extends Omit<
    TablePaginationProps,
    "ref" | "page" | "rowsPerPage" | "onPageChange" | "onRowsPerPageChange"
  > {
  page?: number;
  rowsPerPage?: number;
  onPageChange?: (
    event: MouseEvent<HTMLButtonElement> | null,
    values: Values
  ) => void;
  onRowsPerPageChange?: (
    event: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    values: Values
  ) => void;
}

export type FilterValues = {
  [key: number]: FilterValue;
};

export interface Column<Data>
  extends Omit<DataTableCellProps, "id" | "isFixed" | "direction"> {
  /**
   * Id for map function key and determine which column should display when enable select columns.
   */
  id: string;
  /**
   * Column display name.
   */
  name: string;
  /**
   * Auto Mapping Data object key, For Example if data shap is { foo: "bar" }
   * You can set dataKey="foo" and it'll auto mapping the value in row.
   */
  dataKey?: string;
  /**
   * To determine which column has been sort currently.
   */
  sortKey?: string;
  /**
   * Fixed cell in right or left.
   */
  fixed?: "right" | "left";
  /**
   * Render function for row cell and it pass the cell data.
   */
  render?: (data: Data) => ReactNode;
  /**
   * Format function to format cell value.
   */
  format?: (value?: ReactNode) => ReactNode;
}

export type ColumnArgs = {
  activeIndex?: number;
  eachRowState?: DataTableContextProps["eachRowState"];
};

export interface DefaultData {
  TableRowProps?: TableRowProps;
}

export interface TableFilterCondition extends FilterCondition {
  filterId: string;
}

export interface TableFilterConditionGroup extends FilterConditionGroup {
  filterConditionList: TableFilterCondition[];
}

export interface DataTableExtendToolsbarProps {
  /**
   * Count for total rows when checkedAll buttton clicked.
   */
  count: number;
  /**
   * Callback Event fired when checkedAll button click.
   */
  onCheckedAllClick?: LinkProps["onClick"];
  /**
   * Callback Event fired when checkedAllClear button click.
   */
  onCheckedAllClearClick?: LinkProps["onClick"];
}

export interface DataTableProps<Data> extends Omit<TableProps, "classes"> {
  /**
   * Table data.
   */
  data?: Data[];
  /**
   * The name of table row key.
   */
  rowKey?: string;
  /**
   * Default Data.
   */
  defaultData?: Data[];
  /**
   * Use data prop to render rows you want.
   */
  renderDataRow?: (rowData: Data, index: number) => ReactNode;
  /**
   * Use data prop to render row detail(Only work when enableRowCollapse).
   */
  renderDataRowDetail?: (rowData: Data, index: number) => ReactNode;
  /**
   * Mui TablePagination props.
   */
  MuiTablePaginationProps: MuiTablePaginationProps;
  /**
   * Columns is used to pass in renderColumns.
   */
  columns?: Column<Data>[];
  /**
   * Use columns prop to render columns you want.
   */
  renderColumns?: (
    columns: Column<Data>[],
    columnArgs: ColumnArgs
  ) => ReactNode;
  /**
   * Event when sort label click
   */
  onSortLabelClick?: (sortKey: string, direction: Direction) => void;
  /**
   * Provide a function to customized empty state.
   */
  renderEmpty?: () => ReactNode;
  /**
   * Set to choosed page and it's only work when `page` is not be controlled.
   */
  to?: number;
  /**
   * Set default page and it's only work when `page` is not be controlled and `to` is not be provided.
   */
  defaultPage?: number;
  /**
   * Set default rows per page and it's only work when `rowsPerPage` is not be controlled.
   */
  defaultRowsPerPage?: number;
  /**
   * Set default column ids to display columns when enable select columns.
   */
  defaultColumnIds?: string[];
  /**
   * Set how many columns to show, the default value is 6.
   */
  columnsShow?: number;
  /**
   * If `data` is get from server set this to true.
   */
  serverSide?: boolean;
  /**
   * Toggle `Loader` and this only work with `serverSide`.
   */
  loading?: boolean;
  /**
   * If `true` show empty state.
   */
  isEmpty?: boolean;
  /**
   * If `true` disable DataTableCell border.
   */
  disableBorder?: boolean;
  /**
   * If `true` disable TableContainer.
   */
  disableTableContainer?: boolean;
  /**
   * Use your own text to localize DataTable.
   */
  localization?: LocalizationArgs;
  /**
   * Set minWidth when table need horizontal scroll.
   */
  minWidth?: number | false;
  /**
   * Set maxHeight when table need fixed header.
   */
  maxHeight?: number;
  /**
   * Control Each row state.
   */
  eachRowState?: EachRowState<Data>;
  /**
   * default eachRowState.
   */
  defaultEachRowState?: EachRowState<Data>;
  /**
   * Control checkedAllPageRows state.
   */
  checkedAllPageRows?: boolean;
  /**
   * default checkedAllPageRows.
   */
  defaultCheckedAllPageRows?: boolean;
  /**
   * Table header title.
   */
  title?: string;
  /**
   * Title TypographyProps
   */
  TitleTypographyProps?: TypographyProps;
  /**
   * Table header subTitle.
   */
  subTitle?: string;
  /**
   * SubTitle TypographyProps
   */
  SubTitleTypographyProps?: TypographyProps;
  /**
   * Customer toolsbar actions.
   */
  toolsbar?: ReactNode;
  /**
   * Customer search actions.
   */
  searchBar?: ReactNode;
  /**
   * SearchBar props.
   */
  SearchBarProps?: Omit<SearchBarProps, "container">;
  /**
   * Filter conditions for display FilterDropDown.
   */
  filterConditionGroups?: TableFilterConditionGroup[];
  /**
   * Default Filter values
   */
  defaultFilterValues?: FilterValues;
  /**
   * Controlled Filter values
   */
  filterValues?: FilterValues;
  /**
   * Event fired when filter values change.
   */
  onFilterValuesChange?: (values: FilterValues, index: number) => void;
  /**
   * Event fired when filter values submit.
   */
  onFilterValuesSubmit?: (values: FilterValues, index: number) => void;
  /**
   * Event fired when filter values clear.
   */
  onFilterValuesClear?: (values: FilterValues, index: number) => void;
  /**
   * FilterDropDown props.
   */
  FilterDropDownProps?: Omit<FilterDropDownProps, "options" | "value">;
  /**
   * Enable filter column.
   */
  enableSelectColumn?: boolean;
  /**
   * Set true to enable table row with collapse.
   */
  enableRowCollapse?: boolean;
  /**
   * Set true to enable table row with checkbox.
   */
  enableRowCheckbox?: boolean;
  /*
   * Set true to enable all checkbox to outside of table.
   */
  outSideAllCheckbox?: boolean;
  /**
   * set ture to enable show Plus button
   */
  enablePlusButton?: boolean;
  /**
   * set ture to enable show Upload button
   */
  enableUploadButton?: boolean;
  /**
   *  pagination bar renderer
   */
  renderPaginationBar?: (
    page: number,
    rowsPerPage: number,
    count: number,
    handleChangePage: (
      event: MouseEvent<HTMLButtonElement> | null,
      page: number
    ) => void,
    handleRowsPerPageChange: (
      event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => void
  ) => void;
  /**
   * Event when rowState change
   */
  onEachRowStateChange?: (
    eachRowState: EachRowState<Data>,
    tableEvent?: TableEvent
  ) => void;
  /**
   * Event when selected column change
   */
  onColumnsChange?: (selectedColumns: string[]) => void;
  onCheckedAllClick?: DataTableExtendToolsbarProps["onCheckedAllClick"];
  onCheckedAllClearClick?: DataTableExtendToolsbarProps["onCheckedAllClearClick"];
}

export type DataTableHeadProps<Data> = Pick<
  DataTableProps<Data>,
  | "columns"
  | "eachRowState"
  | "renderColumns"
  | "onSortLabelClick"
  | "enableRowCollapse"
  | "enableRowCheckbox"
> & {
  rowsPerPage: number;
};

export interface DataTableHeaderProps<Data>
  extends Pick<
      DataTableProps<Data>,
      | "columns"
      | "subTitle"
      | "toolsbar"
      | "searchBar"
      | "filterConditionGroups"
      | "TitleTypographyProps"
      | "SubTitleTypographyProps"
      | "FilterDropDownProps"
      | "defaultFilterValues"
      | "filterValues"
      | "onFilterValuesChange"
      | "onFilterValuesSubmit"
      | "onFilterValuesClear"
      | "SearchBarProps"
      | "enableSelectColumn"
      | "localization"
    >,
    HTMLAttributes<HTMLDivElement> {
  /**
   * Event when Column Change
   */
  onColumnChange?: (column: Column<Data>, checked: boolean) => void;
  /**
   * Filter column keys.
   */
  selectedColumnKeys?: string[];
}
