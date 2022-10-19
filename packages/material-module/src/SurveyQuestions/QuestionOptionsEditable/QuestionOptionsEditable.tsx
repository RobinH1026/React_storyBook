import React, { FC, ChangeEvent, MouseEvent, useEffect, useState } from "react";

import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import Typography from "@eGroupAI/material/Typography";
import { Question, Option, QuestionOptionType } from "../../Survey/types";
import QuestionOptionDecorated from "../QuestionOptionDecorated";
import QuestionOptionEditable from "../QuestionOptionEditable";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      marginLeft: theme.spacing(-3),
    },
    optionCreator: {
      display: "flex",
      alignItems: "center",
      marginLeft: theme.spacing(3),
      height: 51,
    },
    addOption: {
      marginRight: theme.spacing(),
      cursor: "pointer",
      color: theme.egPalette.info[1],
      fontWeight: "bold",

      "&:hover": {
        textDecoration: "underline",
      },
    },
    textBtn: {
      fontSize: "0.95rem",
      marginLeft: theme.spacing(),
      cursor: "pointer",
      fontWeight: "bold",
    },
    optionDragging: {
      background: "#fff",
      boxShadow: theme.shadows[2],
    },
  }),
  {
    name: "MuiEgQuestionOptionsEditable",
  }
);
export interface QuestionOptionsEditableProps {
  type: QuestionOptionType;
  question: Question;
  autoFocusIndex?: number;
  onChange?: (
    e: ChangeEvent<HTMLInputElement>,
    question: Question,
    option: Option
  ) => void;
  onCreate?: (
    e: MouseEvent<HTMLSpanElement>,
    question: Question,
    index: number
  ) => void;
  onCreateOther?: (
    e: MouseEvent<HTMLButtonElement>,
    question: Question
  ) => void;
  onDelete?: (
    e: MouseEvent<HTMLButtonElement>,
    question: Question,
    deletedOption: Option
  ) => void;
  onDragEnd?: (
    result: DropResult,
    question: Question,
    nextOptions: Option[]
  ) => void;
}

const QuestionOptionsEditable: FC<QuestionOptionsEditableProps> = ({
  type = "radio",
  autoFocusIndex,
  question,
  onChange,
  onCreate,
  onCreateOther,
  onDelete,
  onDragEnd,
}) => {
  const classes = useStyles();
  const [controledOptions, setControledOptions] = useState<Option[]>(
    question.optionList || []
  );
  const otherIndex = controledOptions.findIndex((option) => option.isOther);
  const hasOther = otherIndex !== -1;
  const other = hasOther ? controledOptions[otherIndex] : undefined;

  useEffect(() => {
    if (type === "select") {
      setControledOptions((options) =>
        options.filter((option) => !option.isOther)
      );
    }
  }, [type]);

  useEffect(() => {
    if (question.optionList) {
      setControledOptions(question.optionList.filter(Boolean));
    }
  }, [question.optionList]);

  const handleCreate = (e: MouseEvent<HTMLSpanElement>) => {
    if (onCreate) {
      onCreate(
        e,
        question,
        hasOther ? controledOptions.length : controledOptions.length + 1
      );
    }
  };

  const handleCreateOther = (e: MouseEvent<HTMLButtonElement>) => {
    if (onCreateOther) {
      onCreateOther(e, question);
    }
  };

  const handleChange =
    (option: Option) => (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e, question, option);
      }
    };

  const handleDelete =
    (optionId?: string) => (e: MouseEvent<HTMLButtonElement>) => {
      const deletedOption = controledOptions.find(
        (el) => el.optionId === optionId
      );
      if (!deletedOption) return;
      setControledOptions((options) =>
        options.filter((el) => optionId !== el.optionId)
      );

      if (onDelete) {
        onDelete(e, question, deletedOption);
      }
    };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const sourceOption = controledOptions[source.index];

    if (!sourceOption) return;

    const nextOptions = [...controledOptions];
    nextOptions.splice(source.index, 1);
    nextOptions.splice(destination.index, 0, sourceOption);
    setControledOptions(nextOptions);
    if (onDragEnd) {
      onDragEnd(result, question, nextOptions);
    }
  };

  const renderOptionCreator = () => {
    if (type === "select" || hasOther) {
      return (
        <div className={classes.optionCreator}>
          <QuestionOptionDecorated
            type={type}
            index={controledOptions.length}
          />
          <Typography
            onClick={handleCreate}
            color="primary"
            className={classes.addOption}
          >
            新增選項
          </Typography>
        </div>
      );
    }
    return (
      <div className={classes.optionCreator}>
        <QuestionOptionDecorated type={type} />
        <Typography
          onClick={handleCreate}
          color="primary"
          className={classes.addOption}
        >
          新增選項
        </Typography>
        <Typography>或</Typography>
        <Typography className={classes.textBtn} onClick={handleCreateOther}>
          新增「其他」
        </Typography>
      </div>
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={classes.root}>
        <Droppable droppableId={question.questionId}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {controledOptions.map((option, index) => {
                if (option.isOther) return undefined;
                return (
                  <Draggable
                    draggableId={option.optionId}
                    key={option.optionId}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <QuestionOptionEditable
                        index={index}
                        className={clsx({
                          [classes.optionDragging]: snapshot.isDragging,
                        })}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        DragHandleProps={provided.dragHandleProps}
                        type={type}
                        MuiTextFieldProps={{
                          fullWidth: true,
                          autoFocus: autoFocusIndex === index,
                          defaultValue: option.optionName,
                          onChange: handleChange(option),
                        }}
                        MuiIconButtonProps={{
                          onClick: handleDelete(option.optionId),
                        }}
                        hideCloseIconButton={controledOptions.length === 1}
                      />
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {hasOther && (
          <QuestionOptionEditable
            index={otherIndex}
            type={type}
            MuiTextFieldProps={{
              fullWidth: true,
              disabled: true,
              value: other?.optionName,
            }}
            MuiIconButtonProps={{
              onClick: handleDelete(other?.optionId),
            }}
            hideCloseIconButton={controledOptions.length === 1}
            hideDragIcon
          />
        )}
        {renderOptionCreator()}
      </div>
    </DragDropContext>
  );
};

export default QuestionOptionsEditable;
