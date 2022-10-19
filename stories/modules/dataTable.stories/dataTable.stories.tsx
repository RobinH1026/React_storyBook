import React, { useMemo, useState } from "react";
import { Meta, Story } from "@storybook/react";

import { FilterConditionGroup } from "@eGroupAI/typings/apis";
import { TableCell, TableRow, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import DataTable, {
  useDataTable,
  DataTableProps,
  EachRowState,
  TableEvent,
} from "@eGroupAI/material-module/DataTable";
import findDeepValue from "@eGroupAI/utils/findDeepValue";
import DataTableFixedTableCell from "@eGroupAI/material-module/DataTableFixedTableCell";
import { DefaultPayload } from "@eGroupAI/material-module/DataTable/useDataTable";
import Button from "@eGroupAI/material/Button";
import ListItemAvatar from "@eGroupAI/material/ListItemAvatar";
import Avatar from "@eGroupAI/material/Avatar";
import StyledListItem from "@eGroupAI/material-module/DataTable/StyledListItem";
import StyledDataTableRowCheckbox from "@eGroupAI/material-module/DataTable/StyledDataTableRowCheckbox";
import StyledDataTableCell from "@eGroupAI/material-module/DataTable/StyledDataTableCell";
import StyledSearchBar from "@eGroupAI/material-module/DataTable/StyledSearchBar";
import StyledButton from "@eGroupAI/material-module/DataTable/StyledButton";
import StyledChip from "@eGroupAI/material-module/DataTable/StyledChip";
import StyledIconButton from "@eGroupAI/material-module/DataTable/StyledIconButton";
import StyledListItemText from "@eGroupAI/material-module/DataTable/StyledListItemText";
import StyledSwitch from "@eGroupAI/material-module/DataTable/StyledSwitch";
import StyledTextField from "@eGroupAI/material-module/DataTable/StyledTextField";
import StyledTypography from "@eGroupAI/material-module/DataTable/StyledTypography";
import PaginationBar from "@eGroupAI/material-module/DataTable/PaginationBar";

import DB, { TextDB } from "./mockDatabase";
import data from "./data.json";
import createData, { RowData } from "./createData";
import localization from "./localization";

const filterConditionGroups = (data as FilterConditionGroup[]).map((group) => ({
  ...group,
  filterConditionList: group.filterConditionList.map((el) => ({
    ...el,
    filterId: `${el.filterKey}-${(el.filterName as string).trim()}`,
  })),
}));

const StyledDataTable = styled(DataTable)(({ theme }) => ({
  "& .MuiEgDataTableHeader-header": {
    padding: theme.spacing(2, 2.5),
  },
  "& .MuiTableCell-root": {
    padding: theme.spacing(2, 2.5),
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2, 2.5),
}));

export default {
  title: "Modules/DataTable",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/OlUxH6H4u3DLEmeytXgNkV/Infocenter-UI-Kit?node-id=1361%3A1349",
    },
  },
  component: DataTable,
  argTypes: {
    to: { control: "number", defaultValue: 0 },
    serverSide: { control: "boolean", defaultValue: false },
    loading: { control: "boolean", defaultValue: false },
    isEmpty: { control: "boolean", defaultValue: false },
    disableBorder: { control: "boolean", defaultValue: false },
    disableTableContainer: { control: "boolean", defaultValue: false },
    defaultRowsPerPage: { control: "number", defaultValue: 10 },
    defaultPage: { control: "number", defaultValue: 1 },
    minWidth: { control: "number", defaultValue: 800 },
  },
} as Meta;

interface MyDefaultPayload extends DefaultPayload {
  startIndex?: number;
}

