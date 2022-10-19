import React from "react";
import IconButton from "@eGroupAI/material/IconButton";
import UploadIcon from "@mui/icons-material/Upload";
import AddIcon from "@mui/icons-material/Add";
import DataTableOutSideAllCheckbox from "./DataTableCheckedAllCheckbox";

interface DataTableToolBarProps {
  outSideAllCheckbox: boolean | undefined;
  enablePlusButton: boolean | undefined;
  enableUploadButton: boolean | undefined;
  rowsPerPage: number;
}

const DataTableToolBar = (props: DataTableToolBarProps) => {
  const {
    outSideAllCheckbox = false,
    enablePlusButton = true,
    enableUploadButton = true,
    rowsPerPage,
  } = props;
  return (
    <div style={{ padding: "1px" }}>
      {outSideAllCheckbox && (
        <DataTableOutSideAllCheckbox rowsPerPage={rowsPerPage} />
      )}
      {enablePlusButton && (
        <IconButton size="small">
          <AddIcon />
        </IconButton>
      )}
      {enableUploadButton && (
        <IconButton size="small">
          <UploadIcon />
        </IconButton>
      )}
    </div>
  );
};

export default DataTableToolBar;
