import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import SimpleBarChart, {
  SimpleBarChartProps,
} from "@eGroupAI/material-lab/SimpleBarChart";
import data from "./data.json";

export default {
  title: "Lab/SimpleBarChart",
  component: SimpleBarChart,
} as Meta;

export const Default: Story<SimpleBarChartProps> = (args) => (
  <SimpleBarChart title={data.reportTitle} data={data.reportData} {...args} />
);
