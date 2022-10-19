import { fromJS, List, isImmutable, Map } from "immutable";

/**
 * If formatter value is string or boolean get the correct option format for react select.
 * Option format example, { value: 'foo', label: 'bar' }.
 * Depricated due to no longer use immutable.
 * @deprecated
 */
function getFormattedSelectOption({
  value,
  labelPath,
  valuePath,
  selectOptions,
}) {
  if (typeof value === "string" || typeof value === "number") {
    if (selectOptions) {
      const selectedOption = selectOptions.filter(
        (el) => el[valuePath] === value
      )[0];
      if (selectedOption) {
        return fromJS(selectedOption);
      }
    }
    return fromJS({
      label: value,
      value,
    });
  }
  if (Map.isMap(value)) {
    return fromJS({
      ...value.toJS(),
      label: value.getIn(labelPath),
      value: value.getIn(valuePath),
    });
  }
  return value;
}

/**
 * Make react select redux form formatter.
 * Depricated due to no longer use immutable.
 * @param {*} options
 * @param {array} options.labelPath
 * @param {array} options.valuePath
 * @deprecated
 */
export function makeReactSelectFormatter(options = {}) {
  const {
    labelPath = ["label"],
    valuePath = ["value"],
    options: selectOptions,
  } = options;
  return function formatter(value, name) {
    if (List.isList(value)) {
      return value.map((el) =>
        getFormattedSelectOption({
          value: el,
          labelPath,
          valuePath,
          selectOptions,
        })
      );
    }
    return getFormattedSelectOption({
      value,
      labelPath,
      valuePath,
      selectOptions,
    });
  };
}

/**
 * If react select options value is immutable Map get the correct value format to store in redux form.
 * Depricated due to no longer use immutable.
 * @deprecated
 */
function getNormalizedReduxFormValue({ value, disableReturnStringValue }) {
  if (Map.isMap(value)) {
    if (disableReturnStringValue) {
      return value.deleteAll(["label", "value"]);
    }
    return value.get("value");
  }
  return value;
}

/**
 * Make react select redux form normalizer.
 * Depricated due to no longer use immutable.
 * @param {*} options
 * @param {boolean} options.disableReturnStringValue set `true` to disable return String value
 * @deprecated
 */
export function makeReactSelectNormalizer(options = {}) {
  const { disableReturnStringValue } = options;
  return function normalizer(
    value,
    previousValue,
    allValues,
    previousAllValues,
    name
  ) {
    if (isImmutable(value)) {
      if (List.isList(value)) {
        return value.map((el) =>
          getNormalizedReduxFormValue({
            value: el,
            disableReturnStringValue,
          })
        );
      }
      return getNormalizedReduxFormValue({
        value,
        disableReturnStringValue,
      });
    }
    return value;
  };
}

/**
 * normalize form field of number
 * Depricated due to no longer use immutable.
 * @param {object} options
 * @deprecated
 */
export function positive(options = {}) {
  const { min = 0, max, fixed } = options;

  return (value) => {
    let result = fixed ? Number(value).toFixed() : Number(value);
    if (result < min) result = min;
    if (typeof max === "number") {
      if (result > max) result = max;
    }
    return result;
  };
}
