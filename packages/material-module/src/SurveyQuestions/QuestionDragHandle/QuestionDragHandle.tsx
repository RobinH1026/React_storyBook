import React, { FC } from "react";

import clsx from "clsx";
import makeStyles from "@mui/styles/makeStyles";

import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import DragIcon from "../DragIcon";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      width: "100%",
      cursor: (props: QuestionDragHandleProps) =>
        !props.disabled ? "move" : undefined,
      display: "flex",
      alignItems: "center",
      height: theme.spacing(3),
    },
    dragIcon: {
      margin: "auto",
      transform: "rotate(90deg)",
      color: theme.egPalette.text[2],
    },
  }),
  {
    name: "MuiEgQuestionDragHandle",
  }
);

export interface QuestionDragHandleProps {
  className?: string;
  disabled?: boolean;
  DragHandleProps?: DraggableProvidedDragHandleProps;
}

const QuestionDragHandle: FC<QuestionDragHandleProps> = (props) => {
  const classes = useStyles(props);
  const { className, disabled, DragHandleProps, ...other } = props;
  if (disabled) {
    return (
      <div
        className={clsx(className, classes.root)}
        {...DragHandleProps}
        {...other}
      />
    );
  }

  return (
    <div
      className={clsx(className, classes.root)}
      {...DragHandleProps}
      {...other}
    >
      <DragIcon className={classes.dragIcon} />
    </div>
  );
};

export default QuestionDragHandle;
