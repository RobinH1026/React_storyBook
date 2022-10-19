import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import SimplePieChart, {
  SimplePieChartProps,
} from "@eGroupAI/material-lab/SimplePieChart";
import data from "./data.json";

export default {
  title: "Lab/SimplePieChart",
  component: SimplePieChart,
} as Meta;

export const Default: Story<SimplePieChartProps> = (args) => (
  <SimplePieChart title={data.reportTitle} data={data.reportData} {...args} />
);