export const Default: Story<DataTableProps<RowData>> = ({
  to,
  serverSide,
  loading,
  isEmpty,
  disableBorder,
  disableTableContainer,
  defaultRowsPerPage,
  defaultPage,
  minWidth,
}) => {
  const { data } = DB;
  const {
    handleSearchChange,
    handleChangePage,
    handleRowsPerPageChange,
    payload,
    setPayload,
    page,
    rowsPerPage,
  } = useDataTable<MyDefaultPayload>(
    "myTableKey",
    {
      from: defaultPage ?? 0,
      size: defaultRowsPerPage ?? 10,
    },
    {
      fromKey: "startIndex",
      enableLocalStorageCache: true,
    }
  );

  return (
    <>
      <Paper>
        <DataTable
          rowKey="id"
          title="測試列表"
          columns={[
            {
              name: "",
              id: "checkbox",
              width: "30",
            },
            {
              name: "Sample Text",
              id: "text",
              sortKey: "text",
              dataKey: "text",
            },
            {
              name: "Sample Tags",
              sortKey: "tag",
              dataKey: "tag",
              id: "tag",
            },
            {
              name: "Option",
              sortKey: "option",
              dataKey: "option",
              id: "option",
            },
            {
              name: "Name & Email",
              sortKey: "name",
              dataKey: "name",
              id: "name",
            },
            {
              name: "Date & Time",
              sortKey: "date",
              dataKey: "date",
              id: "date",
            },
            {
              name: "Input Text",
              sortKey: "inputText",
              dataKey: "inputText",
              id: "inputText",
            },
            {
              name: "Button",
              id: "button",
            },
            {
              name: "Icon",
              id: "icon",
              width: "100",
            },
          ]}
          sx={{
            "& .MuiTableCell-root": {
              padding: "6px 8px",
            },
          }}
          data={data.map((el) => ({
            ...el,
            TableRowProps: {
              hover: true,
              onClick: () => {
                console.log(el);
              },
            },
          }))}
          renderDataRow={(rowData) => {
            const dataId = findDeepValue<number>(rowData, "id");
            return (
              <TableRow key={rowData.id} hover>
                <StyledDataTableCell>
                  <StyledDataTableRowCheckbox dataId={`${dataId}`} />
                </StyledDataTableCell>
                <StyledDataTableCell>
                  <StyledTypography variant="body2">
                    {rowData.text}
                  </StyledTypography>
                </StyledDataTableCell>
                <StyledDataTableCell>
                  <StyledChip label={rowData.tag} />
                </StyledDataTableCell>
                <StyledDataTableCell>
                  <StyledSwitch defaultChecked={rowData.option} />
                </StyledDataTableCell>
                <StyledDataTableCell>
                  <StyledListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <StyledListItemText
                      primary={rowData.name}
                      secondary={rowData.email}
                    />
                  </StyledListItem>
                </StyledDataTableCell>
                <StyledDataTableCell>
                  <StyledTypography>{rowData.date}</StyledTypography>
                </StyledDataTableCell>
                <StyledDataTableCell>
                  <StyledTextField
                    fullWidth
                    placeholder="Hint Text"
                    variant="outlined"
                    size="small"
                    value={rowData.inputText}
                  />
                </StyledDataTableCell>
                <StyledDataTableCell>
                  <StyledButton variant="contained" color="primary">
                    Button
                  </StyledButton>
                </StyledDataTableCell>
                <StyledDataTableCell>
                  <StyledIconButton>
                    <DeleteIcon />
                  </StyledIconButton>
                </StyledDataTableCell>
              </TableRow>
            );
          }}
          filterConditionGroups={filterConditionGroups}
          onSortLabelClick={(sortKey, direction) => {
            setPayload((val) => ({
              ...val,
              sortKey,
              direction,
            }));
          }}
          stickyHeader
          maxHeight={410}
          searchBar={
            <StyledSearchBar
              handleSearchChange={handleSearchChange}
              defaultValue={payload.query}
            />
          }
          outSideAllCheckbox
          size="small"
          MuiTablePaginationProps={{
            count: data.length,
            labelRowsPerPage: "每頁幾筆",
            page,
            rowsPerPage,
            onPageChange: handleChangePage,
            onRowsPerPageChange: handleRowsPerPageChange,
          }}
          localization={localization}
          to={to}
          serverSide={serverSide}
          loading={loading}
          isEmpty={isEmpty}
          disableBorder={disableBorder}
          disableTableContainer={disableTableContainer}
          defaultRowsPerPage={defaultRowsPerPage}
          defaultPage={defaultPage}
          minWidth={minWidth}
          renderPaginationBar={(
            page,
            rowsPerPage,
            count,
            handleChangePage,
            handleRowsPerPageChange
          ) => (
            <PaginationBar
              page={page}
              rowsPerPage={rowsPerPage}
              count={count}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          )}
        />
      </Paper>
    </>
  );
};

