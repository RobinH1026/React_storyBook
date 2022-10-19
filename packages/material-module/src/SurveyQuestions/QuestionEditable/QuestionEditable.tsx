import React, { FC, ChangeEvent, MouseEvent, useState, useEffect } from "react";

import isLength from "validator/lib/isLength";
import clsx from "clsx";
import useInputActions from "@eGroupAI/hooks/useInputActions";
import {
  DropResult,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";

import makeStyles from "@mui/styles/makeStyles";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import TextField from "@eGroupAI/material/TextField";
import Icomoon from "@eGroupAI/material/Icomoon";
import Switch from "@eGroupAI/material/Switch";
import TitleIcon from "@mui/icons-material/Title";
import ShortTextIcon from "@mui/icons-material/ShortText";
import SubjectIcon from "@mui/icons-material/Subject";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckboxIcon from "@mui/icons-material/CheckBox";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import EmailIcon from "@mui/icons-material/Email";
import { SelectChangeEvent } from "@eGroupAI/material/Select";
import { Question, Option, QuestionType } from "../../Survey/types";
import QuestionOptionsEditable from "../QuestionOptionsEditable";
import QuestionRatingEditable from "../QuestionRatingEditable";
import QuestionDragHandle from "../QuestionDragHandle";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      margin: theme.spacing(1.5, 0),
      boxShadow: theme.egShadows[3],
      border: "1px solid #e3e6f0",
      borderRadius: "0.35rem",
      position: "relative",
      overflow: "hidden",
    },
    active: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      width: 6,
      backgroundColor: theme.egPalette.info[1],
    },
    main: {
      padding: theme.spacing(0, 3),
    },
    content: {
      marginBottom: theme.spacing(4),
    },
    actions: {
      padding: theme.spacing(1, 0),
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    select: {
      "& .MuiSelect-select": {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        lineHeight: theme.spacing(3),
      },
    },
    menuItem: {
      padding: theme.spacing(1, 2),
      "& .MuiTypography-root": {
        lineHeight: theme.spacing(4),
        minWidth: theme.spacing(17),
      },
    },
    option: {
      display: "flex",
      alignItems: "center",
    },
    icon: {
      marginRight: theme.spacing(2),
    },
    divider: {
      margin: theme.spacing(1, 0),
    },
    text: {
      width: "50%",
      marginBottom: theme.spacing(2),
    },
    textarea: {
      width: "85%",
      marginBottom: theme.spacing(2),
    },
    vertical: {
      margin: theme.spacing(0, 2),
      height: theme.spacing(4),
    },
    switch: {
      margin: 0,
    },
  }),
  {
    name: "MuiEgQuestionEditable",
  }
);

export type OptionType =
  | "titleBlock"
  | "text"
  | "textarea"
  | "choiceone"
  | "choicemulti"
  | "select"
  | "rating"
  | "date"
  | "email"
  | "|";
export interface QuestionEditableProps {
  question: Question;
  className?: string;
  disabled?: boolean;
  DragHandleProps?: DraggableProvidedDragHandleProps;
  optionTypes?: OptionType[];
  autoFocusOptionIndex?: number;
  autoFocusName?: boolean;
  onNameChange?: (e: ChangeEvent<HTMLInputElement>, question: Question) => void;
  onNameClick?: (e: MouseEvent<HTMLDivElement>, question: Question) => void;
  onDescChange?: (e: ChangeEvent<HTMLInputElement>, question: Question) => void;
  onTypeChange?: (e: ChangeEvent<HTMLInputElement>, question: Question) => void;
  onRequiredChange?: (
    e: ChangeEvent<HTMLInputElement>,
    question: Question
  ) => void;
  onDelete?: (e: MouseEvent<HTMLButtonElement>, question: Question) => void;
  onOptionChange?: (
    e: ChangeEvent<HTMLInputElement>,
    question: Question,
    option: Option
  ) => void;
  onOptionDelete?: (
    e: MouseEvent<HTMLButtonElement>,
    question: Question,
    deletedOption: Option
  ) => void;
  onOptionDragEnd?: (
    result: DropResult,
    question: Question,
    nextOptions: Option[]
  ) => void;
  onOptionCreate?: (
    e: MouseEvent<HTMLSpanElement>,
    question: Question,
    index: number
  ) => void;
  onOptionCreateOther?: (
    e: MouseEvent<HTMLButtonElement>,
    question: Question
  ) => void;
  onRatingStartChange?: (
    e: SelectChangeEvent<number>,
    question: Question
  ) => void;
  onRatingEndChange?: (
    e: SelectChangeEvent<number>,
    question: Question
  ) => void;
  onRatingStartInputChange?: (
    e: ChangeEvent<{ name?: string | undefined; value: unknown }>,
    question: Question
  ) => void;
  onRatingEndInputChange?: (
    e: ChangeEvent<{ name?: string | undefined; value: unknown }>,
    question: Question
  ) => void;
}

