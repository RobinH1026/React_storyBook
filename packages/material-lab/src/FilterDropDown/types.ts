export type Item = {
  label: string;
  value: string;
};

export type ValueType = number[] | (Date | null)[] | string[] | Item[];

export type Value = {
  [name: string]: ValueType;
};

export type OptionType =
  | "CHOICEMULTI"
  | "DATE_RANGE"
  | "DATETIME_RANGE"
  | "NUMBER_RANGE"
  | "CHOICEMULTI_TEXT";

export type Option = {
  id: string;
  title: string;
  name: string;
  icon?: string;
  type: OptionType;
  items?: Item[];
};