export const WithLargeTable: Story<DataTableProps<RowData>> = ({
  to,
  serverSide,
  loading,
  isEmpty,
  disableBorder,
  disableTableContainer,
  defaultRowsPerPage,
  defaultPage,
  minWidth,
}) => {
  const { columns, data } = useMemo(() => createData(20, 200), []);
  const {
    handleSearchChange,
    handleChangePage,
    handleRowsPerPageChange,
    payload,
    setPayload,
    page,
    rowsPerPage,
  } = useDataTable<MyDefaultPayload>(
    "myTableKey",
    {
      from: defaultPage ?? 0,
      size: defaultRowsPerPage ?? 10,
    },
    {
      fromKey: "startIndex",
    }
  );
  return (
    <>
      Payload: {JSON.stringify(payload)}
      <Paper>
        <DataTable
          rowKey="id"
          title="測試列表"
          columns={[
            {
              name: "ID",
              sortKey: "id",
              dataKey: "id",
              id: "id",
              fixed: "left",
            },
            {
              name: "Name",
              sortKey: "Column 0",
              dataKey: "Column 0",
              id: "Column 0",
              fixed: "left",
            },
            ...columns.slice(1, 19),
            {
              name: "Name",
              id: "Name",
              dataKey: "Column 0",
              fixed: "right",
            },
            {
              name: "操作",
              fixed: "right",
              id: "action",
              render: () => (
                <DataTableFixedTableCell direction="right" key="action">
                  <Button>編輯</Button>
                </DataTableFixedTableCell>
              ),
            },
          ]}
          filterConditionGroups={filterConditionGroups}
          onSortLabelClick={(sortKey, direction) => {
            setPayload((val) => ({
              ...val,
              sortKey,
              direction,
            }));
          }}
          data={data}
          stickyHeader
          maxHeight={410}
          SearchBarProps={{
            placeholder: "Search",
            onChange: handleSearchChange,
            defaultValue: payload.query,
          }}
          MuiTablePaginationProps={{
            count: data.length,
            labelRowsPerPage: "每頁幾筆",
            page,
            rowsPerPage,
            onPageChange: handleChangePage,
            onRowsPerPageChange: handleRowsPerPageChange,
          }}
          localization={localization}
          to={to}
          serverSide={serverSide}
          loading={loading}
          isEmpty={isEmpty}
          disableBorder={disableBorder}
          disableTableContainer={disableTableContainer}
          defaultRowsPerPage={defaultRowsPerPage}
          defaultPage={defaultPage}
          minWidth={minWidth}
        />
      </Paper>
    </>
  );
};

export const WithCollapseAndCheckboxRow: Story<DataTableProps<RowData>> = ({
  to,
  serverSide,
  loading,
  isEmpty,
  disableBorder,
  disableTableContainer,
  defaultRowsPerPage,
  defaultPage,
  minWidth,
}) => {
  const { columns, data } = useMemo(() => createData(30, 200), []);
  const [eachRowState, setEachRowState] = useState<EachRowState<RowData>>({});
  const [tableEvent, setTableEvent] = useState<TableEvent>();
  return (
    <>
      SelectedIds:
      <pre
        style={{
          maxHeight: 300,
          overflowY: "auto",
          backgroundColor: "#eee",
          fontSize: 12,
        }}
      >
        {JSON.stringify(eachRowState, null, 4)}
      </pre>
      <br />
      tableEvent:{tableEvent}
      <DataTable
        rowKey="id"
        columns={columns}
        data={data}
        size="small"
        stickyHeader
        maxHeight={410}
        enableRowCollapse
        enableRowCheckbox
        onEachRowStateChange={(eachRowState, tableEvent) => {
          setTableEvent(tableEvent);
          setEachRowState(eachRowState);
        }}
        renderDataRowDetail={() => (
          <>
            An example of a table with expandable rows, revealing more
            information. It utilizes the Collapse component.
          </>
        )}
        MuiTablePaginationProps={{
          count: data.length,
          labelRowsPerPage: "每頁幾筆",
        }}
        to={to}
        serverSide={serverSide}
        loading={loading}
        isEmpty={isEmpty}
        disableBorder={disableBorder}
        disableTableContainer={disableTableContainer}
        defaultRowsPerPage={defaultRowsPerPage}
        defaultPage={defaultPage}
        minWidth={minWidth}
      />
      Or Without Collpase
      <DataTable
        rowKey="id"
        columns={columns}
        data={data}
        size="small"
        stickyHeader
        maxHeight={410}
        enableRowCheckbox
        MuiTablePaginationProps={{
          count: data.length,
          labelRowsPerPage: "每頁幾筆",
        }}
        to={to}
        serverSide={serverSide}
        loading={loading}
        isEmpty={isEmpty}
        disableBorder={disableBorder}
        disableTableContainer={disableTableContainer}
        defaultRowsPerPage={defaultRowsPerPage}
        defaultPage={defaultPage}
        minWidth={minWidth}
      />
    </>
  );
};