const MAX_NAME = 50;
const MAX_DESC = 100;

const optionMap = {
  titleBlock: {
    name: "標題區塊",
    icon: TitleIcon,
  },
  text: {
    name: "簡答",
    icon: ShortTextIcon,
  },
  textarea: {
    name: "段落",
    icon: SubjectIcon,
  },
  choiceone: {
    name: "選擇題",
    icon: RadioButtonCheckedIcon,
  },
  choicemulti: {
    name: "核取方塊",
    icon: CheckboxIcon,
  },
  select: {
    name: "下拉式選單",
    icon: ArrowDropDownCircleIcon,
  },
  rating: {
    name: "線性刻度",
    icon: LinearScaleIcon,
  },
  date: {
    name: "日期",
    icon: InsertInvitationIcon,
  },
  email: {
    name: "電子郵件",
    icon: EmailIcon,
  },
};

const QuestionEditable: FC<QuestionEditableProps> = ({
  question,
  className,
  DragHandleProps,
  optionTypes = [
    "titleBlock",
    "|",
    "text",
    "textarea",
    "|",
    "choiceone",
    "choicemulti",
    "select",
    "|",
    "rating",
    "|",
    "date",
    "|",
    "email",
  ],
  autoFocusOptionIndex,
  autoFocusName,
  onDescChange,
  onNameChange,
  onNameClick,
  onTypeChange,
  onRequiredChange,
  onDelete,
  onOptionChange,
  onOptionDelete,
  onOptionDragEnd,
  onOptionCreate,
  onOptionCreateOther,
  onRatingStartChange,
  onRatingEndChange,
  onRatingStartInputChange,
  onRatingEndInputChange,
  ...other
}) => {
  const classes = useStyles();
  const [name, setName] = useState(question.questionName);
  const [type, setType] = useState<QuestionType>(question.questionType);
  const [desc, setDesc] = useState(question.questionDescription);
  const [isRequired, setIsRequired] = useState<boolean>(
    Boolean(question.isRequired)
  );
  const { inputEl, select } = useInputActions();
  const isNameError = !isLength(name || "", {
    min: 0,
    max: MAX_NAME,
  });
  const isDescError = !isLength(desc || "", {
    min: 0,
    max: MAX_DESC,
  });

  useEffect(() => {
    if (autoFocusName) {
      select();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (
      onNameChange &&
      isLength(e.target.value, {
        min: 0,
        max: MAX_NAME,
      })
    ) {
      onNameChange(e, question);
    }
  };

  const handleNameClick = (e: MouseEvent<HTMLDivElement>) => {
    if (onNameClick) {
      onNameClick(e, question);
    }
  };

  const handleDescChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
    if (
      onDescChange &&
      isLength(e.target.value, {
        min: 0,
        max: MAX_DESC,
      })
    ) {
      onDescChange(e, question);
    }
  };

  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value as QuestionType);
    if (onTypeChange) {
      onTypeChange(e, question);
    }
  };

  const handleIsRequiredChange = (
    e: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setIsRequired(checked);
    if (onRequiredChange) {
      onRequiredChange(e, question);
    }
  };

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    if (onDelete) {
      onDelete(e, question);
    }
  };

  const getNameLabel = () => {
    if (type === "titleBlock") return "標題";
    return "問題";
  };

  const renderContent = () => {
    switch (type) {
      case "titleBlock":
        return (
          <TextField
            variant="standard"
            className={classes.textarea}
            label="區塊描述"
            multiline
            value={desc}
            onChange={handleDescChange}
            error={isDescError}
            helperText={
              isDescError ? `區塊描述請勿超過 ${MAX_DESC} 個字元` : undefined
            }
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
          <QuestionOptionsEditable
            type="radio"
            onChange={onOptionChange}
            onCreate={onOptionCreate}
            onCreateOther={onOptionCreateOther}
            onDelete={onOptionDelete}
            onDragEnd={onOptionDragEnd}
            question={question}
            autoFocusIndex={autoFocusOptionIndex}
          />
        );
      case "choicemulti":
        return (
          <QuestionOptionsEditable
            type="checkbox"
            onChange={onOptionChange}
            onCreate={onOptionCreate}
            onCreateOther={onOptionCreateOther}
            onDelete={onOptionDelete}
            onDragEnd={onOptionDragEnd}
            question={question}
            autoFocusIndex={autoFocusOptionIndex}
          />
        );
      case "select":
        return (
          <QuestionOptionsEditable
            type="select"
            onChange={onOptionChange}
            onCreate={onOptionCreate}
            onCreateOther={onOptionCreateOther}
            onDelete={onOptionDelete}
            onDragEnd={onOptionDragEnd}
            question={question}
            autoFocusIndex={autoFocusOptionIndex}
          />
        );
      case "rating":
        return (
          <QuestionRatingEditable
            question={question}
            onStartChange={onRatingStartChange}
            onEndChange={onRatingEndChange}
            onStartInputChange={onRatingStartInputChange}
            onEndInputChange={onRatingEndInputChange}
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
    <Paper className={clsx(className, classes.root)} {...other}>
      <QuestionDragHandle DragHandleProps={DragHandleProps} />
      <div className={classes.active} />
      <div className={classes.main}>
        <Grid
          className={classes.content}
          container
          spacing={1}
          alignItems="flex-start"
        >
          <Grid item xs={12} sm={9}>
            <TextField
              variant="standard"
              inputRef={inputEl}
              multiline
              autoFocus={autoFocusName}
              onChange={handleNameChange}
              onClick={handleNameClick}
              fullWidth
              value={name}
              label={getNameLabel()}
              error={isNameError}
              helperText={
                isNameError
                  ? `${getNameLabel()}請勿超過 ${MAX_NAME} 個字元`
                  : undefined
              }
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              className={classes.select}
              fullWidth
              select
              variant="outlined"
              rounded
              value={type}
              onChange={handleTypeChange}
            >
              {optionTypes.map((type, index) => {
                if (type === "|") {
                  // eslint-disable-next-line react/no-array-index-key
                  return <Divider key={index} className={classes.divider} />;
                }
                if (!optionMap[type]) {
                  return undefined;
                }
                const OptionIcon = optionMap[type]?.icon ?? "div";
                return (
                  <MenuItem
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    className={classes.menuItem}
                    value={type}
                  >
                    <div className={classes.option}>
                      <OptionIcon className={classes.icon} />
                      <Typography variant="body2" display="inline">
                        {optionMap[type]?.name}
                      </Typography>
                    </div>
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            {renderContent()}
          </Grid>
        </Grid>
        <Divider />
        <div className={classes.actions}>
          <Tooltip title="刪除">
            <IconButton onClick={handleDelete} size="large">
              <Icomoon type="delete_1" fontSize="large" />
            </IconButton>
          </Tooltip>
          {type !== "titleBlock" && (
            <>
              <Divider className={classes.vertical} orientation="vertical" />
              <Switch
                className={classes.switch}
                checked={isRequired}
                onChange={handleIsRequiredChange}
                labelPlacement="start"
                label="必填"
              />
            </>
          )}
        </div>
      </div>
    </Paper>
  );
};

export default QuestionEditable;
