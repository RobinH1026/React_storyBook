import React, { FC, ReactNode, useState } from "react";

import { useTheme } from "@mui/material";
import {
  LineChart,
  LineProps,
  Line,
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

export interface SimpleLineChartProps {
  title?: ReactNode;
  data?: LineProps["data"];
  loading?: boolean;
}

const SimpleLineChart: FC<SimpleLineChartProps> = ({
  title,
  data,
  loading,
}) => {
  const theme = useTheme();
  const [rootEl, setRootEl] = useState<HTMLDivElement>();

  if (loading) {
    return <SimpleChartLoader />;
  }

  if (!data) {
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
        <LineChart
          data={data}
          margin={{
            left: -10,
            right: 4,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={
              <CustomizedAxisTick
                isLineChart
                rootEl={rootEl}
                dataLength={data?.length}
              />
            }
            // Need this to disable default hide behavior
            tickFormatter={() => "a"}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="total"
            name="數量"
            stroke={theme.egPalette.info[1]}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </SimpleChartPaper>
  );
};

export default SimpleLineChart;
