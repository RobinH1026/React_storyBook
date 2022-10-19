import React, { FC } from "react";

import { useTheme, useMediaQuery } from "@mui/material";
import { format } from "@eGroupAI/utils/dateUtils";
import formatBytes from "@eGroupAI/utils/formatBytes";

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button, { ButtonProps } from "@eGroupAI/material/Button";
import { Item } from "./typings";

export interface FileListItemProps {
  item: Item;
  onPreviewClick?: ButtonProps["onClick"];
  onDownloadClick?: ButtonProps["onClick"];
  onDeleteClick?: ButtonProps["onClick"];
  disableDownload?: boolean;
  disablePreview?: boolean;
  disableDelete?: boolean;
}

const FileListItem: FC<FileListItemProps> = (props) => {
  const {
    item,
    disableDownload,
    disablePreview,
    disableDelete,
    onPreviewClick,
    onDownloadClick,
    onDeleteClick,
  } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const renderActions = () => (
    <Box sx={{ display: "flex", gap: 1 }}>
      {!disablePreview && (
        <Button
          rounded
          color="primary"
          variant="contained"
          onClick={onPreviewClick}
        >
          預覽
        </Button>
      )}
      {!disableDownload && (
        <Button
          rounded
          color="white"
          variant="contained"
          onClick={onDownloadClick}
        >
          下載
        </Button>
      )}
      {!disableDelete && (
        <Button
          rounded
          color="error"
          variant="contained"
          onClick={onDeleteClick}
        >
          刪除
        </Button>
      )}
    </Box>
  );

  if (isMobile) {
    return (
      <TableRow>
        <TableCell>
          <Box display="flex" flexDirection="column">
            <Typography
              component="span"
              variant="h6"
              fontWeight={600}
              gutterBottom
            >
              {format(item.date, "yyyy-MM-dd")}
            </Typography>
            <Typography
              component="span"
              variant="h6"
              fontWeight={600}
              color="primary"
              gutterBottom
            >
              {item.tagName}
            </Typography>
            <Typography
              component="span"
              variant="h6"
              fontWeight={600}
              gutterBottom
            >
              {item.name}
            </Typography>
            <Typography
              component="span"
              variant="h6"
              fontWeight={600}
              gutterBottom
            >
              {formatBytes(item.size)}
            </Typography>
          </Box>
          {renderActions()}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow>
      <TableCell>
        <Typography component="span" variant="h6" fontWeight={600}>
          {format(item.date, "yyyy-MM-dd")}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          component="span"
          variant="h6"
          fontWeight={600}
          color="primary"
        >
          {item.tagName}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography component="span" variant="h6" fontWeight={600}>
          {item.name}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography component="span" variant="h6" fontWeight={600}>
          {formatBytes(item.size)}
        </Typography>
      </TableCell>
      <TableCell>{renderActions()}</TableCell>
    </TableRow>
  );
};

export default FileListItem;
