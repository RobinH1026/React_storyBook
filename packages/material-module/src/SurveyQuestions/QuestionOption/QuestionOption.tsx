import React, { HTMLAttributes, ReactNode, forwardRef } from "react";

import clsx from "clsx";
import makeStyles from "@mui/styles/makeStyles";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { QuestionOptionType } from "../../Survey/types";
import QuestionOptionDecorated from "../QuestionOptionDecorated";

const useStyles = makeStyles(
  () => ({
    root: {
      display: "flex",
      alignItems: "center",
    },
  }),
  {
    name: "MuiEgQuestionOption",
  }
);
export interface QuestionOptionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  type: QuestionOptionType;
  index: number;
  MuiTypographyProps?: TypographyProps;
  children?: ReactNode;
}

const QuestionOption = forwardRef<HTMLDivElement, QuestionOptionProps>(
  (props, ref) => {
    const {
      className,
      type = "radio",
      index,
      MuiTypographyProps,
      children,
      ...other
    } = props;
    const classes = useStyles();

    return (
      <div className={clsx(className, classes.root)} ref={ref} {...other}>
        <QuestionOptionDecorated type={type} index={index} />
        <Typography variant="body1" {...MuiTypographyProps}>
          {children}
        </Typography>
      </div>
    );
  }
);

export default QuestionOption;
