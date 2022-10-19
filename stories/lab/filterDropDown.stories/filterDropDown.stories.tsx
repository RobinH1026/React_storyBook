import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import { v4 as uuidv4 } from "uuid";

import FilterDropDown, {
  FilterDropDownProps,
  Option,
  OptionType,
  Value,
} from "@eGroupAI/material-lab/FilterDropDown";
import data from "./data.json";

export default {
  title: "Lab/FilterDropDown",
  component: FilterDropDown,
} as Meta;

const options: Option[] = data.map((el) => ({
  id: uuidv4(),
  title: el.filterName,
  name: el.filterKey,
  type: el.type as OptionType,
  items: el.dataList?.map((data) => ({
    label: data.name,
    value: data.value,
  })),
}));

export const Default: Story<FilterDropDownProps> = () => {
  const [value, setValue] = useState<Value>({});

  return (
    <>
      Value: {JSON.stringify(value)}
      <br />
      <FilterDropDown
        options={options}
        onSubmit={(value) => {
          setValue(value);
        }}
      >
        測試
      </FilterDropDown>
    </>
  );
};

export const WithControledValue: Story<FilterDropDownProps> = () => {
  const [value, setValue] = useState<Value>({});

  return (
    <>
      Value: {JSON.stringify(value)}
      <br />
      <FilterDropDown
        options={options}
        value={value}
        onChange={(value) => {
          setValue(value);
        }}
      >
        測試
      </FilterDropDown>
    </>
  );
};
