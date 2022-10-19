import React, { FC } from "react";

import clsx from "clsx";
import makeStyles from "@mui/styles/makeStyles";
import Paper from "@mui/material/Paper";
import Typography, { TypographyProps } from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import { Question as QuestionTyping } from "../../Survey/types";
import QuestionOptions, { QuestionOptionsProps } from "../QuestionOptions";
import QuestionRating from "../QuestionRating";
import QuestionDragHandle from "../QuestionDragHandle";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      margin: theme.spacing(1.5, 0),
      boxShadow: theme.egShadows[3],
      border: "1px solid #e3e6f0",
      borderRadius: "0.35rem",

      "& $dragHandle": {
        visibility: "hidden",
      },

      "&:hover": {
        "& $dragHandle": {
          visibility: "visible",
        },
      },
    },
    main: {
      padding: theme.spacing(0, 3),
      paddingBottom: theme.spacing(3),
    },
    disabled: {
      backgroundColor: theme.palette.action.disabledBackground,
    },
    text: {
      width: "50%",
    },
    textarea: {
      width: "85%",
    },
    dragHandle: {},
  }),
  {
    name: "MuiEgQuestion",
  }
);

export interface QuestionProps {
  className?: string;
  question: QuestionTyping;
  disabled?: boolean;
  DragHandleProps?: DraggableProvidedDragHandleProps;
  onClick?: () => void;
  onQuestionNameClick?: TypographyProps["onClick"];
  onOptionClick?: QuestionOptionsProps["onOptionClick"];
}

const Question: FC<QuestionProps> = ({
  className,
  question,
  disabled,
  DragHandleProps,
  onQuestionNameClick,
  onOptionClick,
  ...other
}) => {
  const classes = useStyles();
  const renderContent = () => {
    switch (question.questionType) {
      case "titleBlock":
        return (
          <TextField
            className={classes.textarea}
            label="區塊描述"
            disabled
            value={question.questionDescription}
            multiline
            variant="standard"
          />
        );
      case "text":
        return (
          <TextField
            variant="standard"
            className={classes.text}
            label="簡答文字"
            disabled
          />
        );
      case "textarea":
        return (
          <TextField
            variant="standard"
            className={classes.textarea}
            label="詳答文字"
            disabled
          />
        );
      case "choiceone":
        return (
          <QuestionOptions
            type="radio"
            question={question}
            onOptionClick={onOptionClick}
          />
        );
      case "choicemulti":
        return (
          <QuestionOptions
            type="checkbox"
            question={question}
            onOptionClick={onOptionClick}
          />
        );
      case "select":
        return (
          <QuestionOptions
            type="select"
            question={question}
            onOptionClick={onOptionClick}
          />
        );
      case "email":
        return (
          <TextField
            variant="standard"
            className={classes.text}
            label="電子郵件"
            disabled
          />
        );
      case "rating":
        return <QuestionRating question={question} />;
      case "date":
        return (
          <TextField
            variant="standard"
            className={classes.text}
            label="年/月/日"
            disabled
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <InsertInvitationIcon />
                </InputAdornment>
              ),
            }}
          />
        );
      default:
        return undefined;
    }
  };

  return (
    <Paper
      className={clsx(className, classes.root, disabled && classes.disabled)}
      {...other}
    >
      <QuestionDragHandle
        className={classes.dragHandle}
        disabled={disabled}
        DragHandleProps={DragHandleProps}
      />
      <div className={classes.main}>
        <Grid container spacing={1} alignItems="flex-start">
          <Grid item xs={12}>
            <Typography variant="body1" onClick={onQuestionNameClick}>
              {question.questionName || "問題"}{" "}
              {Boolean(question.isRequired) && (
                <span style={{ color: "red" }}>*</span>
              )}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {renderContent()}
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default Question;
