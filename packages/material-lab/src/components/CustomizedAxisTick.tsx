import React, { FC } from "react";

const AXIS_GAP = 50;

export interface CustomizedAxisTickProps {
  isLineChart?: boolean;
  dataLength?: number;
  rootEl?: HTMLDivElement;
  x?: number;
  y?: number;
  width?: number;
  index?: number;
  payload?: {
    value?: string | number;
  };
  fill?: string;
}

const CustomizedAxisTick: FC<CustomizedAxisTickProps> = (props) => {
  const {
    isLineChart,
    x: xProp,
    y,
    width,
    payload,
    fill,
    index,
    dataLength,
    rootEl,
  } = props;

  if (
    xProp === undefined ||
    rootEl === undefined ||
    dataLength === undefined ||
    width === undefined ||
    payload === undefined ||
    payload.value === undefined
  ) {
    return <g />;
  }

  let result = payload.value;

  if (typeof result !== "string") {
    return <g />;
  }
  let maxTickWidth = width / (dataLength - 1) - AXIS_GAP;
  let x = xProp;

  if (isLineChart) {
    const isFirstTick = index === 0;
    const isLastTick = index === dataLength - 1;
    if (isFirstTick || isLastTick) {
      maxTickWidth /= 2;
    }
    if (isFirstTick) {
      x += maxTickWidth / 2;
    }
    if (isLastTick) {
      x -= maxTickWidth / 2;
    }
  }

  // Calculate element width
  const text = document.createElement("div");
  text.style.position = "absolute";
  text.style.left = "-1000px";
  text.innerText = result;
  rootEl.appendChild(text);

  const textWidth = text.offsetWidth;
  const averageCharWidth = textWidth / result.length;
  if (textWidth > maxTickWidth) {
    const substring = result.substring(
      0,
      Math.round(maxTickWidth / averageCharWidth)
    );
    result = `${substring}...`;
    if (!substring) {
      return <g />;
    }
  }
  rootEl.removeChild(text);

  return (
    <g>
      <text x={x} y={y} dy="0.71em" textAnchor="middle" fill={fill}>
        {result}
      </text>
    </g>
  );
};

export default CustomizedAxisTick;
