import { useMemo } from "react";
import { Option, OptionType } from "@eGroupAI/material-lab/FilterDropDown";
import { TableFilterConditionGroup } from "./typing";

export default function useFilterOptions(
  filterConditionGroups?: TableFilterConditionGroup[]
) {
  const result = useMemo(
    () =>
      filterConditionGroups?.map((group) => ({
        ...group,
        filterConditionList: group.filterConditionList.map(
          (el) =>
            ({
              id: el.filterId,
              title: el.filterName,
              name: el.filterKey,
              icon: el.filterIcon,
              type: el.type as OptionType,
              items: el.dataList?.map((data) => ({
                label: data.name,
                value: data.value,
              })),
            } as Option)
        ),
      })),
    [filterConditionGroups]
  );

  return result;
}
