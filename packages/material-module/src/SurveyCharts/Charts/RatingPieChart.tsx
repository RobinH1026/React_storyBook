import React, { FC } from "react";

import { ResponsiveContainer, Cell, PieChart, Pie, Tooltip } from "recharts";
import makeStyles from "@mui/styles/makeStyles";
import roundToTwoDecimal from "@eGroupAI/utils/roundToTwoDecimal";
import colors from "../colors";
import { ResponseContent } from "../types";
import CustomizedLabelLine from "./CustomizedLabelLine";

type CustomizedLabelProps = {
  responseContent: string;
  responseContentCount: number;
  percent: number;
};

const CustomizedLabel = (props: CustomizedLabelProps) => {
  const { responseContent, responseContentCount, percent } = props;
  if (percent * 100 < 1) return null;
  return `${responseContent}分(${responseContentCount})：${roundToTwoDecimal(
    percent * 100
  )}%`;
};

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    width: "100%",
    height: "calc(100% - 24px)",
    minHeight: 300,
  },
}));

export interface RatingPieChartProps {
  data: ResponseContent[];
}

const RatingPieChart: FC<RatingPieChartProps> = ({ data }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="responseContentCount"
            nameKey="responseContent"
            data={data}
            innerRadius={65}
            outerRadius={115}
            fill="#8884d8"
            isAnimationActive={false}
            label={CustomizedLabel}
            labelLine={CustomizedLabelLine}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.responseContent}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingPieChart;
