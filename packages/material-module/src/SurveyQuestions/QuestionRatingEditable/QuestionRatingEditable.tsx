import React, { FC, ChangeEvent, useState } from "react";

import makeStyles from "@mui/styles/makeStyles";
import Select, { SelectProps } from "@mui/material/Select";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { SelectChangeEvent } from "@eGroupAI/material/Select";
import { Question } from "../../Survey/types";

const useStyles = makeStyles(
  (theme) => ({
    header: {
      padding: theme.spacing(1.5, 0),
      marginBottom: theme.spacing(1),
    },
    selectWrapper: {
      padding: theme.spacing(1, 2),
    },
    textDivider: {
      margin: theme.spacing(0, 1.5),
    },
    row: {
      marginBottom: theme.spacing(2),

      "&:last-child": {
        marginBottom: 0,
      },
    },
    label: {
      width: 20,
      fontFamily: "Roboto, Arial,sans-serif;",
      marginBottom: 2,
      letterSpacing: 0.2,
    },
    labelInput: {
      marginLeft: theme.spacing(2),
    },
  }),
  {
    name: "MuiEgQuestionRatingEditable",
  }
);
export interface QuestionRatingEditableProps {
  question: Question;
  onStartChange?: (e: SelectChangeEvent<number>, question: Question) => void;
  onEndChange?: (e: SelectChangeEvent<number>, question: Question) => void;
  onStartInputChange?: (
    e: ChangeEvent<{ name?: string | undefined; value: unknown }>,
    question: Question
  ) => void;
  onEndInputChange?: (
    e: ChangeEvent<{ name?: string | undefined; value: unknown }>,
    question: Question
  ) => void;
}

const QuestionRatingEditable: FC<QuestionRatingEditableProps> = ({
  question,
  onStartChange,
  onEndChange,
  onStartInputChange,
  onEndInputChange,
}) => {
  const classes = useStyles();
  const [start, setStart] = useState<number>(
    question.questionRatingStartValue ?? 1
  );
  const [end, setEnd] = useState<number>(question.questionRatingEndValue ?? 5);
  const [startInput, setStartInput] = useState<string>(
    question.questionRatingStartName ?? ""
  );
  const [endInput, setEndInput] = useState<string>(
    question.questionRatingEndName ?? ""
  );

  const handleStartChange: SelectProps<number>["onChange"] = (e) => {
    setStart(Number(e.target.value));
    if (onStartChange) {
      onStartChange(e, question);
    }
  };

  const handleEndChange: SelectProps<number>["onChange"] = (e) => {
    setEnd(Number(e.target.value));
    if (onEndChange) {
      onEndChange(e, question);
    }
  };

  const handleStartInputChange: TextFieldProps["onChange"] = (e) => {
    setStartInput(e.target.value);
    if (onStartInputChange) {
      onStartInputChange(e, question);
    }
  };

  const handleEndInputChange: TextFieldProps["onChange"] = (e) => {
    setEndInput(e.target.value);
    if (onEndInputChange) {
      onEndInputChange(e, question);
    }
  };

  return (
    <div>
      <div className={classes.header}>
        <Grid container alignItems="center">
          <Grid className={classes.selectWrapper}>
            <Select onChange={handleStartChange} value={start} disableUnderline>
              {Array.from(Array(2).keys()).map((num) => (
                <ListItem key={num} value={num}>
                  {num}
                </ListItem>
              ))}
            </Select>
          </Grid>
          <Grid className={classes.textDivider}>
            <Typography variant="body1">到</Typography>
          </Grid>
          <Grid className={classes.selectWrapper}>
            <Select onChange={handleEndChange} value={end} disableUnderline>
              {Array.from(Array(9).keys()).map((num) => {
                const nnum = num + 2;
                return (
                  <ListItem key={nnum} value={nnum}>
                    {nnum}
                  </ListItem>
                );
              })}
            </Select>
          </Grid>
        </Grid>
      </div>
      <Grid container alignItems="flex-end" className={classes.row}>
        <Grid>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.label}
          >
            {start}
          </Typography>
        </Grid>
        <Grid>
          <TextField
            variant="standard"
            placeholder="標籤 (選填)"
            className={classes.labelInput}
            value={startInput}
            onChange={handleStartInputChange}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end" className={classes.row}>
        <Grid>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.label}
          >
            {end}
          </Typography>
        </Grid>
        <Grid>
          <TextField
            variant="standard"
            placeholder="標籤 (選填)"
            className={classes.labelInput}
            value={endInput}
            onChange={handleEndInputChange}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default QuestionRatingEditable;
