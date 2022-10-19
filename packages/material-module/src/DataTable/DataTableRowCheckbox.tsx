import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
} from "react";
import useControlled from "@eGroupAI/hooks/useControlled";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import DataTableContext from "./DataTableContext";
import { RowState, TableEvent } from "./typing";

export interface DataTableRowCheckboxProps<Data> extends CheckboxProps {
  dataId: string;
  data?: Data;
}

const DataTableRowCheckbox = forwardRef(
  <Data,>(
    props: DataTableRowCheckboxProps<Data>,
    ref?: ForwardedRef<HTMLButtonElement>
  ) => {
    const {
      dataId,
      data,
      checked: checkedProp,
      defaultChecked = false,
      onChange,
      ...other
    } = props;
    const {
      setEachRowState,
      eachRowState,
      setTableEvent,
      tableEvent,
      checkedAllPageRows,
    } = useContext(DataTableContext);
    const [checked, setChecked] = useControlled({
      controlled: checkedProp,
      default: defaultChecked,
    });

    // init RowState
    useEffect(() => {
      if (setEachRowState) {
        setEachRowState((val) => ({
          ...val,
          [dataId]: {
            checked: checkedAllPageRows ? true : defaultChecked,
            data,
            ...val[dataId],
            display: true,
          },
        }));
      }
      return () => {
        if (setEachRowState) {
          setEachRowState((val) => ({
            ...val,
            [dataId]: {
              ...(val[dataId] as RowState<Data>),
              display: false,
            },
          }));
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update check state when eachRowState, tableEvent changed
    useEffect(() => {
      const rowInfo = eachRowState[dataId];
      if (rowInfo) {
        setChecked(rowInfo.checked);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eachRowState, tableEvent]);

    const handleChange = useCallback<NonNullable<CheckboxProps["onChange"]>>(
      (e, checked) => {
        if (onChange) {
          onChange(e, checked);
        }
        if (setTableEvent) {
          setTableEvent(TableEvent.CHNAGE_CHECKED_ROW);
        }
        if (setEachRowState) {
          setEachRowState((val) => ({
            ...val,
            [dataId]: {
              ...(val[dataId] as RowState<Data>),
              checked,
            },
          }));
        }
      },
      [dataId, onChange, setEachRowState, setTableEvent]
    );

    return (
      <Checkbox
        checked={checked}
        onChange={handleChange}
        ref={ref}
        {...other}
      />
    );
  }
);

export default DataTableRowCheckbox;