export const WithCustomStyle: Story<DataTableProps<RowData>> = ({
  to,
  serverSide,
  loading,
  isEmpty,
  disableBorder,
  disableTableContainer,
  defaultRowsPerPage,
  defaultPage,
  minWidth,
}) => {
  const { data } = useMemo(() => createData(6, 200), []);
  const {
    handleSearchChange,
    handleChangePage,
    handleRowsPerPageChange,
    payload,
    page,
    rowsPerPage,
  } = useDataTable<MyDefaultPayload>(
    "myTableKey",
    {
      from: defaultPage ?? 0,
      size: defaultRowsPerPage ?? 10,
    },
    {
      fromKey: "startIndex",
    }
  );

  return (
    <>
      {JSON.stringify(payload)}
      <Paper>
        <StyledDataTable
          rowKey="id"
          title="Unit member"
          subTitle="You can manage the members of your organization, and you can collaborate as long as you invite them."
          TitleTypographyProps={{
            variant: "h5",
          }}
          data={data}
          SearchBarProps={{
            placeholder: "Search",
            onChange: handleSearchChange,
            defaultValue: payload.query,
            variant: "outlined",
            rounded: true,
          }}
          renderDataRow={(rowData) => {
            const data = rowData as RowData;
            return (
              <TableRow key={data.id}>
                {Object.keys(data).map((el) => {
                  if (el !== "id") {
                    return (
                      <StyledTableCell key={el}>{data[el]}</StyledTableCell>
                    );
                  }
                  return undefined;
                })}
              </TableRow>
            );
          }}
          MuiTablePaginationProps={{
            count: data.length,
            labelRowsPerPage: "每頁幾筆",
            page,
            rowsPerPage,
            onPageChange: handleChangePage,
            onRowsPerPageChange: handleRowsPerPageChange,
          }}
          localization={localization}
          to={to}
          serverSide={serverSide}
          loading={loading}
          isEmpty={isEmpty}
          disableBorder={disableBorder}
          disableTableContainer={disableTableContainer}
          defaultRowsPerPage={defaultRowsPerPage}
          defaultPage={defaultPage}
          minWidth={minWidth}
        />
      </Paper>
    </>
  );
};

