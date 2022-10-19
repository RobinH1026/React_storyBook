import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Grid } from "@mui/material";
import Tag, { TagProps } from "@eGroupAI/material/Tag";
import TagGroup from "@eGroupAI/material/TagGroup";

export default {
  title: "Components/Tag",
  component: Tag,
} as Meta;

const tags = [
  {
    name: "tag1",
    color: "#e58282",
  },
  {
    name: "tag2",
    color: "#4e73df",
  },
  {
    name: "tag3",
    color: "#82cde5",
  },
  {
    name: "tag4",
    color: "#9a48bc",
  },
];

const tagGroups = [
  {
    tagGroupName: "tagGroup 1",
    tags,
  },
  {
    tagGroupName: "tagGroup 2",
    tags,
  },
  {
    tagGroupName: "tagGroup 2",
    tags,
  },
];

export const Default: Story<TagProps> = ({ onDelete, ...args }) => (
  <Grid container spacing={2}>
    {tags.map((el) => (
      <Grid item key={el.name}>
        <Tag color={el.color} {...args}>
          {el.name}
        </Tag>
      </Grid>
    ))}
  </Grid>
);

export const WithActions: Story<TagProps> = (args) => (
  <Grid container spacing={2}>
    {tags.map((el) => (
      <Grid item key={el.name}>
        <Tag color={el.color} onDelete={() => {}} {...args}>
          {el.name}
        </Tag>
      </Grid>
    ))}
  </Grid>
);

export const WithTagGroup: Story<TagProps> = ({ onDelete, ...args }) => (
  <Grid container spacing={2}>
    {tagGroups.map((group) => (
      <Grid item xs={12} key={group.tagGroupName}>
        <TagGroup name={group.tagGroupName}>
          {group.tags.map((el) => (
            <Tag color={el.color} {...args}>
              {el.name}
            </Tag>
          ))}
        </TagGroup>
      </Grid>
    ))}
  </Grid>
);
