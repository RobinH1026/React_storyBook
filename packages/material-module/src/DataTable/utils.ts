import { isValid } from "@eGroupAI/utils/dateUtils";
import {
  Value as FilterValue,
  ValueType,
} from "@eGroupAI/material-lab/FilterDropDown";
import { Column, EachRowState, RowState } from "./typing";

export const asc = <Item>(data: Item[], key: string) =>
  data.sort((a, b) => {
    if (a[key] === b[key]) {
      return 0;
    }
    return b[key] > a[key] ? 1 : -1;
  });

export const desc = <Item>(data: Item[], key: string) =>
  data.sort((a, b) => {
    if (a[key] === b[key]) {
      return 0;
    }
    return a[key] > b[key] ? 1 : -1;
  });

export const getFilterValueCount = (value: FilterValue): [number, boolean] => {
  let hasTriggerRange = false;
  const list = Object.values(value)
    .reduce<ValueType[]>((a, b) => {
      const isNumberArray =
        typeof b[0] === "number" || typeof b[1] === "number";
      const isDateArray = isValid(b[0]) || isValid(b[1]);
      if (isNumberArray || isDateArray) {
        hasTriggerRange = true;
        return a;
      }
      return [...a, ...b] as ValueType[];
    }, [])
    .filter(Boolean);
  return [list.length, hasTriggerRange];
};

export const getSelectedColumnIds = <Data>(
  number: number,
  columns: Column<Data>[]
): string[] =>
  columns
    .slice(0, number)
    .map((el) => el.id)
    .filter((el) => el !== undefined) as string[];

export const getNextEachRowState = <Data>(
  prev: EachRowState<Data>,
  state: Partial<RowState<Data>>
) => {
  const next = { ...prev };
  const keys = Object.keys(next);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    next[key] = {
      ...(next[key] as RowState<Data>),
      ...state,
    };
  }
  return next;
};

export const checkedDisplayRowState = <Data>(
  prev: EachRowState<Data>,
  checked: boolean
) => {
  const next = { ...prev };
  const keys = Object.keys(next);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (next[key]?.display) {
      next[key] = {
        ...(next[key] as RowState<Data>),
        checked,
      };
    }
  }
  return next;
};
