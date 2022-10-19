import React, { FC } from "react";

import TableContainer from "@eGroupAI/material/TableContainer";
import Table from "@eGroupAI/material/Table";
import TableBody from "@eGroupAI/material/TableBody";
import FileListItem from "./FileListItem";
import { Item } from "./typings";

export interface FileListProps {
  items?: Item[];
  disableDownload?: boolean;
  disablePreview?: boolean;
  disableDelete?: boolean;
  onPreviewClick?: (item: Item) => void;
  onDownloadClick?: (item: Item) => void;
  onDeleteClick?: (item: Item) => void;
}

const FileList: FC<FileListProps> = (props) => {
  const {
    items,
    disableDownload,
    disablePreview,
    disableDelete,
    onPreviewClick,
    onDownloadClick,
    onDeleteClick,
  } = props;
  return (
    <TableContainer>
      <Table>
        <TableBody>
          {items?.map((el) => (
            <FileListItem
              key={el.id}
              item={el}
              disableDownload={disableDownload}
              disablePreview={disablePreview}
              disableDelete={disableDelete}
              onPreviewClick={() => {
                if (onPreviewClick) {
                  onPreviewClick(el);
                }
              }}
              onDownloadClick={() => {
                if (onDownloadClick) {
                  onDownloadClick(el);
                }
              }}
              onDeleteClick={() => {
                if (onDeleteClick) {
                  onDeleteClick(el);
                }
              }}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FileList;
