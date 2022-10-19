import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";

import FullTextSearchCards, {
  FullTextSearchCardsProps,
} from "@eGroupAI/material-lab/FullTextSearchCards";
import { SearchResult } from "@eGroupAI/typings/apis";
import data from "./data.json";

export default {
  title: "Lab/FullTextSearchCards",
  component: FullTextSearchCards,
} as Meta;

export const Default: Story<FullTextSearchCardsProps> = () => {
  const [result, setResult] = useState<SearchResult>();
  const [page, setPage] = useState(1);
  return (
    <>
      Page: {page}
      <br />
      Result: {JSON.stringify(result)}
      <br />
      <FullTextSearchCards
        data={data}
        defaultPage={1}
        onChange={(_, page) => {
          setPage(page);
        }}
        onSearchTitleClick={(result) => {
          setResult(result);
        }}
      />
    </>
  );
};
