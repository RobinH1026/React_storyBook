import React, { FC, MouseEvent } from "react";
import { Typography, Theme, IconButton, Tooltip } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import ImageIcon from "@mui/icons-material/Image";
import { Question } from "../types";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    borderBottom: "2px solid rgb(227, 230, 240)",
    padding: theme.spacing(2, 3),
  },
  grow: {
    flexGrow: 1,
  },
}));

export interface SectionHeaderProps {
  question: Question;
  totalResponses: number;
  onDownloadImageClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const SectionHeader: FC<SectionHeaderProps> = ({
  question,
  totalResponses,
  onDownloadImageClick,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h6">{question.questionName}</Typography>
      <div className={classes.grow} />
      <Tooltip title="下載圖片">
        <IconButton
          disableRipple
          onClick={onDownloadImageClick}
          color="primary"
          size="large"
        >
          <ImageIcon />
        </IconButton>
      </Tooltip>
      <Typography variant="body2">
        填答人數:{question.questionCount}/{totalResponses}人
      </Typography>
    </div>
  );
};

export default SectionHeader;