export const WithText: Story<DataTableProps<RowData>> = ({
  to,
  serverSide,
  loading,
  isEmpty,
  disableBorder,
  disableTableContainer,
  defaultRowsPerPage,
  defaultPage,
  minWidth,
}) => {
  const { data } = TextDB;
  const {
    handleSearchChange,
    handleChangePage,
    handleRowsPerPageChange,
    payload,
    setPayload,
    page,
    rowsPerPage,
  } = useDataTable<MyDefaultPayload>(
    "myTableKey",
    {
      from: defaultPage ?? 0,
      size: defaultRowsPerPage ?? 10,
    },
    {
      fromKey: "startIndex",
      enableLocalStorageCache: true,
    }
  );

  return (
    <>
      <Paper>
        <DataTable
          rowKey="id"
          title="測試列表"
          columns={[
            {
              name: "",
              id: "checkbox",
              width: "30",
            },
            {
              name: "Chinese Name",
              id: "chName",
              sortKey: "chName",
              dataKey: "chName",
            },
            {
              name: "English Name",
              id: "enName",
              sortKey: "enName",
              dataKey: "enName",
            },
            {
              name: "Contact Number",
              id: "contactNumber",
              sortKey: "contactNumber",
              dataKey: "contactNumber",
            },
            {
              name: "Email",
              id: "email",
              sortKey: "email",
              dataKey: "email",
            },
            {
              name: "Postal Code",
              id: "pCode",
              sortKey: "pCode",
              dataKey: "pCode",
            },
            {
              name: "City",
              id: "city",
              sortKey: "city",
              dataKey: "city",
            },
            {
              name: "Gender",
              id: "gender",
              sortKey: "gender",
              dataKey: "gender",
            },
            {
              name: "Build Time",
              sortKey: "buildTime",
              dataKey: "buildTime",
              id: "buildTime",
            },
            {
              name: "Birthdate",
              sortKey: "birthdate",
              dataKey: "birthdate",
              id: "birthdate",
            },
          ]}
          sx={{
            "& .MuiTableCell-root": {
              padding: "6px 8px",
            },
          }}
          data={data.map((el) => ({
            ...el,
            TableRowProps: {
              hover: true,
              onClick: () => {
                console.log(el);
              },
            },
          }))}
          renderDataRow={(rowData) => {
            const data = rowData as RowData;
            const dataId = findDeepValue<number>(rowData, "id");
            return (
              <TableRow key={data.id} hover>
                <StyledDataTableCell>
                  <StyledDataTableRowCheckbox dataId={`${dataId}`} />
                </StyledDataTableCell>
                <StyledDataTableCell>
                  <StyledTypography variant="body2">
                    {data.chName}
                  </StyledTypography>
                </StyledDataTableCell>
                <StyledDataTableCell>
                  <StyledTypography>{data.enName}</StyledTypography>
                </StyledDataTableCell>
                <StyledDataTableCell>
                  <StyledTypography>{data.contactNumber}</StyledTypography>
                </StyledDataTableCell>
                <StyledDataTableCell>
                  <StyledTypography>{data.email}</StyledTypography>
                </StyledDataTableCell>
                <StyledDataTableCell>
                  <StyledTypography>{data.pCode}</StyledTypography>
                </StyledDataTableCell>
                <StyledDataTableCell>
                  <StyledTypography>{data.city}</StyledTypography>
                </StyledDataTableCell>
                <StyledDataTableCell>
                  <StyledTypography>{data.gender}</StyledTypography>
                </StyledDataTableCell>
                <StyledDataTableCell>
                  <StyledTypography>{data.buildTime}</StyledTypography>
                </StyledDataTableCell>
                <StyledDataTableCell>
                  <StyledTypography>{data.birthdate}</StyledTypography>
                </StyledDataTableCell>
              </TableRow>
            );
          }}
          filterConditionGroups={filterConditionGroups}
          onSortLabelClick={(sortKey, direction) => {
            setPayload((val) => ({
              ...val,
              sortKey,
              direction,
            }));
          }}
          stickyHeader
          maxHeight={410}
          searchBar={
            <StyledSearchBar
              handleSearchChange={handleSearchChange}
              defaultValue={payload.query}
            />
          }
          outSideAllCheckbox
          size="small"
          MuiTablePaginationProps={{
            count: data.length,
            labelRowsPerPage: "每頁幾筆",
            page,
            rowsPerPage,
            onPageChange: handleChangePage,
            onRowsPerPageChange: handleRowsPerPageChange,
          }}
          localization={localization}
          to={to}
          serverSide={serverSide}
          loading={loading}
          isEmpty={isEmpty}
          disableBorder={disableBorder}
          disableTableContainer={disableTableContainer}
          defaultRowsPerPage={defaultRowsPerPage}
          defaultPage={defaultPage}
          minWidth={minWidth}
          renderPaginationBar={(
            page,
            rowsPerPage,
            count,
            handleChangePage,
            handleRowsPerPageChange
          ) => (
            <PaginationBar
              page={page}
              rowsPerPage={rowsPerPage}
              count={count}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          )}
        />
      </Paper>
    </>
  );
};
