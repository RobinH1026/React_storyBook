import React, { FC } from "react";

import makeStyles from "@mui/styles/makeStyles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Question } from "../../Survey/types";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      margin: theme.spacing(3, 0),
    },
    label: {
      marginBottom: theme.spacing(3),
    },
    edgeLabel: {
      marginBottom: 4,
    },
  }),
  {
    name: "MuiEgQuestionRating",
  }
);
export interface QuestionRatingProps {
  question: Question;
}

const QuestionRating: FC<QuestionRatingProps> = ({ question }) => {
  const classes = useStyles();
  const start = question?.questionRatingStartValue ?? 1;
  const end = question?.questionRatingEndValue ?? 5;

  return (
    <div className={classes.root}>
      <Grid container alignItems="flex-end" justifyContent="space-around">
        <Grid item>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.edgeLabel}
          >
            {question.questionRatingStartName}
          </Typography>
        </Grid>
        {end > start &&
          Array.from(Array(end - start + 1).keys()).map((num) => {
            const sNum = num + start;
            return (
              <Grid key={sNum} item>
                <Typography
                  align="center"
                  variant="body2"
                  className={classes.label}
                >
                  {sNum}
                </Typography>
                <RadioButtonUncheckedIcon color="disabled" />
              </Grid>
            );
          })}
        <Grid item>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.edgeLabel}
          >
            {question.questionRatingEndName}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default QuestionRating;
