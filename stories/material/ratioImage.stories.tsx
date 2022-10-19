import React, { FC } from "react";

import { Meta } from "@storybook/react";

import RatioImage from "@eGroupAI/material/RatioImage";

export default {
  title: "Components/RatioImage",
  component: RatioImage,
} as Meta;

export const Default: FC = () => (
  <div style={{ maxWidth: 800 }}>
    <RatioImage src="/thumb.jpg" ratio="5:4" alt="thumb" />
    <br />
    <RatioImage
      src="https://via.placeholder.com/840x620"
      ratio="840:620"
      alt="default cover image"
    />
    <br />
    <RatioImage
      src="https://via.placeholder.com/1920x1080"
      fit="cover"
      ratio="1920:1080"
      alt="default cover image"
    />
    <br />
    <RatioImage
      src="https://via.placeholder.com/1000x1000"
      fit="cover"
      ratio="1:1"
      alt="default cover image"
    />
    <br />
    <RatioImage
      src="https://via.placeholder.com/1600x500"
      fit="cover"
      ratio="16:5"
      alt="default cover image"
    />
    <br />
    <RatioImage
      src="https://via.placeholder.com/500x100"
      fit="cover"
      ratio="500:100"
      alt="default cover image"
    />
  </div>
);

export const withCoverCentralized: FC = () => (
  <div style={{ maxWidth: 800 }}>
    <RatioImage src="/thumb.jpg" fit="cover" ratio="16:5" alt="thumb" />
  </div>
);
