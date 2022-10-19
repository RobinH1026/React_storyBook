import React from "react";
import { Meta, Story } from "@storybook/react";

import FullTextSearchCard, {
  FullTextSearchCardProps,
} from "@eGroupAI/material-lab/FullTextSearchCard";

export default {
  title: "Lab/FullTextSearchCard",
  component: FullTextSearchCard,
} as Meta;

const data = {
  searchId: "1f9ba189810842a183a89497a459d5e0",
  searchTitle: "(十五)弱勢家庭兒少緊急生活扶助",
  searchContent:
    "v弱勢家庭兒少緊急生活扶助核章層級表110年修改.docx v弱勢家庭兒童及少年緊急生活扶助紀錄撰寫注意事項109版本.docx",
  searchServiceModule: "SPECIFICATION_ADMINISTRATION",
  searchCreateDate: "2021-09-30T10:26:28.000Z",
  searchUpdateDate: "2021-09-30T10:41:14.000Z",
  searchHighlightContent:
    "v弱勢\u003cem\u003e家庭\u003c/em\u003e兒少緊急生活扶助核章層級表110年修改.docx v弱勢\u003cem\u003e家庭\u003c/em\u003e兒童及少年緊急生活扶助紀錄撰寫注意事項109版本.docx",
};

export const Default: Story<FullTextSearchCardProps> = () => (
  <FullTextSearchCard
    title="Title"
    searchTitle={data.searchTitle}
    searchContent={data.searchHighlightContent ?? data.searchContent}
    icon="ImportContacts"
  />
);
