import { Value, ValueType, Option } from "./types";

export const optionToValueType = (
  option: Option,
  defaultMinNumber: number,
  defaultMaxNumber: number
): ValueType => {
  let defaultValue: ValueType = [];
  switch (option.type) {
    case "CHOICEMULTI":
      defaultValue = [];
      break;
    case "DATETIME_RANGE":
    case "DATE_RANGE":
      defaultValue = [null, null];
      break;
    case "NUMBER_RANGE":
      defaultValue = option.items?.map((el) => Number(el.value)) || [
        defaultMinNumber,
        defaultMaxNumber,
      ];
      break;
    case "CHOICEMULTI_TEXT":
      defaultValue = [];
      break;
    default:
  }
  return defaultValue;
};

export const optionsToValue = (
  options: Option[],
  defaultMinNumber: number,
  defaultMaxNumber: number,
  defaultValue?: Value
): Value => {
  const value = options.reduce((a, b) => {
    const defaultValue = optionToValueType(
      b,
      defaultMinNumber,
      defaultMaxNumber
    );
    return {
      ...a,
      [b.id]: defaultValue,
    };
  }, {});
  return {
    ...value,
    ...defaultValue,
  };
};
