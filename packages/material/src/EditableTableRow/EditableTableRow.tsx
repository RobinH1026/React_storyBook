import React, { MouseEvent, Children, forwardRef, useMemo } from "react";
import useControlled from "@eGroupAI/hooks/useControlled";
import {
  IconButton,
  TableCell,
  TableRow,
  TableRowProps,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditableTableRowContext from "./EditableTableRowContext";

export interface EditableTableRowProp extends TableRowProps {
  onEdit?: (e: MouseEvent) => void;
  onSave?: (e: MouseEvent) => void;
  onSaveCancel?: (e: MouseEvent) => void;
  onDelete?: (e: MouseEvent) => void;
  onDeleteConfirm?: (e: MouseEvent) => void;
  onDeleteConfirmCancel?: (e: MouseEvent) => void;
  /**
   * Use your own text to localize EditableTableRow.
   */
  localization?: {
    deleteMessage: string;
  };
  /**
   * Controll editing.
   */
  editing?: boolean;
  /**
   * default editing
   */
  defaultEditing?: boolean;
  /**
   * Controll deleting
   */
  deleting?: boolean;
  /**
   * default deleting
   */
  defaultDeleting?: boolean;
}

const EditableTableRow = forwardRef<HTMLTableRowElement, EditableTableRowProp>(
  (props, ref) => {
    const {
      onEdit,
      onSave,
      onSaveCancel,
      onDelete,
      onDeleteConfirm,
      onDeleteConfirmCancel,
      children,
      localization = {
        deleteMessage: "Are you sure you want to delete this row?",
      },
      editing: editingProp,
      defaultEditing = false,
      deleting: deletingProp,
      defaultDeleting = false,
      ...other
    } = props;
    const [editing, setEditing] = useControlled({
      controlled: editingProp,
      default: Boolean(defaultEditing),
    });
    const [deleting, setDeleting] = useControlled({
      controlled: deletingProp,
      default: Boolean(defaultDeleting),
    });
    const totalCell = Children.toArray(children).length;

    const handleEdit = (e: MouseEvent) => {
      if (onEdit) {
        onEdit(e);
      }
      setEditing(true);
    };

    const handleSave = (e: MouseEvent) => {
      if (onSave) {
        onSave(e);
      }
      setEditing(false);
    };

    const handleSaveCancel = (e: MouseEvent) => {
      if (onSaveCancel) {
        onSaveCancel(e);
      }
      setEditing(false);
    };

    const handleDelete = (e: MouseEvent) => {
      if (onDelete) {
        onDelete(e);
      }
      setDeleting(true);
    };

    const handleDeleteConfirm = (e: MouseEvent) => {
      if (onDeleteConfirm) {
        onDeleteConfirm(e);
      }
      setDeleting(false);
    };

    const handleDeleteConfirmCancel = (e: MouseEvent) => {
      if (onDeleteConfirmCancel) {
        onDeleteConfirmCancel(e);
      }
      setDeleting(false);
    };

    const renderActions = () => {
      if (editing) {
        return (
          <div style={{ display: "flex" }}>
            <IconButton onClick={handleSave} size="large">
              <CheckIcon />
            </IconButton>
            <IconButton onClick={handleSaveCancel} size="large">
              <CloseIcon />
            </IconButton>
          </div>
        );
      }

      if (deleting) {
        return (
          <div style={{ display: "flex" }}>
            <IconButton onClick={handleDeleteConfirm} size="large">
              <CheckIcon />
            </IconButton>
            <IconButton onClick={handleDeleteConfirmCancel} size="large">
              <CloseIcon />
            </IconButton>
          </div>
        );
      }

      return (
        <div style={{ display: "flex" }}>
          <IconButton onClick={handleEdit} size="large">
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDelete} size="large">
            <DeleteIcon />
          </IconButton>
        </div>
      );
    };

    const value = useMemo(
      () => ({
        editing,
        totalCell,
      }),
      [editing, totalCell]
    );

    return (
      <TableRow ref={ref} {...other}>
        <EditableTableRowContext.Provider value={value}>
          <TableCell style={{ width: 100 }} padding="none">
            {renderActions()}
          </TableCell>
          {deleting ? (
            <TableCell colSpan={totalCell}>
              <Typography color="secondary">
                <strong>{localization.deleteMessage}</strong>
              </Typography>
            </TableCell>
          ) : (
            children
          )}
        </EditableTableRowContext.Provider>
      </TableRow>
    );
  }
);

export default EditableTableRow;
