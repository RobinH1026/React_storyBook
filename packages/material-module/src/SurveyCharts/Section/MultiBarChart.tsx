import React, { FC } from "react";

import {
  ResponsiveContainer,
  Cell,
  Tooltip,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
} from "recharts";
import makeStyles from "@mui/styles/makeStyles";
import calcPercent from "@eGroupAI/utils/calcPercent";
import colors from "../colors";
import { Option, Question } from "../types";

export interface MultiBarChartProps {
  data: Option[];
  question: Question;
}

const CustomXAxisTick = (props) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x="0" y="0" dx={0} dy={0} textAnchor="end" fill="#666">
        {payload.value}
      </text>
    </g>
  );
};

type CustomYAxisTickProps = {
  x: number;
  y: number;
  payload: {
    value: string;
  };
};

const CustomYAxisTick = (props: CustomYAxisTickProps) => {
  const { x, y, payload } = props;
  const texts: RegExpMatchArray | null = payload.value.match(/.{1,7}/g) || [];
  return (
    <g transform={`translate(${x},${y - (9 + 9 * texts.length)})`}>
      <text
        x="0"
        y="0"
        className="recharts-text"
        textAnchor="end"
        dominantBaseline="middle"
      >
        {texts.map((text) => (
          <tspan x="0" dy="18px">
            {text}
          </tspan>
        ))}
      </text>
    </g>
  );
};

const CustomTooltip = (props) => {
  const { active, payload, separator, label, question } = props;
  if (active && payload && payload.length) {
    return (
      <div
        className="recharts-default-tooltip"
        style={{
          margin: 0,
          padding: 10,
          backgroundColor: "rgb(255, 255, 255)",
          border: "1px solid rgb(204, 204, 204)",
          whiteSpace: "nowrap",
        }}
      >
        <p className="recharts-tooltip-label" style={{ margin: 0 }}>
          {label}
        </p>
        <ul
          className="recharts-tooltip-item-list"
          style={{ padding: 0, margin: 0 }}
        >
          {payload.map((el, i) => (
            <li
              // eslint-disable-next-line react/no-array-index-key
              key={`tooltip-item-${i}`}
              style={{
                display: "block",
                paddingTop: 4,
                paddingBottom: 4,
                color: el.color || "#000",
              }}
            >
              <span className="recharts-tooltip-item-name">
                {el.name}
                {el.value}
              </span>
              <span className="recharts-tooltip-item-separator">
                {separator}
              </span>
              <span className="recharts-tooltip-item-value">
                {calcPercent(el.value, question.questionCount)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
};

const CustomizedLabel = (props) => {
  const { x, y, width, height, value, stroke } = props;

  const offset = value > 10 ? -12 : -8;

  return (
    <text
      x={x + width - offset}
      y={y + height - 14}
      fill={stroke}
      fontSize={14}
      textAnchor="middle"
    >
      {value}
    </text>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    width: "100%",
    height: (props: MultiBarChartProps) => props.data.length * 50,
  },
}));

const MultiBarChart: FC<MultiBarChartProps> = (props) => {
  const { data, question } = props;
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <ResponsiveContainer>
        <BarChart
          margin={{
            left: 50,
            right: 50,
          }}
          layout="vertical"
          data={data}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis
            tick={CustomXAxisTick}
            type="number"
            orientation="top"
            allowDecimals={false}
          />
          <YAxis tick={CustomYAxisTick} dataKey="optionName" type="category" />
          <Tooltip content={<CustomTooltip question={question} />} />
          <Bar dataKey="optionCount" name="填答次數" label={CustomizedLabel}>
            {data.map((entry, index) => (
              <Cell
                key={entry.optionName}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MultiBarChart;
