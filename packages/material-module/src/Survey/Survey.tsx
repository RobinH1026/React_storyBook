import React, { forwardRef, useEffect, useState, useMemo } from "react";
import clsx from "clsx";
import { WithStyles } from "@mui/styles";
import withStyles from "@mui/styles/withStyles";
import createStyles from "@mui/styles/createStyles";
import Paper, { PaperProps } from "@mui/material/Paper";
import usePrevious from "@eGroupAI/hooks/usePrevious";
import SurveyContext from "./SurveyContext";
import { Question } from "./types";

const styles = () =>
  createStyles({
    root: {
      position: "relative",
    },
  });

export interface SurveyProps extends Omit<PaperProps, "onChange"> {
  data: Question[];
  onChange?: (questions: Question[]) => void;
  selectedQuestionId?: string;
}

const Survey = forwardRef<
  HTMLDivElement,
  SurveyProps & WithStyles<typeof styles>
>((props, ref) => {
  const {
    classes,
    className,
    data,
    onChange,
    selectedQuestionId: selectedQuestionIdProp,
    ...other
  } = props;
  const [questions, setQuestions] = useState<Question[]>(data);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>();
  const prevQuestions = usePrevious(questions);

  useEffect(() => {
    if (data) {
      setQuestions(data);
    }
  }, [data]);

  useEffect(() => {
    if (
      onChange &&
      JSON.stringify(questions) !== JSON.stringify(prevQuestions)
    ) {
      onChange(questions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  useEffect(() => {
    if (selectedQuestionIdProp) {
      setSelectedQuestionId(selectedQuestionIdProp);
    }
  }, [selectedQuestionIdProp]);

  const value = useMemo(
    () => ({
      questions,
      setQuestions,
      selectedQuestionId,
      setSelectedQuestionId,
    }),
    [questions, selectedQuestionId]
  );

  return (
    <SurveyContext.Provider value={value}>
      <Paper ref={ref} className={clsx(className, classes.root)} {...other} />
    </SurveyContext.Provider>
  );
});

export default withStyles(styles)(Survey);
