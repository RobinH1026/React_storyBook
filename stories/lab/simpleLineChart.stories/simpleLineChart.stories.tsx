import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import SimpleLineChart, {
  SimpleLineChartProps,
} from "@eGroupAI/material-lab/SimpleLineChart";
import data from "./data.json";

export default {
  title: "Lab/SimpleLineChart",
  component: SimpleLineChart,
} as Meta;

export const Default: Story<SimpleLineChartProps> = (args) => (
  <SimpleLineChart title={data.reportTitle} data={data.reportData} {...args} />
);
