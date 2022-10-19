import React from "react";
import { Meta, Story } from "@storybook/react";

import FeatureSection, {
  FeatureSectionProps,
} from "@eGroupAI/material-module/infocenter/solution/FeatureSection";

export default {
  title: "Infocenter/Solution/FeatureSection",
  component: FeatureSection,
} as Meta;

const items = [
  {
    id: "1",
    primary: "Title",
    description: "description",
    backgroundUrl: "https://placeimg.com/1920/1080/any",
    moreLink: "http://www.google.com.tw/",
    icons: [
      {
        id: "1",
        src: "https://placeimg.com/300/300/any",
        content: "content",
      },
      {
        id: "2",
        src: "https://placeimg.com/300/300/any",
        content: "content",
      },
      {
        id: "3",
        src: "https://placeimg.com/300/300/any",
        content: "content",
      },
      {
        id: "4",
        src: "https://placeimg.com/300/300/any",
        content: "content",
      },
    ],
  },
  {
    id: "2",
    primary: "Title",
    backgroundUrl: "https://placeimg.com/1920/1080/any",
    moreLink: "http://www.google.com.tw/",
    icons: [
      {
        id: "1",
        src: "https://placeimg.com/300/300/any",
        content: "content",
      },
      {
        id: "2",
        src: "https://placeimg.com/300/300/any",
        content: "content",
      },
      {
        id: "3",
        src: "https://placeimg.com/300/300/any",
        content: "content",
      },
      {
        id: "4",
        src: "https://placeimg.com/300/300/any",
        content: "content",
      },
    ],
  },
  {
    id: "3",
    primary: "Title",
    backgroundUrl: "https://placeimg.com/1920/1080/any",
    icons: [
      {
        id: "1",
        src: "https://placeimg.com/300/300/any",
        content: "content",
      },
      {
        id: "2",
        src: "https://placeimg.com/300/300/any",
        content: "content",
      },
      {
        id: "3",
        src: "https://placeimg.com/300/300/any",
        content: "content",
      },
      {
        id: "4",
        src: "https://placeimg.com/300/300/any",
        content: "content",
      },
    ],
  },
];

export const Default: Story<FeatureSectionProps> = () => (
  <>
    {items.map((el, index) => (
      <FeatureSection
        key={el.id}
        backgroundUrl={el.backgroundUrl}
        side={(index + 1) % 2 === 1 ? "left" : "right"}
        primary={el.primary}
        description={el.description}
        moreLink={el.moreLink}
        icons={el.icons?.map((icon) => ({
          key: icon.id,
          src: icon.src,
          content: icon.content,
        }))}
        sx={{
          mb: 2,
        }}
      />
    ))}
  </>
);
