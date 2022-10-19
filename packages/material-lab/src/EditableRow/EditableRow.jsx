/* eslint-disable */

import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";
import makeStyles from "@mui/styles/makeStyles";

import Input from "@mui/material/Input";
import Select from "@mui/material/Select";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

// Basic example,
// const renderDataRow = rowData => (
//   <EditableRow
//     key={rowData.acaseDebtId}
//     rowData={{
//       ...rowData,
//       debtType: rowData.debtType.debtTypeId
//     }}
//     editItems={[
//       {
//         name: 'debtType',
//         variant: 'select',
//         children: options.get('debtType', List()).map(el => (
//           <MenuItem key={el.get('key')} value={el.get('key')}>
//             {el.get('value')}
//           </MenuItem>
//         ))
//       },
//       {
//         name: 'acaseDebtAmount',
//         type: 'number',
//         startAdornment: <InputAdornment position="start">$</InputAdornment>
//       },
//       {
//         name: 'acaseDebtAnnualRate',
//         type: 'number',
//         endAdornment: <InputAdornment position="end">%</InputAdornment>
//       },
//       {
//         name: 'acaseDebtRepaymentFrequency',
//         variant: 'select',
//         children: options
//           .get('acaseDebtRepaymentFrequency', List())
//           .map(el => (
//             <MenuItem key={el.get('key')} value={el.get('key')}>
//               {el.get('value')}
//             </MenuItem>
//           ))
//       },
//       {
//         name: 'acaseDebtRepaymentAmount',
//         type: 'number',
//         startAdornment: <InputAdornment position="start">$</InputAdornment>
//       },
//       {
//         name: 'acaseDebtRepaymentStatus',
//         variant: 'select',
//         children: options.get('acaseDebtRepaymentStatus', List()).map(el => (
//           <MenuItem key={el.get('key')} value={el.get('key')}>
//             {el.get('value')}
//           </MenuItem>
//         ))
//       },
//       {
//         name: 'acaseDebtReason',
//         variant: 'select',
//         children: options.get('acaseDebtReason', List()).map(el => (
//           <MenuItem key={el.get('key')} value={el.get('key')}>
//             {el.get('value')}
//           </MenuItem>
//         ))
//       },
//       {
//         name: 'acaseDebtStartDateString',
//         variant: 'date',
//         format: 'YYYY-MM-DD'
//       },
//       {
//         name: 'acaseDebtExpireDateString',
//         variant: 'date',
//         format: 'YYYY-MM-DD'
//       },
//       {
//         name: 'acaseDebtNegotiationStatus',
//         variant: 'select',
//         children: options
//           .get('acaseDebtNegotiationStatus', List())
//           .map(el => (
//             <MenuItem key={el.get('key')} value={el.get('key')}>
//               {el.get('value')}
//             </MenuItem>
//           ))
//       },
//       {
//         name: 'acaseDebtEffect',
//         variant: 'select',
//         children: options.get('acaseDebtEffect', List()).map(el => (
//           <MenuItem key={el.get('key')} value={el.get('key')}>
//             {el.get('value')}
//           </MenuItem>
//         ))
//       },
//       'acaseDebtNote'
//     ]}
//     displayItems={[
//       rowData.debtType.debtTypeName,
//       `$${rowData.acaseDebtAmount}`,
//       `${rowData.acaseDebtAnnualRate}%`,
//       rowData.acaseDebtRepaymentFrequency,
//       `$${rowData.acaseDebtRepaymentAmount}`,
//       rowData.acaseDebtRepaymentStatus,
//       rowData.acaseDebtReason,
//       rowData.acaseDebtStartDateString.format('YYYY-MM-DD'),
//       rowData.acaseDebtExpireDateString.format('YYYY-MM-DD'),
//       rowData.acaseDebtNegotiationStatus,
//       rowData.acaseDebtEffect,
//       {
//         text: rowData.acaseDebtNote,
//         breakAll: true
//       }
//     ]}
//     onEditSave={values => {
//       const payload = fromJS(values)
//         .deleteAll([
//           'acase',
//           'acaseDebtCreateDateString',
//           'acaseDebtUpdateDateString'
//         ])
//         .update('acaseDebtStartDateString', val => val.format('YYYY-MM-DD'))
//         .update('acaseDebtExpireDateString', val => val.format('YYYY-MM-DD'))
//         .update('debtType', val =>
//           Map({
//             debtTypeId: val
//           })
//         )
//         .set('acaseId', match.params.acaseId)
//         .toJS();
//       fetchPatchAcaseDebt(payload);
//     }}
//     onDeleteSave={() => {
//       fetchDeleteAcaseDebt({
//         acaseId: match.params.acaseId,
//         acaseDebtId: rowData.acaseDebtId
//       });
//     }}
//   />
// );

