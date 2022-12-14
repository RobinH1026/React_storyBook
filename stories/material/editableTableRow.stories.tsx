import React, { FC, useState } from "react";
import { Meta } from "@storybook/react";

import EditableTableRow from "@eGroupAI/material/EditableTableRow";
import EditableTableCell from "@eGroupAI/material/EditableTableCell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

export default {
  title: "Components/EditableTableRow",
  component: EditableTableRow,
} as Meta;

export const Default: FC = () => {
  const [value, setValue] = useState("test");

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Actions</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Price</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <EditableTableRow>
          <EditableTableCell
            viewer={value}
            editor={
              <TextField
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            }
          />
          <EditableTableCell
            viewer={value}
            implementation="js"
            editor={
              <TextField
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            }
          />
        </EditableTableRow>
        <EditableTableRow defaultEditing>
          <EditableTableCell
            viewer={value}
            editor={
              <TextField
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            }
          />
          <EditableTableCell
            viewer={value}
            implementation="js"
            editor={
              <TextField
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            }
          />
        </EditableTableRow>
        <EditableTableRow defaultDeleting>
          <EditableTableCell
            viewer={value}
            editor={
              <TextField
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            }
          />
          <EditableTableCell
            viewer={value}
            implementation="js"
            editor={
              <TextField
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            }
          />
        </EditableTableRow>
      </TableBody>
    </Table>
  );
};

export const WithControllEditing: FC = () => {
  const [value, setValue] = useState("test");
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
  };

  const handleSaveCancel = () => {
    setEditing(false);
  };

  const handleDelete = () => {
    setDeleting(true);
  };

  const handleDeleteConfirm = () => {
    setDeleting(false);
  };

  const handleDeleteConfirmCancel = () => {
    setDeleting(false);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Actions</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Price</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <EditableTableRow
          editing={editing}
          deleting={deleting}
          onEdit={handleEdit}
          onSave={handleSave}
          onSaveCancel={handleSaveCancel}
          onDelete={handleDelete}
          onDeleteConfirm={handleDeleteConfirm}
          onDeleteConfirmCancel={handleDeleteConfirmCancel}
        >
          <EditableTableCell
            viewer={value}
            editor={
              <TextField
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            }
          />
          <EditableTableCell
            viewer={value}
            implementation="js"
            editor={
              <TextField
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            }
          />
        </EditableTableRow>
      </TableBody>
    </Table>
  );
};
