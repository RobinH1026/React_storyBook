/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import Segment, { SegmentProps } from "@eGroupAI/material/Segment";
import SegmentHeader from "@eGroupAI/material/SegmentHeader";
import SegmentContent from "@eGroupAI/material/SegmentContent";
import Typography from "@eGroupAI/material/Typography";

export default {
  title: "Components/Segment",
  component: Segment,
  argTypes: {
    elevation: {
      control: {
        type: "radio",
        options: [0, 1, 2, 3],
      },
      defaultValue: 1,
    },
    variant: {
      control: {
        type: "radio",
        options: ["elevation", "outlined"],
      },
      defaultValue: "outlined",
    },
  },
} as Meta;

export const Default: Story<SegmentProps> = (args) => (
  <Segment {...args}>
    <SegmentHeader>
      <Typography variant="h5" fontWeight="normal">
        MICEPass Privacy and Data Protection Policy
      </Typography>
      <Typography variant="h6" fontWeight="lighter">
        This policy describes MICEPass (hereinafter referred to as "the
        service"), the data processed and how to use it.
      </Typography>
    </SegmentHeader>
    <SegmentContent>
      <Segment>
        <SegmentHeader>
          <Typography variant="h5" fontWeight="normal">
            Personal information collection method
          </Typography>
        </SegmentHeader>
        <SegmentContent>
          <Typography variant="body1">
            1. The information you provided. We will collect the content you
            provide when using this service, which includes
          </Typography>
          <Typography variant="body1" color="textSecondary">
            <ul>
              <li>
                The email address requested when logging in (or when logging in
                through a third-party website such as Google or Facebook).
              </li>
              <li>
                When you use this service, you must fill in personal information
                such as job title, mobile phone, etc.
              </li>
              <li>
                The activity content, venue, time, questionnaire questions
                (including images, videos) and other information provided when
                you use this service.
              </li>
              <li>
                When you are using face recognition image content and face
                binary code
              </li>
            </ul>
          </Typography>
        </SegmentContent>
      </Segment>
      <Segment style={{ marginTop: 16 }}>
        <SegmentHeader>
          <Typography variant="h5" fontWeight="normal">
            Personal information collection method
          </Typography>
        </SegmentHeader>
        <SegmentContent>
          <Typography variant="body1">
            1. The information you provided. We will collect the content you
            provide when using this service, which includes
          </Typography>
          <Typography variant="body1" color="textSecondary">
            <ul>
              <li>
                The email address requested when logging in (or when logging in
                through a third-party website such as Google or Facebook).
              </li>
              <li>
                When you use this service, you must fill in personal information
                such as job title, mobile phone, etc.
              </li>
              <li>
                The activity content, venue, time, questionnaire questions
                (including images, videos) and other information provided when
                you use this service.
              </li>
              <li>
                When you are using face recognition image content and face
                binary code
              </li>
            </ul>
          </Typography>
        </SegmentContent>
      </Segment>
    </SegmentContent>
  </Segment>
);
