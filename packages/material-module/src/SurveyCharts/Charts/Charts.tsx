import React, { FC } from "react";

import { Typography } from "@mui/material";

import OptionListPieChart from "./OptionListPieChart";
import RatingPieChart from "./RatingPieChart";
import { Question } from "../types";

export interface ChartsProps {
  question: Question;
}

const Charts: FC<ChartsProps> = ({ question }) => {
  switch (question.questionType) {
    case "rating": {
      if (question.responseContentList) {
        const data = question.responseContentList.filter(
          (el) => el.responseContentCount !== 0
        );
        return <RatingPieChart data={data} />;
      }
      return (
        <Typography variant="body1" align="center">
          No Data
        </Typography>
      );
    }
    case "choiceone":
    case "select": {
      if (question.optionList) {
        const data = question.optionList.filter((el) => el.optionCount !== 0);
        return <OptionListPieChart data={data} />;
      }
      return (
        <Typography variant="body1" align="center">
          No Data
        </Typography>
      );
    }
    default:
      return (
        <Typography variant="body1" align="center">
          No Data
        </Typography>
      );
  }
};

export default Charts;
