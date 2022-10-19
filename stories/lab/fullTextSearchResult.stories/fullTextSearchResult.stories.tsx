import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";

import FullTextSearchResult, {
  FullTextSearchResultProps,
} from "@eGroupAI/material-lab/FullTextSearchResult";
import FullTextSearchCards from "@eGroupAI/material-lab/FullTextSearchCards";
import useFullTextSearch from "@eGroupAI/hooks/apis/useFullTextSearch";
import data from "./data.json";

export default {
  title: "Lab/FullTextSearchResult",
  component: FullTextSearchResult,
} as Meta;

const tabs = [
  {
    label: "綜合",
    value: "ALL",
  },
  {
    label: "個案工作",
    value: "CASEWORK",
  },
  {
    label: "行政作業",
    value: "ADMIN",
  },
  {
    label: "佈告欄",
    value: "BULLETIN",
  },
  {
    label: "檔案",
    value: "FILES",
  },
];

export const Default: Story<FullTextSearchResultProps> = () => {
  const searchKey = "Cat";
  const [seviceModuleValue, setSeviceModuleValue] = useState<string>();
  const { data: results = data } = useFullTextSearch(
    {
      organizationId: "organizationId",
    },
    {
      query: searchKey,
      seviceModuleValue,
    }
  );

  return (
    <FullTextSearchResult
      searchKey={searchKey}
      tabs={tabs}
      defaultTabValue="ALL"
      onTabChange={(value) => {
        setSeviceModuleValue(value);
      }}
    >
      <FullTextSearchCards data={results} />
    </FullTextSearchResult>
  );
};

export const WithLoading: Story<FullTextSearchResultProps> = () => {
  const searchKey = "Cat";

  return (
    <FullTextSearchResult
      searchKey={searchKey}
      tabs={tabs}
      defaultTabValue="ALL"
    >
      <FullTextSearchCards />
    </FullTextSearchResult>
  );
};

export const WithEmptyResult: Story<FullTextSearchResultProps> = () => {
  const searchKey = "Cat";
  const results = {
    source: [],
    total: 0,
  };

  return (
    <FullTextSearchResult
      searchKey={searchKey}
      tabs={tabs}
      defaultTabValue="ALL"
    >
      <FullTextSearchCards data={results} />
    </FullTextSearchResult>
  );
};
