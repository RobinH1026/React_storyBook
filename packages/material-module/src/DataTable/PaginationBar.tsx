import React, { MouseEvent } from "react";
import Pagination from "@mui/material/Pagination";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

type Values = {
  page: number;
  rowsPerPage: number;
};

export interface PaginationBarProps {
  page: number;
  rowsPerPage: number;
  count: number;
  onPageChange: (
    event: MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void;
  // ToDo: Cause can't solve this type, can use any temporarily
  onRowsPerPageChange: any;
}

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 160,
      width: 78,
    },
  },
};

export interface SelectePerPageProps {
  onRowsPerPageChange: (event: SelectChangeEvent<number>) => void;
  rowsPerPage: number;
  count: number;
  page: number;
}

export function SelectPerPage(props: SelectePerPageProps) {
  const { onRowsPerPageChange, rowsPerPage, count, page } = props;

  return (
    <Grid item sx={{ m: 1, width: 300 }}>
      <FormControl>
        <Select
          displayEmpty
          value={rowsPerPage}
          onChange={onRowsPerPageChange}
          input={<OutlinedInput />}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            width: 78,
            height: 40,
            padding: 0,
            borderRadius: 1000,
            color: "#9E9E9E",
            borderColor: "#9E9E9E",
            backgroundColor: "#F1F1F1",
          }}
          name="perpage"
        >
          {[10, 25, 50, 100].map((p) => (
            <MenuItem key={p} value={p}>
              {p}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography
        variant="caption"
        sx={{
          fontSize: "15px",
          color: "#9E9E9E",
          marginLeft: "20px",
          lineHeight: "40px",
          fontWeight: 500,
        }}
      >
        {`Results: ${page * rowsPerPage + 1}-${
          (page + 1) * rowsPerPage
        } of ${count}`}
      </Typography>
    </Grid>
  );
}

export interface PaginationProps {
  onChange: (
    event: MouseEvent<HTMLButtonElement> | null,
    values: Values
  ) => void;
  count: number;
}

const PaginationBar = (props: PaginationBarProps) => {
  const { page, rowsPerPage, count, onPageChange, onRowsPerPageChange } = props;
  const pageCount =
    count % rowsPerPage === 0 ? count / rowsPerPage : count / rowsPerPage + 1;

  const handlePageChange = (e, page) => {
    onPageChange(e, page - 1);
  };
  return (
    <Grid
      container
      sx={{
        justifyContent: "space-between",
      }}
    >
      <Grid item>
        <SelectPerPage
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPage={rowsPerPage}
          count={count}
          page={page}
        />
      </Grid>

      <Grid item>
        <Pagination
          onChange={handlePageChange}
          count={pageCount}
          color="primary"
          page={page + 1}
          sx={{
            margin: "8px",
            "& .MuiPaginationItem-root:hover": {
              backgroundColor: "#DEEAFB",
            },
            "& .MuiPaginationItem-text": {
              color: "#9E9E9E",
            },
            "& .Mui-selected": {
              color: "white",
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default PaginationBar;
