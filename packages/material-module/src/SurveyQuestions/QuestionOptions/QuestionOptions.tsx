import React, { FC, MouseEvent } from "react";

import makeStyles from "@mui/styles/makeStyles";

import { QuestionOptionType, Question, Option } from "../../Survey/types";
import QuestionOption from "../QuestionOption";

const useStyles = makeStyles(
  (theme) => ({
    option: {
      padding: theme.spacing(1.5, 0),
    },
  }),
  {
    name: "MuiEgQuestionOptions",
  }
);

export interface QuestionOptionsProps {
  type: QuestionOptionType;
  question: Question;
  onOptionClick?: (
    e: MouseEvent<HTMLDivElement>,
    option: Option,
    index: number
  ) => void;
}

const QuestionOptions: FC<QuestionOptionsProps> = ({
  type = "radio",
  question,
  onOptionClick,
}) => {
  const classes = useStyles();
  const options = question.optionList || [];
  const otherIndex = options.findIndex((option) => option.isOther);
  const hasOther = otherIndex !== -1;
  const other = hasOther ? options[otherIndex] : undefined;

  return (
    <>
      {options.map((option, index) => {
        if (option.isOther) return undefined;
        return (
          <QuestionOption
            key={option.optionId}
            className={classes.option}
            index={index}
            type={type}
            onClick={(e) => {
              if (onOptionClick) {
                onOptionClick(e, option, index);
              }
            }}
          >
            {option.optionName}
          </QuestionOption>
        );
      })}
      {hasOther && (
        <QuestionOption
          className={classes.option}
          index={otherIndex}
          type={type}
          onClick={(e) => {
            if (onOptionClick) {
              onOptionClick(e, other as Option, otherIndex);
            }
          }}
        >
          {(other as Option).optionName}
        </QuestionOption>
      )}
    </>
  );
};

export default QuestionOptions;
