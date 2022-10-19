import React, { FC } from "react";

import makeStyles from "@mui/styles/makeStyles";
import Typography from "@mui/material/Typography";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { QuestionOptionType } from "../../Survey/types";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      width: theme.spacing(3),
      marginRight: theme.spacing(1),
    },
  }),
  {
    name: "MuiEgQuestionOptionDecorated",
  }
);

export interface QuestionOptionDecoratedProps {
  type: QuestionOptionType;
  index?: number;
}

const QuestionOptionDecorated: FC<QuestionOptionDecoratedProps> = ({
  type = "radio",
  index = 0,
}) => {
  const classes = useStyles();
  if (type === "radio") {
    return (
      <RadioButtonUncheckedOutlinedIcon
        color="action"
        className={classes.root}
      />
    );
  }
  if (type === "checkbox") {
    return <CheckBoxOutlineBlankIcon color="action" className={classes.root} />;
  }
  if (type === "select") {
    return <Typography className={classes.root}>{index + 1}.</Typography>;
  }
  return null;
};

export default QuestionOptionDecorated;
