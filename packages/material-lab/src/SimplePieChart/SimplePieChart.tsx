import React, { FC, ReactNode } from "react";

import {
  PieChart,
  PieProps,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Typography from "@mui/material/Typography";
import SimpleChartLoader from "../components/SimpleChartLoader";
import SimpleChartHeader from "../components/SimpleChartHeader";
import SimpleChartPaper from "../components/SimpleChartPaper";

const colors = ["#05c7f2", "#2ecc71", "#034c8c", "#e95050", "#ffbc6e"];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = (props) => {
//   const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.75;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);
//   if (percent * 100 < 1) return null;
//   return (
//     <text
//       x={x}
//       y={y}
//       fill="white"
//       textAnchor={x > cx ? "start" : "end"}
//       dominantBaseline="central"
//     >
//       {`${roundToTwoDecimal(percent * 100)}%`}
//     </text>
//   );
// };

export interface SimplePieChartProps {
  title?: ReactNode;
  data?: PieProps["data"];
  loading?: boolean;
}

const SimplePieChart: FC<SimplePieChartProps> = ({ title, data, loading }) => {
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
    <SimpleChartPaper>
      <SimpleChartHeader>{title}</SimpleChartHeader>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            // labelLine={false}
            // label={renderCustomizedLabel}
            outerRadius={100}
            dataKey="total"
            nameKey="name"
          >
            {data?.map((entry, index) => (
              <Cell key={entry.name} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Legend iconType="circle" iconSize={12} />
        </PieChart>
      </ResponsiveContainer>
    </SimpleChartPaper>
  );
};

export default SimplePieChart;