const variantComponent = {
  input: Input,
  select: Select,
  // date: DatePicker,
};

const useStyles = makeStyles((theme) => ({
  input: {
    minWidth: 100,
  },
  breakCell: { whiteSpace: "normal" },
  break: { wordBreak: "break-all", minWidth: 100 },
}));

const EditableRow = (props) => {
  const { rowData, editItems, displayItems, onEditSave, onDeleteSave } = props;
  const classes = useStyles(props);
  const [values, setValues] = React.useState(rowData);
  const [isEditing, setIsEditing] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleChange = (name) => (e) => {
    const value = e.target.value;
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const handleDateChange = (name) => (date) => {
    const value = date;
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const handleEditSave = (e) => {
    if (onEditSave) {
      onEditSave(values);
    }
    setIsEditing(false);
  };

  const handleDeleteSave = (e) => {
    if (onDeleteSave) {
      onDeleteSave(values);
    }
    setIsDeleting(false);
  };

  const renderActions = () => {
    if (isEditing) {
      return (
        <React.Fragment>
          <Tooltip title="儲存">
            <IconButton onClick={handleEditSave} size="large">
              <CheckIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="取消">
            <IconButton onClick={() => setIsEditing(false)} size="large">
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      );
    }

    if (isDeleting) {
      return (
        <React.Fragment>
          <Tooltip title="儲存">
            <IconButton onClick={handleDeleteSave} size="large">
              <CheckIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="取消">
            <IconButton onClick={() => setIsDeleting(false)} size="large">
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Tooltip title="編輯">
          <IconButton onClick={() => setIsEditing(true)} size="large">
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="刪除">
          <IconButton onClick={() => setIsDeleting(true)} size="large">
            <DeleteOutlineIcon />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  };

  const renderItems = () => {
    if (isEditing) {
      return (
        <React.Fragment>
          {editItems.map((el) => {
            const hasOptions = typeof el === "object";

            if (!hasOptions) {
              return (
                <TableCell key={el}>
                  <Input
                    className={classes.input}
                    name={el}
                    onChange={handleChange(el)}
                    value={values[el]}
                  />
                </TableCell>
              );
            }

            const {
              variant = "input",
              name,
              onChange,
              value,
              className: classNameProp,
              ...other
            } = el;
            const isInput = variant === "input";
            const isDate = variant === "date";
            const EditComponent = variantComponent[variant];
            const className = clsx(
              {
                [classes.input]: isInput || isDate,
              },
              classNameProp
            );

            return (
              <TableCell key={name}>
                <EditComponent
                  className={className}
                  name={name}
                  onChange={
                    !isDate ? handleChange(name) : handleDateChange(name)
                  }
                  value={values[name]}
                  {...other}
                />
              </TableCell>
            );
          })}
        </React.Fragment>
      );
    }

    if (isDeleting) {
      return (
        <TableCell colSpan={editItems.length - 1}>
          <Typography variant="h6">你確定要刪除此紀錄嗎？</Typography>
        </TableCell>
      );
    }

    return (
      <React.Fragment>
        {displayItems.map((el, index) => {
          const hasOptions = typeof el === "object";
          const text = hasOptions ? el.text : el;
          const breakAll = hasOptions ? el.breakAll : false;
          if (breakAll) {
            return (
              <TableCell
                key={`table-cell-${index}`}
                className={classes.breakCell}
              >
                <div className={classes.break}>{text}</div>
              </TableCell>
            );
          }
          return <TableCell key={`table-cell-${index}`}>{text}</TableCell>;
        })}
      </React.Fragment>
    );
  };

  return (
    <TableRow>
      <TableCell>{renderActions()}</TableCell>
      {renderItems()}
    </TableRow>
  );
};

EditableRow.propTypes = {
  rowData: PropTypes.object.isRequired,
  editItems: PropTypes.array.isRequired,
  displayItems: PropTypes.array.isRequired,
  onEditSave: PropTypes.func,
  onDeleteSave: PropTypes.func,
};

export default EditableRow;
