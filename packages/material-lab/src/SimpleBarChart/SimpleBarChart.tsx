import React, { FC, ReactNode, useState } from "react";

import { useTheme } from "@mui/material";
import {
  BarChart,
  BarProps,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Typography from "@mui/material/Typography";
import CustomizedAxisTick from "../components/CustomizedAxisTick";
import SimpleChartPaper from "../components/SimpleChartPaper";
import SimpleChartHeader from "../components/SimpleChartHeader";
import SimpleChartLoader from "../components/SimpleChartLoader";

export interface SimpleBarChartProps {
  title?: ReactNode;
  data?: BarProps["data"];
  loading?: boolean;
}

const SimpleBarChart: FC<SimpleBarChartProps> = ({ title, data, loading }) => {
  const theme = useTheme();
  const [rootEl, setRootEl] = useState<HTMLDivElement>();

  if (loading) {
    return <SimpleChartLoader />;
  }

  if (!data || data.length === 0) {
    return (
      <SimpleChartPaper>
        <SimpleChartHeader>{title}</SimpleChartHeader>
        <Typography
          align="center"
          variant="h6"
          color="textSecondary"
          style={{ marginTop: 100 }}
        >
          無資料
        </Typography>
      </SimpleChartPaper>
    );
  }

  return (
    <SimpleChartPaper ref={(ref) => setRootEl(ref as HTMLDivElement)}>
      <SimpleChartHeader>{title}</SimpleChartHeader>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            left: -10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={
              <CustomizedAxisTick rootEl={rootEl} dataLength={data?.length} />
            }
            // Need this to disable default hide behavior
            tickFormatter={() => "a"}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="total"
            name="數量"
            fill={theme.egPalette.info[1]}
            maxBarSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </SimpleChartPaper>
  );
};

export default SimpleBarChart;
